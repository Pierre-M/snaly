"use strict";

import { CurrentWeatherOverview } from "@/business/weather/WeatherService";

export function generateCurrentWeatherOverview(): CurrentWeatherOverview {
    return {
        description: {
            text: "dummy description"
        }
    } as CurrentWeatherOverview;
}
