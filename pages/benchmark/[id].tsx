import React from "react";
import { NextPage } from "next";
import { withRouter } from "next/router";
import fetch from "cross-fetch";
import urlJoin from "url-join";

import SEO from "../../components/seo";
import { API_URL } from "../../constants";
import PageLayout from "../../components/page-layout";
import Title from "../../components/title";
import { ComparisonsDocument } from "../../api/metrics/types/comparison";
import ComparisonsCard from "../../components/comparisons-card";

type Props = {
  error?: Error;
  comparisons?: ComparisonsDocument;
};

const Page: NextPage<Props> = (props: Props) => {
  let { error, comparisons } = props;

  // Error boundary should catch this?
  if (error) {
    throw error;
  }

  if (!comparisons) return null;

  return (
    <PageLayout>
      <SEO title="Benchmark Details" />
      <Title>Benchmark Details</Title>
      <ComparisonsCard comparison={comparisons} />
    </PageLayout>
  );
};

Page.getInitialProps = async ({ query }: any) => {
  try {
    let res: any = await fetch(urlJoin(API_URL, `metrics?id=${query.id}`));
    res = await res.json();

    return {
      comparisons: res.data
    };
  } catch (e) {
    return {};
  }
};

// @ts-ignore
export default withRouter(Page);
