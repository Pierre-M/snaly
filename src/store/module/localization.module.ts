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
    geolocationIsAllowed: boolean;
    coordinates: Nullable<UserCoordinates>;
    location: Nullable<UserLocation>;
}

export enum LocalizationModuleAction {
    GET_COORDINATES = "getCoordinates",
    GET_LOCATION = "getLocation"
}

export const DEFAULT_COORDINATES: UserCoordinates = {
    latitude: 48.864716,
    longitude: 2.349014
};

export enum LocalizationModuleMutation {
    UPDATE_GEOLOCATION_AUTH = "updateGeolocationAuthorization",
    UPDATE_COORDINATES = "updateCoordinates",
    UPDATE_LOCATION = "updateLocation"
}

export const localizationModule: Module<LocalizationModuleState, RootState> = {
    state: {
        geolocationIsAllowed: false,
        coordinates: null,
        location: null
    },
    mutations: {
        [LocalizationModuleMutation.UPDATE_GEOLOCATION_AUTH]: (state: LocalizationModuleState, auth: boolean) => {
            state.geolocationIsAllowed = auth;
        },
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
            if (!context.state.geolocationIsAllowed) {
                await context.commit(LocalizationModuleMutation.UPDATE_COORDINATES, DEFAULT_COORDINATES);
                return;
            }

            const coordinates = await geolocationService.getCoordinates();
            await context.commit(LocalizationModuleMutation.UPDATE_COORDINATES, coordinates);
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
    },
    getters: {
        shortenedLocation(state: LocalizationModuleState): Nullable<string> {
            if (!state.location) {
                return null;
            }

            return `${state.location.city}, ${state.location.countryCode.toLocaleUpperCase()}`;
        }
    }
};
