import { inject, readonly, ref } from "vue";
import {
  WeatherDailyForecast,
  WeatherService,
  WeatherServiceRequest,
  WeatherServiceToken,
} from "@/weather/models/weather.model";

const forecasts = ref<WeatherDailyForecast[]>([]);

export default () => {
  const service = inject<WeatherService>(WeatherServiceToken);

  const getForecasts = async (req: WeatherServiceRequest) => {
    forecasts.value = (await service?.getDailyForecasts(req)) ?? [];
  };

  return {
    forecasts: readonly(forecasts),
    getForecasts,
  };
};
