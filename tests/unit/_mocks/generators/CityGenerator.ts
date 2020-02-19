"use strict";

import { Location } from "@/business/location-search/LocationSearchService";
import { generateCoordinates } from "./UserCoordinatesGenerator";

export function generateCity(params?: Partial<Location>): Location {
    return {
        name: "Paris",
        countryCode: "fr",
        country: "France",
        coordinates: generateCoordinates(),
        zipCode: "75001",
        ...params
    };
}
