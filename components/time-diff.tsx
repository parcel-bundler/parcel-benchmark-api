import React from "react";
import classNames from "classnames";

import formatTimeDiff from "../api/metrics/utils/format-time-diff";
import { TIMEDIFF_TRESHOLD } from "../constants";

type Props = {
  time: number;
  timeDiff: number;
};

export default function TimeDiff(props: Props) {
  let { time, timeDiff } = props;

  let isProblematic = Math.abs(timeDiff) > Math.abs(time) * TIMEDIFF_TRESHOLD;

  return (
    <span
      className={classNames({
        "text-red-600": isProblematic && timeDiff > 0,
        "text-green-600": isProblematic && timeDiff < 0
      })}
    >
      {formatTimeDiff(timeDiff, time, false)}
    </span>
  );
}
