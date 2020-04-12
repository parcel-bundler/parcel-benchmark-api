import { NowRequest, NowResponse } from '@now/node';
import { query } from 'faunadb';

import faunaClient from './utils/fauna-client';
import { ComparisonsDocument } from '../../types/comparison';

type Comparison = {
  data: ComparisonsDocument;
  ref: {
    id: any;
  };
};

const PAGE_COUNT = 50;

function stringifyQuery(queryparam: string | Array<string>): string {
  if (Array.isArray(queryparam)) {
    queryparam = queryparam.join('');
  }

  return queryparam.trim();
}

export default async function handleGet(req: NowRequest, res: NowResponse) {
  let id = req.query.id && stringifyQuery(req.query.id);

  if (id) {
    // Return comparisons for id
    try {
      let faunaRes: any = await faunaClient.query(query.Get(query.Ref(query.Collection('comparisons'), id)));

      res.statusCode = 200;
      res.end(
        JSON.stringify({
          type: 'error',
          data: {
            id,
            ...faunaRes.data
          }
        })
      );
    } catch (e) {
      res.statusCode = 404;
      res.end(
        JSON.stringify({
          type: 'error',
          data: {
            code: 'not_found'
          }
        })
      );
    }
  } else {
    let paginationOptions: any = {
      size: PAGE_COUNT
    };

    // Return last x comparisons
    let faunaRes: any = await faunaClient.query(
      query.Map(
        query.Paginate(query.Match(query.Index('comparisons_reverse_sorted_createdAt')), paginationOptions),
        query.Lambda(['createdAt', 'ref'], query.Get(query.Var('ref')))
      )
    );

    res.end(
      JSON.stringify({
        type: 'success',
        data: faunaRes.data.map((doc: Comparison) => {
          return {
            id: doc.ref.id,
            comparisons: doc.data.comparisons.map(c => {
              return {
                name: c.name,
                cold: {
                  buildTime: c.cold.buildTime,
                  buildTimeDiff: c.cold.buildTimeDiff
                },
                cached: {
                  buildTime: c.cached.buildTime,
                  buildTimeDiff: c.cached.buildTimeDiff
                }
              };
            }),
            repo: doc.data.repo,
            branch: doc.data.branch,
            commit: doc.data.commit,
            issue: doc.data.issue,
            createdAt: doc.data.createdAt
          };
        }),
        count: faunaRes.data.length
      })
    );
  }
}
