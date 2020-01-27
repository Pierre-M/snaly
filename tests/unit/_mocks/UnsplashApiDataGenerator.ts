"use strict";

import { UNSPLASH_BUCKET_SIZE } from "@/core/image/UnsplashImageService";

let idx = 0;

function generateResultItem() {
    return {
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        urls: {
            raw: `https://www.image_url_${idx++}`,
        },
    };
}

export function generateUnsplashResults(
    { count }: { count: number } = { count: UNSPLASH_BUCKET_SIZE }
) {
    return {
        results: [...Array(count).keys()].map(generateResultItem),
    };
}
