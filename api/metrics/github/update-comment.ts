import fetch from 'cross-fetch';

import { GITHUB_AUTH } from '../constants';
import * as base64 from '../utils/base64';

type PostCommentOptions = {
  url: string;
  content: string;
};

export default async function updateComment(options: PostCommentOptions) {
  let headers = {
    Authorization: 'Basic ' + base64.encode(GITHUB_AUTH)
  };

  let body = {
    body: options.content
  };

  console.log(`Update comment to ${options.url}`);

  let res = await fetch(options.url, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    throw new Error('Failed to update comment: ' + res.statusText);
  }

  console.log(`Updated comment on ${options.url}`);
}
