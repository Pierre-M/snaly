"use strict";

import { GeolocationService, UserCoordinates } from "@/business/geolocation/GeolocationService";
import { Nullable } from "@/types/app";
import { ActionContext, Module } from "vuex";
import { RootState } from "@/store/state";
import { container } from "tsyringe";
import { DIToken } from "@/core/dependency-injection/DIToken";
import { City, CitySearchService } from "@/business/city-search/CitySearchService";

const geolocationService = container.resolve<GeolocationService>(DIToken.GEOLOCATION_SERVICE);
const citySearchService = container.resolve<CitySearchService>(DIToken.CITY_SEARCH_SERVICE);

export interface LocalizationModuleState {
    geolocationHasBeenRequested: boolean;
    coordinates: Nullable<UserCoordinates>;
    location: Nullable<City>;
}

export enum LocalizationModuleAction {
    REQUEST_GEOLOCATION = "requestGeolocation",
    GET_COORDINATES = "getCoordinates",
    GET_LOCATION = "getLocation"
}

export const DEFAULT_COORDINATES: UserCoordinates = {
    latitude: 48.8546,
    longitude: 2.3477
};

export enum LocalizationModuleMutation {
    UPDATE_GEOLOCATION_AUTH = "updateGeolocationAuthorization",
    UPDATE_COORDINATES = "updateCoordinates",
    UPDATE_LOCATION = "updateLocation"
}

export interface LocalizationModuleAddressRequest {
    coordinates: Nullable<UserCoordinates>;
    language: string;
}

export const localizationModule: Module<LocalizationModuleState, RootState> = {
    state: {
        geolocationHasBeenRequested: false,
        coordinates: null,
        location: null
    },
    mutations: {
        [LocalizationModuleMutation.UPDATE_GEOLOCATION_AUTH]: (state: LocalizationModuleState, auth: boolean) => {
            state.geolocationHasBeenRequested = auth;
        },
        [LocalizationModuleMutation.UPDATE_COORDINATES]: (
            state: LocalizationModuleState,
            coordinates: Nullable<UserCoordinates>
        ) => {
            state.coordinates = coordinates;
        },
        [LocalizationModuleMutation.UPDATE_LOCATION]: (state: LocalizationModuleState, location: Nullable<City>) => {
            state.location = location;
        }
    },
    actions: {
        [LocalizationModuleAction.REQUEST_GEOLOCATION]: async (
            context: ActionContext<LocalizationModuleState, RootState>
        ) => {
            await context.commit(LocalizationModuleMutation.UPDATE_GEOLOCATION_AUTH, true);
            await context.dispatch(LocalizationModuleAction.GET_COORDINATES);
        },
        [LocalizationModuleAction.GET_COORDINATES]: async (
            context: ActionContext<LocalizationModuleState, RootState>
        ) => {
            if (!context.state.geolocationHasBeenRequested) {
                await context.commit(LocalizationModuleMutation.UPDATE_COORDINATES, DEFAULT_COORDINATES);
                return;
            }

            const coordinates = await geolocationService.getCoordinates();

            if (!coordinates && !context.state.coordinates) {
                await context.commit(LocalizationModuleMutation.UPDATE_COORDINATES, DEFAULT_COORDINATES);
                return;
            }

            if (!coordinates) {
                return;
            }

            await context.commit(LocalizationModuleMutation.UPDATE_COORDINATES, coordinates);
        },
        [LocalizationModuleAction.GET_LOCATION]: async (
            context: ActionContext<LocalizationModuleState, RootState>,
            { coordinates, language }: LocalizationModuleAddressRequest
        ) => {
            if (!coordinates) {
                return;
            }

            const location = await citySearchService.getCityByCoordinates({ coordinates, language });

            if (!location) {
                return;
            }

            context.commit(LocalizationModuleMutation.UPDATE_LOCATION, location);
        }
    },
    getters: {
        shortenedLocation(state: LocalizationModuleState): Nullable<string> {
            if (!state.location) {
                return null;
            }

            return `${state.location.name}, ${state.location.countryCode.toLocaleUpperCase()}`;
        }
    }
};
