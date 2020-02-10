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

        // let's try / catch share action to avoid errors due to cancelled sharing on mobile
        try {
            // @ts-ignore
            await navigator.share(request);
        } catch (err) {
            //
        }
    }
}
