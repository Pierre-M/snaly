"use strict";

export interface Wallpaper {
  src: string;
}

export interface ContextualWallpaperService {
  getWallpaper(query: string): Promise<Wallpaper>;
}
