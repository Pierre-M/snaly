import {
  Wallpaper,
  WallpaperRequest,
  WallpaperService,
} from "../models/wallpaper.model";
import { ApiResponse } from "@/core/http/HttpClient";
import { stringify } from "querystring";
import HttpClient from "@/core/http/HttpClient";

export class UnsplashService implements WallpaperService {
  constructor(private apiKey: string, private httpClient: HttpClient) {}

  static unsplashApi = "https://api.unsplash.com/search/photos";
  static unsplashBucketSize = 10;

  async get(request: WallpaperRequest): Promise<Wallpaper | null> {
    const { data } = await this.httpClient.get(
      UnsplashService.unsplashApi,
      this.buildImageRequest(request)
    );

    const item = UnsplashService.getRandomItemAmongResults(data.results);

    return UnsplashService.buildWallpaper(item, request);
  }

  private buildImageRequest({ query, orientation }: WallpaperRequest) {
    return {
      page: 1,
      per_page: UnsplashService.unsplashBucketSize,
      client_id: this.apiKey,
      query,
      orientation,
    };
  }

  private static getRandomItemAmongResults(
    results: ApiResponse[]
  ): ApiResponse {
    return results[
      Math.floor(Math.random() * UnsplashService.unsplashBucketSize)
    ];
  }

  private static buildWallpaper(
    item: ApiResponse,
    { width, height, dpr }: WallpaperRequest
  ): Wallpaper {
    const color = item.color;
    const rawUrl = item.urls.raw;
    const sizeParam = width && height ? Math.max(width, height) : 0;
    const params = stringify({
      fit: "clamp",
      dpi: dpr ?? 2,
      w: sizeParam,
      h: sizeParam,
    });

    return {
      color,
      src: `${rawUrl}?${params}`,
    };
  }
}
