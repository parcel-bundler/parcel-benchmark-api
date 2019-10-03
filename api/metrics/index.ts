import { NowRequest, NowResponse } from "@now/node";

import checkAuth from "../../api-utils/check-auth";

export default async function handleRequest(req: NowRequest, res: NowResponse) {
  if (req.method.toLowerCase() === "post") {
    try {
      await checkAuth(req);

      console.log(req.body);
      res.end("ok");
    } catch (e) {
      console.error(e);
      res.statusCode = 500;
      res.end("error");
    }
  }

  res.end("invalid request");
}
