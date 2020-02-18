"use strict";

import { Location, LocationBuilder } from "@/business/location-search/LocationSearchService";
import { Nullable } from "@/types/app";
import { inject, injectable, singleton } from "tsyringe";
import { DIToken } from "@/core/dependency-injection/DIToken";
import { AlertingService } from "@/core/alerting/AlertingService";

@injectable()
@singleton()
export class AlgoliaLocationBuilder implements LocationBuilder {
    constructor(@inject(DIToken.ALERTING_SERVICE) private alertingService: AlertingService) {}

    build(data: any): Nullable<Location> {
        try {
            return {
                name: data.city ? data.city[0] : data.locale_names[0],
                country: data.country,
                countryCode: data.country_code,
                zipCode: data.postcode ? data.postcode[0] : "",
                coordinates: {
                    latitude: data._geoloc.lat,
                    longitude: data._geoloc.lng
                }
            };
        } catch (err) {
            this.alertingService.logError(err);
            return null;
        }
    }
}