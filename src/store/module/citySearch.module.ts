"use strict";

import { City, CitySearchService } from "@/business/city-search/CitySearchService";
import { ActionContext, Module } from "vuex";
import { RootState } from "@/store/state";
import { container } from "tsyringe";
import { DIToken } from "@/core/dependency-injection/DIToken";
import { AppState } from "@/store/store";

const citySearchService = container.resolve<CitySearchService>(DIToken.CITY_SEARCH_SERVICE);

export interface CitySearchModuleState {
    loading: boolean;
    results: City[];
}

export enum CitySearchModuleAction {
    GET_CITIES = "getCities",
    RESET_CITIES = "resetCities"
}

export enum CitySearchModuleMutation {
    UPDATE_RESULTS = "UpdateCityResults",
    UPDATE_LOADING_STATE = "UpdateCitySearchLoadingState"
}

export interface CitySearchModuleRequest {
    query: string;
}

export const citySearchModule: Module<CitySearchModuleState, RootState> = {
    state: {
        loading: false,
        results: []
    },
    mutations: {
        [CitySearchModuleMutation.UPDATE_RESULTS]: (state: CitySearchModuleState, results: City[]) => {
            state.results = results;
        },
        [CitySearchModuleMutation.UPDATE_LOADING_STATE]: (state: CitySearchModuleState, isLoading: boolean) => {
            state.loading = isLoading;
        }
    },
    actions: {
        [CitySearchModuleAction.GET_CITIES]: async (
            { commit, rootState }: ActionContext<CitySearchModuleState, RootState>,
            request: CitySearchModuleRequest
        ) => {
            commit(CitySearchModuleMutation.UPDATE_LOADING_STATE, true);
            const results = await citySearchService.getCities({
                query: request.query,
                language: (rootState as AppState).userPreferencesModule.local
            });

            commit(CitySearchModuleMutation.UPDATE_RESULTS, results);
            commit(CitySearchModuleMutation.UPDATE_LOADING_STATE, false);
        },
        [CitySearchModuleAction.RESET_CITIES]: ({ commit }: ActionContext<CitySearchModuleState, RootState>) => {
            commit(CitySearchModuleMutation.UPDATE_RESULTS, []);
        }
    }
};
