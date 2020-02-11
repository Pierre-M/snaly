"use strict";

import { GeocodingService, UserLocation } from "@/business/geocoding/GeocodingService";
import { UserCoordinates } from "@/business/geolocation/GeolocationService";
import { Nullable } from "@/types/app";
import { inject, injectable, singleton } from "tsyringe";
import { DIToken } from "@/core/dependency-injection/DIToken";
import { HttpClient } from "@/core/http/HttpClient";

export const ALGOLIA_PLACES_API: string = "https://places-dsn.algolia.net/1/places/query";

export const ALGOLIA_PLACES_API_BASE_PARAMS = {
    query: "",
    type: "city",
    hitsPerPage: 1,
    language: "fr"
};

@injectable()
@singleton()
export class AlgoliaGeocodingService implements GeocodingService {
    constructor(@inject(DIToken.HTTP_CLIENT) private httpClient: HttpClient) {}

    async getAddress(coordinates: UserCoordinates): Promise<Nullable<UserLocation>> {
        const [res] = await this.httpClient.post<any>(ALGOLIA_PLACES_API, {
            ...ALGOLIA_PLACES_API_BASE_PARAMS,
            aroundLatLng: `${coordinates.latitude},${coordinates.longitude}`
        });

        if (!res) {
            return null;
        }

        return AlgoliaGeocodingService.addressFormatter(res);
    }

    private static addressFormatter(data: any): Nullable<UserLocation> {
        const entry = data.hits[0];

        return {
            city: entry?.city[0] || entry?.locale_names[0],
            country: entry.country,
            countryCode: entry.country_code,
            zipCode: entry.postcode[0]
        };
    }
}
