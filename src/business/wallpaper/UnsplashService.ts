"use strict";

import {
    ContextualWallpaperService,
    Wallpaper,
} from "@/business/wallpaper/ContextualWallpaperService";
import { inject, injectable, singleton } from "tsyringe";
import { DIToken } from "@/core/dependency-injection/DIToken";
import { HttpClient } from "@/core/http/HttpClient";
import { Nullable } from "@/types/app";
import {
    ScreenInspector,
    ScreenOrientation,
} from "@/core/browser/ScreenInspector";

const WALLPAPER_BUCKET_SIZE = 10;

@injectable()
@singleton()
export class UnsplashService implements ContextualWallpaperService {
    constructor(
        @inject(DIToken.HTTP_CLIENT)
        private httpClient: HttpClient,

        @inject(DIToken.SCREEN_INSPECTOR)
        private screenInspector: ScreenInspector
    ) {}

    async getWallpaper(query: string): Promise<Nullable<Wallpaper>> {
        const [res] = await this.httpClient.get<any>(
            `https://api.unsplash.com/search/photos?page=1&query=${query}&orientation=${
                this.screenInspector.orientation === ScreenOrientation.PORTRAIT
                    ? "portrait"
                    : "landscape"
            }&per_page=${WALLPAPER_BUCKET_SIZE}&client_id=1e06a29c85e7f51d089e75a4f5aff4296c0687c55a7814ec64f722a13e310b92`
        );

        if (!res) {
            return null;
        }

        const match =
            res.results[Math.floor(Math.random() * WALLPAPER_BUCKET_SIZE)];

        return {
            src:
                match.urls.raw +
                `?fit=clamp&w=${Math.max(
                    this.screenInspector.size.width,
                    this.screenInspector.size.height
                )}&h=${Math.max(
                    this.screenInspector.size.width,
                    this.screenInspector.size.height
                )}&dpi=${this.screenInspector.dpr}`,
            color: match.color,
        };
    }
}
