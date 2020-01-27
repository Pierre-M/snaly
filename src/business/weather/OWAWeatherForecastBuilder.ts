"use strict";

import {
    OWACurrentWeatherBuilderParams,
    OWAWeatherOverviewBuilder
} from "@/business/weather/OWAWeatherOverviewBuilder";
import { WeatherForecastEntry } from "@/business/weather/WeatherService";

export function OWAWeatherForecastBuilder(
    data: any,
    params: OWACurrentWeatherBuilderParams
): WeatherForecastEntry {
    return {
        overview: OWAWeatherOverviewBuilder(data, params),
        date: new Date(data.dt * 1000)
    };
}
