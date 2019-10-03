import { NowRequest, NowResponse } from "@now/node";

export default function handleRequest(req: NowRequest, res: NowResponse) {
  if (req.method.toLowerCase() === "post") {
    console.log(req);

    res.end("ok");
  }

  res.end("invalid request");
}
