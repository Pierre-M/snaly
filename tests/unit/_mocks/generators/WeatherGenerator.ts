"use strict";

import {
    CurrentWeatherOverview,
    WeatherForecastEntry
} from "@/business/weather/WeatherService";

export function generateCurrentWeatherOverview(): CurrentWeatherOverview {
    return {
        description: {
            text: "dummy description"
        }
    } as CurrentWeatherOverview;
}

export function generateHourlyForecast(): WeatherForecastEntry[] {
    return [{} as WeatherForecastEntry];
}
