"use strict";

import { GeolocationService, UserCoordinates } from "@/business/geolocation/GeolocationService";
import { Nullable } from "@/types/app";

export class BrowserGeolocationService implements GeolocationService {
    getCoordinates(): Promise<Nullable<UserCoordinates>> {
        return new Promise(resolve => {
            navigator.geolocation.getCurrentPosition(
                (position: Position) => {
                    const coordinates: UserCoordinates = {
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
