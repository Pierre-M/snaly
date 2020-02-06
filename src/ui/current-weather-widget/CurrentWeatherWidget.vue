<template>
    <slide-y-down-transition>
        <div v-if="currentWeatherOverview" class="flex items-center justify-center flex-col text-white">
            <p class="flex items-center justify-center text-6xl">
                <icon :icon="icon" />
                {{ temp | temperature }}
            </p>
            <p class="text-4xl font-light mt-1">
                {{ description }}
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
import { Nullable } from "@/types/app";

@Component({
    components: {
        Icon
    }
})
export default class App extends Vue {
    @State((state: AppState) => state.currentWeatherModule.overview)
    currentWeatherOverview!: CurrentWeatherOverview;

    get icon(): Nullable<string> {
        return this.currentWeatherOverview.description.icon;
    }

    get temp(): number {
        return this.currentWeatherOverview.temperatureOverview.current;
    }

    get description(): string {
        return this.currentWeatherOverview.description.text;
    }
}
</script>
