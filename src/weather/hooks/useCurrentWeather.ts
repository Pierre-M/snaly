import { computed, inject, readonly, ref } from "vue";
import {
  WeatherOverview,
  WeatherService,
  WeatherServiceRequest,
  WeatherServiceToken,
} from "@/weather/models/weather.model";
import { formattedTemperature } from "@/weather/utils";

const current = ref<WeatherOverview | null>(null);
const loading = ref<boolean>(true);

export default () => {
  const service = inject<WeatherService>(WeatherServiceToken);

  const getCurrent = async (req: WeatherServiceRequest) => {
    loading.value = true;
    current.value = (await service?.getCurrent(req)) ?? null;
    loading.value = false;
  };

  const temperature = computed<string | null>(() => {
    if (!current.value) return null;

    return formattedTemperature(current.value.temperatureOverview.current, {});
  });

  const description = computed<string | null>(() => {
    return current.value?.description.text ?? null;
  });

  const icon = computed<string | null>(
    () => current.value?.description.icon ?? null
  );

  return {
    current: readonly(current),
    loading: readonly(loading),
    temperature,
    description,
    icon,

    getCurrent,
  };
};
