"use strict";

import { City } from "@/business/city-search/CitySearchService";
import { generateUserCoordinates } from "./UserCoordinatesGenerator";

export function generateCity(params?: Partial<City>): City {
    return {
        name: "Paris",
        countryCode: "fr",
        country: "France",
        coordinates: generateUserCoordinates(),
        zipCode: "75001",
        ...params
    };
}
