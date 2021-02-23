import { computed, readonly, ref } from "vue";
import { Location } from "@/location/models/location.model";

const location = ref<Location>({
  lat: 48.8534,
  lng: 2.3488,
  formatted: "Paris, FR",
  zipCode: "75000",
  countryCode: "FR",
});

export default () => {
  const update = (newLocation: Location) => (location.value = newLocation);

  return {
    location: readonly(location),
    formattedLocation: computed<string>(() => location.value.formatted),
    update,
  };
};
