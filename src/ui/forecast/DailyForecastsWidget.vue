<template>
    <slide-y-down-transition>
        <ul v-if="days" class="max-w-screen-xs text-white w-full">
            <li v-for="(day, idx) in days" :key="idx">
                <daily-forecast-entry :daily-forecast="day" />
            </li>
        </ul>
    </slide-y-down-transition>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State } from "vuex-class";
import { AppState } from "@/store/store";
import { WeatherDailyForecast } from "@/business/weather/WeatherService";
import { Nullable } from "@/types/app";
import DailyForecastEntry from "@/ui/forecast/DailyForecastEntry.vue";

@Component({
    components: { DailyForecastEntry }
})
export default class DailyForecastsWidget extends Vue {
    @State((state: AppState) => state.dailyForecastsModule.days)
    days!: Nullable<WeatherDailyForecast[]>;
}
</script>
