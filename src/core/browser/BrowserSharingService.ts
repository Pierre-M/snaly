"use strict";

import { ShareRequest, SharingService } from "@/core/browser/SharingService";
import { singleton } from "tsyringe";

@singleton()
export class BrowserSharingService implements SharingService {
    get canShare(): boolean {
        // @ts-ignore
        return typeof navigator.share === "function";
    }

    async share(request: ShareRequest): Promise<void> {
        if (!this.canShare) return;
        // @ts-ignore
        return await navigator.share(request);
    }
}
