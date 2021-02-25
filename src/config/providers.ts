import { App } from "vue";
import { WeatherServiceToken } from "@/weather/models/weather.model";
import { OWAWeatherService } from "@/weather/services/OWAWeatherService";
import { WallpaperServiceToken } from "@/wallpaper/models/wallpaper.model";
import { UnsplashService } from "@/wallpaper/services/UnsplashService";
import HttpClient from "@/core/http/HttpClient";
import { LocationSearchServiceToken } from "@/location-search/models/location-search.model";
import AlgoliaLocationSearchService from "@/location-search/services/AlgoliaLocationSearchService";
import { GeolocationServiceToken } from "@/geolocation/models/geolocation.model";
import BrowserGeolocationService from "@/geolocation/services/BrowserGeolocationService";

const httpClient = new HttpClient();

export default (app: App) => {
    const providers: [Symbol, object][] = [
        [WeatherServiceToken, new OWAWeatherService(import.meta.env.VITE_OPEN_WEATHER_API_KEY as string, httpClient)],
        [WallpaperServiceToken, new UnsplashService(import.meta.env.VITE_UNSPLASH_API_KEY as string, httpClient)],
        [LocationSearchServiceToken, new AlgoliaLocationSearchService(httpClient)],
        [GeolocationServiceToken, new BrowserGeolocationService()]
    ];

    providers.forEach(([token, instance]) => app.provide(token, instance));
};
