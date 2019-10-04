import sizeFormatter from "./size-formatter";
import getAddition from "./get-emoji-addition";

export default function formatSizeDiff(sizeDiff: number) {
  let addition = Math.abs(sizeDiff) > 0 ? getAddition(sizeDiff) : "";
  let prefix = sizeDiff >= 0 ? "+" : "-";
  return prefix + sizeFormatter(Math.abs(sizeDiff)) + addition;
}
