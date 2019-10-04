import React from "react";

import { BuildComparison } from "../api/metrics/types/comparison";
import Card from "./card";
import BundleDetails from "./bundle-details";
import TimeDiff from "./time-diff";
import timeFormatter from "../api/metrics/utils/time-formatter";

type Props = {
  name: string;
  comparison: BuildComparison;
};

export default function BuildComparisonDetails(props: Props) {
  let { name, comparison } = props;

  return (
    <Card className="my-4">
      <h3 className="font-semibold font-xl mb-4 text-gray-800">
        {name} - {timeFormatter(comparison.buildTime)} (
        <TimeDiff
          time={comparison.buildTime}
          timeDiff={comparison.buildTimeDiff}
        />
        )
      </h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr repeat(4, auto)",
          gridRowGap: "0.5rem",
          gridColumnGap: "1rem"
        }}
      >
        {comparison.bundles.map((b, i) => (
          <BundleDetails bundle={b} key={i} />
        ))}
      </div>
    </Card>
  );
}
