import useCurrentWeather from "@/weather/hooks/useCurrentWeather";
import useWallpaper from "@/wallpaper/hooks/useWallpaper";
import { watch } from "vue";

export default () => {
  const { current } = useCurrentWeather();
  const { refresh } = useWallpaper();

  watch(current, async (currentWeather) => {
    if (!currentWeather) return;

    await refresh(currentWeather.description.text);
  });
};
