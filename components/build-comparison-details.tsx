import React from 'react';

import { BuildComparison } from '../types/comparison';
import Card from './card';
import BundleDetails from './bundle-details';
import TimeDiff from './time-diff';
import timeFormatter from '../utils/time-formatter';

type Props = {
  name: string;
  comparison: BuildComparison;
};

export default function BuildComparisonDetails(props: Props) {
  let { name, comparison } = props;

  return (
    <Card className="my-4">
      <h3 className="font-semibold font-xl mb-4 text-gray-800">
        {name} -{' '}
        {comparison.buildTime < 0 ? (
          <span className="text-red-600">Failed</span>
        ) : (
          <>
            {timeFormatter(comparison.buildTime)} (
            <TimeDiff time={comparison.buildTime} timeDiff={comparison.buildTimeDiff} />)
          </>
        )}
      </h3>

      {comparison.bundles.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr repeat(4, auto)',
            gridRowGap: '0.5rem',
            gridColumnGap: '1.5rem'
          }}
        >
          {comparison.bundles.map((b, i) => (
            <BundleDetails bundle={b} key={i} />
          ))}
        </div>
      ) : (
        <div>Comparison contains no bundles, this build has probably failed.</div>
      )}
    </Card>
  );
}
