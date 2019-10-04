import { NowRequest, NowResponse } from "@now/node";
import Ajv from "ajv";

import postComment from "./github/post-comment";
import storeComparisons from "./utils/store-comparisons";
import checkAuth from "./utils/check-auth";
import bodySchema from "./body-schema";
import logBenchmarks from "./utils/log-benchmarks";
import { Comparisons } from "./utils/comparison-types";

const ajvInstance = new Ajv();

type Body = {
  comparisons: Comparisons;
  repo: string;
  branch: string;
  commit: string;
  issue?: string;
};

export default async function handlePost(req: NowRequest, res: NowResponse) {
  await checkAuth(req);

  let isValid = await ajvInstance.validate(bodySchema, req.body);
  if (!isValid) {
    console.log("invalid request");
    console.log(ajvInstance.errors);

    res.statusCode = 400;
    return res.end(
      JSON.stringify({
        type: "error",
        data: {
          code: "invalid_request",
          errors: ajvInstance.errors
        }
      })
    );
  }

  let body: Body = { ...req.body };
  let markdownString = logBenchmarks(body.comparisons);
  if (body.issue && process.env.GITHUB_PASSWORD) {
    console.log("Post comment to GitHub");

    await postComment({
      issueNumber: body.issue,
      content: markdownString,
      githubPassword: process.env.GITHUB_PASSWORD
    });
  }

  // Store data into faunadb
  await storeComparisons(body);

  return res.end(
    JSON.stringify({
      type: "success",
      data: {}
    })
  );
}
