"use strict";

import { fakeWeatherService } from "../../_mocks";
import Vue from "vue";
import Vuex, { Store } from "vuex";
import { weatherModule, WeatherModuleAction, WeatherModuleRequest } from "@/store/module/weather.module";
import { CurrentWeatherOverview, TemperatureUnit } from "@/business/weather/WeatherService";
import { generateCurrentWeatherOverview, generateDailyForecasts } from "../../_mocks/generators/WeatherGenerator";
import { generateCoordinates } from "../../_mocks/generators/UserCoordinatesGenerator";
import { AppState } from "@/store/store";

Vue.use(Vuex);

let store: Store<any>;
let weatherOverview: CurrentWeatherOverview;

describe("Weather module : current weather", () => {
    beforeEach(() => {
        store = new Store({
            modules: {
                weatherModule
            }
        });
        weatherOverview = generateCurrentWeatherOverview();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should not call for weatherService service when coordinates are null", () => {
        store.dispatch(WeatherModuleAction.GET_CURRENT_WEATHER, null);

        expect(fakeWeatherService.getCurrentWeather).not.toHaveBeenCalled();
    });

    it("should call for weatherService with coordinates", () => {
        const request: WeatherModuleRequest = {
            coordinates: generateCoordinates(),
            unit: TemperatureUnit.CELSIUS
        };

        store.dispatch(WeatherModuleAction.GET_CURRENT_WEATHER, request);

        expect(fakeWeatherService.getCurrentWeather).toHaveBeenCalledWith(request);
    });

    it("should update state when weather overview is null or not", async () => {
        const weatherOverview = generateCurrentWeatherOverview();
        fakeWeatherService.currentOverviewValue = weatherOverview;

        const request: WeatherModuleRequest = {
            coordinates: generateCoordinates(),
            unit: TemperatureUnit.CELSIUS
        };

        await store.dispatch(WeatherModuleAction.GET_CURRENT_WEATHER, request);

        expect((store.state as AppState).weatherModule.current).toEqual(weatherOverview);
        fakeWeatherService.currentOverviewValue = null;

        await store.dispatch(WeatherModuleAction.GET_CURRENT_WEATHER, request);

        expect((store.state as AppState).weatherModule.current).toEqual(null);
    });
});

describe("Weather module : daily forecasts", () => {
    beforeEach(() => {
        store = new Store({
            modules: {
                weatherModule
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

        store.dispatch(WeatherModuleAction.GET_FORECAST, request);

        expect(fakeWeatherService.getDailyForecasts).not.toHaveBeenCalled();
    });

    it("should call for weatherService with coordinates", () => {
        const request: WeatherModuleRequest = {
            coordinates: generateCoordinates(),
            unit: TemperatureUnit.CELSIUS
        };

        store.dispatch(WeatherModuleAction.GET_FORECAST, request);

        expect(fakeWeatherService.getDailyForecasts).toHaveBeenCalledWith(request);
    });

    it("should update state when weather forecast is null or not", async () => {
        const forecast = generateDailyForecasts();
        fakeWeatherService.dailyForecastsValue = forecast;

        const request: WeatherModuleRequest = {
            coordinates: generateCoordinates(),
            unit: TemperatureUnit.CELSIUS
        };

        await store.dispatch(WeatherModuleAction.GET_FORECAST, request);

        expect((store.state as AppState).weatherModule.days).toEqual(forecast);
        fakeWeatherService.dailyForecastsValue = null;

        await store.dispatch(WeatherModuleAction.GET_FORECAST, request);

        expect((store.state as AppState).weatherModule.days).toEqual(null);
    });
});
