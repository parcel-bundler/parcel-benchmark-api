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
import ErrorPage from '../components/error-page';

type Props = {
  error?: string;
  comparisons?: Array<ComparisonsDocument>;
  next?: number | string;
  previous?: number | string;
};

const Comparisons = (props: { comparisons: Array<ComparisonsDocument> }) => {
  let { comparisons } = props;

  let comparisonsList = null;
  if (comparisons) {
    comparisonsList = comparisons.map((comparison: ComparisonsDocument, i) => {
      return <ComparisonsCard comparison={comparison} key={i} />;
    });
  }

  return (
    <React.Fragment>
      <Title className="mb-8">Recent Benchmarks</Title>
      {comparisonsList}
    </React.Fragment>
  );
};

const Page: NextPage<Props> = (props: Props) => {
  let { error, comparisons } = props;

  return (
    <PageLayout>
      <SEO title="Recent Benchmarks" />
      {error && <ErrorPage error={error} />}
      {comparisons && <Comparisons comparisons={comparisons} />}
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

    let contentType = res.headers.get('content-type');
    if (contentType.includes('application/json')) {
      res = await res.json();

      return {
        comparisons: res.data,
        next: res.next,
        previous: res.previous
      };
    } else {
      if (res.status >= 400) {
        let message = await res.text();
        throw new Error(message);
      }

      return {
        comparisons: []
      };
    }
  } catch (e) {
    return { error: e.message };
  }
};

// @ts-ignore
export default withRouter(Page);
