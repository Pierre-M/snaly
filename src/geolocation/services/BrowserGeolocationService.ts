import { GeolocationService } from "@/geolocation/models/geolocation.model";
import { LocationCoordinates } from "@/location/models/location.model";

export default class BrowserGeolocationService implements GeolocationService {
    get geolocationIsAvailable() {
        return "geolocation" in navigator;
    }

    async getPosition(): Promise<LocationCoordinates | null> {
        if (!this.geolocationIsAvailable) return null;

        return new Promise((resolve) => {
            navigator.geolocation.getCurrentPosition((position) => {
                resolve({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            });
        });
    }
}
