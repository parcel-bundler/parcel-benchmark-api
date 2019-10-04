import fetch from "cross-fetch";
import urlJoin from "url-join";

import { GITHUB_USERNAME, REPO_OWNER, REPO_NAME } from "../../../constants";
import * as base64 from "../utils/base64";

type PostCommentOptions = {
  issueNumber: string;
  content: string;
  githubPassword: string;
};

export default async function postComment(options: PostCommentOptions) {
  if (!options.githubPassword) {
    throw new Error("options.githubPassword is undefined");
  }

  let headers = {
    Authorization:
      "Basic " +
      base64.encode(GITHUB_USERNAME + ":" + options.githubPassword.trim())
  };

  let url = urlJoin(
    "https://api.github.com/repos",
    REPO_OWNER,
    REPO_NAME,
    "issues",
    options.issueNumber,
    "comments"
  );

  let body = {
    body: options.content
  };

  console.log(`Post comment to ${url}`);

  let res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    throw new Error("Failed to post comment: " + res.statusText);
  }

  console.log(`Posted comment in ${url}`);
}
