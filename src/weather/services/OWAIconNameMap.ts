import { WeatherIcon } from "@/weather/models/weather.model";

export const iconNameMap: Record<string, WeatherIcon> = {
  "01d": "day-sunny",
  "01n": "night-clear",
  "02d": "day-cloudy",
  "02n": "night-alt-cloudy",
  "03d": "cloud",
  "03n": "cloud",
  "04d": "cloudy",
  "04n": "cloudy",
  "09d": "showers",
  "09n": "showers",
  "10d": "day-rain",
  "10n": "night-alt-rain",
  "11d": "day-lightning",
  "11n": "night-alt-lightning",
  "13d": "day-snow",
  "13n": "night-alt-snow",
  "50d": "fog",
  "50n": "fog",
};
