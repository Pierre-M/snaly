"use strict";

import "@/core/dependency-injection";
import { container } from "tsyringe";
import { DIToken } from "@/core/dependency-injection/DIToken";
import { AxiosHttpClient } from "@/core/http/AxiosHttpClient";
import { BrowserGeolocationService } from "@/business/geolocation/BrowserGeolocationService";
import { UnsplashImageService } from "@/core/image/UnsplashImageService";
import { OWAWeatherService } from "@/business/weather/OWAWeatherService";

describe("Dependency injection container", () => {
    it("should resolve dependency for all entries in DITokens", () => {
        const entries = Object.values(DIToken);
        const allDependencyResolved = entries.reduce(
            (allResolved: boolean, curr: string) => {
                return allResolved && !!container.resolve(curr);
            },
            true
        );

        expect(allDependencyResolved).toBe(true);
    });

    it("should return an AxiosHttpClient for HttpClient interface", () => {
        expect(container.resolve(DIToken.HTTP_CLIENT)).toBeInstanceOf(
            AxiosHttpClient
        );
    });

    it("should return an UnsplashService for ContextualImageService interface", () => {
        expect(
            container.resolve(DIToken.CONTEXTUAL_IMAGE_SERVICE)
        ).toBeInstanceOf(UnsplashImageService);
    });

    it("should return an OpenWeatherApiService for WeatherService interface", () => {
        expect(container.resolve(DIToken.WEATHER_SERVICE)).toBeInstanceOf(
            OWAWeatherService
        );
    });

    it("should return an BrowserGeolocationService for GeolocationService interface", () => {
        expect(container.resolve(DIToken.GEOLOCATION_SERVICE)).toBeInstanceOf(
            BrowserGeolocationService
        );
    });
});
