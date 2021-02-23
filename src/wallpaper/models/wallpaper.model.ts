import { ScreenOrientation } from "@/core/device/models/device.model";

export interface Wallpaper {
  src: string;
  color: string;
}

export interface WallpaperRequest {
  query: string;
  width?: number;
  height?: number;
  dpr?: number;
  orientation?: ScreenOrientation;
}

export interface WallpaperService {
  get(request: WallpaperRequest): Promise<Wallpaper | null>;
}

export const WallpaperServiceToken = Symbol();
