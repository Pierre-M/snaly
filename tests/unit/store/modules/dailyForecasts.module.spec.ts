"use strict";

import { fakeWeatherService } from "../../_mocks";
import Vue from "vue";
import Vuex, { Store } from "vuex";
import { CurrentWeatherOverview, TemperatureUnit } from "@/business/weather/WeatherService";
import { generateCurrentWeatherOverview, generateDailyForecasts } from "../../_mocks/generators/WeatherGenerator";
import { generateUserCoordinates } from "../../_mocks/generators/UserCoordinatesGenerator";
import {
    dailyForecastsModule,
    DailyForecastsModuleAction,
    WeatherModuleRequest
} from "@/store/module/dailyForecasts.module";

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
        const request: WeatherModuleRequest = {
            coordinates: null,
            unit: TemperatureUnit.CELSIUS
        };

        store.dispatch(DailyForecastsModuleAction.GET_FORECAST, request);

        expect(fakeWeatherService.getDailyForecasts).not.toHaveBeenCalled();
    });

    it("should call for weatherService with coordinates", () => {
        const request: WeatherModuleRequest = {
            coordinates: generateUserCoordinates(),
            unit: TemperatureUnit.CELSIUS
        };

        store.dispatch(DailyForecastsModuleAction.GET_FORECAST, request);

        expect(fakeWeatherService.getDailyForecasts).toHaveBeenCalledWith(request);
    });

    it("should update state when weather forecast is null or not", async () => {
        const forecast = generateDailyForecasts();
        fakeWeatherService.dailyForecastsValue = forecast;

        const request: WeatherModuleRequest = {
            coordinates: generateUserCoordinates(),
            unit: TemperatureUnit.CELSIUS
        };

        await store.dispatch(DailyForecastsModuleAction.GET_FORECAST, request);

        expect(store.state.dailyForecastsModule.days).toEqual(forecast);
        fakeWeatherService.dailyForecastsValue = null;

        await store.dispatch(DailyForecastsModuleAction.GET_FORECAST, request);

        expect(store.state.dailyForecastsModule.days).toEqual(null);
    });
});
