"use strict";

import { CurrentWeatherOverview, WeatherDailyForecast } from "@/business/weather/WeatherService";
import { Nullable } from "@/types/app";

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

export function generateDailyForecasts(): WeatherDailyForecast[] {
    return [{} as WeatherDailyForecast];
}

export interface HourlyForecastGeneratorParams {
    date?: Date;
    temp?: number;
    minTemp?: number;
    maxTemp?: number;
    description?: string;
    incomplete?: boolean;
}

export function generateHourlyForecastData(params: HourlyForecastGeneratorParams = {}) {
    const dt = params.date ? Math.floor(params.date.getTime() / 1000) : 1553709600;
    const temp = typeof params.temp === "number" ? params.temp : 30;
    const temp_min = typeof params.minTemp === "number" ? params.minTemp : 30;
    const temp_max = typeof params.maxTemp === "number" ? params.maxTemp : 30;

    if (params.incomplete) return { dt };

    return {
        dt,
        main: {
            temp,
            temp_min,
            temp_max,
            pressure: 1007.942,
            sea_level: 1007.942,
            grnd_level: 994.369,
            humidity: 100,
            temp_kf: 0.16
        },
        weather: [
            {
                id: 800,
                main: "Clear",
                description: params.description || "clear sky",
                icon: "01n"
            }
        ],
        clouds: {
            all: 0
        },
        wind: {
            speed: 10.14,
            deg: 250.188
        },
        sys: {
            pod: "n"
        },
        dt_txt: "2019-03-27 18:00:00"
    };
}

export function generateOWAWeatherOverviewData(params: { sunrise?: Nullable<number>; incomplete?: boolean } = {}) {
    if (params.incomplete) return {};

    const sunrise = params.sunrise || params.sunrise === null ? params.sunrise : 1582095184;

    return {
        coord: { lon: 2.35, lat: 48.85 },
        weather: [{ id: 803, main: "Clouds", description: "broken clouds", icon: "04d" }],
        base: "stations",
        main: { temp: 5.45, feels_like: 1.69, temp_min: 4.44, temp_max: 6.11, pressure: 1025, humidity: 93 },
        visibility: 10000,
        wind: { speed: 3.6, deg: 250 },
        clouds: { all: 75 },
        dt: 1582101910,
        sys: { type: 1, id: 6550, country: "FR", sunrise, sunset: 1582132574 },
        timezone: 3600,
        id: 2988507,
        name: "Paris",
        cod: 200
    };
}
