import { NowRequest, NowResponse } from "@now/node";
import { query } from "faunadb";

import faunaClient from "./utils/fauna-client";

const PAGE_COUNT = 20;

function stringifyQuery(queryparam: string | Array<string>): string {
  if (Array.isArray(queryparam)) {
    return queryparam.join("");
  }

  return queryparam;
}

export default async function handleGet(req: NowRequest, res: NowResponse) {
  let commit = req.query.commit && stringifyQuery(req.query.commit);
  if (commit) {
    // Return comparisons for commit
    try {
      let faunaRes: any = await faunaClient.query(
        query.Get(query.Match(query.Index("comparisons-commit-index"), commit))
      );

      res.statusCode = 200;
      res.end(
        JSON.stringify({
          type: "error",
          data: faunaRes.data
        })
      );
    } catch (e) {
      res.statusCode = 404;
      res.end(
        JSON.stringify({
          type: "error",
          data: {
            code: "not_found"
          }
        })
      );
    }
  } else {
    // Return last x comparisons
    let faunaRes: any = await faunaClient.query(
      query.Map(
        query.Paginate(
          query.Match(query.Index("comparisons_reverse_sorted_createdAt")),
          {
            size: PAGE_COUNT
          }
        ),
        query.Lambda(["createdAt", "ref"], query.Get(query.Var("ref")))
      )
    );

    res.end(
      JSON.stringify({
        type: "success",
        data: faunaRes.data.map((doc: any) => doc.data)
      })
    );
  }
}
