"use strict";

import {
    WeatherDailyForecast,
    WeatherDailyForecastsBuilder,
    WeatherServiceRequest
} from "@/business/weather/WeatherService";

export class FakeWeatherForecastsBuilder implements WeatherDailyForecastsBuilder {
    build(data: any[], params: WeatherServiceRequest): WeatherDailyForecast[] {
        return [];
    }
}
