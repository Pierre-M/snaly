"use strict";

import { WeatherBuilderParams, WeatherOverview, WeatherOverviewBuilder } from "@/business/weather/WeatherService";
import { weatherIconService } from "@/business/weather/WeatherIconService";
import { Nullable } from "@/types/app";
import { injectable, singleton } from "tsyringe";

@injectable()
@singleton()
export class OWAWeatherOverviewBuilder implements WeatherOverviewBuilder {
    build(data: any, params: WeatherBuilderParams): Nullable<WeatherOverview> {
        let result: WeatherOverview = {
            temperatureOverview: {
                current: data.main.temp,
                min: data.main.temp_min,
                max: data.main.temp_max,
                felt: data.main.feels_like,
                unit: params.unit
            },
            description: {
                text: data.weather[0].main,
                icon: weatherIconService.getByWeatherIcon(data.weather[0].icon)
            }
        };

        if (data.sys && data.sys.sunrise) {
            result.suncycle = {
                sunrise: new Date(data.sys.sunrise * 1000),
                sunset: new Date(data.sys.sunset * 1000)
            };
        }

        return result;
    }
}
