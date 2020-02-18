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
import { LocationBuilder, LocationSearchService } from "@/business/location-search/LocationSearchService";
import { AlgoliaLocationBuilder } from "@/business/location-search/AlgoliaLocationBuilder";
import { AlgoliaLocationSearchService } from "@/business/location-search/AlgoliaLocationSearchService";
import { ShortcutService } from "@/core/browser/ShorcutService";
import { KeyboardShortcutService } from "@/core/browser/KeyboardShortcutService";
import { VueI18nService } from "@/ui/core/vue-plugins/I18nPlugin";
import { I18nService } from "@/core/i18n/I18nService";
import { FavoriteLocationsService } from "@/business/favorite-locations/FavoriteLocationsService";
import { StoredFavoriteLocationService } from "@/business/favorite-locations/StoredFavoriteLocationService";
import { StorageService } from "@/core/storage/StorageService";
import { LocalStorageService } from "@/core/storage/LocalStorageService";

container.register(DIToken.ENVIRONMENT_SERVICE, {
    useClass: WebpackEnvironmentService
});

container.register<I18nService>(DIToken.I18N_SERVICE, {
    useClass: VueI18nService
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

container.register<LocationBuilder>(DIToken.CITY_BUILDER, {
    useClass: AlgoliaLocationBuilder
});

container.register<LocationSearchService>(DIToken.CITY_SEARCH_SERVICE, {
    useClass: AlgoliaLocationSearchService
});

container.register<ShortcutService>(DIToken.SHORTCUT_SERVICE, {
    useClass: KeyboardShortcutService
});

container.register<StorageService>(DIToken.STORAGE_SERVICE, {
    useClass: LocalStorageService
});

container.register<FavoriteLocationsService>(DIToken.FAVORITE_LOCATIONS_SERVICE, {
    useClass: StoredFavoriteLocationService
});
