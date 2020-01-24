"use strict";

import {
    CurrentWeather,
    WeatherService,
} from "@/business/weather-api/WeatherService";
import { Coordinates } from "@/business/geolocation/GeolocationService";
import { Nullable } from "@/types/app";
import { inject, injectable, singleton } from "tsyringe";
import { HttpClient } from "@/core/http/HttpClient";
import { DIToken } from "@/core/dependency-injection/DIToken";

@injectable()
@singleton()
export class OpenWeatherApiService implements WeatherService {
    constructor(@inject(DIToken.HTTP_CLIENT) private httpClient: HttpClient) {}

    async getByCoordinates(
        coordinates: Coordinates
    ): Promise<Nullable<CurrentWeather>> {
        const [res] = await this.httpClient.get<any>(
            `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=metric&APPID=ec02d5d2df7e4f5a7164cbf5e7580a73`
        );

        if (!res) {
            return null;
        }

        return {
            temperatureInDegrees: res.main.temp,
            description: res.weather[0].description,
        };
    }
}
