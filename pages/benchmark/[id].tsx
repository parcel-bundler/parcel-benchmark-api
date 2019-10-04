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
import Label from "../../components/label";
import Link from "../../components/link";
import { REPO_NAME, REPO_OWNER } from "../../constants";
import { formatDateTime } from "../../utils/format-date";
import ComparisonDetails from "../../components/comparison-details";
import ChevronLeft from "../../icons/chevron-left.svg";

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

  let title = `${comparisons.repo} - ${comparisons.branch}`;

  return (
    <PageLayout>
      <SEO title={title} />
      <Title className="capitalize">{title}</Title>
      <div className="flex justify-between mb-12 mt-8">
        <div>
          <Label>Commit</Label>
          <Link
            href={urlJoin(
              "https://github.com/",
              comparisons.repo,
              "commit",
              comparisons.commit
            )}
          >
            {comparisons.commit.substr(0, 8)}
          </Link>
        </div>
        <div className="text-center">
          <Label>Created At</Label>
          <span className="text-gray-800 font-semibold">
            {formatDateTime(comparisons.createdAt)}
          </span>
        </div>
        {comparisons.issue && (
          <div className="text-right">
            <Label>Issue</Label>
            <Link
              href={urlJoin(
                "https://github.com/",
                REPO_OWNER,
                REPO_NAME,
                "issues",
                comparisons.issue.toString()
              )}
            >
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
    return { error: e };
  }
};

// @ts-ignore
export default withRouter(Page);
