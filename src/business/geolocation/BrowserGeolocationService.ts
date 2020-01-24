"use strict";

import {
    GeolocationService,
    Coordinates,
} from "@/business/geolocation/GeolocationService";

export class BrowserGeolocationService implements GeolocationService {
    getCoordinates(): Promise<Coordinates> {
        return new Promise(resolve => {
            navigator.geolocation.getCurrentPosition((position: any) => {
                const coordinates: Coordinates = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };

                return resolve(coordinates);
            });
        });
    }
}
