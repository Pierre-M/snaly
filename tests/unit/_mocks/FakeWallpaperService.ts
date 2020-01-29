"use strict";

import { IWallpaperService } from "@/ui/wallpaper/WallpaperService";
import { Nullable } from "@/types/app";
import { ContextualImage } from "@/core/image/ContextualImageService";
import { injectable, singleton } from "tsyringe";

@injectable()
@singleton()
export class FakeWallpaperService implements IWallpaperService {
    private returnValue: Nullable<ContextualImage> = null;

    get = jest.fn(() => Promise.resolve(this.returnValue));

    setReturnedValue(image: Nullable<ContextualImage>) {
        this.returnValue = image;
    }
}
