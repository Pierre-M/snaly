import { inject, readonly, ref } from "vue";
import {
  Wallpaper,
  WallpaperService,
  WallpaperServiceToken,
} from "@/wallpaper/models/wallpaper.model";
import useDevice from "@/core/device/hooks/useDevice";

const wallpaper = ref<Wallpaper | null>(null);

export default () => {
  const service = inject<WallpaperService>(WallpaperServiceToken);
  const { width, height, orientation, dpr } = useDevice();

  const refresh = async (query: string) => {
    wallpaper.value =
      (await service?.get({
        query,
        width: width.value,
        height: height.value,
        dpr: dpr.value,
        orientation: orientation.value,
      })) ?? null;
  };

  return {
    wallpaper: readonly(wallpaper),
    refresh,
  };
};
