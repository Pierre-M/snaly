<template>
    <slide-y-down-transition>
        <div v-if="currentWeatherOverview" class="current-weather-widget">
            <p class="current-weather-widget__temp">
                <icon :icon="currentWeatherOverview.description.icon" />
                {{ currentWeatherOverview.temperatureOverview.current | temperature }}
            </p>
        </div>
    </slide-y-down-transition>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State } from "vuex-class";
import { SlideYDownTransition } from "vue2-transitions";
import Icon from "@/ui/fundamentals/Icon.vue";
import { CurrentWeatherOverview } from "@/business/weather/WeatherService";
import { AppState } from "@/store/store";

@Component({
    components: {
        Icon,
        SlideYDownTransition
    }
})
export default class App extends Vue {
    @State((state: AppState) => state.currentWeatherModule.overview)
    currentWeatherOverview!: CurrentWeatherOverview;
}
</script>

<style lang="scss" scoped>
.current-weather-widget {
    &__temp {
        display: flex;
        align-items: center;
        font-size: 100px;
        color: white;
    }
}
</style>
