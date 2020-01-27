"use strict";

import qs from "querystring";

import {
    ContextualImage,
    ContextualImageRequest,
    ContextualImageService
} from "@/core/image/ContextualImageService";
import { inject, injectable, singleton } from "tsyringe";
import { DIToken } from "@/core/dependency-injection/DIToken";
import { HttpClient } from "@/core/http/HttpClient";

// export for testing
export const UNSPLASH_API_URL = "https://api.unsplash.com/search/photos";
export const UNSPLASH_API_KEY =
    "1e06a29c85e7f51d089e75a4f5aff4296c0687c55a7814ec64f722a13e310b92";
export const UNSPLASH_BUCKET_SIZE = 10;
export const BASE_UNSPLASH_REQUEST = {
    page: 1,
    per_page: UNSPLASH_BUCKET_SIZE,
    client_id: UNSPLASH_API_KEY
};
export const BASE_UNSPLASH_FORMATTING_PARAMS = {
    fit: "clamp",
    dpi: 2
};

@injectable()
@singleton()
export class UnsplashImageService implements ContextualImageService {
    private UNSPLASH_API_URL = UNSPLASH_API_URL;
    private UNSPLASH_BUCKET_SIZE = UNSPLASH_BUCKET_SIZE;

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
            ...BASE_UNSPLASH_REQUEST,
            query: request.query,
            orientation: request.orientation
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
            ...BASE_UNSPLASH_FORMATTING_PARAMS,
            w: sizeParam,
            h: sizeParam,
            dpi: request.dpr
        });

        return {
            color,
            src: `${rawUrl}?${params}`
        };
    }
}
