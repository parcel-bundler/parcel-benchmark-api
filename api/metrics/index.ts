import { NowRequest, NowResponse } from "@now/node";
import Ajv from "ajv";

import checkAuth from "./utils/check-auth";
import bodySchema from "./body-schema";
import logBenchmarks from "./utils/log-benchmarks";
import { Comparisons } from "./utils/comparison-types";
import postComment from "./github/post-comment";

const ajvInstance = new Ajv();

type Body = {
  comparisons: Comparisons;
  commitHash: string;
  repo: string;
  branch: string;
  issueNumber?: string;
};

export default async function handleRequest(req: NowRequest, res: NowResponse) {
  if (req.method && req.method.toLowerCase() === "post") {
    try {
      await checkAuth(req);

      let isValid = await ajvInstance.validate(bodySchema, req.body);
      if (!isValid) {
        console.log("invalid request");
        console.log(ajvInstance.errors);

        res.statusCode = 400;
        return res.end("invalid request");
      }

      let body: Body = { ...req.body };
      let markdownString = logBenchmarks(body.comparisons);
      if (body.issueNumber && process.env.GITHUB_PASSWORD) {
        console.log("Post comment to GitHub");

        await postComment({
          issueNumber: body.issueNumber,
          content: markdownString,
          githubPassword: process.env.GITHUB_PASSWORD
        });
      }

      res.end("ok");
    } catch (e) {
      console.error(e);
      res.statusCode = 500;
      res.end("error");
    }
  }

  res.end("invalid request");
}
