"use strict";

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface GeolocationService {
  getCoordinates(): Promise<Coordinates>;
}
