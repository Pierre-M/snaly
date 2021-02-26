import hotkeys from "hotkeys-js";
import useLocationBookmarkNavigation from "@/location-bookmark/hooks/useLocationBookmarkNavigation";
import useLocationSearchPanel from "@/location-search/hooks/useLocationSearchPanel";
import usePanel from "@/core/ui/panel/usePanel";
import useCurrentWeather from "@/weather/hooks/useCurrentWeather";
import useWallpaper from "@/wallpaper/hooks/useWallpaper";

const targetIsEditable = (e: KeyboardEvent) =>
  (e.target as Element).tagName === "INPUT";

export default () => {
  const { goNext, goPrevious } = useLocationBookmarkNavigation();
  const { open } = useLocationSearchPanel();
  const { close } = usePanel();
  const { description } = useCurrentWeather();
  const { refresh } = useWallpaper();

  hotkeys("left", goPrevious);
  hotkeys("right", goNext);

  hotkeys("s", (e: KeyboardEvent) => {
    if (targetIsEditable(e)) return;

    e.preventDefault();
    open();
  });

  hotkeys("escape", (e) => {
    e.preventDefault();
    close();
  });

  hotkeys("r", (e) => {
    if (targetIsEditable(e) || !description.value) return;

    e.preventDefault();
    refresh(description.value);
  });
};
