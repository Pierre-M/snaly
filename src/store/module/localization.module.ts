"use strict";

import { GeolocationService, LocationCoordinates } from "@/business/geolocation/GeolocationService";
import { Nullable } from "@/types/app";
import { ActionContext, Module } from "vuex";
import { RootState } from "@/store/state";
import { container } from "tsyringe";
import { DIToken } from "@/core/dependency-injection/DIToken";
import { Location, LocationSearchService } from "@/business/location-search/LocationSearchService";
import { RoutingService } from "@/core/routing/RoutingService";

const geolocationService = container.resolve<GeolocationService>(DIToken.GEOLOCATION_SERVICE);
const citySearchService = container.resolve<LocationSearchService>(DIToken.CITY_SEARCH_SERVICE);
const routingService = container.resolve<RoutingService>(DIToken.ROUTING_SERVICE);

export interface LocalizationModuleState {
    geolocationHasBeenRequested: boolean;
    coordinates: Nullable<LocationCoordinates>;
    location: Nullable<Location>;
}

export enum LocalizationModuleAction {
    REQUEST_GEOLOCATION = "requestGeolocation",
    GET_COORDINATES = "getCoordinates",
    GET_LOCATION = "getLocation"
}

export const DEFAULT_COORDINATES: LocationCoordinates = {
    latitude: 48.8546,
    longitude: 2.3477
};

export enum LocalizationModuleMutation {
    UPDATE_GEOLOCATION_AUTH = "updateGeolocationAuthorization",
    UPDATE_COORDINATES = "updateCoordinates",
    UPDATE_LOCATION = "updateLocation"
}

export enum LocalizationModuleGetter {
    SHORTENED_LOCATION = "shortenedLocation"
}

export interface LocalizationModuleAddressRequest {
    coordinates: Nullable<LocationCoordinates>;
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
            coordinates: Nullable<LocationCoordinates>
        ) => {
            state.coordinates = coordinates;
            routingService.setUrlParams({ lat: coordinates?.latitude, lon: coordinates?.longitude });
        },
        [LocalizationModuleMutation.UPDATE_LOCATION]: (
            state: LocalizationModuleState,
            location: Nullable<Location>
        ) => {
            state.location = location;
        }
    },
    actions: {
        async init({ dispatch }: ActionContext<LocalizationModuleState, RootState>) {
            await dispatch(LocalizationModuleAction.GET_COORDINATES);
        },
        [LocalizationModuleAction.REQUEST_GEOLOCATION]: async (
            context: ActionContext<LocalizationModuleState, RootState>
        ) => {
            routingService.setUrlParams({ lat: null, lon: null });
            await context.commit(LocalizationModuleMutation.UPDATE_GEOLOCATION_AUTH, true);
            await context.dispatch(LocalizationModuleAction.GET_COORDINATES);
        },
        [LocalizationModuleAction.GET_COORDINATES]: async (
            context: ActionContext<LocalizationModuleState, RootState>
        ) => {
            const urlParameters = routingService.getUrlParams();

            if (urlParameters && urlParameters.lat && urlParameters.lon) {
                const coordinates: LocationCoordinates = { latitude: urlParameters.lat, longitude: urlParameters.lon };
                await context.commit(LocalizationModuleMutation.UPDATE_COORDINATES, coordinates);
                return;
            }
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

            const location = await citySearchService.getLocationByCoordinates({ coordinates, language });

            if (!location) {
                return;
            }

            context.commit(LocalizationModuleMutation.UPDATE_LOCATION, location);
        }
    },
    getters: {
        [LocalizationModuleGetter.SHORTENED_LOCATION]: (state: LocalizationModuleState): Nullable<string> => {
            if (!state.location) {
                return null;
            }

            return `${state.location.name}, ${state.location.countryCode.toLocaleUpperCase()}`;
        }
    }
};
