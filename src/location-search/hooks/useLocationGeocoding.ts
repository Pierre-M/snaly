import { inject } from "vue";
import { LocationSearchService, LocationSearchServiceToken } from "@/location-search/models/location-search.model";
import { LocationCoordinates } from "@/location/models/location.model";

export default () => {
    const service = inject<LocationSearchService>(LocationSearchServiceToken);

    const geocode = (coords: LocationCoordinates) => service?.findByCoordinates(coords, { locale: "fr" }) ?? null;

    return { geocode };
};
