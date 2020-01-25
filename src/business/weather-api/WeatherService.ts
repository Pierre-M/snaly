"use strict";

import { Coordinates } from "@/business/geolocation/GeolocationService";
import { Nullable } from "@/types/app";

export type WeatherDescription = string;
export type WeatherIcon = string;

export interface CurrentWeather {
    temperatureInDegrees: number;
    description: WeatherDescription;
    icon: WeatherIcon;
}

export interface WeatherService {
    getByCoordinates(
        coordinates: Coordinates
    ): Promise<Nullable<CurrentWeather>>;
}
