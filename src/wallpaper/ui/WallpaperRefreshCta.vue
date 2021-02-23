<template>
  <IconButton
    icon="mdi:image"
    label="Change wallpaper"
    @click="handleRefresh"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useWallpaper from "../hooks/useWallpaper";
import useCurrentWeather from "@/weather/hooks/useCurrentWeather";
import IconButton from "@/core/ui/icon-button/IconButton.vue";

export default defineComponent({
  name: "WallpaperRefreshCta",
  components: { IconButton },
  setup() {
    const { description } = useCurrentWeather();
    const { refresh } = useWallpaper();

    const handleRefresh = () => {
      if (!description.value) return;

      refresh(description.value);
    };

    return {
      handleRefresh,
    };
  },
});
</script>
