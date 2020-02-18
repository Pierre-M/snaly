"use strict";

import {
    OPEN_WEATHER_API_KEY,
    OPEN_WEATHER_CURRENT_API,
    OPEN_WEATHER_FORECASTS_API,
    OWAWeatherService
} from "@/business/weather/OWAWeatherService";
import { fakeHttpClient, fakeWeatherForecastsBuilder, fakeWeatherOverviewBuilder } from "../../_mocks";
import { generateCoordinates } from "../../_mocks/generators/UserCoordinatesGenerator";
import { TemperatureUnit } from "@/business/weather/WeatherService";
import { LocationCoordinates } from "@/business/geolocation/GeolocationService";

let service: OWAWeatherService;
let coordinates: LocationCoordinates;

describe("OWAWeatherService - current weather overview", () => {
    beforeEach(() => {
        coordinates = generateCoordinates();
        service = new OWAWeatherService(fakeHttpClient, fakeWeatherOverviewBuilder, fakeWeatherForecastsBuilder);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should call for Open Weather API with right url and right payload", () => {
        service.getCurrentWeather({ coordinates, unit: TemperatureUnit.CELSIUS });

        expect(fakeHttpClient.get).toHaveBeenCalledWith(OPEN_WEATHER_CURRENT_API, {
            lat: coordinates.latitude,
            lon: coordinates.longitude,
            APPID: OPEN_WEATHER_API_KEY,
            units: TemperatureUnit.CELSIUS
        });
    });

    it("should not call for overview builder and return null if Open Weather API has any issue", async () => {
        fakeHttpClient.mockErroredResponse();

        const res = await service.getCurrentWeather({ coordinates, unit: TemperatureUnit.CELSIUS });

        expect(fakeWeatherOverviewBuilder.build).not.toHaveBeenCalled();
        expect(res).toBe(null);
    });

    it("should call for overview builder with right payload and params", async () => {
        const data = {};
        fakeHttpClient.mockSuccessfullResponse(data);

        await service.getCurrentWeather({ coordinates, unit: TemperatureUnit.CELSIUS });

        expect(fakeWeatherOverviewBuilder.build).toHaveBeenCalledWith(data, { unit: TemperatureUnit.CELSIUS });
    });
});

describe("OWAWeatherService - weather forecasts", () => {
    beforeEach(() => {
        coordinates = generateCoordinates();
        service = new OWAWeatherService(fakeHttpClient, fakeWeatherOverviewBuilder, fakeWeatherForecastsBuilder);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should call for Open Weather API with right url and right payload", () => {
        service.getDailyForecasts({ coordinates, unit: TemperatureUnit.CELSIUS });

        expect(fakeHttpClient.get).toHaveBeenCalledWith(OPEN_WEATHER_FORECASTS_API, {
            lat: coordinates.latitude,
            lon: coordinates.longitude,
            APPID: OPEN_WEATHER_API_KEY,
            units: TemperatureUnit.CELSIUS
        });
    });

    it("should not call for forecast builder and return null if Open Weather API has any issue", async () => {
        fakeHttpClient.mockErroredResponse();

        const res = await service.getDailyForecasts({ coordinates, unit: TemperatureUnit.CELSIUS });

        expect(fakeWeatherForecastsBuilder.build).not.toHaveBeenCalled();
        expect(res).toBe(null);
    });

    it("should call for overview builder with right payload and params", async () => {
        const data = { list: {} };
        fakeHttpClient.mockSuccessfullResponse(data);

        await service.getDailyForecasts({ coordinates, unit: TemperatureUnit.CELSIUS });

        expect(fakeWeatherForecastsBuilder.build).toHaveBeenCalledWith(data.list, { unit: TemperatureUnit.CELSIUS });
    });
});
