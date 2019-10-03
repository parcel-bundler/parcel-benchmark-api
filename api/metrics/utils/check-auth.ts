import { NowRequest } from "@now/node";
import { query } from "faunadb";

import faunaClient from "./fauna-client";

export default async function checkAuth(req: NowRequest) {
  let authorizationHeader = req.headers.authorization
    ? req.headers.authorization.trim()
    : "";
  if (!authorizationHeader) {
    throw new Error("No auth header present");
  }

  let faunaRes: any = await faunaClient.query(
    query.Get(
      query.Match(query.Index("api-key-key-index"), authorizationHeader)
    )
  );

  if (faunaRes && faunaRes.data && faunaRes.data.key === authorizationHeader) {
    console.log("Authenticated!");
    return;
  } else {
    throw new Error("Invalid API Key");
  }
}
