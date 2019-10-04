import fetch from 'cross-fetch';
import urlJoin from 'url-join';

import { REPO_OWNER, REPO_NAME } from '../../../constants';

type PostCommentOptions = {
  issueNumber: string;
};

export default async function listComments(options: PostCommentOptions): Promise<any> {
  let url = urlJoin('https://api.github.com/repos', REPO_OWNER, REPO_NAME, 'issues', options.issueNumber, 'comments');
  let res = await (await fetch(url)).json();

  if (!res.ok) {
    throw new Error('Failed to get comments: ' + res.statusText);
  }

  console.log(`Got comments ${url}`);

  return res;
}
