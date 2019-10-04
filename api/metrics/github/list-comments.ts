import fetch from 'cross-fetch';
import urlJoin from 'url-join';

import { REPO_OWNER, REPO_NAME } from '../../../constants';
import { GITHUB_AUTH } from '../constants';
import * as base64 from '../utils/base64';

type PostCommentOptions = {
  issueNumber: string;
};

export default async function listComments(options: PostCommentOptions): Promise<any> {
  let headers = {
    Authorization: 'Basic ' + base64.encode(GITHUB_AUTH)
  };

  let url = urlJoin('https://api.github.com/repos', REPO_OWNER, REPO_NAME, 'issues', options.issueNumber, 'comments');
  let res = await fetch(url, {
    method: 'GET',
    headers
  });

  if (!res.ok) {
    throw new Error('Failed to get comments: ' + res.statusText);
  }

  res = await res.json();

  console.log(`Got comments ${url}`);

  return res;
}
