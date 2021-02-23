<template>
  <TransitionWrapper>
    <IconButton
      v-show="displayNavigation"
      :icon="icon"
      :label="label"
      class="transition-opacity duration-150 text-white opacity-50 w-20 h-20 hover:opacity-100"
      @click="handleNavigation"
    />
  </TransitionWrapper>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import useLocationBookmarkNavigation, {
  NavigationDirection,
} from "@/location-bookmark/hooks/useLocationBookmarkNavigation";
import useLocation from "@/location/hooks/useLocation";
import IconButton from "@/core/ui/icon-button/IconButton.vue";
import TransitionWrapper from "@/core/ui/transitions/TransitionWrapper.vue";

export default defineComponent({
  name: "LocationBookmarkNavigator",
  components: { TransitionWrapper, IconButton },
  props: {
    dir: { type: String, required: true },
  },

  setup(props: { dir: NavigationDirection }) {
    const { location, update } = useLocation();
    const {
      nextBookmark,
      previousBookmark,
      displayNavigation,
    } = useLocationBookmarkNavigation(location);

    const handleNavigation = () => {
      if (props.dir === NavigationDirection.NEXT && !!nextBookmark.value) {
        update(nextBookmark.value);
      }

      if (props.dir === NavigationDirection.PREV && !!previousBookmark.value) {
        update(previousBookmark.value);
      }
    };

    const icon = computed<string>(() =>
      props.dir === NavigationDirection.PREV
        ? "mdi:chevron-left"
        : "mdi:chevron-right"
    );

    const label = computed<string>(() =>
      props.dir === NavigationDirection.PREV ? "Go to previous" : "Go to next"
    );
    return {
      handleNavigation,
      displayNavigation,
      icon,
      label,
    };
  },
});
</script>
