import React from 'react';
import classNames from 'classnames';

import formatSizeDiff from '../api/metrics/utils/format-size-diff';

type Props = {
  sizeDiff: number;
};

export default function SizeDiff(props: Props) {
  let { sizeDiff } = props;

  let isProblematic = Math.abs(sizeDiff) > 0;

  return (
    <span
      className={classNames({
        'text-red-600': isProblematic && sizeDiff > 0,
        'text-green-600': isProblematic && sizeDiff < 0
      })}
    >
      {formatSizeDiff(sizeDiff, false)}
    </span>
  );
}
