"use strict";

import Vue from "vue";
import Vuex, { Store } from "vuex";
import { uiModule, UIModuleActions, UIModuleGetter } from "@/store/module/ui.module";
import { WeatherDailyForecast } from "@/business/weather/WeatherService";
import { fakeSharingService, fakeShortcutService } from "../../_mocks";
import { Shortcut, ShortcutResume } from "@/core/browser/ShorcutService";
import { AppState } from "@/store/store";

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

    it("should be able to open city search", () => {
        store.dispatch(UIModuleActions.OPEN_CITY_SEARCH);
        expect(store.getters[UIModuleGetter.IS_CITY_SEARCH_OPENED]).toBe(true);
    });

    it("should be able to close city search", () => {
        store.dispatch(UIModuleActions.OPEN_CITY_SEARCH);
        store.dispatch(UIModuleActions.CLOSE_CITY_SEARCH);
        expect(store.getters[UIModuleGetter.IS_CITY_SEARCH_OPENED]).toBe(false);
    });

    it("should be able to open side nav", () => {
        store.dispatch(UIModuleActions.OPEN_SIDE_NAV);
        expect(store.getters[UIModuleGetter.IS_SIDE_NAV_OPENED]).toBe(true);
    });

    it("should be able to close side nav", () => {
        store.dispatch(UIModuleActions.OPEN_SIDE_NAV);
        store.dispatch(UIModuleActions.CLOSE_SIDE_NAV);
        expect(store.getters[UIModuleGetter.IS_SIDE_NAV_OPENED]).toBe(false);
    });

    it("should be able to toggle side nav", () => {
        store.dispatch(UIModuleActions.TOGGLE_SIDE_NAV);
        expect(store.getters[UIModuleGetter.IS_SIDE_NAV_OPENED]).toBe(true);

        store.dispatch(UIModuleActions.TOGGLE_SIDE_NAV);
        expect(store.getters[UIModuleGetter.IS_SIDE_NAV_OPENED]).toBe(false);
    });

    it("should be able register shortcuts", () => {
        const fakeShortcut: Shortcut = { def: { key: "a" }, action: () => {} };
        store.dispatch(UIModuleActions.REGISTER_SHORTCUT, fakeShortcut);
        expect(fakeShortcutService.register).toHaveBeenCalledWith(fakeShortcut);
    });

    it("should be able to retrieve shortcuts", () => {
        const fakeShortcut: Shortcut = { def: { key: "a" }, action: () => {} };
        fakeShortcutService.shortcuts = [fakeShortcut] as ShortcutResume[];

        store.dispatch(UIModuleActions.REGISTER_SHORTCUT, fakeShortcut);

        expect((store.state as AppState).uiModule.shortcuts).toEqual([fakeShortcut]);
    });
});
