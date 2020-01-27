"use strict";

import axios from "axios";
import {
    Address,
    GeocodingService
} from "@/business/geocoding/GeocodingService";
import { UserCoordinates } from "@/business/geolocation/GeolocationService";
import { Nullable } from "@/types/app";

export class AlgoliaGeocodingService implements GeocodingService {
    getAddress(coordinates: UserCoordinates): Promise<Nullable<Address>> {
        return axios
            .post(`https://places-dsn.algolia.net/1/places/query`, {
                query: "",
                aroundLatLng: `${coordinates.latitude},${coordinates.longitude}`,
                type: "city",
                hitsPerPage: 1,
                language: "fr"
            })
            .then(res => {
                return {
                    city: res.data.hits[0].city[0],
                    country: res.data.hits[0].country,
                    countryCode: "",
                    zipCode: ""
                };
            });
    }
}
