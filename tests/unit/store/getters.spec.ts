"use strict";

import { store } from "@/store/store";
import { DEFAULT_APP_TITLE } from "@/store/getters";
import { LocalizationModuleMutation } from "@/store/module/localization.module";
import { WeatherModuleMutation } from "@/store/module/weather.module";
import { generateCurrentWeatherOverview } from "../_mocks/generators/WeatherGenerator";
import { generateCity } from "../_mocks/generators/CityGenerator";

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
});
