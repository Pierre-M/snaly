<template>
    <section class="text-2xl">
        <header class="flex justify-between items-center">
            <h2 class="flex items-center">
                {{ dailyForecast.date | dayString }}
                <icon class="ml-1 text-4xl" :icon="dailyForecast.description.icon" />
            </h2>
            <p>
                {{
                    dailyForecast.temperatureRange.average | temperature({ unit: dailyForecast.temperatureRange.unit })
                }}
            </p>
        </header>
    </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { WeatherDailyForecast } from "@/business/weather/WeatherService";
import Icon from "@/ui/core/fundamentals/Icon.vue";
@Component({
    components: { Icon }
})
export default class DailyForecastEntry extends Vue {
    @Prop({ type: Object, required: true })
    dailyForecast!: WeatherDailyForecast;
}
</script>

<style lang="scss" scoped></style>
