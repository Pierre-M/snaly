<template>
  <IconButton
    :icon="icon"
    label="Bookmark"
    class="transition-opacity opacity-70 hover:opacity-100"
    @click="toggle"
  />
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { Location } from "@/location/models/location.model";
import IconButton from "@/core/ui/icon-button/IconButton.vue";
import useLocationBookmark from "@/location-bookmark/hooks/useLocationBookmark";

export default defineComponent({
  name: "LocationBookmarkToggle",
  components: { IconButton },
  props: {
    location: {
      type: Object,
      required: true,
    },
  },

  setup(props: { location: Location }) {
    const location = computed<Location>(() => props.location);
    const { isBookmarked, toggle } = useLocationBookmark(location);
    const icon = computed<string>(() =>
      isBookmarked.value ? "mdi:star" : "mdi:star-outline"
    );

    return {
      icon,
      isBookmarked,
      toggle,
    };
  },
});
</script>
