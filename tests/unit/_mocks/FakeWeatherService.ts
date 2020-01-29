"use strict";

import { WeatherService, CurrentWeatherOverview, WeatherForecastEntry } from "@/business/weather/WeatherService";
import { UserCoordinates } from "@/business/geolocation/GeolocationService";
import { Nullable } from "@/types/app";

export class FakeWeatherService implements WeatherService {
    set hourlyForecastValue(value: WeatherForecastEntry[] | null) {
        this._hourlyForecastValue = value;
    }
    set currentOverviewValue(value: CurrentWeatherOverview | null) {
        this._currentOverviewValue = value;
    }
    private _currentOverviewValue: Nullable<CurrentWeatherOverview> = null;
    private _hourlyForecastValue: Nullable<WeatherForecastEntry[]> = null;

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
}
