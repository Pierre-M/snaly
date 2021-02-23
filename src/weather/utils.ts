import { TemperatureUnit } from "@/weather/models/weather.model";

export const formattedTemperature = (
  temp: number,
  {
    unit = TemperatureUnit.CELSIUS,
    locale = "fr",
  }: { unit?: TemperatureUnit; locale?: string }
) => {
  const value = Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(
    temp
  );
  const suffix = unit === TemperatureUnit.CELSIUS ? "°C" : "°F";

  return `${value}${suffix}`;
};
