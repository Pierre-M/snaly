"use strict";

import { fakeWeatherService } from "../../_mocks";
import Vue from "vue";
import Vuex, { Store } from "vuex";
import {
    currentWeatherModule,
    CurrentWeatherModuleAction
} from "@/store/module/currentWeather.module";
import { CurrentWeatherOverview } from "@/business/weather/WeatherService";
import { generateCurrentWeatherOverview } from "../../_mocks/generators/CurrentWeatherOverviewGenerator";
import { generateUserCoordinates } from "../../_mocks/generators/UserCoordinatesGenerator";

Vue.use(Vuex);

let store: Store<any>;
let weatherOverview: CurrentWeatherOverview;

describe("current weather store module", () => {
    beforeEach(() => {
        store = new Store({
            modules: {
                currentWeatherModule
            }
        });
        weatherOverview = generateCurrentWeatherOverview();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should not call for weatherService service when coordinates are null", () => {
        store.dispatch(CurrentWeatherModuleAction.GET_BY_COORDINATE, null);

        expect(
            fakeWeatherService.getCurrentWeatherByCoordinates
        ).not.toHaveBeenCalled();
    });

    it("should call for weatherService with coordinates", () => {
        const coordinates = generateUserCoordinates();
        store.dispatch(
            CurrentWeatherModuleAction.GET_BY_COORDINATE,
            coordinates
        );

        expect(
            fakeWeatherService.getCurrentWeatherByCoordinates
        ).toHaveBeenCalledWith(coordinates);
    });

    it("should update state when weather overview is null or not", async () => {
        const weatherOverview = generateCurrentWeatherOverview();
        fakeWeatherService.currentOverviewValue = weatherOverview;

        await store.dispatch(
            CurrentWeatherModuleAction.GET_BY_COORDINATE,
            generateUserCoordinates()
        );

        expect(store.state.currentWeatherModule.overview).toEqual(
            weatherOverview
        );
        fakeWeatherService.currentOverviewValue = null;

        await store.dispatch(
            CurrentWeatherModuleAction.GET_BY_COORDINATE,
            generateUserCoordinates()
        );

        expect(store.state.currentWeatherModule.overview).toEqual(null);
    });
});
