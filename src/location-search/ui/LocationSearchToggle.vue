<template>
  <IconButton icon="mdi:search" label="Open search panel" @click="open" />
  <LocationSearchPanel />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import IconButton from "../../core/ui/icon-button/IconButton.vue";
import LocationSearchPanel from "@/location-search/ui/LocationSearchPanel.vue";
import useLocationSearchPanel from "@/location-search/hooks/useLocationSearchPanel";

export default defineComponent({
  name: "LocationSearchToggle",
  components: { LocationSearchPanel, IconButton },

  setup() {
    const { open } = useLocationSearchPanel();

    return {
      open,
    };
  },
});
</script>
