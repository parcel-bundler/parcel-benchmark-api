import React from 'react';

import SubTitle from './sub-title';
import { Comparison } from '../api/metrics/types/comparison';
import BuildComparisonDetails from './build-comparison-details';

type Props = {
  comparison: Comparison;
};

export default function ComparisonDetails(props: Props) {
  let { comparison } = props;

  return (
    <div className="my-8">
      <SubTitle className="capitalize">{comparison.name}</SubTitle>
      <BuildComparisonDetails name="Cold" comparison={comparison.cold} />
      <BuildComparisonDetails name="Cached" comparison={comparison.cached} />
    </div>
  );
}
