import dayjs from "dayjs";

export function formatDateTime(timestamp: string | number) {
  return dayjs(timestamp).format("MM-DD-YYYY HH:mm:ss");
}
