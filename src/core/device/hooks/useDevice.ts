import { useDevicePixelRatio, useWindowSize } from "@vueuse/core";
import { computed } from "vue";
import { ScreenOrientation } from "@/core/device/models/device.model";

export default () => {
  const { width, height } = useWindowSize();
  const { pixelRatio } = useDevicePixelRatio();
  const orientation = computed<ScreenOrientation>(() => {
    return width.value > height.value
      ? ScreenOrientation.LANDSCAPE
      : ScreenOrientation.PORTRAIT;
  });

  return {
    width,
    height,
    orientation,
    dpr: pixelRatio,
  };
};
