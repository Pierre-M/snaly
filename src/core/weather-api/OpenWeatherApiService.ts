"use strict";

import axios from "axios";
import {
  CurrentWeather,
  WeatherService
} from "@/core/weather-api/WeatherService";
import { Coordinates } from "@/core/geolocation/GeolocationService";
import { Nullable } from "@/types/app";

export class OpenWeatherApiService implements WeatherService {
  getByCoordinates(
    coordinates: Coordinates
  ): Promise<Nullable<CurrentWeather>> {
    return axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=metric&APPID=ec02d5d2df7e4f5a7164cbf5e7580a73`
      )
      .then(res => {
        return {
          temperatureInDegrees: res.data.main.temp
        };
      });
  }
}
