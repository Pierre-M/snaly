"use strict";

import { Nullable } from "@/types/app";
import {
    CurrentWeatherOverview,
    TemperatureUnit,
    WeatherDailyForecast,
    WeatherService
} from "@/business/weather/WeatherService";
import { UserCoordinates } from "@/business/geolocation/GeolocationService";
import { OWACurrentWeatherOverviewBuilder } from "@/business/weather/OWAWeatherOverviewBuilder";
import { inject, injectable } from "tsyringe";
import { DIToken } from "@/core/dependency-injection/DIToken";
import { HttpClient } from "@/core/http/HttpClient";
import { owaDailyForecastsBuilder } from "@/business/weather/OWADailyForecastsBuilder";

@injectable()
export class OWAWeatherService implements WeatherService {
    private API_BASE_URL = "https://api.openweathermap.org/data/2.5";
    private API_KEY = "ec02d5d2df7e4f5a7164cbf5e7580a73";

    private CURRENT_WEATHER_API_URL = `${this.API_BASE_URL}/weather`;
    private FORECAST_API_URL = `${this.API_BASE_URL}/forecast`;
    private BASE_API_PARAMS = {
        units: "metric",
        APPID: this.API_KEY
    };

    constructor(@inject(DIToken.HTTP_CLIENT) private httpClient: HttpClient) {}

    async getCurrentWeatherByCoordinates(coordinates: UserCoordinates): Promise<Nullable<CurrentWeatherOverview>> {
        const [res] = await this.httpClient.get<any>(this.CURRENT_WEATHER_API_URL, {
            lat: coordinates.latitude,
            lon: coordinates.longitude,
            ...this.BASE_API_PARAMS
        });

        if (!res) {
            return null;
        }

        return OWACurrentWeatherOverviewBuilder(res, {
            unit: TemperatureUnit.CELSIUS
        });
    }

    async getDailyForecastsByCoordinates(coordinates: UserCoordinates): Promise<Nullable<WeatherDailyForecast[]>> {
        const [res] = await this.httpClient.get<any>(this.FORECAST_API_URL, {
            lat: coordinates.latitude,
            lon: coordinates.longitude,
            ...this.BASE_API_PARAMS
        });

        if (!res) {
            return null;
        }

        return owaDailyForecastsBuilder.build(res.list, { unit: TemperatureUnit.CELSIUS });
    }
}
