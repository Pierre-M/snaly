import { inject } from "vue";
import { GeolocationService, GeolocationServiceToken } from "@/geolocation/models/geolocation.model";
import useLocationGeocoding from "@/location-search/hooks/useLocationGeocoding";
import { Location } from "@/location/models/location.model";

export default () => {
    const { geocode } = useLocationGeocoding();
    const geoLocationService = inject<GeolocationService>(GeolocationServiceToken);
    const getCurrentLocation = async (): Promise<Location | null> => {
        const coords = (await geoLocationService?.getPosition()) ?? null;

        if (!coords) return null;

        return geocode(coords);
    };

    return { getCurrentLocation };
};
