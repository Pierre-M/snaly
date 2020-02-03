"use strict";

import { GeolocationService, UserCoordinates } from "@/business/geolocation/GeolocationService";
import { Nullable } from "@/types/app";
import { ActionContext, Module } from "vuex";
import { RootState } from "@/store/state";
import { container } from "tsyringe";
import { DIToken } from "@/core/dependency-injection/DIToken";
import { GeocodingService, UserLocation } from "@/business/geocoding/GeocodingService";

const geolocationService = container.resolve<GeolocationService>(DIToken.GEOLOCATION_SERVICE);
const geocodingService = container.resolve<GeocodingService>(DIToken.GEOCODING_SERVICE);

export interface LocalizationModuleState {
    coordinates: Nullable<UserCoordinates>;
    location: Nullable<UserLocation>;
}

export enum LocalizationModuleAction {
    GET_COORDINATES = "getCoordinates",
    GET_LOCATION = "getLocation"
}

export enum LocalizationModuleMutation {
    UPDATE_COORDINATES = "updateCoordinates",
    UPDATE_LOCATION = "updateLocation"
}

export const localizationModule: Module<LocalizationModuleState, RootState> = {
    state: {
        coordinates: null,
        location: null
    },
    mutations: {
        [LocalizationModuleMutation.UPDATE_COORDINATES]: (
            state: LocalizationModuleState,
            coordinates: Nullable<UserCoordinates>
        ) => {
            state.coordinates = coordinates;
        },
        [LocalizationModuleMutation.UPDATE_LOCATION]: (
            state: LocalizationModuleState,
            location: Nullable<UserLocation>
        ) => {
            state.location = location;
        }
    },
    actions: {
        [LocalizationModuleAction.GET_COORDINATES]: async (
            context: ActionContext<LocalizationModuleState, RootState>
        ) => {
            const coordinates = await geolocationService.getCoordinates();
            context.commit(LocalizationModuleMutation.UPDATE_COORDINATES, coordinates);
        },
        [LocalizationModuleAction.GET_LOCATION]: async (
            context: ActionContext<LocalizationModuleState, RootState>,
            coordinates: Nullable<UserCoordinates>
        ) => {
            if (!coordinates) {
                return;
            }

            const location = await geocodingService.getAddress(coordinates);
            context.commit(LocalizationModuleMutation.UPDATE_LOCATION, location);
        }
    }
};
