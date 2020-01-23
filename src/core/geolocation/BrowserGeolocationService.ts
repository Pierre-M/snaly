"use strict";

import {
  GeolocationService,
  Coordinates
} from "@/core/geolocation/GeolocationService";

export class BrowserGeolocationService implements GeolocationService {
  getCoordinates(): Promise<Coordinates> {
    return new Promise(resolve => {
      navigator.geolocation.getCurrentPosition((position: any) => {
        return resolve(position.coords);
      });
    });
  }
}
