<template>
  <main class="wallpaper-container">
    <div
      class="wallpaper-container__background"
      v-if="wallpaper"
      :style="`background-image: url(${wallpaper.urls.full})`"
    ></div>
    <div>
      <slot />
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Coordinates } from "@/core/geolocation/GeolocationService";
import { BrowserGeolocationService } from "@/core/geolocation/BrowserGeolocationService";
import { UnsplashService } from "@/core/wallpaper/UnsplashService";
import { OpenWeatherApiService } from "@/core/weather-api/OpenWeatherApiService";

@Component
export default class WallpaperContainer extends Vue {
  location: Coordinates | null = null;
  wallpaper: any | null = null;
  weather: any = null;

  async created() {
    this.location = await new BrowserGeolocationService().getCoordinates();
    this.weather = await new OpenWeatherApiService().getByCoordinates(
      this.location
    );
    this.wallpaper = await new UnsplashService().getWallpaper(
      this.weather.weather[0].main
    );
  }
}
</script>

<style lang="scss" scoped>
@import "../../../node_modules/reset-css/reset.css";

.wallpaper-container {
  &__background {
    position: fixed;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;

    & + * {
      position: relative;
      z-index: 1;
    }
  }
}
</style>
