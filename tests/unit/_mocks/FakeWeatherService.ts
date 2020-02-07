"use strict";

import {
    WeatherService,
    CurrentWeatherOverview,
    WeatherForecastEntry,
    WeatherDailyForecast
} from "@/business/weather/WeatherService";
import { UserCoordinates } from "@/business/geolocation/GeolocationService";
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

    getCurrentWeatherByCoordinates = jest.fn(
        (coordinates: UserCoordinates): Promise<Nullable<CurrentWeatherOverview>> => {
            return Promise.resolve(this._currentOverviewValue);
        }
    );

    getHourlyForecastByCoordinates = jest.fn(
        (coordinates: UserCoordinates): Promise<Nullable<WeatherForecastEntry[]>> => {
            return Promise.resolve(this._hourlyForecastValue);
        }
    );

    getDailyForecastsByCoordinates = jest.fn(
        (coordinates: UserCoordinates): Promise<Nullable<WeatherDailyForecast[]>> => {
            return Promise.resolve(this._dailyForecastsValue);
        }
    );
}
