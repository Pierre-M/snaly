"use strict";

export interface UserCoordinates {
    latitude: number;
    longitude: number;
}

export interface GeolocationService {
    getCoordinates(): Promise<UserCoordinates>;
}
