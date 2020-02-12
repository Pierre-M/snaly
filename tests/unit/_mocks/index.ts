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
import { EnvironmentService } from "@/core/env/EnvironmentService";
import { WebpackEnvironmentService } from "@/core/env/WebpackEnvironmentService";
import { FakeSharingService } from "./FakeSharingService";
import { SharingService } from "@/core/browser/SharingService";
import { FakeHapticFeedbackService } from "./FakeHapticFeedbackService";
import { HapticFeedbackService } from "@/core/hardware/HapticFeedbackService";
import { FakeAlertingService } from "./FakeAlertingService";
import { AlertingService } from "@/core/alerting/AlertingService";
import { FakeHttpClient } from "./FakeHttpClient";
import { HttpClient } from "@/core/http/HttpClient";

export const fakeHttpClient = new FakeHttpClient();
export const fakeWallpaperService = new FakeWallpaperService();
export const fakeGeolocationService = new FakeGeolocationService();
export const fakeWeatherService = new FakeWeatherService();
export const fakeGestureService = new FakeGestureService();
export const fakeGeocodingService = new FakeGeocodingService();
export const fakeDevToolsLogger = new FakeDevToolsLogger();
export const fakeSharingService = new FakeSharingService();
export const fakeHapticFeedbackService = new FakeHapticFeedbackService();
export const fakeAlertingService = new FakeAlertingService();

container.register<HttpClient>(DIToken.HTTP_CLIENT, {
    useValue: fakeHttpClient
});

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

container.register<EnvironmentService>(DIToken.ENVIRONMENT_SERVICE, {
    useClass: WebpackEnvironmentService
});

container.register<SharingService>(DIToken.SHARING_SERVICE, {
    useValue: fakeSharingService
});

container.register<HapticFeedbackService>(DIToken.HAPTIC_FEEDBACK_SERVICE, {
    useValue: fakeHapticFeedbackService
});

container.register<AlertingService>(DIToken.ALERTING_SERVICE, {
    useValue: fakeAlertingService
});
