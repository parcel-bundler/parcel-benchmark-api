import { NowRequest, NowResponse } from "@now/node";
import * as Sentry from "@sentry/node";

import handlePost from "./handle-post";
import handleGet from "./handle-get";

Sentry.init({
  dsn: "https://c8f4848c599e44588dc2bc402e928b4d@sentry.io/1769567"
});

export default async function handleRequest(req: NowRequest, res: NowResponse) {
  res.setHeader('Content-Type', 'application/json');

  try {
    switch (req.method && req.method.toLowerCase()) {
      case "post":
        await handlePost(req, res);
        break;
      case "get":
        await handleGet(req, res);
        break;
      default:
        res.statusCode = 400;
        res.end("Invalid request");
        break;
    }
  } catch (e) {
    Sentry.captureException(e);
    console.error(e);

    res.statusCode = 500;
    res.end(
      JSON.stringify({
        type: "error",
        data: {
          code: "unknown_error"
        }
      })
    );
  }

  await Sentry.flush();
}
