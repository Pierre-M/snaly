"use strict";

import { container } from "tsyringe";
import { DIToken } from "@/core/dependency-injection/DIToken";
import { AxiosHttpClient } from "@/core/http/AxiosHttpClient";
import { OpenWeatherApiService } from "@/business/weather-api/OpenWeatherApiService";
import { BrowserGeolocationService } from "@/business/geolocation/BrowserGeolocationService";
import { BrowserScreenInspector } from "@/core/browser/BrowserScreenInspector";
import { UnsplashImageService } from "@/core/image/UnsplashImageService";
import { WallpaperService } from "@/ui/wallpaper/WallpaperService";

container.register(DIToken.HTTP_CLIENT, {
    useClass: AxiosHttpClient
});

container.register(DIToken.WEATHER_SERVICE, {
    useClass: OpenWeatherApiService
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
