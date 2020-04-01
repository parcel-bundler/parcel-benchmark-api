import React from 'react';
import { NextPage } from 'next';
import { withRouter } from 'next/router';
import fetch from 'cross-fetch';
import urlJoin from 'url-join';
import queryString from 'query-string';

import SEO from '../components/seo';
import { API_URL } from '../constants';
import PageLayout from '../components/page-layout';
import Title from '../components/title';
import { ComparisonsDocument } from '../api/metrics/types/comparison';
import ComparisonsCard from '../components/comparisons-card';
import LinkButton from '../components/link-button';

type Props = {
  error?: Error;
  comparisons?: Array<ComparisonsDocument>;
  next?: number | string;
  previous?: number | string;
};

const Page: NextPage<Props> = (props: Props) => {
  let { error, comparisons, next, previous } = props;

  // Error boundary should catch this?
  if (error) {
    throw error;
  }

  let comparisonsList = null;
  if (comparisons) {
    comparisonsList = comparisons.map((comparison: ComparisonsDocument, i) => {
      return <ComparisonsCard comparison={comparison} key={i} />;
    });
  }

  return (
    <PageLayout>
      <SEO title="Recent Benchmarks" />
      <Title className="mb-8">Recent Benchmarks</Title>
      {comparisonsList}
      <div className="flex justify-between">
        <div>{previous && <LinkButton href={`/?previous=${previous}`}>Previous</LinkButton>}</div>
        <div>{next && <LinkButton href={`/?next=${next}`}>Next</LinkButton>}</div>
      </div>
    </PageLayout>
  );
};

Page.getInitialProps = async ({ query }: any) => {
  try {
    let q = queryString.stringify({
      after: query.next,
      before: query.previous
    });
    let apiUrl = urlJoin(API_URL, `metrics${q ? `?${q}` : ''}`);
    let res: any = await fetch(apiUrl);
    res = await res.json();

    return {
      comparisons: res.data,
      next: res.next,
      previous: res.previous
    };
  } catch (e) {
    return { error: e };
  }
};

// @ts-ignore
export default withRouter(Page);
