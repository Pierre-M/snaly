"use strict";

import { SharingService } from "@/core/browser/SharingService";

export class FakeSharingService implements SharingService {
    canShare: boolean = true;

    share = jest.fn();
}
