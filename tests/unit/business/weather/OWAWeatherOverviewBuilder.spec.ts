"use strict";

import { OWAWeatherOverviewBuilder } from "@/business/weather/OWAWeatherOverviewBuilder";
import { fakeAlertingService } from "../../_mocks";
import { generateOWAWeatherOverviewData } from "../../_mocks/generators/WeatherGenerator";
import { TemperatureUnit } from "@/business/weather/WeatherService";

let builder: OWAWeatherOverviewBuilder;

describe("OWAWeatherOverviewBuilder", () => {
    beforeEach(() => {
        builder = new OWAWeatherOverviewBuilder(fakeAlertingService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should log error and return null of anything goes wrong with given data", () => {
        const incompleteData = generateOWAWeatherOverviewData({ incomplete: true });

        const res = builder.build(incompleteData, { unit: TemperatureUnit.CELSIUS });

        expect(fakeAlertingService.logError).toHaveBeenCalledWith(expect.any(Error));
        expect(res).toBe(null);
    });

    it("should build suncycle object if given data contains it", () => {
        const data = generateOWAWeatherOverviewData();

        const res = builder.build(data, { unit: TemperatureUnit.CELSIUS });

        expect(res?.suncycle).toBeTruthy();
    });

    it("should not build suncycle object if given data does not contain it", () => {
        const data = generateOWAWeatherOverviewData({ sunrise: null });

        const res = builder.build(data, { unit: TemperatureUnit.CELSIUS });

        expect(res?.suncycle).toBeFalsy();
    });
});
