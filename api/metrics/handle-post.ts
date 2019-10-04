import { NowRequest, NowResponse } from '@now/node';
import { captureException } from '@sentry/node';
import Ajv from 'ajv';

import postComment from './github/post-comment';
import listComments from './github/list-comments';
import storeComparisons from './utils/store-comparisons';
import checkAuth from './utils/check-auth';
import bodySchema from './body-schema';
import logBenchmarks from './utils/log-benchmarks';
import { ComparisonsBody } from './types/comparison';
import { GITHUB_USERNAME } from '../../constants';
import updateComment from './github/update-comment';

const ajvInstance = new Ajv();

type Options = {
  issue: string;
  markdownString: string;
};

async function handlePostComment(options: Options) {
  console.log('Post comment to GitHub');

  try {
    let comments = await listComments({
      issueNumber: options.issue
    });

    let existingComment = null;
    if (comments) {
      try {
        existingComment = comments.find((c: any) => {
          return c.user.login === GITHUB_USERNAME;
        });
      } catch (e) {}
    }

    if (existingComment) {
      await updateComment({
        commentId: `${existingComment.id}`,
        content: options.markdownString
      });
    }
  } catch (e) {
    console.error(e);
    captureException(e);
  }

  await postComment({
    issueNumber: options.issue,
    content: options.markdownString
  });
}

export default async function handlePost(req: NowRequest, res: NowResponse) {
  await checkAuth(req);

  let isValid = await ajvInstance.validate(bodySchema, req.body);
  if (!isValid) {
    console.log('invalid request');
    console.log(ajvInstance.errors);

    res.statusCode = 400;
    return res.end(
      JSON.stringify({
        type: 'error',
        data: {
          code: 'invalid_request',
          errors: ajvInstance.errors
        }
      })
    );
  }

  let body: ComparisonsBody = { ...req.body };

  // Store data into faunadb
  let comparisonId = await storeComparisons(body);

  let markdownString = logBenchmarks(body.comparisons, {
    id: comparisonId
  });

  console.log(markdownString);

  if (body.issue && process.env.GITHUB_PASSWORD) {
    handlePostComment({
      issue: body.issue,
      markdownString
    });
  }

  return res.end(
    JSON.stringify({
      type: 'success',
      data: {}
    })
  );
}
