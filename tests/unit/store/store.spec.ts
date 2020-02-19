"use strict";

import { AppState, store } from "@/store/store";
import { generateCoordinates } from "../_mocks/generators/UserCoordinatesGenerator";
import { WeatherModuleAction, WeatherModuleMutation } from "@/store/module/weather.module";
import { LocalizationModuleAction, LocalizationModuleMutation } from "@/store/module/localization.module";
import { generateCurrentWeatherOverview } from "../_mocks/generators/WeatherGenerator";
import { WallpaperModuleAction } from "@/store/module/wallpaper.module";

describe("store", () => {
    beforeEach(() => {
        store.dispatch = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should call for weather forecast upon coordinates state change", async () => {
        const coordinates = generateCoordinates();
        const unit = (store.state as AppState).userPreferencesModule.temperatureUnit;

        await store.commit(LocalizationModuleMutation.UPDATE_COORDINATES, coordinates);
        expect(store.dispatch).toHaveBeenCalledWith(WeatherModuleAction.GET_FORECAST, { coordinates, unit });
    });

    it("should call for weather overview upon coordinates state change", async () => {
        const coordinates = generateCoordinates();
        const unit = (store.state as AppState).userPreferencesModule.temperatureUnit;

        await store.commit(LocalizationModuleMutation.UPDATE_COORDINATES, coordinates);
        expect(store.dispatch).toHaveBeenCalledWith(WeatherModuleAction.GET_CURRENT_WEATHER, {
            coordinates,
            unit
        });
    });

    it("should call for user location upon coordinates state change", async () => {
        const coordinates = generateCoordinates();
        const language = (store.state as AppState).userPreferencesModule.local;

        await store.commit(LocalizationModuleMutation.UPDATE_COORDINATES, coordinates);
        expect(store.dispatch).toHaveBeenCalledWith(LocalizationModuleAction.GET_LOCATION, { coordinates, language });
    });

    it("should call for a new wallpaper upon weather overview state change", async () => {
        const weather = generateCurrentWeatherOverview();
        await store.commit(WeatherModuleMutation.UPDATE_OVERVIEW, weather);
        expect(store.dispatch).toHaveBeenCalledWith(WallpaperModuleAction.REFRESH_WALLPAPER, weather);
    });
});
