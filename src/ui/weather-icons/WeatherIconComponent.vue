<template>
    <component :is="iconName" :style="iconStyle" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import {
    WeatherIconService,
    weatherIconService,
} from "@/ui/weather-icons/WeatherIconService";
import { Nullable } from "@/types/app";
import { Getter } from "vuex-class";
import { WeatherIcon } from "@/business/weather-api/WeatherService";
import WiCloudy from "@/ui/weather-icons/icons/WiCloudy.vue";

const DEFAULT_WEATHER_ICON_SIZE = 60;

@Component({
    components: { WiCloudy },
})
export default class WeatherIconComponent extends Vue {
    private service: WeatherIconService = weatherIconService;

    @Prop({ type: Number, default: DEFAULT_WEATHER_ICON_SIZE })
    size!: number;

    @Getter("weatherId")
    weatherId!: Nullable<WeatherIcon>;

    get iconName(): Nullable<string> {
        if (!this.weatherId) {
            return null;
        }

        return this.service.getByWeatherId(this.weatherId);
    }

    get iconPath(): Nullable<string> {
        if (!this.iconName) {
            return null;
        }

        return `${process.env.BASE_URL}weather-icons/${this.iconName}.svg`;
    }

    get iconStyle() {
        return {
            width: `${this.size}px`,
            height: `${this.size}px`,
            fill: "#fff",
        };
    }
}
</script>
