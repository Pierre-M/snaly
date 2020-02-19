"use strict";

import { container } from "tsyringe";
import { IWallpaperService } from "@/ui/wallpaper/WallpaperService";
import { DIToken } from "@/core/dependency-injection/DIToken";
import { FakeWallpaperService } from "./FakeWallpaperService";
import { FakeGeolocationService } from "./FakeGeolocationService";
import { GeolocationService } from "@/business/geolocation/GeolocationService";
import { FakeWeatherService } from "./FakeWeatherService";
import {
    WeatherDailyForecastsBuilder,
    WeatherOverviewBuilder,
    WeatherService
} from "@/business/weather/WeatherService";
import { FakeGestureService } from "./FakeGestureService";
import { GestureService } from "@/core/hardware/GestureService";
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
import { FakeCitySearchService } from "./FakeCitySearchService";
import { LocationSearchService } from "@/business/location-search/LocationSearchService";
import { FakeCityBuilder } from "./FakeCityBuilder";
import { ShortcutService } from "@/core/browser/ShorcutService";
import { FakeShortcutService } from "./FakeShortcutService";
import { FakeI18nService } from "./FakeI18nService";
import { I18nService } from "@/core/i18n/I18nService";
import { FakeScreenInspector } from "./FakeScreenInspector";
import { ScreenInspector } from "@/core/browser/ScreenInspector";
import { FakeStorageService } from "./FakeStorageService";
import { StorageService } from "@/core/storage/StorageService";
import { FakeFavoriteLocationsService } from "./FakeFavoriteLocationsService";
import { FavoriteLocationsService } from "@/business/favorite-locations/FavoriteLocationsService";
import { FakeWeatherOverviewBuilder } from "./FakeWeatherOverviewBuilder";
import { FakeWeatherForecastsBuilder } from "./FakeWeatherForecastsBuilder";
import { FakeRoutingService } from "./FakeRoutingService";
import { RoutingService } from "@/core/routing/RoutingService";

export const fakeHttpClient = new FakeHttpClient();
export const fakeWallpaperService = new FakeWallpaperService();
export const fakeGeolocationService = new FakeGeolocationService();
export const fakeWeatherService = new FakeWeatherService();
export const fakeGestureService = new FakeGestureService();
export const fakeDevToolsLogger = new FakeDevToolsLogger();
export const fakeSharingService = new FakeSharingService();
export const fakeHapticFeedbackService = new FakeHapticFeedbackService();
export const fakeAlertingService = new FakeAlertingService();
export const fakeCitySearchService = new FakeCitySearchService();
export const fakeCityBuilder = new FakeCityBuilder();
export const fakeShortcutService = new FakeShortcutService();
export const fakeI18nService = new FakeI18nService();
export const fakeScreenInspector = new FakeScreenInspector();
export const fakeStorageService = new FakeStorageService();
export const fakeFavoriteLocationsService = new FakeFavoriteLocationsService();
export const fakeWeatherOverviewBuilder = new FakeWeatherOverviewBuilder();
export const fakeWeatherForecastsBuilder = new FakeWeatherForecastsBuilder();
export const fakeRoutingService = new FakeRoutingService();

container.register<HttpClient>(DIToken.HTTP_CLIENT, {
    useValue: fakeHttpClient
});

container.register<IWallpaperService>(DIToken.WALLPAPER_SERVICE, {
    useValue: fakeWallpaperService
});

container.register<GeolocationService>(DIToken.GEOLOCATION_SERVICE, {
    useValue: fakeGeolocationService
});

container.register<WeatherOverviewBuilder>(DIToken.WEATHER_OVERVIEW_BUILDER, {
    useValue: fakeWeatherOverviewBuilder
});

container.register<WeatherDailyForecastsBuilder>(DIToken.WEATHER_FORECASTS_BUILDER, {
    useValue: fakeWeatherForecastsBuilder
});

container.register<WeatherService>(DIToken.WEATHER_SERVICE, {
    useValue: fakeWeatherService
});

container.register<GestureService>(DIToken.GESTURE_SERVICE, {
    useValue: fakeGestureService
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

container.register<LocationSearchService>(DIToken.CITY_SEARCH_SERVICE, {
    useValue: fakeCitySearchService
});

container.register<ShortcutService>(DIToken.SHORTCUT_SERVICE, {
    useValue: fakeShortcutService
});

container.register<I18nService>(DIToken.I18N_SERVICE, {
    useValue: fakeI18nService
});

container.register<ScreenInspector>(DIToken.SCREEN_INSPECTOR, {
    useValue: fakeScreenInspector
});

container.register<StorageService>(DIToken.STORAGE_SERVICE, {
    useValue: fakeStorageService
});

container.register<FavoriteLocationsService>(DIToken.FAVORITE_LOCATIONS_SERVICE, {
    useValue: fakeFavoriteLocationsService
});

container.register<RoutingService>(DIToken.ROUTING_SERVICE, {
    useValue: fakeRoutingService
});
