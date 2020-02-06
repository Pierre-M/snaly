"use strict";

import { store } from "@/store/store";
import { generateUserCoordinates } from "../_mocks/generators/UserCoordinatesGenerator";
import { HourlyForecastModuleAction } from "@/store/module/hourlyForecast.module";
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
        await store.commit(LocalizationModuleMutation.UPDATE_COORDINATES, coordinates);
        expect(store.dispatch).toHaveBeenCalledWith(HourlyForecastModuleAction.GET_FORECAST, coordinates);
    });

    it("should call for weather overview upon coordinates state change", async () => {
        const coordinates = generateUserCoordinates();
        await store.commit(LocalizationModuleMutation.UPDATE_COORDINATES, coordinates);
        expect(store.dispatch).toHaveBeenCalledWith(CurrentWeatherModuleAction.GET_BY_COORDINATE, coordinates);
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
