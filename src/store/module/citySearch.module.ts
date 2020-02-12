"use strict";

import { City, CitySearchService } from "@/business/city-search/CitySearchService";
import { ActionContext, Module } from "vuex";
import { RootState } from "@/store/state";
import { container } from "tsyringe";
import { DIToken } from "@/core/dependency-injection/DIToken";

const citySearchService = container.resolve<CitySearchService>(DIToken.CITY_SEARCH_SERVICE);

export interface CitySearchModuleState {
    results: City[];
}

export enum CitySearchModuleAction {
    GET_CITIES = "getCities"
}

export enum CitySearchModuleMutation {
    UPDATE_RESULTS = "UpdateCityResults"
}

export interface CitySearchModuleRequest {
    language: string;
    query: string;
}

export const citySearchModule: Module<CitySearchModuleState, RootState> = {
    state: {
        results: []
    },
    mutations: {
        [CitySearchModuleMutation.UPDATE_RESULTS]: (state: CitySearchModuleState, results: City[]) => {
            state.results = results;
        }
    },
    actions: {
        [CitySearchModuleAction.GET_CITIES]: async (
            { commit }: ActionContext<CitySearchModuleState, RootState>,
            request: CitySearchModuleRequest
        ) => {
            const results = await citySearchService.getCities(request);
            commit(CitySearchModuleMutation.UPDATE_RESULTS, results);
        }
    }
};
