"use strict";

/*
    Above are all matches between weather id returned by https://openweathermap.org/ api.
    Check https://openweathermap.org/weather-conditions for more info.
*/

import { WeatherIcon } from "@/business/weather-api/WeatherService";

export type IconNameMap = Record<WeatherIcon, string>;

export const iconNameMap: IconNameMap = {
    "01d": "wi-day-sunny",
    "01n": "wi-night-clear",
    "02d": "wi-day-cloudy",
    "02n": "wi-night-alt-cloudy",
    "03d": "wi-cloud",
    "03n": "wi-cloud",
    "04d": "wi-cloudy",
    "04n": "wi-cloudy",
    "09d": "wi-showers",
    "09n": "wi-showers",
    "10d": "wi-day-rain",
    "10n": "wi-night-alt-rain",
    "11d": "wi-day-lightning",
    "11n": "wi-night-alt-lightning",
    "13d": "wi-day-snow",
    "13n": "wi-night-alt-snow",
    "50d": "wi-fog",
    "50n": "wi-fog"
};
