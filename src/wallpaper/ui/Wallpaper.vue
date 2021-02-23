<template>
  <div
    class="w-full h-full transition-all duration-150 ease-in-out bg-black"
    :class="{ 'backdrop-blur': loading }"
  >
    <TransitionWrapper>
      <div
        v-if="wallpaper"
        ref="container"
        aria-hidden="true"
        class="w-full h-full opacity-80"
        :style="`background-color: ${wallpaper.color}`"
      />
    </TransitionWrapper>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useWallpaper from "@/wallpaper/hooks/useWallpaper";
import TransitionWrapper from "@/core/ui/transitions/TransitionWrapper.vue";
import useWallpaperLoading from "@/wallpaper/hooks/useWallpaperDOMLoading";

export default defineComponent({
  name: "Wallpaper",
  components: { TransitionWrapper },
  setup() {
    const { wallpaper } = useWallpaper();
    const { container, loading } = useWallpaperLoading(wallpaper);

    return {
      container,
      wallpaper,
      loading,
    };
  },
});
</script>
