"use strict";

import {
    ContextualWallpaperService,
    Wallpaper,
} from "@/business/wallpaper/ContextualWallpaperService";
import { inject, injectable, singleton } from "tsyringe";
import { DIToken } from "@/core/dependency-injection/DIToken";
import { HttpClient } from "@/core/http/HttpClient";
import { Nullable } from "@/types/app";

@injectable()
@singleton()
export class UnsplashService implements ContextualWallpaperService {
    constructor(@inject(DIToken.HTTP_CLIENT) private httpClient: HttpClient) {}

    async getWallpaper(query: string): Promise<Nullable<Wallpaper>> {
        const [res] = await this.httpClient.get<any>(
            `https://api.unsplash.com/search/photos?page=1&query=${query}&per_page=1&client_id=1e06a29c85e7f51d089e75a4f5aff4296c0687c55a7814ec64f722a13e310b92`
        );

        if (!res) {
            return null;
        }

        return {
            src: res.results[0].urls.full,
        };
    }
}
