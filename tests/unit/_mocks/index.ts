"use strict";

import { container } from "tsyringe";
import { IWallpaperService } from "@/ui/wallpaper/WallpaperService";
import { DIToken } from "@/core/dependency-injection/DIToken";
import { FakeWallpaperService } from "./FakeWallpaperService";

export const fakeWallpaperService = new FakeWallpaperService();

container.register<IWallpaperService>(DIToken.WALLPAPER_SERVICE, {
    useValue: fakeWallpaperService
});
