"use strict";

import { fakeWeatherService } from "../../_mocks";
import Vue from "vue";
import Vuex, { Store } from "vuex";
import { CurrentWeatherOverview } from "@/business/weather/WeatherService";
import {
    generateCurrentWeatherOverview,
    generateHourlyForecast
} from "../../_mocks/generators/WeatherGenerator";
import { generateUserCoordinates } from "../../_mocks/generators/UserCoordinatesGenerator";
import {
    hourlyForecastModule,
    HourlyForecastModuleAction
} from "@/store/module/hourlyForecast.module";

Vue.use(Vuex);

let store: Store<any>;
let weatherOverview: CurrentWeatherOverview;

describe("hourly forecast store module", () => {
    beforeEach(() => {
        store = new Store({
            modules: {
                hourlyForecastModule
            }
        });
        weatherOverview = generateCurrentWeatherOverview();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should not call for weatherService service when coordinates are null", () => {
        store.dispatch(HourlyForecastModuleAction.GET_FORECAST, null);

        expect(
            fakeWeatherService.getHourlyForecastByCoordinates
        ).not.toHaveBeenCalled();
    });

    it("should call for weatherService with coordinates", () => {
        const coordinates = generateUserCoordinates();
        store.dispatch(HourlyForecastModuleAction.GET_FORECAST, coordinates);

        expect(
            fakeWeatherService.getHourlyForecastByCoordinates
        ).toHaveBeenCalledWith(coordinates);
    });

    it("should update state when weather overview is null or not", async () => {
        const forecast = generateHourlyForecast();
        fakeWeatherService.hourlyForecastValue = forecast;

        await store.dispatch(
            HourlyForecastModuleAction.GET_FORECAST,
            generateUserCoordinates()
        );

        expect(store.state.hourlyForecastModule.forecast).toEqual(forecast);
        fakeWeatherService.hourlyForecastValue = null;

        await store.dispatch(
            HourlyForecastModuleAction.GET_FORECAST,
            generateUserCoordinates()
        );

        expect(store.state.hourlyForecastModule.forecast).toEqual(null);
    });
});
