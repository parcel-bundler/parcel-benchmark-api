import React from "react";

import timeFormatter from "../api/metrics/utils/time-formatter";

type Props = {
  time: number;
  timeDiff: number;
};

export default function TimeDiff(props: Props) {
  let { time, timeDiff } = props;

  return <span>{timeFormatter(timeDiff)}</span>;
}
