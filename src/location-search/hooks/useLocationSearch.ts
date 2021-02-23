import { computed, inject, readonly, ref } from "vue";
import {
  LocationSearchService,
  LocationSearchServiceToken,
} from "@/location-search/models/location-search.model";
import { Location } from "@/location/models/location.model";

export default () => {
  const service = inject<LocationSearchService>(LocationSearchServiceToken);
  const results = ref<Location[]>([]);

  const search = async (query: string) => {
    if (!query) {
      results.value = [];
      return;
    }

    results.value = (await service?.search(query, { locale: "fr" })) ?? [];
  };

  const reset = () => {
    results.value = [];
  };

  return {
    results: readonly(results),
    search,
    reset,
  };
};
