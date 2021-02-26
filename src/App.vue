<template>
  <AppLayout>
    <template #bg>
      <Wallpaper />
    </template>
    <template #title>
      <div class="flex items-center">
        <p class="text-lg font-medium mr-1">{{ formattedLocation }}</p>
        <LocationBookmarkToggle :location="location" />
      </div>
    </template>
    <template #header-l-actions>
      <WallpaperRefreshCta />
    </template>
    <template #header-r-actions>
      <LocationSearchToggle />
    </template>

    <div class="flex justify-center sm:justify-between items-center w-full">
      <div class="hidden sm:block">
        <LocationBookmarkNavigator :dir="NavigationDirection.PREV" />
      </div>
      <div>
        <CurrentWeatherWidget />
      </div>
      <div class="hidden sm:block">
        <LocationBookmarkNavigator :dir="NavigationDirection.NEXT" />
      </div>
    </div>

    <template #footer>
      <DailyForecastsWidget />
    </template>
  </AppLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppLayout from "./core/ui/layout/AppLayout.vue";
import Wallpaper from "@/wallpaper/ui/Wallpaper.vue";
import useLocation from "@/location/hooks/useLocation";
import CurrentWeatherWidget from "@/weather/ui/CurrentWeatherWidget.vue";
import LocationSearchToggle from "@/location-search/ui/LocationSearchToggle.vue";
import LocationBookmarkToggle from "@/location-bookmark/ui/LocationBookmarkToggle.vue";
import LocationBookmarkNavigator from "@/location-bookmark/ui/LocationBookmarkNavigator.vue";
import { NavigationDirection } from "@/location-bookmark/hooks/useLocationBookmarkNavigation";
import useWallpaperRefresh from "@/cross-domain/hooks/useWallpaperRefresh";
import useCurrentWeatherRefresh from "@/cross-domain/hooks/useWeatherRefresh";
import useDocumentTitleRefresh from "@/cross-domain/hooks/useDocumentTitleRefresh";
import DailyForecastsWidget from "@/weather/ui/DailyForecastsWidget.vue";
import useShortcuts from "@/cross-domain/hooks/useShortcuts";
import WallpaperRefreshCta from "@/wallpaper/ui/WallpaperRefreshCta.vue";
import PrecipitationsWidget from "@/weather/ui/PrecipitationsWidget.vue";

export default defineComponent({
  name: "App",
  components: {
    PrecipitationsWidget,
    WallpaperRefreshCta,
    DailyForecastsWidget,
    LocationBookmarkNavigator,
    LocationBookmarkToggle,
    LocationSearchToggle,
    CurrentWeatherWidget,
    Wallpaper,
    AppLayout,
  },
  setup() {
    const { location, formattedLocation } = useLocation();

    useWallpaperRefresh();
    useCurrentWeatherRefresh();
    useDocumentTitleRefresh();
    useShortcuts();

    return {
      formattedLocation,
      location,
      NavigationDirection,
    };
  },
});
</script>
