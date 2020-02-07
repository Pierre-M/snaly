"use strict";

import { fakeWeatherService } from "../../_mocks";
import Vue from "vue";
import Vuex, { Store } from "vuex";
import { CurrentWeatherOverview } from "@/business/weather/WeatherService";
import { generateCurrentWeatherOverview, generateDailyForecasts } from "../../_mocks/generators/WeatherGenerator";
import { generateUserCoordinates } from "../../_mocks/generators/UserCoordinatesGenerator";
import { dailyForecastsModule, DailyForecastsModuleAction } from "@/store/module/dailyForecasts.module";

Vue.use(Vuex);

let store: Store<any>;
let weatherOverview: CurrentWeatherOverview;

describe("daily forecasts store module", () => {
    beforeEach(() => {
        store = new Store({
            modules: {
                dailyForecastsModule
            }
        });
        weatherOverview = generateCurrentWeatherOverview();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should not call for weatherService service when coordinates are null", () => {
        store.dispatch(DailyForecastsModuleAction.GET_FORECAST, null);

        expect(fakeWeatherService.getDailyForecastsByCoordinates).not.toHaveBeenCalled();
    });

    it("should call for weatherService with coordinates", () => {
        const coordinates = generateUserCoordinates();
        store.dispatch(DailyForecastsModuleAction.GET_FORECAST, coordinates);

        expect(fakeWeatherService.getDailyForecastsByCoordinates).toHaveBeenCalledWith(coordinates);
    });

    it("should update state when weather forecast is null or not", async () => {
        const forecast = generateDailyForecasts();
        fakeWeatherService.dailyForecastsValue = forecast;

        await store.dispatch(DailyForecastsModuleAction.GET_FORECAST, generateUserCoordinates());

        expect(store.state.dailyForecastsModule.days).toEqual(forecast);
        fakeWeatherService.dailyForecastsValue = null;

        await store.dispatch(DailyForecastsModuleAction.GET_FORECAST, generateUserCoordinates());

        expect(store.state.dailyForecastsModule.days).toEqual(null);
    });
});
