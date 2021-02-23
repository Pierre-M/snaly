<template>
  <img
    width="40"
    height="40"
    class="w-7 h-7"
    :src="`/weather-icons/${icon}.svg`"
    :alt="icon"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "WeatherIcon",

  props: {
    icon: { type: String, required: true },
  },
});
</script>
