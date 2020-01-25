<template>
    <slide-y-down-transition>
        <div v-if="weather" class="current-weather-widget">
            <p class="current-weather-widget__temp">
                <weather-icon-component />
                {{ weather.temperatureInDegrees }} <sup>°C</sup>
            </p>
        </div>
    </slide-y-down-transition>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State } from "vuex-class";
import { SlideYDownTransition } from "vue2-transitions";
import { CurrentWeather } from "@/business/weather-api/WeatherService";
import { AppState } from "@/store";
import WeatherIconComponent from "@/ui/weather-icons/WeatherIconComponent.vue";

@Component({
    components: {
        WeatherIconComponent,
        SlideYDownTransition,
    },
})
export default class App extends Vue {
    @State((state: AppState) => state.weather)
    weather!: CurrentWeather;
}
</script>

<style lang="scss" scoped>
.current-weather-widget {
    &__temp {
        font-size: 100px;
        color: white;
    }
}
</style>
