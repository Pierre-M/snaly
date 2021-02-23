<template>
  <ul class="bg-white text-gray-700 rounded-lg overflow-auto">
    <li
      v-for="location in results"
      :key="location.formatted"
      class="flex items-center justify-between p-4 border-b last:border-b-0 cursor-pointer hover:bg-gray-100"
      @click="$emit('select', location)"
    >
      <p>
        {{ location.formatted }}
        <span class="inline-block ml-1 text-gray-400 text-sm">{{
          location.zipCode
        }}</span>
      </p>

      <LocationBookmarkToggle
        :location="location"
        class="text-gray-500"
        @click.stop
      />
    </li>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { Location } from "@/location/models/location.model";
import LocationBookmarkToggle from "@/location-bookmark/ui/LocationBookmarkToggle.vue";

export default defineComponent({
  name: "LocationSearchResults",
  components: { LocationBookmarkToggle },
  props: {
    results: { type: Array, required: true },
  },

  emits: ["select"],

  setup(props: { results: Location[] }) {
    const visible = computed<boolean>(() => !!props.results.length);

    return {
      visible,
    };
  },
});
</script>
