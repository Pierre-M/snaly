"use strict";

import { Coordinates } from "@/business/geolocation/GeolocationService";
import { Nullable } from "@/types/app";

export interface CurrentWeather {
    temperatureInDegrees: number;
    description: string;
}

export interface WeatherService {
    getByCoordinates(
        coordinates: Coordinates
    ): Promise<Nullable<CurrentWeather>>;
}
