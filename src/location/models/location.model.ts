export interface LocationCoordinates {
  lat: number;
  lng: number;
}

export interface Location extends LocationCoordinates {
  formatted: string;
  zipCode: string;
  countryCode: string;
}
