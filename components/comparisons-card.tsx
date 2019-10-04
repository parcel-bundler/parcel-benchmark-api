import React from "react";
import urlJoin from "url-join";

import { ComparisonsDocument } from "../api/metrics/types/comparison";
import timeFormatter from "../api/metrics/utils/time-formatter";
import { REPO_NAME, REPO_OWNER } from "../constants";
import TimeDiff from "./time-diff";
import Link from "./link";
import Card from "./card";
import Label from "./label";

type Props = {
  comparison: ComparisonsDocument;
};

export default function ComparisonsCard(props: Props) {
  let { comparison } = props;

  return (
    <Card className="my-4">
      <div className="flex justify-between mb-2 text-lg">
        <div>
          <Link href={`/benchmark/${comparison.id}`}>
            <h2 className="font-semibold capitalize">
              {comparison.branch} - {comparison.commit.substr(0, 8)}
            </h2>
          </Link>
          <span className="block text-sm capitalize text-blue-400">
            {comparison.repo}
          </span>
        </div>
        {comparison.issue && (
          <Link
            href={urlJoin(
              "https://github.com/",
              REPO_OWNER,
              REPO_NAME,
              "issues",
              comparison.issue.toString()
            )}
          >
            PR #{comparison.issue}
          </Link>
        )}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto auto",
          gridColumnGap: "1rem",
          gridRowGap: ".25rem"
        }}
      >
        <span className="text-gray-600">Benchmark</span>
        <span className="text-gray-600">Cold</span>
        <span className="text-gray-600">Cached</span>
        {comparison.comparisons.map((comparison, index) => {
          return (
            <>
              <span className="capitalize">{comparison.name}</span>
              <span className="font-semibold text-gray-800">
                {timeFormatter(comparison.cold.buildTime)} (
                <TimeDiff
                  time={comparison.cold.buildTime}
                  timeDiff={comparison.cold.buildTimeDiff}
                />
                )
              </span>
              <span className="font-semibold text-gray-800">
                {timeFormatter(comparison.cached.buildTime)} (
                <TimeDiff
                  time={comparison.cached.buildTime}
                  timeDiff={comparison.cached.buildTimeDiff}
                />
                )
              </span>
            </>
          );
        })}
      </div>
    </Card>
  );
}
