import isToday from "date-fns/isToday";
import isTomorrow from "date-fns/isTomorrow";

const translatedDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const translatedDay = (
  date: Date,
  { locale = "fr" }: { locale?: string } = {}
) => {
  if (!date) return "";

  if (isToday(date)) {
    return "Today";
  }

  if (isTomorrow(date)) {
    return "Tomorrow";
  }

  return translatedDays[date.getDay()];
};
