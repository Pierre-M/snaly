"use strict";

import { container } from "tsyringe";
import { DIToken } from "@/core/dependency-injection/DIToken";
import { AxiosHttpClient } from "@/core/http/AxiosHttpClient";
import { BrowserGeolocationService } from "@/business/geolocation/BrowserGeolocationService";
import { BrowserScreenInspector } from "@/core/browser/BrowserScreenInspector";
import { UnsplashImageService } from "@/core/image/UnsplashImageService";
import { WallpaperService } from "@/ui/wallpaper/WallpaperService";
import { OWAWeatherService } from "@/business/weather/OWAWeatherService";
import { MobileGestureService } from "@/core/hardware/MobileGestureService";
import { MobileHapticFeedBackService } from "@/core/hardware/MobileHapticFeedBackService";
import { BrowserDevToolsLogger } from "@/business/easter-eggs/BrowserDevToolsLogger";
import { SentryAlertingService } from "@/core/alerting/SentryAlertingService";
import { WebpackEnvironmentService } from "@/core/env/WebpackEnvironmentService";
import { BrowserSharingService } from "@/core/browser/BrowserSharingService";
import { CityBuilder, CitySearchService } from "@/business/city-search/CitySearchService";
import { AlgoliaCityBuilder } from "@/business/city-search/AlgoliaCityBuilder";
import { AlgoliaCitySearchService } from "@/business/city-search/AlgoliaCitySearchService";

container.register(DIToken.ENVIRONMENT_SERVICE, {
    useClass: WebpackEnvironmentService
});

container.register(DIToken.HTTP_CLIENT, {
    useClass: AxiosHttpClient
});

container.register(DIToken.GEOLOCATION_SERVICE, {
    useClass: BrowserGeolocationService
});

container.register(DIToken.WALLPAPER_SERVICE, {
    useClass: WallpaperService
});

container.register(DIToken.SCREEN_INSPECTOR, {
    useClass: BrowserScreenInspector
});

container.register(DIToken.CONTEXTUAL_IMAGE_SERVICE, {
    useClass: UnsplashImageService
});

container.register(DIToken.WEATHER_SERVICE, {
    useClass: OWAWeatherService
});

container.register(DIToken.GESTURE_SERVICE, {
    useClass: MobileGestureService
});

container.register(DIToken.HAPTIC_FEEDBACK_SERVICE, {
    useClass: MobileHapticFeedBackService
});

container.register(DIToken.DEVTOOLS_LOGGER, {
    useClass: BrowserDevToolsLogger
});

container.register(DIToken.ALERTING_SERVICE, {
    useClass: SentryAlertingService
});

container.register(DIToken.SHARING_SERVICE, {
    useClass: BrowserSharingService
});

container.register<CityBuilder>(DIToken.CITY_BUILDER, {
    useClass: AlgoliaCityBuilder
});

container.register<CitySearchService>(DIToken.CITY_SEARCH_SERVICE, {
    useClass: AlgoliaCitySearchService
});
