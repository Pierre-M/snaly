"use strict";

import { store } from "@/store/store";
import { DEFAULT_APP_TITLE, GlobalGetter } from "@/store/getters";
import { LocalizationModuleMutation } from "@/store/module/localization.module";
import { WeatherModuleMutation } from "@/store/module/weather.module";
import { generateCurrentWeatherOverview } from "../_mocks/generators/WeatherGenerator";
import { generateCity } from "../_mocks/generators/CityGenerator";
import { UserPreferencesModuleMutation } from "@/store/module/userPreferences.module";

describe("Store getters", () => {
    beforeEach(async () => {
        await store.commit(LocalizationModuleMutation.UPDATE_LOCATION, null);
        await store.commit(WeatherModuleMutation.UPDATE_OVERVIEW, null);
    });

    it("should return default app title for document title if weather overview is not available", async () => {
        await store.commit(LocalizationModuleMutation.UPDATE_LOCATION, generateCity());
        expect(store.getters.appTitle).toBe(DEFAULT_APP_TITLE);
    });

    it("should return default app title for document title if user location is not available", async () => {
        await store.commit(WeatherModuleMutation.UPDATE_OVERVIEW, null);
        expect(store.getters.appTitle).toBe(DEFAULT_APP_TITLE);
    });

    it("should contextual app title if all necessary data is available", async () => {
        const overview = generateCurrentWeatherOverview();
        const location = generateCity();
        const expected = `${overview.temperatureOverview.current}° 📍 ${
            location.name
        }, ${location.countryCode.toUpperCase()}`;

        await store.commit(WeatherModuleMutation.UPDATE_OVERVIEW, overview);
        await store.commit(LocalizationModuleMutation.UPDATE_LOCATION, location);

        expect(store.getters.appTitle).toBe(expected);
    });

    it("should return false for IS_CURRENT_LOCATION_FAVORITE if current location is null", () => {
        store.commit(LocalizationModuleMutation.UPDATE_LOCATION, null);

        expect(store.getters[GlobalGetter.IS_CURRENT_LOCATION_FAVORITE]).toBe(false);
    });

    it("should return false for IS_CURRENT_LOCATION_FAVORITE if current location is not in stored favorite locations", () => {
        store.commit(LocalizationModuleMutation.UPDATE_LOCATION, generateCity());
        store.commit(UserPreferencesModuleMutation.UPDATE_FAVORITE_LOCATIONS, []);

        expect(store.getters[GlobalGetter.IS_CURRENT_LOCATION_FAVORITE]).toBe(false);
    });

    it("should return true for IS_CURRENT_LOCATION_FAVORITE if current location is in stored favorite locations", () => {
        const city = generateCity();
        store.commit(LocalizationModuleMutation.UPDATE_LOCATION, city);
        store.commit(UserPreferencesModuleMutation.UPDATE_FAVORITE_LOCATIONS, [city]);

        expect(store.getters[GlobalGetter.IS_CURRENT_LOCATION_FAVORITE]).toBe(true);
    });
});
