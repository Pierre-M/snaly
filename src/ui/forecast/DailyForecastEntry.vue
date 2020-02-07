<template>
    <section class="text-2xl">
        <header class="flex justify-between items-center cursor-pointer" @click="toggle">
            <h2 class="flex items-center font-light">
                {{ dailyForecast.date | dayString }}
                <icon class="ml-1 text-4xl" :icon="dailyForecast.description.icon" />
            </h2>
            <p>
                {{
                    dailyForecast.temperatureRange.average | temperature({ unit: dailyForecast.temperatureRange.unit })
                }}
            </p>
        </header>

        <collapse-transition>
            <ul v-show="opened" class="flex">
                <li
                    v-for="entry in dailyForecast.forecast"
                    :key="entry.date.toISOString()"
                    class="w-1/8 flex flex-col items-center text-center text-base"
                >
                    <span>{{ entry.date.getHours() }}h</span>
                    <icon :icon="entry.overview.description.icon" class="my-1" />
                    <span>{{ entry.overview.temperatureOverview.current | temperature }}</span>
                </li>
            </ul>
        </collapse-transition>
    </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { WeatherDailyForecast } from "@/business/weather/WeatherService";
import Icon from "@/ui/core/fundamentals/Icon.vue";
import { Action, Getter } from "vuex-class";
import { UIModuleActions, UIModuleGetter } from "@/store/module/ui.module";
import { Nullable } from "@/types/app";
@Component({
    components: { Icon }
})
export default class DailyForecastEntry extends Vue {
    @Prop({ type: Object, required: true })
    dailyForecast!: WeatherDailyForecast;

    @Action(UIModuleActions.TOGGLE_DAILY_FORECAST)
    dispatchToggle!: (forecast: Nullable<WeatherDailyForecast>) => void;

    @Getter(UIModuleGetter.OPENED_FORECAST)
    openedForecast!: Nullable<WeatherDailyForecast>;

    get opened(): boolean {
        if (!this.openedForecast) {
            return false;
        }

        return this.openedForecast.date.toDateString() === this.dailyForecast.date.toDateString();
    }

    toggle() {
        this.dispatchToggle(this.opened ? null : this.dailyForecast);
    }
}
</script>

<style lang="scss" scoped></style>
