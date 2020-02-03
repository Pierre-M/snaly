"use strict";

import { GeolocationService, UserCoordinates } from "@/business/geolocation/GeolocationService";
import { Nullable } from "@/types/app";
import { ActionContext, Module } from "vuex";
import { RootState } from "@/store/state";
import { container } from "tsyringe";
import { DIToken } from "@/core/dependency-injection/DIToken";

const geolocationService = container.resolve<GeolocationService>(DIToken.GEOLOCATION_SERVICE);

export interface LocalizationModuleState {
    coordinates: Nullable<UserCoordinates>;
}

export enum LocalizationModuleAction {
    GET_COORDINATES = "getCoordinates"
}

export enum LocalizationModuleMutation {
    UPDATE_COORDINATES = "updateCoordinates"
}

export const localizationModule: Module<LocalizationModuleState, RootState> = {
    state: {
        coordinates: null
    },
    mutations: {
        [LocalizationModuleMutation.UPDATE_COORDINATES]: (
            state: LocalizationModuleState,
            coordinates: Nullable<UserCoordinates>
        ) => {
            state.coordinates = coordinates;
        }
    },
    actions: {
        [LocalizationModuleAction.GET_COORDINATES]: async (
            context: ActionContext<LocalizationModuleState, RootState>
        ) => {
            const coordinates = await geolocationService.getCoordinates();
            context.commit(LocalizationModuleMutation.UPDATE_COORDINATES, coordinates);
        }
    }
};
