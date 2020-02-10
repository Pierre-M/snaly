"use strict";

import { fakeWeatherService } from "../../_mocks";
import Vue from "vue";
import Vuex, { Store } from "vuex";
import { currentWeatherModule, CurrentWeatherModuleAction } from "@/store/module/currentWeather.module";
import { CurrentWeatherOverview, TemperatureUnit } from "@/business/weather/WeatherService";
import { generateCurrentWeatherOverview } from "../../_mocks/generators/WeatherGenerator";
import { generateUserCoordinates } from "../../_mocks/generators/UserCoordinatesGenerator";
import { WeatherModuleRequest } from "@/store/module/dailyForecasts.module";

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
        store.dispatch(CurrentWeatherModuleAction.GET_CURRENT_WEATHER, null);

        expect(fakeWeatherService.getCurrentWeather).not.toHaveBeenCalled();
    });

    it("should call for weatherService with coordinates", () => {
        const request: WeatherModuleRequest = {
            coordinates: generateUserCoordinates(),
            unit: TemperatureUnit.CELSIUS
        };

        store.dispatch(CurrentWeatherModuleAction.GET_CURRENT_WEATHER, request);

        expect(fakeWeatherService.getCurrentWeather).toHaveBeenCalledWith(request);
    });

    it("should update state when weather overview is null or not", async () => {
        const weatherOverview = generateCurrentWeatherOverview();
        fakeWeatherService.currentOverviewValue = weatherOverview;

        const request: WeatherModuleRequest = {
            coordinates: generateUserCoordinates(),
            unit: TemperatureUnit.CELSIUS
        };

        await store.dispatch(CurrentWeatherModuleAction.GET_CURRENT_WEATHER, request);

        expect(store.state.currentWeatherModule.overview).toEqual(weatherOverview);
        fakeWeatherService.currentOverviewValue = null;

        await store.dispatch(CurrentWeatherModuleAction.GET_CURRENT_WEATHER, request);

        expect(store.state.currentWeatherModule.overview).toEqual(null);
    });
});
