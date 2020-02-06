<template>
    <slide-y-down-transition>
        <div v-if="currentWeatherOverview" class="current-weather-widget">
            <p class="weather-temp">
                <icon :icon="currentWeatherOverview.description.icon" class="weather-icon" />
                {{ currentWeatherOverview.temperatureOverview.current | temperature }}
            </p>
            <p class="current-weather-widget__desc">
                {{ currentWeatherOverview.description.text }}
            </p>
        </div>
    </slide-y-down-transition>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State } from "vuex-class";
import Icon from "@/ui/core/fundamentals/Icon.vue";
import { CurrentWeatherOverview } from "@/business/weather/WeatherService";
import { AppState } from "@/store/store";

@Component({
    components: {
        Icon
    }
})
export default class App extends Vue {
    @State((state: AppState) => state.currentWeatherModule.overview)
    currentWeatherOverview!: CurrentWeatherOverview;
}
</script>

<style lang="scss" scoped>
.current-weather-widget {
    @include boxAlign;
    flex-direction: column;
    color: $snaly-c-white;
}
.weather-temp {
    @include boxAlign;
}

.weather-icon {
    font-size: 120px;
}
</style>
