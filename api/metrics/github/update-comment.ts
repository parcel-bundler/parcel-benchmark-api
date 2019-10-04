import fetch from 'cross-fetch';
import urlJoin from 'url-join';

import { REPO_OWNER, REPO_NAME } from '../../../constants';
import { GITHUB_AUTH } from '../constants';
import * as base64 from '../utils/base64';

type PostCommentOptions = {
  commentId: string;
  content: string;
};

export default async function updateComment(options: PostCommentOptions) {
  let headers = {
    Authorization: 'Basic ' + base64.encode(GITHUB_AUTH)
  };

  let url = urlJoin('https://api.github.com/repos', REPO_OWNER, REPO_NAME, 'comments', options.commentId);

  let body = {
    body: options.content
  };

  console.log(`Update comment to ${url}`);

  let res = await fetch(url, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    throw new Error('Failed to update comment: ' + res.statusText);
  }

  console.log(`Updated comment on ${url}`);
}
