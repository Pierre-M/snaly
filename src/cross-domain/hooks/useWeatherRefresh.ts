import useCurrentWeather from "@/weather/hooks/useCurrentWeather";
import useLocation from "@/location/hooks/useLocation";
import { watch } from "vue";
import {
  TemperatureUnit,
  WeatherServiceRequest,
} from "@/weather/models/weather.model";
import useDailyForecasts from "@/weather/hooks/useDailyForecasts";

export default () => {
  const { getCurrent } = useCurrentWeather();
  const { getForecasts } = useDailyForecasts();
  const { location } = useLocation();

  watch(
    location,
    async (val) => {
      const req: WeatherServiceRequest = {
        coordinates: val,
        unit: TemperatureUnit.CELSIUS,
      };

      await Promise.all([getCurrent(req), getForecasts(req)]);
    },
    { deep: true, immediate: true }
  );
};
