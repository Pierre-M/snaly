"use strict";

import {
    CurrentWeatherOverview,
    WeatherDailyForecast,
    WeatherForecastEntry,
    WeatherService
} from "@/business/weather/WeatherService";
import { Nullable } from "@/types/app";

export class FakeWeatherService implements WeatherService {
    set dailyForecastsValue(value: WeatherDailyForecast[] | null) {
        this._dailyForecastsValue = value;
    }
    set hourlyForecastValue(value: WeatherForecastEntry[] | null) {
        this._hourlyForecastValue = value;
    }
    set currentOverviewValue(value: CurrentWeatherOverview | null) {
        this._currentOverviewValue = value;
    }
    private _currentOverviewValue: Nullable<CurrentWeatherOverview> = null;
    private _hourlyForecastValue: Nullable<WeatherForecastEntry[]> = null;
    private _dailyForecastsValue: Nullable<WeatherDailyForecast[]> = null;

    getCurrentWeather = jest.fn(
        (): Promise<Nullable<CurrentWeatherOverview>> => {
            return Promise.resolve(this._currentOverviewValue);
        }
    );

    getHourlyForecastByCoordinates = jest.fn(
        (): Promise<Nullable<WeatherForecastEntry[]>> => {
            return Promise.resolve(this._hourlyForecastValue);
        }
    );

    getDailyForecasts = jest.fn(
        (): Promise<Nullable<WeatherDailyForecast[]>> => {
            return Promise.resolve(this._dailyForecastsValue);
        }
    );
}
