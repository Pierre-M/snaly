"use strict";

import { UserCoordinates } from "@/business/geolocation/GeolocationService";

export function generateUserCoordinates(): UserCoordinates {
    return {
        latitude: Math.random() * 180 - 90,
        longitude: Math.random() * 360 - 180
    };
}
