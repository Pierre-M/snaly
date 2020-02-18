"use strict";

import { Nullable } from "@/types/app";

export interface LocationCoordinates {
    latitude: number;
    longitude: number;
}

export interface GeolocationService {
    getCoordinates(): Promise<Nullable<LocationCoordinates>>;
}
