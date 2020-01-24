"use strict";

import { container } from "tsyringe";
import { DIToken } from "@/core/dependency-injection/DIToken";
import { AxiosHttpClient } from "@/core/http/AxiosHttpClient";
import { OpenWeatherApiService } from "@/business/weather-api/OpenWeatherApiService";
import { BrowserGeolocationService } from "@/business/geolocation/BrowserGeolocationService";
import { UnsplashService } from "@/business/wallpaper/UnsplashService";

container.register(DIToken.HTTP_CLIENT, {
    useClass: AxiosHttpClient,
});

container.register(DIToken.WEATHER_SERVICE, {
    useClass: OpenWeatherApiService,
});

container.register(DIToken.GEOLOCATION_SERVICE, {
    useClass: BrowserGeolocationService,
});

container.register(DIToken.WALLPAPER_SERVICE, {
    useClass: UnsplashService,
});
