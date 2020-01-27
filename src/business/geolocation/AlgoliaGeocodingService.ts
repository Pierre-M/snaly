"use strict";

import axios from "axios";
import { GeocodingService } from "@/business/geolocation/GeocodingService";
import { Coordinates } from "@/business/geolocation/GeolocationService";

export class AlgoliaGeocodingService implements GeocodingService {
    getAddress(coordinates: Coordinates): Promise<any> {
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
                    country: res.data.hits[0].country
                };
            });
    }
}
