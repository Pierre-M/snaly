<template>
  <TransitionWrapper name="slide-from-bottom">
    <div
      v-if="!loading"
      class="flex items-center justify-center flex-col text-white"
    >
      <p class="flex items-center justify-center text-6xl">
        <WeatherIcon :icon="icon" class="w-20 h-20" />
        {{ temperature }}
      </p>
      <p class="text-4xl font-light mt-1">
        {{ description }}
      </p>
    </div>
  </TransitionWrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useCurrentWeather from "@/weather/hooks/useCurrentWeather";
import TransitionWrapper from "@/core/ui/transitions/TransitionWrapper.vue";
import WeatherIcon from "@/weather/ui/WeatherIcon.vue";

export default defineComponent({
  name: "CurrentWeatherWidget",
  components: { WeatherIcon, TransitionWrapper },
  setup() {
    const { loading, temperature, description, icon } = useCurrentWeather();

    return {
      temperature,
      description,
      icon,
      loading,
    };
  },
});
</script>
