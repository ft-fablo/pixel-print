import { formatInTimeZone } from "date-fns-tz";

const dateFormat = (date) => {
  if (!date) return "";
  return formatInTimeZone(new Date(date), "America/New_York", "dd MMM yyyy");
};

export default dateFormat;
