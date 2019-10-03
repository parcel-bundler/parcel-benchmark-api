import { NowRequest, NowResponse } from "@now/node";
import Ajv from "ajv";

import checkAuth from "../../api-utils/check-auth";
import bodySchema from "./body-schema";

const ajvInstance = new Ajv();

export default async function handleRequest(req: NowRequest, res: NowResponse) {
  if (req.method.toLowerCase() === "post") {
    try {
      await checkAuth(req);

      let body = { ...req.body };
      let isValid = await ajvInstance.validate(bodySchema, body);
      if (!isValid) {
        res.statusCode = 400;
        return res.end("invalid request");
      }

      console.log(body);

      res.end("ok");
    } catch (e) {
      console.error(e);
      res.statusCode = 500;
      res.end("error");
    }
  }

  res.end("invalid request");
}
