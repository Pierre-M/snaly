"use strict";

import { GeolocationService, UserCoordinates } from "@/business/geolocation/GeolocationService";

export class BrowserGeolocationService implements GeolocationService {
    getCoordinates(): Promise<UserCoordinates> {
        //TODO resolve issue of geolocation authorization on safari

        // return new Promise(resolve => {
        //     navigator.geolocation.getCurrentPosition((position: any) => {
        //         const coordinates: Coordinates = {
        //             latitude: position.coords.latitude,
        //             longitude: position.coords.longitude,
        //         };
        //
        //         return resolve(coordinates);
        //     });
        // });

        return Promise.resolve({ latitude: 48.864716, longitude: 2.349014 });
    }
}
