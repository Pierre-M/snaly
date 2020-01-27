"use strict";

import { inject, injectable, singleton } from "tsyringe";
import { DIToken } from "@/core/dependency-injection/DIToken";
import { ScreenInspector } from "@/core/browser/ScreenInspector";
import {
    ContextualImage,
    ContextualImageService
} from "@/core/image/ContextualImageService";
import { Nullable } from "@/types/app";

@injectable()
@singleton()
export class WallpaperService {
    constructor(
        @inject(DIToken.SCREEN_INSPECTOR)
        private screenInspector: ScreenInspector,
        @inject(DIToken.CONTEXTUAL_IMAGE_SERVICE)
        private imageService: ContextualImageService
    ) {}

    async get(query: string): Promise<Nullable<ContextualImage>> {
        return this.imageService.get({
            query,
            width: this.screenInspector.size.width,
            height: this.screenInspector.size.height,
            dpr: this.screenInspector.dpr,
            orientation: this.screenInspector.orientation
        });
    }
}
