"use strict";

import { fakeWallpaperService } from "../../_mocks";
import Vue from "vue";
import Vuex, { Store } from "vuex";
import {
    wallpaperModule,
    WallpaperModuleAction
} from "@/store/module/wallpaper.module";
import { CurrentWeatherOverview } from "@/business/weather/WeatherService";
import { generateCurrentWeatherOverview } from "../../_mocks/generators/WeatherGenerator";
import { generateContextualImage } from "../../_mocks/generators/ContextualImageGenerator";

Vue.use(Vuex);

let store: Store<any>;
let weatherOverview: CurrentWeatherOverview;

describe("wallpaper store module", () => {
    beforeEach(() => {
        store = new Store({
            modules: {
                wallpaperModule
            }
        });
        weatherOverview = generateCurrentWeatherOverview();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should not call for wallpaper service when weather overview is null", () => {
        store.dispatch(WallpaperModuleAction.REFRESH_WALLPAPER, null);

        expect(fakeWallpaperService.get).not.toHaveBeenCalled();
    });

    it("should call for wallaperService with weather description as query upon wallpaper refresh", () => {
        store.dispatch(
            WallpaperModuleAction.REFRESH_WALLPAPER,
            weatherOverview
        );

        expect(fakeWallpaperService.get).toHaveBeenCalledWith(
            weatherOverview.description.text
        );
    });

    it("should update state when a wallpaper is found or not", async () => {
        const image = generateContextualImage();
        fakeWallpaperService.setReturnedValue(image);

        await store.dispatch(
            WallpaperModuleAction.REFRESH_WALLPAPER,
            weatherOverview
        );

        expect(store.state.wallpaperModule.wallpaper).toEqual(image);
        fakeWallpaperService.setReturnedValue(null);

        await store.dispatch(
            WallpaperModuleAction.REFRESH_WALLPAPER,
            weatherOverview
        );

        expect(store.state.wallpaperModule.wallpaper).toEqual(null);
    });
});
