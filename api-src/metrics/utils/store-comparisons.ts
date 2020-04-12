import { query } from 'faunadb';

import faunaClient from './fauna-client';
import { Comparisons } from '../types/comparison';

type Payload = {
  commit: string;
  issue?: string;
  comparisons: Comparisons;
  repo: string;
  branch: string;
};

export default async function storeComparison(data: Payload): Promise<string> {
  let res: any = await faunaClient.query(
    query.Create(query.Collection('comparisons'), {
      data: {
        ...data,
        createdAt: Date.now()
      }
    })
  );

  console.log(res);

  return res.ref.id;
}
