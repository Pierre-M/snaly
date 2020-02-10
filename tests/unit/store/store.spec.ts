"use strict";

import { AppState, store } from "@/store/store";
import { generateUserCoordinates } from "../_mocks/generators/UserCoordinatesGenerator";
import { DailyForecastsModuleAction } from "@/store/module/dailyForecasts.module";
import { CurrentWeatherModuleAction, CurrentWeatherModuleMutation } from "@/store/module/currentWeather.module";
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
        const coordinates = generateUserCoordinates();
        const unit = (store.state as AppState).userPreferencesModule.temperatureUnit;

        await store.commit(LocalizationModuleMutation.UPDATE_COORDINATES, coordinates);
        expect(store.dispatch).toHaveBeenCalledWith(DailyForecastsModuleAction.GET_FORECAST, { coordinates, unit });
    });

    it("should call for weather overview upon coordinates state change", async () => {
        const coordinates = generateUserCoordinates();
        const unit = (store.state as AppState).userPreferencesModule.temperatureUnit;

        await store.commit(LocalizationModuleMutation.UPDATE_COORDINATES, coordinates);
        expect(store.dispatch).toHaveBeenCalledWith(CurrentWeatherModuleAction.GET_CURRENT_WEATHER, {
            coordinates,
            unit
        });
    });

    it("should call for user location upon coordinates state change", async () => {
        const coordinates = generateUserCoordinates();

        await store.commit(LocalizationModuleMutation.UPDATE_COORDINATES, coordinates);
        expect(store.dispatch).toHaveBeenCalledWith(LocalizationModuleAction.GET_LOCATION, coordinates);
    });

    it("should call for a new wallpaper upon weather overview state change", async () => {
        const weather = generateCurrentWeatherOverview();
        await store.commit(CurrentWeatherModuleMutation.UPDATE_OVERVIEW, weather);
        expect(store.dispatch).toHaveBeenCalledWith(WallpaperModuleAction.REFRESH_WALLPAPER, weather);
    });
});
