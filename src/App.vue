<template>
    <app-container>
        <weather-screen-layout>
            <wallpaper-component slot="wallpaper" />
            <current-weather-widget slot="weather-widget" />
        </weather-screen-layout>
    </app-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AppContainer from "@/ui/layout/AppContainer.vue";
import WallpaperComponent from "@/ui/wallpaper/Wallpaper.vue";
import CurrentWeatherWidget from "@/ui/current-weather-widget/CurrentWeatherWidget.vue";
import WeatherScreenLayout from "@/ui/layout/WeatherScreenLayout.vue";

@Component({
    components: {
        WeatherScreenLayout,
        CurrentWeatherWidget,
        WallpaperComponent,
        AppContainer
    }
})
export default class App extends Vue {
    created() {
        this.$store.dispatch("init");
    }
}
</script>
