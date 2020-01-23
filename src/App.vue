<template>
  <div>
    Welcome on Snaly !<br />
    <p>
      <template v-if="weather"> {{ weather.main.temp }}° </template>
    </p>
    <p>
      <template v-if="address">
        {{ address.city }}, {{ address.country }}
      </template>
    </p>

    <template v-if="wallpaper">
      <img :src="wallpaper.urls.small" />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { BrowserGeolocationService } from "@/core/geolocation/BrowserGeolocationService";
import { Coordinates } from "@/core/geolocation/GeolocationService";
import { OpenWeatherApiService } from "@/core/weather-api/OpenWeatherApiService";
import { AlgoliaGeocodingService } from "@/core/geolocation/AlgoliaGeocodingService";
import { UnsplashService } from "@/core/wallpaper/UnsplashService";

@Component
export default class App extends Vue {
  location: Coordinates | null = null;
  weather: any = null;
  address: any | null = null;
  wallpaper: any | null = null;

  async created() {
    this.location = await new BrowserGeolocationService().getCoordinates();
    this.weather = await new OpenWeatherApiService().getByCoordinates(
      this.location
    );
    this.address = await new AlgoliaGeocodingService().getAddress(
      this.location
    );
    this.wallpaper = await new UnsplashService().getWallpaper(
      this.weather.weather[0].main
    );
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
