const comparison = {
  type: "object",
  properties: {
    buildTime: { type: "number" },
    buildTimeDiff: { type: "number" },
    bundles: {
      type: "array",
      items: {
        type: "object",
        properties: {
          filePath: { type: "string" },
          size: { type: "number" },
          sizeDiff: { type: "number" },
          time: { type: "number" },
          timeDiff: { type: "number" },
          largestAssets: {
            type: "array",
            items: {
              type: "object",
              properties: {
                filePath: { type: "string" },
                size: { type: "number" },
                sizeDiff: { type: "number" },
                time: { type: "number" },
                timeDiff: { type: "number" }
              }
            }
          },
          totalAssets: { type: "number" }
        },
        required: ["filePath", "size", "sizeDiff", "time", "timeDiff"]
      }
    }
  },
  required: ["buildTime", "buildTimeDiff", "bundles"]
};

export default {
  type: "object",
  properties: {
    comparisons: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          cold: { ...comparison },
          cached: { ...comparison }
        },
        required: ["name", "cold", "cached"]
      }
    },
    commitHash: { type: "string" },
    repo: { type: "string" },
    branch: { type: "string" }
  },
  required: ["comparisons", "commitHash", "repo", "branch"]
};
