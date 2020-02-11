"use strict";

import Vue from "vue";
import Vuex, { Store } from "vuex";
import { uiModule, UIModuleActions, UIModuleGetter } from "@/store/module/ui.module";
import { WeatherDailyForecast } from "@/business/weather/WeatherService";
import { fakeSharingService } from "../../_mocks";
import DesktopLayout from "@/ui/layout/DesktopLayout.vue";

Vue.use(Vuex);

let store: Store<any>;

describe("Vuex Store : UI Module", () => {
    beforeEach(() => {
        store = new Store({
            modules: {
                uiModule
            }
        });
    });

    it("should update opened forecast with given one upon ToggleForecastAction", async () => {
        const forecast = ("DUMMY_FORECAST" as unknown) as WeatherDailyForecast;

        await store.dispatch(UIModuleActions.TOGGLE_DAILY_FORECAST, forecast);

        expect(store.state.uiModule.openedForecast).toEqual(forecast);
    });

    it("should set opened forecast to null if no forecast is given", async () => {
        await store.dispatch(UIModuleActions.TOGGLE_DAILY_FORECAST);

        expect(store.state.uiModule.openedForecast).toEqual(null);
    });

    it("should return right value for opened forecast getter", async () => {
        const forecast = ("DUMMY_FORECAST" as unknown) as WeatherDailyForecast;
        await store.dispatch(UIModuleActions.TOGGLE_DAILY_FORECAST, forecast);

        expect(store.getters[UIModuleGetter.OPENED_FORECAST]).toEqual(forecast);
    });

    it("should call for sharing service upon share action", async () => {
        await store.dispatch(UIModuleActions.SHARE);
        expect(fakeSharingService.share).toHaveBeenCalled();
    });

    it("should return right value for layout getter", () => {
        expect(store.getters[UIModuleGetter.LAYOUT]).toEqual(DesktopLayout);
    });

    it("should be able to open city search", () => {
        store.dispatch(UIModuleActions.OPEN_CITY_SEARCH);
        expect(store.getters[UIModuleGetter.IS_CITY_SEARCH_OPENED]).toBe(true);
    });

    it("should be able to close city search", () => {
        store.dispatch(UIModuleActions.OPEN_CITY_SEARCH);
        store.dispatch(UIModuleActions.CLOSE_CITY_SEARCH);
        expect(store.getters[UIModuleGetter.IS_CITY_SEARCH_OPENED]).toBe(false);
    });
});
