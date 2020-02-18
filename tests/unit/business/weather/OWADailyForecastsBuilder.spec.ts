"use strict";

import { generateHourlyForecastData } from "../../_mocks/generators/WeatherGenerator";
import { OWADailyForecastsBuilder } from "@/business/weather/OWADailyForecastsBuilder";
import { TemperatureUnit } from "@/business/weather/WeatherService";
import { fakeWeatherOverviewBuilder } from "../../_mocks";

let builder: OWADailyForecastsBuilder;

describe("OWADailyForecastsBuilder", () => {
    beforeEach(() => {
        builder = new OWADailyForecastsBuilder(fakeWeatherOverviewBuilder);
    });

    it("should return on entry per day", () => {
        const fakeForecasts = [
            generateHourlyForecastData({ date: new Date("2020-01-01") }),
            generateHourlyForecastData({ date: new Date("2020-01-02") }),
            generateHourlyForecastData({ date: new Date("2020-01-03") }),
            generateHourlyForecastData({ date: new Date("2020-01-03") }),
            generateHourlyForecastData({ date: new Date("2020-01-08") }),
            generateHourlyForecastData({ date: new Date("2020-01-15") })
        ];

        const res = builder.build(fakeForecasts, {
            unit: TemperatureUnit.CELSIUS
        });

        expect(res.length).toBe(5);
    });

    it("should return each entry with the right date", () => {
        const dates = [new Date("2020-01-01"), new Date("2020-01-02"), new Date("2020-01-03")];

        const fakeForecasts = dates.map(d => generateHourlyForecastData({ date: d }));

        const res = builder.build(fakeForecasts, {
            unit: TemperatureUnit.CELSIUS
        });

        expect(res.map(entry => entry.date)).toEqual(dates);
    });

    it("should compute right average temperature for each day", () => {
        const fakeForecasts = [
            generateHourlyForecastData({ temp: 10 }),
            generateHourlyForecastData({ temp: 20 }),
            generateHourlyForecastData({ temp: 30 }),
            generateHourlyForecastData({ temp: 0 })
        ];

        const [daily] = builder.build(fakeForecasts, {
            unit: TemperatureUnit.CELSIUS
        });

        expect(daily.temperatureRange.average).toBe(15);
    });

    it("should compute right min temperature for each day", () => {
        const fakeForecasts = [
            generateHourlyForecastData({ minTemp: 10 }),
            generateHourlyForecastData({ minTemp: -5 }),
            generateHourlyForecastData({ minTemp: 5 }),
            generateHourlyForecastData({ minTemp: 0 })
        ];

        const [daily] = builder.build(fakeForecasts, {
            unit: TemperatureUnit.CELSIUS
        });

        expect(daily.temperatureRange.min).toBe(-5);
    });

    it("should compute right max temperature for each day", () => {
        const fakeForecasts = [
            generateHourlyForecastData({ maxTemp: 10 }),
            generateHourlyForecastData({ maxTemp: 15 }),
            generateHourlyForecastData({ maxTemp: 0 }),
            generateHourlyForecastData({ maxTemp: -5 })
        ];

        const [daily] = builder.build(fakeForecasts, {
            unit: TemperatureUnit.CELSIUS
        });

        expect(daily.temperatureRange.max).toBe(15);
    });

    it("should set right temperature unit based on given parameters", () => {
        const fakeForecasts = [generateHourlyForecastData()];

        const [daily] = builder.build(fakeForecasts, {
            unit: TemperatureUnit.CELSIUS
        });

        expect(daily.temperatureRange.unit).toBe(TemperatureUnit.CELSIUS);
    });

    it("should compute right average description for each day", () => {
        const fakeForecasts = [
            generateHourlyForecastData({ description: "clear" }),
            generateHourlyForecastData({ description: "rain" }),
            generateHourlyForecastData({ description: "clear" })
        ];

        const [daily] = builder.build(fakeForecasts, {
            unit: TemperatureUnit.CELSIUS
        });

        expect(daily.description.text).toBe("clear");
    });

    it("should return right forecast entries for each day", () => {
        const fakeForecasts = [
            generateHourlyForecastData({ date: new Date("2020-01-01") }),
            generateHourlyForecastData({ date: new Date("2020-01-01") }),
            generateHourlyForecastData({ date: new Date("2020-01-02") })
        ];

        const [d1, d2] = builder.build(fakeForecasts, {
            unit: TemperatureUnit.CELSIUS
        });

        expect(d1.forecast.length).toBe(2);
        expect(d2.forecast.length).toBe(1);
    });

    it("should return right forecast entries for each day", () => {
        const d1 = new Date("2020-01-01");
        const d2 = new Date("2020-01-02");

        const fakeForecasts = [
            generateHourlyForecastData({ date: d1 }),
            generateHourlyForecastData({ date: d1 }),
            generateHourlyForecastData({ date: d2 })
        ];

        const [entry1, entry2] = builder.build(fakeForecasts, {
            unit: TemperatureUnit.CELSIUS
        });

        expect(entry1.forecast.length).toBe(2);
        expect(entry2.forecast.length).toBe(1);
    });
});
