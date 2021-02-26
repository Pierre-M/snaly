import { inject, readonly, ref } from "vue";
import {
  PrecipitationEntry,
  WeatherService,
  WeatherServiceRequest,
  WeatherServiceToken,
} from "@/weather/models/weather.model";

const precipitations = ref<PrecipitationEntry[]>([]);

export default () => {
  const service = inject<WeatherService>(WeatherServiceToken);

  const refreshPrecipitations = async (request: WeatherServiceRequest) => {
    precipitations.value =
      (await service?.getPrecipitationInNextHour(request)) ?? [];
  };

  return {
    precipitations: readonly(precipitations),
    refreshPrecipitations,
  };
};
