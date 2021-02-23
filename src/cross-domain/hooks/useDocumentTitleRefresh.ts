import useLocation from "@/location/hooks/useLocation";
import useCurrentWeather from "@/weather/hooks/useCurrentWeather";
import { watchEffect } from "vue";

export default () => {
  const { formattedLocation } = useLocation();
  const { temperature } = useCurrentWeather();

  watchEffect(() => {
    if (!temperature.value) return;

    document.title = `${temperature.value} 📍 ${formattedLocation.value}`;
  });
};
