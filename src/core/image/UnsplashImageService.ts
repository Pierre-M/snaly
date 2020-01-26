"use strict";

import qs from "querystring";

import {
    ContextualImage,
    ContextualImageRequest,
    ContextualImageService,
} from "@/core/image/ContextualImageService";
import { inject, injectable, singleton } from "tsyringe";
import { DIToken } from "@/core/dependency-injection/DIToken";
import { HttpClient } from "@/core/http/HttpClient";

@injectable()
@singleton()
export class UnsplashImageService implements ContextualImageService {
    private UNSPLASH_API_URL = "https://api.unsplash.com/search/photos";
    private UNSPLASH_API_KEY =
        "1e06a29c85e7f51d089e75a4f5aff4296c0687c55a7814ec64f722a13e310b92";
    private UNSPLASH_BUCKET_SIZE = 10;

    constructor(@inject(DIToken.HTTP_CLIENT) private httpClient: HttpClient) {}

    async get(request: ContextualImageRequest) {
        const [data] = await this.httpClient.get<any>(
            this.UNSPLASH_API_URL,
            this.buildImageRequest(request)
        );

        if (!data) {
            return null;
        }

        const randomItem = this.getRandomImageAmongResults(data.results);

        return UnsplashImageService.buildContextualImage(randomItem, request);
    }

    private buildImageRequest(request: ContextualImageRequest) {
        return {
            query: request.query,
            orientation: request.orientation,
            page: 1,
            per_page: this.UNSPLASH_BUCKET_SIZE,
            client_id: this.UNSPLASH_API_KEY,
        };
    }

    private getRandomImageAmongResults(results: any) {
        return results[Math.floor(Math.random() * this.UNSPLASH_BUCKET_SIZE)];
    }

    private static buildContextualImage(
        image: any,
        request: ContextualImageRequest
    ): ContextualImage {
        const color = image.color;
        const rawUrl = image.urls.raw;
        const sizeParam =
            request.width && request.height
                ? Math.max(request.width, request.height)
                : 0;
        const params = qs.stringify({
            fit: "clamp",
            w: sizeParam,
            h: sizeParam,
            dpi: request.dpr,
        });

        return {
            color,
            src: `${rawUrl}?${params}`,
        };
    }
}
