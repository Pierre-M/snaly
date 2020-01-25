"use strict";

/*
    Above are all matches between weather id returned by https://openweathermap.org/ api.
    Check https://openweathermap.org/weather-conditions for more info.
*/

import { WeatherIcon } from "@/business/weather-api/WeatherService";

export type IconNameMap = Record<WeatherIcon, string>;

export const iconNameMap: IconNameMap = {
    "04d": "wi-cloudy",
};
