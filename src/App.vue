<template>
  <app-container>
    <wallpaper-container>
      <p>
        <template v-if="weather"> {{ weather.temperatureInDegrees }}° </template>
      </p>
      <p>
        <template v-if="address">
          {{ address.city }}, {{ address.country }}
        </template>
      </p>
    </wallpaper-container>
  </app-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { BrowserGeolocationService } from "@/core/geolocation/BrowserGeolocationService";
import { Coordinates } from "@/core/geolocation/GeolocationService";
import { OpenWeatherApiService } from "@/core/weather-api/OpenWeatherApiService";
import { AlgoliaGeocodingService } from "@/core/geolocation/AlgoliaGeocodingService";
import AppContainer from "@/ui/layout/AppContainer.vue";
import WallpaperContainer from "@/ui/wallpaper/WallpaperContainer.vue";

@Component({
  components: { WallpaperContainer, AppContainer }
})
export default class App extends Vue {
  location: Coordinates | null = null;
  weather: any = null;
  address: any | null = null;

  async created() {
    this.location = await new BrowserGeolocationService().getCoordinates();
    this.weather = await new OpenWeatherApiService().getByCoordinates(
      this.location
    );
    this.address = await new AlgoliaGeocodingService().getAddress(
      this.location
    );
  }
}
</script>
