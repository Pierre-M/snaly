"use strict";

import axios from "axios";
import { WeatherService } from "@/core/weather-api/WeatherService";
import { Coordinates } from "@/core/geolocation/GeolocationService";

export class OpenWeatherApiService implements WeatherService {
  getByCoordinates(coordinates: Coordinates): Promise<any> {
    return axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=metric&APPID=ec02d5d2df7e4f5a7164cbf5e7580a73`
      )
      .then(res => res.data);
  }
}
