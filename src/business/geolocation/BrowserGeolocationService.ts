"use strict";

import { GeolocationService, LocationCoordinates } from "@/business/geolocation/GeolocationService";
import { Nullable } from "@/types/app";

export class BrowserGeolocationService implements GeolocationService {
    getCoordinates(): Promise<Nullable<LocationCoordinates>> {
        return new Promise(resolve => {
            navigator.geolocation.getCurrentPosition(
                (position: Position) => {
                    const coordinates: LocationCoordinates = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    };

                    return resolve(coordinates);
                },
                () => {
                    return resolve(null);
                }
            );
        });
    }
}
