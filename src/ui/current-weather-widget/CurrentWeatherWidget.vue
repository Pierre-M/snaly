<template>
    <slide-y-down-transition>
        <div v-if="currentWeatherOverview" class="current-weather-widget">
            <p class="current-weather-widget__temp">
                <icon :icon="currentWeatherOverview.description.icon" />
                {{ currentWeatherOverview.temperatureOverview.current }}
                <sup>°C</sup>
            </p>
        </div>
    </slide-y-down-transition>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State } from "vuex-class";
import { SlideYDownTransition } from "vue2-transitions";
import { AppState } from "@/store";
import Icon from "@/ui/fundamentals/Icon.vue";
import { CurrentWeatherOverview } from "@/business/weather/WeatherService";

@Component({
    components: {
        Icon,
        SlideYDownTransition
    }
})
export default class App extends Vue {
    @State((state: AppState) => state.currentWeatherOverview)
    currentWeatherOverview!: CurrentWeatherOverview;
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
