"use strict";

import { WeatherDailyForecast, WeatherDailyForecastsBuilder } from "@/business/weather/WeatherService";

export class FakeWeatherForecastsBuilder implements WeatherDailyForecastsBuilder {
    returnedValue: WeatherDailyForecast[] = [];
    build = jest.fn(() => this.returnedValue);
}
