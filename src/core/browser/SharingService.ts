"use strict";

export interface ShareRequest {
    url: string;
    title: string;
    text: string;
}

export interface SharingService {
    canShare: boolean;
    share(request: ShareRequest): Promise<void>;
}
