"use strict";

import { CurrentWeatherOverview, WeatherDailyForecast } from "@/business/weather/WeatherService";

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
}

export function generateHourlyForecastData(params: HourlyForecastGeneratorParams = {}) {
    const dt = params.date ? Math.floor(params.date.getTime() / 1000) : 1553709600;
    const temp = typeof params.temp === "number" ? params.temp : 30;
    const temp_min = typeof params.minTemp === "number" ? params.minTemp : 30;
    const temp_max = typeof params.maxTemp === "number" ? params.maxTemp : 30;

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
