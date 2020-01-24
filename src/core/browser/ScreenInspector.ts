"use strict";

export enum ScreenOrientation {
    PORTRAIT = "portrait",
    LANDSCAPE = "landscape",
}

export interface ScreenSize {
    width: number;
    height: number;
}

export interface ScreenInspector {
    orientation: ScreenOrientation;
    size: ScreenSize;
    dpr: number;
}
