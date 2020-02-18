"use strict";

import { Location } from "@/business/location-search/LocationSearchService";

export interface AlgoliaGeneratorParams {
    incomplete?: boolean;
    city?: Partial<Location>;
}

export function generateAlgoliaCityResultData({ incomplete, city }: AlgoliaGeneratorParams = {}) {
    if (incomplete) {
        return {};
    }

    return {
        country: city?.country || "France",
        is_country: false,
        city: [city?.name || "Paris"],
        is_highway: false,
        importance: 15,
        _tags: ["capital", "boundary/administrative", "city", "place/city", "country/fr", "source/pristine"],
        postcode: [city?.zipCode || "75001"],
        county: [city?.name || "Paris"],
        population: 2220445,
        country_code: city?.countryCode || "fr",
        is_city: true,
        is_popular: true,
        administrative: ["Île-de-France"],
        admin_level: 2,
        district: "Paris",
        is_suburb: false,
        locale_names: [city?.name || "Paris"],
        _geoloc: {
            lat: city?.coordinates?.latitude || 48,
            lng: city?.coordinates?.longitude || 2
        }
    };
}

export function generateAlgoliaResults(params?: { count?: number; incomplete?: boolean }) {
    return {
        hits: [...Array(params?.count || 5).keys()].map(() =>
            generateAlgoliaCityResultData({ incomplete: params?.incomplete })
        )
    };
}
