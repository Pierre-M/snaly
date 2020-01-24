"use strict";

import { Nullable } from "@/types/app";

export interface Wallpaper {
    src: string;
}

export interface ContextualWallpaperService {
    getWallpaper(query: string): Promise<Nullable<Wallpaper>>;
}
