<template>
  <TransitionWrapper name="slide-from-bottom">
    <ul
      v-if="displayForecasts"
      v-click-outside="() => openForecast(-1)"
      class="text-white w-full"
    >
      <li v-for="(day, idx) in forecasts" :key="idx">
        <DailyForecastsEntry
          :forecast="day"
          :opened="idx === openedForecastIdx"
          @click="openForecast(idx)"
        />
      </li>
    </ul>
  </TransitionWrapper>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import useDailyForecasts from "@/weather/hooks/useDailyForecasts";
import TransitionWrapper from "@/core/ui/transitions/TransitionWrapper.vue";
import DailyForecastsEntry from "@/weather/ui/DailyForecastsEntry.vue";

export default defineComponent({
  name: "DailyForecastsWidget",
  components: { DailyForecastsEntry, TransitionWrapper },
  setup() {
    const { forecasts } = useDailyForecasts();
    const displayForecasts = computed<boolean>(() => !!forecasts.value.length);
    const openedForecastIdx = ref<number | null>(0);
    const openForecast = (idx: number) => {
      openedForecastIdx.value = openedForecastIdx.value === idx ? null : idx;
    };

    return {
      forecasts,
      displayForecasts,
      openedForecastIdx,
      openForecast,
    };
  },
});
</script>
