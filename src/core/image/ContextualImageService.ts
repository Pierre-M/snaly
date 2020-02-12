"use strict";

import { ScreenOrientation } from "@/core/browser/ScreenInspector";

type HexadecimalColor = string;
type Url = string;

export interface ContextualImage {
    src: Url;
    color: HexadecimalColor;
}

export interface ContextualImageRequest {
    query: string;
    width?: number;
    height?: number;
    dpr?: number;
    orientation?: ScreenOrientation;
}

export interface ContextualImageService {
    get(request: ContextualImageRequest): Promise<ContextualImage>;
}
