export type AssetComparison = {
  filePath: string;
  size: number;
  sizeDiff: number;
  time: number;
  timeDiff: number;
};

export type BundleComparison = {
  filePath: string;
  size: number;
  sizeDiff: number;
  time: number;
  timeDiff: number;
  largestAssets: Array<AssetComparison>;
  totalAssets: number;
};

export type BuildComparison = {
  buildTime: number;
  buildTimeDiff: number;
  bundles: Array<BundleComparison>;
};

export type Comparison = {
  name: string;
  cold: BuildComparison;
  cached: BuildComparison;
};

export type Comparisons = Array<Comparison>;