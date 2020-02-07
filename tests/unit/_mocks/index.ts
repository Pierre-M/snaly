"use strict";

import { container } from "tsyringe";
import { IWallpaperService } from "@/ui/wallpaper/WallpaperService";
import { DIToken } from "@/core/dependency-injection/DIToken";
import { FakeWallpaperService } from "./FakeWallpaperService";
import { FakeGeolocationService } from "./FakeGeolocationService";
import { GeolocationService } from "@/business/geolocation/GeolocationService";
import { FakeWeatherService } from "./FakeWeatherService";
import { WeatherService } from "@/business/weather/WeatherService";
import { FakeGestureService } from "./FakeGestureService";
import { GestureService } from "@/core/hardware/GestureService";
import { FakeGeocodingService } from "./FakeGeocodingService";
import { GeocodingService } from "@/business/geocoding/GeocodingService";
import { FakeDevToolsLogger } from "./FakeDevToolsLogger";
import { DevToolsLogger } from "@/business/easter-eggs/DevToolsLogger";

export const fakeWallpaperService = new FakeWallpaperService();
export const fakeGeolocationService = new FakeGeolocationService();
export const fakeWeatherService = new FakeWeatherService();
export const fakeGestureService = new FakeGestureService();
export const fakeGeocodingService = new FakeGeocodingService();
export const fakeDevToolsLogger = new FakeDevToolsLogger();

container.register<IWallpaperService>(DIToken.WALLPAPER_SERVICE, {
    useValue: fakeWallpaperService
});

container.register<GeolocationService>(DIToken.GEOLOCATION_SERVICE, {
    useValue: fakeGeolocationService
});

container.register<WeatherService>(DIToken.WEATHER_SERVICE, {
    useValue: fakeWeatherService
});

container.register<GestureService>(DIToken.GESTURE_SERVICE, {
    useValue: fakeGestureService
});

container.register<GeocodingService>(DIToken.GEOCODING_SERVICE, {
    useValue: fakeGeocodingService
});

container.register<DevToolsLogger>(DIToken.DEVTOOLS_LOGGER, {
    useValue: fakeDevToolsLogger
});
