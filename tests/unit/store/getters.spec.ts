"use strict";

import "../_mocks";
import { store } from "@/store/store";
import { DEFAULT_APP_TITLE } from "@/store/getters";
import { LocalizationModuleMutation } from "@/store/module/localization.module";
import { CurrentWeatherModuleMutation } from "@/store/module/currentWeather.module";
import { generateUserLocation } from "../_mocks/generators/LocalizationGenerator";
import { generateCurrentWeatherOverview } from "../_mocks/generators/WeatherGenerator";

describe("Store getters", () => {
    beforeEach(async () => {
        await store.commit(LocalizationModuleMutation.UPDATE_LOCATION, null);
        await store.commit(CurrentWeatherModuleMutation.UPDATE_OVERVIEW, null);
    });

    it("should return default app title for document title if weather overview is not available", async () => {
        await store.commit(LocalizationModuleMutation.UPDATE_LOCATION, generateUserLocation());
        expect(store.getters.appTitle).toBe(DEFAULT_APP_TITLE);
    });

    it("should return default app title for document title if user location is not available", async () => {
        await store.commit(CurrentWeatherModuleMutation.UPDATE_OVERVIEW, null);
        expect(store.getters.appTitle).toBe(DEFAULT_APP_TITLE);
    });

    it("should contextual app title if all necessary data is available", async () => {
        const overview = generateCurrentWeatherOverview();
        const location = generateUserLocation();
        const expected = `${overview.temperatureOverview.current}° 📍 ${
            location.city
        }, ${location.countryCode.toUpperCase()}`;

        await store.commit(CurrentWeatherModuleMutation.UPDATE_OVERVIEW, overview);
        await store.commit(LocalizationModuleMutation.UPDATE_LOCATION, location);

        expect(store.getters.appTitle).toBe(expected);
    });
});
