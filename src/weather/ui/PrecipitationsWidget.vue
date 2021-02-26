<template>
  <ol aria-hidden="true" class="flex items-end h-7">
    <li
      v-for="entry in precipitations"
      :key="entry.date"
      class="transition-all delay-1000 flex flex-1 bg-white-20 h-7 rounded-t-lg h-0"
      :style="{ height: `${entry.volume}%` }"
    ></li>
  </ol>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import usePrecipitations from "../hooks/usePrecipitations";

export default defineComponent({
  name: "PrecipitationsWidget",

  setup() {
    const { precipitations } = usePrecipitations();

    return {
      precipitations,
    };
  },
});
</script>
