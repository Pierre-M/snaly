"use strict";

import { Nullable } from "@/types/app";
import {
    CurrentWeatherOverview,
    CurrentWeatherService,
    TemperatureUnit
} from "@/business/weather/WeatherService";
import { UserCoordinates } from "@/business/geolocation/GeolocationService";
import { OWACurrentWeatherBuilder } from "@/business/weather/OWACurrentWeatherBuilder";
import { inject, injectable } from "tsyringe";
import { DIToken } from "@/core/dependency-injection/DIToken";
import { HttpClient } from "@/core/http/HttpClient";

@injectable()
export class OWACurrentWeatherService implements CurrentWeatherService {
    private API_BASE_URL = "https://api.openweathermap.org/data/2.5";
    private API_KEY = "ec02d5d2df7e4f5a7164cbf5e7580a73";
    private API_URL = `${this.API_BASE_URL}/weather`;

    constructor(@inject(DIToken.HTTP_CLIENT) private httpClient: HttpClient) {}

    async getCurrentWeatherByCoordinates(
        coordinates: UserCoordinates
    ): Promise<Nullable<CurrentWeatherOverview>> {
        const [res] = await this.httpClient.get<any>(this.API_URL, {
            lat: coordinates.latitude,
            lon: coordinates.longitude,
            units: "metric",
            APPID: this.API_KEY
        });

        if (!res) {
            return null;
        }

        return OWACurrentWeatherBuilder(res, { unit: TemperatureUnit.CELSIUS });
    }
}
