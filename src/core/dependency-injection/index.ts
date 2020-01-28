"use strict";

import { container } from "tsyringe";
import { DIToken } from "@/core/dependency-injection/DIToken";
import { AxiosHttpClient } from "@/core/http/AxiosHttpClient";
import { BrowserGeolocationService } from "@/business/geolocation/BrowserGeolocationService";
import { BrowserScreenInspector } from "@/core/browser/BrowserScreenInspector";
import { UnsplashImageService } from "@/core/image/UnsplashImageService";
import { WallpaperService } from "@/ui/wallpaper/WallpaperService";
import { AlgoliaGeocodingService } from "@/business/geocoding/AlgoliaGeocodingService";
import { OWAWeatherService } from "@/business/weather/OWAWeatherService";
import { MobileGestureService } from "@/core/hardware/MobileGestureService";
import {MobileHapticFeedBackService} from "@/core/hardware/MobileHapticFeedBackService";

container.register(DIToken.HTTP_CLIENT, {
    useClass: AxiosHttpClient
});

container.register(DIToken.GEOLOCATION_SERVICE, {
    useClass: BrowserGeolocationService
});

container.register(DIToken.GEOCODING_SERVICE, {
    useClass: AlgoliaGeocodingService
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
