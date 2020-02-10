<template>
    <slide-y-down-transition>
        <ul v-if="suncycle" class="flex justify-end pb-4 mb-4 text-white border-b border-white-20 border-solid text-xl">
            <li v-for="item in items" :key="item.icon" class="flex items-center ml-5" :aria-label="item.label">
                <icon :icon="item.icon" class="mr-1 text-2xl" />
                {{ item.value | time }}
            </li>
        </ul>
    </slide-y-down-transition>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State } from "vuex-class";
import { AppState } from "@/store/store";
import { Nullable } from "@/types/app";
import { CurrentWeatherOverview, SunCycle } from "@/business/weather/WeatherService";
import Icon from "@/ui/core/fundamentals/Icon.vue";
@Component({
    components: { Icon }
})
export default class SuncycleWidget extends Vue {
    @State(state => (state as AppState).weatherModule.current)
    currentWeather!: Nullable<CurrentWeatherOverview>;

    get suncycle(): Nullable<SunCycle> {
        if (!this.currentWeather) {
            return null;
        }

        return this.currentWeather.suncycle;
    }

    get items() {
        if (!this.suncycle) return null;

        return [
            {
                icon: "sunrise",
                value: this.suncycle.sunrise,
                label: this.$t("weather.sunriseLabel")
            },
            {
                icon: "sunset",
                value: this.suncycle.sunset,
                label: this.$t("weather.sunsetLabel")
            }
        ];
    }
}
</script>
