"use strict";

import { UserLocation } from "@/business/geocoding/GeocodingService";

export function generateAlgoliaPlacesAPIResponse(opt?: Partial<UserLocation>) {
    return {
        hits: [
            {
                country: opt?.country || "France",
                is_country: false,
                city: [opt?.city || "Paris"],
                is_highway: false,
                importance: 15,
                _tags: ["capital", "boundary/administrative", "city", "place/city", "country/fr", "source/pristine"],
                postcode: [opt?.zipCode || "75001"],
                county: [opt?.city || "Paris"],
                population: 2220445,
                country_code: opt?.countryCode || "fr",
                is_city: true,
                is_popular: true,
                administrative: ["Île-de-France"],
                admin_level: 2,
                district: opt?.city || "Paris",
                is_suburb: true,
                locale_names: ["Paris 1er Arrondissement"],
                _geoloc: {
                    lat: 48.86,
                    lng: 2.3413
                },
                objectID: "80ccb42e3559d3697eaad406753fc145",
                _highlightResult: {}
            }
        ],
        nbHits: 1,
        processingTimeMS: 53,
        query: "",
        params: "aroundLatLng=48.864716,2.349014&type=city&language=fr&hitsPerPage=1",
        degradedQuery: false
    };
}

export function generateUserLocation(opt?: Partial<UserLocation>): UserLocation {
    return {
        city: "Paris",
        countryCode: "fr",
        country: "France",
        zipCode: "75001",
        ...opt
    };
}
