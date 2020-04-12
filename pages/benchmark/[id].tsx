import React from 'react';
import { NextPage } from 'next';
import { withRouter } from 'next/router';
import fetch from 'cross-fetch';
import urlJoin from 'url-join';

import SEO from '../../components/seo';
import { API_URL } from '../../constants';
import PageLayout from '../../components/page-layout';
import Title from '../../components/title';
import { ComparisonsDocument } from '../../types/comparison';
import Label from '../../components/label';
import Link from '../../components/link';
import { REPO_NAME, REPO_OWNER } from '../../constants';
import { formatDateTime } from '../../utils/format-date';
import ComparisonDetails from '../../components/comparison-details';
import ChevronLeft from '../../icons/chevron-left.svg';
import ErrorPage from '../../components/error-page';

type Props = {
  error?: string;
  comparisons?: ComparisonsDocument;
};

const Comparisons = (props: { comparisons: ComparisonsDocument }) => {
  let { comparisons } = props;

  let title = `${comparisons.repo} - ${comparisons.branch}`;
  return (
    <React.Fragment>
      <Title>{title}</Title>
      <div className="flex justify-between mb-12 mt-8">
        <div>
          <Label>Commit</Label>
          <Link href={urlJoin('https://github.com/', comparisons.repo, 'commit', comparisons.commit)}>
            {comparisons.commit.substr(0, 8)}
          </Link>
        </div>
        <div className="text-center">
          <Label>Created At</Label>
          <span className="text-gray-800 font-semibold">{formatDateTime(comparisons.createdAt)}</span>
        </div>
        {comparisons.issue && (
          <div className="text-right">
            <Label>Pull Request</Label>
            <Link href={urlJoin('https://github.com/', REPO_OWNER, REPO_NAME, 'issues', comparisons.issue.toString())}>
              #{comparisons.issue}
            </Link>
          </div>
        )}
      </div>
      {comparisons.comparisons.map((comparison, i) => {
        return <ComparisonDetails comparison={comparison} key={i} />;
      })}
      <Link href="/" className="inline-flex items-center">
        <ChevronLeft className="fill-current h-3 w-3 inline-block mr-2" />
        Return to benchmarks overview
      </Link>
    </React.Fragment>
  );
};

const Page: NextPage<Props> = (props: Props) => {
  let { error, comparisons } = props;

  return (
    <PageLayout>
      <SEO title="Recent Benchmarks" />
      {comparisons && !error && <Comparisons comparisons={comparisons} />}
      {error && <ErrorPage error={error} />}
    </PageLayout>
  );
};

Page.getInitialProps = async ({ query }: any) => {
  try {
    let res: any = await fetch(urlJoin(API_URL, `metrics?id=${query.id}`));

    if (!res.headers['content-type'] || !res.headers['content-type'].includes('application/json')) {
      res = await res.json();

      return {
        comparisons: res.data
      };
    } else {
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
