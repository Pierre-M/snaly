<template>
    <slide-y-down-transition>
        <div v-if="weather" class="current-weather-widget">
            <p class="current-weather-widget__temp">
                <icon :icon="weatherIcon" />
                {{ weather.temperatureInDegrees }} <sup>°C</sup>
            </p>
        </div>
    </slide-y-down-transition>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter, State } from "vuex-class";
import { SlideYDownTransition } from "vue2-transitions";
import { CurrentWeather } from "@/business/weather-api/WeatherService";
import { AppState } from "@/store";
import { Nullable } from "@/types/app";
import Icon from "@/ui/fundamentals/Icon.vue";

@Component({
    components: {
        Icon,
        SlideYDownTransition,
    },
})
export default class App extends Vue {
    @State((state: AppState) => state.weather)
    weather!: CurrentWeather;

    @Getter("weatherIcon")
    weatherIcon!: Nullable<string>;
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
