import { TIMEDIFF_TRESHOLD } from "../../../constants";
import getAddition from "./get-emoji-addition";
import timeFormatter from "./time-formatter";

export default function formatTimeDiff(timeDiff: number, time: number) {
  let addition =
    Math.abs(timeDiff) > Math.abs(time * TIMEDIFF_TRESHOLD)
      ? getAddition(timeDiff)
      : "";
  let prefix = timeDiff > 0 ? "+" : "-";
  return prefix + timeFormatter(Math.abs(timeDiff)) + addition;
}