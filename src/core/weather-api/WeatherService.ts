"use strict";

import { Coordinates } from "@/core/geolocation/GeolocationService";
import { Nullable } from "@/types/app";

export interface CurrentWeather {
  temperatureInDegrees: number;
}

export interface WeatherService {
  getByCoordinates(coordinates: Coordinates): Promise<Nullable<CurrentWeather>>;
}
