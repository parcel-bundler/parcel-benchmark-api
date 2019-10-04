import urlJoin from 'url-join';

import { Comparison, Comparisons, BundleComparison } from '../types/comparison';
import timeFormatter from './time-formatter';
import sizeFormatter from './size-formatter';
import { TIMEDIFF_TRESHOLD, API_ROOT } from '../../../constants';
import formatTimeDiff from './format-time-diff';
import formatSizeDiff from './format-size-diff';

// sizediff is byte value
const SIZEDIFF_TRESHOLD = 1;

type LogOptions = {
  id: string;
};

function logBundles(bundles: Array<BundleComparison>, title: string): string {
  let renderedBundles = 0;
  let bundleTable = '| Bundle | Size | Difference | Time | Difference |\n';
  bundleTable += '| --- | --- | --- | --- | --- |\n';
  for (let bundle of bundles) {
    if (
      Math.abs(bundle.timeDiff) < Math.abs(bundle.time * TIMEDIFF_TRESHOLD) &&
      Math.abs(bundle.sizeDiff) < SIZEDIFF_TRESHOLD
    ) {
      continue;
    }

    bundleTable += `| ${bundle.filePath} | ${sizeFormatter(bundle.size)} | ${formatSizeDiff(
      bundle.sizeDiff
    )} | ${timeFormatter(bundle.time)} | ${formatTimeDiff(bundle.timeDiff, bundle.time)} |\n`;

    renderedBundles++;
  }

  let res = `#### ${title}\n\n`;
  if (renderedBundles > 0) {
    res += bundleTable;
  } else {
    res += '*No bundle changes detected.*\n';
  }
  res += '\n';
  return res;
}

function logComparison(comparison: Comparison) {
  let res = '';

  res += `<details><summary>${comparison.name}</summary><p>\n\n`;

  // Timings
  res += '#### Timings\n\n';
  res += '| Description | Time | Difference |\n';
  res += '| --- | --- | --- |\n';
  res += `| Cold | ${timeFormatter(comparison.cold.buildTime)} | ${formatTimeDiff(
    comparison.cold.buildTimeDiff,
    comparison.cold.buildTime
  )} |\n`;
  res += `| Cached | ${timeFormatter(comparison.cached.buildTime)} | ${formatTimeDiff(
    comparison.cached.buildTimeDiff,
    comparison.cached.buildTime
  )} |\n`;
  res += '\n';

  // Bundle Sizes
  res += logBundles(comparison.cold.bundles, 'Cold Bundles');
  res += logBundles(comparison.cold.bundles, 'Cached Bundles');

  res += '</p></details>';

  return res;
}

export default function logBenchmarks(comparisons: Comparisons, logOptions: LogOptions): string {
  let content = '## Benchmark Results\n';

  for (let comparison of comparisons) {
    content += logComparison(comparison);
    content += '\n\n';
  }

  if (comparisons.length === 0) {
    content += '**Could not run benchmarks, this probably means there is a bug in this branch...**\n\n\n';
  } else {
    content += `**[Click here to view a detailed benchmark overview.](${urlJoin(
      API_ROOT,
      'benchmark',
      logOptions.id
    )})**`;
  }

  return content;
}
