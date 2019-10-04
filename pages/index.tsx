import React from 'react';
import { NextPage } from 'next';
import { withRouter } from 'next/router';
import fetch from 'cross-fetch';
import urlJoin from 'url-join';

import SEO from '../components/seo';
import { API_URL } from '../constants';
import PageLayout from '../components/page-layout';
import Title from '../components/title';
import { ComparisonsDocument } from '../api/metrics/types/comparison';
import ComparisonsCard from '../components/comparisons-card';

type Props = {
  error?: Error;
  comparisons?: Array<ComparisonsDocument>;
};

const Page: NextPage<Props> = (props: Props) => {
  let { error, comparisons } = props;

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
      <Title>Recent Benchmarks</Title>
      {comparisonsList}
    </PageLayout>
  );
};

Page.getInitialProps = async () => {
  try {
    let res: any = await fetch(urlJoin(API_URL, 'metrics'));
    res = await res.json();

    return {
      comparisons: res.data
    };
  } catch (e) {
    return { error: e };
  }
};

// @ts-ignore
export default withRouter(Page);
