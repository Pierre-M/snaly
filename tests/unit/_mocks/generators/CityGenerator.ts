"use strict";

import { City } from "@/business/city-search/CitySearchService";

export function generateCity(): City {
    return {
        name: "Paris",
        countryCode: "fr",
        country: "France",
        coordinates: {
            latitude: 48,
            longitude: 2
        },
        zipCode: "75001"
    };
}
