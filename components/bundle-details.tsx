import React from "react";

import { BundleComparison } from "../api/metrics/types/comparison";
import formatSize from "../api/metrics/utils/size-formatter";
import formatTime from "../api/metrics/utils/time-formatter";
import TimeDiff from "./time-diff";
import SizeDiff from "./size-diff";

type Props = {
  bundle: BundleComparison;
};

export default function BundleDetails(props: Props) {
  let { bundle } = props;

  return (
    <>
      <div className="text-gray-700">{bundle.filePath}</div>
      <div className="text-right">{formatSize(bundle.size)}</div>
      <div className="text-right font-medium">
        <SizeDiff size={bundle.size} sizeDiff={bundle.sizeDiff} />
      </div>
      <div className="text-right">{formatTime(bundle.time)}</div>
      <div className="text-right font-medium">
        <TimeDiff time={bundle.time} timeDiff={bundle.timeDiff} />
      </div>
    </>
  );
}
