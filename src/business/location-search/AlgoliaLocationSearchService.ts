"use strict";

import {
    Location,
    LocationBuilder,
    LocationSearchGeocodingRequest,
    LocationSearchService,
    LocationSearchServiceRequest
} from "@/business/location-search/LocationSearchService";
import { inject, singleton } from "tsyringe";
import { DIToken } from "@/core/dependency-injection/DIToken";
import { HttpClient } from "@/core/http/HttpClient";
import { Nullable } from "@/types/app";

export const ALGOLIA_API = "https://places-dsn.algolia.net/1/places";
export const ALGOLIA_SEARCH_API = `${ALGOLIA_API}/query`;
export const ALGOLIA_REVERSE_GEOCODING_API = `https://places-dsn.algolia.net/1/places/reverse`;
export const ALGOLIA_BASE_REQUEST = {
    type: "city",
    hitsPerPage: 10
};

@singleton()
export class AlgoliaLocationSearchService implements LocationSearchService {
    constructor(
        @inject(DIToken.HTTP_CLIENT) private httpClient: HttpClient,
        @inject(DIToken.CITY_BUILDER) private cityBuilder: LocationBuilder
    ) {}

    async getLocationByCoordinates({
        coordinates,
        language
    }: LocationSearchGeocodingRequest): Promise<Nullable<Location>> {
        const [res] = await this.httpClient.get<any>(ALGOLIA_REVERSE_GEOCODING_API, {
            hitsPerPage: 1,
            language: language,
            aroundLatLng: `${coordinates.latitude},${coordinates.longitude}`
        });

        if (!res) {
            return null;
        }

        return this.cityBuilder.build(res.hits[0]);
    }

    async getLocations(request: LocationSearchServiceRequest): Promise<Location[]> {
        if (!request.query) {
            return [];
        }

        const [response] = await this.httpClient.post<any>(ALGOLIA_SEARCH_API, {
            ...ALGOLIA_BASE_REQUEST,
            ...request
        });

        if (!response) {
            return [];
        }

        return response.hits
            .map((hit: any) => this.cityBuilder.build(hit))
            .filter(Boolean)
            .reduce((locations: Location[], location: Location) => {
                const isDoubled = !!locations.find(c => {
                    return c.name === location.name && c.countryCode === location.countryCode;
                });

                if (isDoubled) {
                    return locations;
                }

                return [...locations, location];
            }, []);
    }
}
