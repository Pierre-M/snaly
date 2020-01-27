"use strict";

import {
    CurrentWeatherOverview,
    TemperatureUnit,
    WeatherOverview
} from "@/business/weather/WeatherService";
import { weatherIconService } from "@/business/weather/WeatherIconService";

export interface OWACurrentWeatherBuilderParams {
    unit: TemperatureUnit;
}

export function OWAWeatherOverviewBuilder(
    data: any,
    params: OWACurrentWeatherBuilderParams
): WeatherOverview {
    return {
        temperatureOverview: {
            current: Math.round(data.main.temp),
            min: Math.round(data.main.temp_min),
            max: Math.round(data.main.temp_max),
            felt: Math.round(data.main.feels_like),
            unit: params.unit
        },
        description: {
            text: data.weather[0].main,
            icon: weatherIconService.getByWeatherIcon(data.weather[0].icon)
        }
    };
}

export function OWACurrentWeatherOverviewBuilder(
    data: any,
    params: OWACurrentWeatherBuilderParams
): CurrentWeatherOverview {
    return {
        ...OWAWeatherOverviewBuilder(data, params),
        suncycle: {
            sunrise: new Date(data.sys.sunrise * 1000),
            sunset: new Date(data.sys.sunset * 1000)
        }
    };
}
