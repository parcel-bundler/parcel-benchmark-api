import React from "react";
import urlJoin from "url-join";

import { ComparisonsDocument } from "../api/metrics/types/comparison";
import timeFormatter from "../api/metrics/utils/time-formatter";
import { REPO_NAME, REPO_OWNER } from "../constants";
import TimeDiff from "./time-diff";
import Link from "./link";

type Props = {
  comparison: ComparisonsDocument;
};

export default function ComparisonsCard(props: Props) {
  let { comparison } = props;

  return (
    <article className="w-full p-4 shadow-md rounded-lg">
      <div className="flex justify-between mb-2 text-lg">
        <Link href={`/benchmark/${comparison.id}`}>
          <h2 className="font-semibold capitalize">
            {comparison.repo} - {comparison.branch} (
            {comparison.commit.substr(0, 8)})
          </h2>
        </Link>
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
            #{comparison.issue}
          </Link>
        )}
      </div>
      <div>
        <ul>
          {comparison.comparisons.map((comparison, index) => {
            return (
              <li key={index} className="flex justify-between my-2">
                <span>{comparison.name}</span>
                <div className="font-semibold text-gray-800">
                  <span>
                    {timeFormatter(comparison.cold.buildTime)} (
                    <TimeDiff
                      time={comparison.cold.buildTime}
                      timeDiff={comparison.cold.buildTimeDiff}
                    />
                    )
                  </span>
                  <span className="ml-4">
                    {timeFormatter(comparison.cached.buildTime)} (
                    <TimeDiff
                      time={comparison.cached.buildTime}
                      timeDiff={comparison.cached.buildTimeDiff}
                    />
                    )
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
}
