"use strict";

import { Nullable } from "@/types/app";

export interface Wallpaper {
    src: string;
    color: string;
}

export interface ContextualWallpaperService {
    getWallpaper(query: string): Promise<Nullable<Wallpaper>>;
}
