<template>
    <app-container>
        <wallpaper-container>
            <p>
                <template v-if="weather">
                    {{ weather.temperatureInDegrees }}°
                </template>
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
import { State } from "vuex-class";

import { Coordinates } from "@/business/geolocation/GeolocationService";
import { CurrentWeather } from "@/business/weather-api/WeatherService";

import { AppState } from "@/store";

import AppContainer from "@/ui/layout/AppContainer.vue";
import WallpaperContainer from "@/ui/wallpaper/WallpaperContainer.vue";

@Component({
    components: { WallpaperContainer, AppContainer },
})
export default class App extends Vue {
    address: any | null = null;

    @State((state: AppState) => state.coordinates)
    coordinates!: Coordinates;

    @State((state: AppState) => state.weather)
    weather!: CurrentWeather;

    created() {
        this.$store.dispatch("init");
    }
}
</script>
