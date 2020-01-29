"use strict";

import { container } from "tsyringe";
import { IWallpaperService } from "@/ui/wallpaper/WallpaperService";
import { DIToken } from "@/core/dependency-injection/DIToken";
import { FakeWallpaperService } from "./FakeWallpaperService";
import { FakeGeolocationService } from "./FakeGeolocationService";
import { GeolocationService } from "@/business/geolocation/GeolocationService";
import { FakeWeatherService } from "./FakeWeatherService";
import { WeatherService } from "@/business/weather/WeatherService";

export const fakeWallpaperService = new FakeWallpaperService();
export const fakeGeolocationService = new FakeGeolocationService();
export const fakeWeatherService = new FakeWeatherService();

container.register<IWallpaperService>(DIToken.WALLPAPER_SERVICE, {
    useValue: fakeWallpaperService
});

container.register<GeolocationService>(DIToken.GEOLOCATION_SERVICE, {
    useValue: fakeGeolocationService
});

container.register<WeatherService>(DIToken.WEATHER_SERVICE, {
    useValue: fakeWeatherService
});
