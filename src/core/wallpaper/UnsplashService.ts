"use strict";

import axios from "axios";
import {
  ContextualWallpaperService,
  Wallpaper
} from "@/core/wallpaper/ContextualWallpaperService";

export class UnsplashService implements ContextualWallpaperService {
  getWallpaper(query: string): Promise<Wallpaper> {
    return axios
      .get(
        `https://api.unsplash.com/search/photos?page=1&query=${query}&per_page=1&client_id=1e06a29c85e7f51d089e75a4f5aff4296c0687c55a7814ec64f722a13e310b92`
      )
      .then(res => res.data.results[0]);
  }
}
