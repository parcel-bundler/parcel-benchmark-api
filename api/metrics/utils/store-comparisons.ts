import { query } from "faunadb";

import faunaClient from "./fauna-client";
import { Comparisons } from "./comparison-types";

type Payload = {
  commit: string;
  issue?: string;
  comparisons: Comparisons;
  repo: string;
  branch: string;
};

export default function storeComparison(data: Payload): Promise<any> {
  return faunaClient.query(
    query.Create(query.Collection("comparisons"), {
      data: {
        ...data,
        createdAt: Date.now()
      }
    })
  );
}
