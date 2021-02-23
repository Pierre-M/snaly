<template>
  <section class="text-2xl">
    <header class="flex justify-between items-center cursor-pointer">
      <h2 class="flex items-center font-light">
        {{ translatedDay(forecast.date) }}
        <WeatherIcon :icon="forecast.description.icon" class="w-10 h-10" />
      </h2>
      <p>
        {{
          formattedTemperature(forecast.temperatureRange.average, {
            unit: forecast.temperatureRange.unit,
          })
        }}
      </p>
    </header>

    <TransitionWrapper name="collapse">
      <ul v-show="opened" class="flex">
        <li
          v-for="entry in forecast.forecast"
          :key="entry.date.toISOString()"
          class="w-1/8 flex flex-col items-center text-center text-base"
        >
          <span>{{ entry.date.getHours() }}h</span>
          <WeatherIcon
            :icon="entry.overview.description.icon"
            class="w-10 h-10"
          />
          <span>{{
            formattedTemperature(entry.overview.temperatureOverview.current, {
              unit: entry.overview.temperatureOverview.unit,
            })
          }}</span>
        </li>
      </ul>
    </TransitionWrapper>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { formattedTemperature } from "@/weather/utils";
import { translatedDay } from "@/core/date/utils";
import WeatherIcon from "@/weather/ui/WeatherIcon.vue";
import TransitionWrapper from "@/core/ui/transitions/TransitionWrapper.vue";

export default defineComponent({
  name: "DailyForecastsEntry",
  components: { TransitionWrapper, WeatherIcon },
  props: {
    forecast: { type: Object, required: true },
    opened: { type: Boolean, default: false },
  },

  setup() {
    return {
      formattedTemperature,
      translatedDay,
    };
  },
});
</script>
