"use strict";

import { LocationCoordinates } from "@/business/geolocation/GeolocationService";

export function generateCoordinates(): LocationCoordinates {
    return {
        latitude: Math.random() * 180 - 90,
        longitude: Math.random() * 360 - 180
    };
}
