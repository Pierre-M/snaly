"use strict";

import { CurrentWeatherOverview, WeatherForecastEntry } from "@/business/weather/WeatherService";

export function generateCurrentWeatherOverview(): CurrentWeatherOverview {
    return ({
        temperatureOverview: {
            current: "14"
        },
        description: {
            text: "dummy description"
        }
    } as unknown) as CurrentWeatherOverview;
}

export function generateHourlyForecast(): WeatherForecastEntry[] {
    return [{} as WeatherForecastEntry];
}
