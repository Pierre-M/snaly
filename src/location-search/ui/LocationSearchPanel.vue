<template>
  <Panel :id="panelId" @closed="reset">
    <div class="m-auto w-full h-full max-w-screen-sm flex flex-col">
      <LocationSearchInput
        v-model="query"
        @update:modelValue="search($event)"
      />

      <div class="relative flex-1 mt-3">
        <TransitionWrapper name="slide-from-top">
          <LocationSearchResults
            v-show="locationItems.length"
            class="absolute inset-x-0 top-0 max-h-full"
            :results="locationItems"
            @select="handleSelect($event)"
          />
        </TransitionWrapper>
      </div>
    </div>
  </Panel>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import Panel from "@/core/ui/panel/Panel.vue";
import LocationSearchInput from "@/location-search/ui/LocationSearchInput.vue";
import useLocationSearch from "@/location-search/hooks/useLocationSearch";
import LocationSearchResults from "@/location-search/ui/LocationSearchResults.vue";
import useLocation from "@/location/hooks/useLocation";
import { Location } from "@/location/models/location.model";
import useLocationSearchPanel, {
  panelId,
} from "@/location-search/hooks/useLocationSearchPanel";
import TransitionWrapper from "@/core/ui/transitions/TransitionWrapper.vue";
import useLocationBookmark from "@/location-bookmark/hooks/useLocationBookmark";

export default defineComponent({
  name: "LocationSearchPanel",
  components: {
    TransitionWrapper,
    LocationSearchResults,
    LocationSearchInput,
    Panel,
  },

  setup() {
    const query = ref<string>("");
    const { close } = useLocationSearchPanel();
    const { bookmarks } = useLocationBookmark();
    const { results, search, reset: resetResults } = useLocationSearch();

    const { update } = useLocation();

    const reset = () => {
      query.value = "";
      resetResults();
    };

    const handleSelect = (location: Location) => {
      update(location);
      close();
    };

    const locationItems = computed<readonly Location[]>(() => {
      if (results.value.length) return results.value;

      return bookmarks.value;
    });

    return {
      query,

      search,
      reset,
      handleSelect,

      panelId,

      locationItems,
    };
  },
});
</script>
