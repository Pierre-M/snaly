"use strict";

import { Nullable } from "@/types/app";

export interface UserCoordinates {
    latitude: number;
    longitude: number;
}

export interface GeolocationService {
    getCoordinates(): Promise<Nullable<UserCoordinates>>;
}
