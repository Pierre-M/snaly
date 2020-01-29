"use strict";

import { GeolocationService, UserCoordinates } from "@/business/geolocation/GeolocationService";
import { Nullable } from "@/types/app";
import { ActionContext, Module } from "vuex";
import { RootState } from "@/store/state";
import { container } from "tsyringe";
import { DIToken } from "@/core/dependency-injection/DIToken";

const geolocationService = container.resolve<GeolocationService>(DIToken.GEOLOCATION_SERVICE);

export interface CoordinatesModuleState {
    coordinates: Nullable<UserCoordinates>;
}

export enum CoordinatesModuleAction {
    GET_COORDINATES = "getCoordinates"
}

export const coordinatesModule: Module<CoordinatesModuleState, RootState> = {
    state: {
        coordinates: null
    },
    mutations: {
        updateCoordinates(state: CoordinatesModuleState, coordinates: Nullable<UserCoordinates>) {
            state.coordinates = coordinates;
        }
    },
    actions: {
        [CoordinatesModuleAction.GET_COORDINATES]: async (
            context: ActionContext<CoordinatesModuleState, RootState>
        ) => {
            const coordinates = await geolocationService.getCoordinates();
            context.commit("updateCoordinates", coordinates);
        }
    }
};
