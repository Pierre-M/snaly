"use strict";

import Vue from "vue";
import { TemperatureUnit } from "@/business/weather/WeatherService";
import { I18nService } from "@/ui/core/vue-plugins/I18nPlugin";

interface TemperatureFilterParams {
    unit: TemperatureUnit;
}

Vue.filter("temperature", (value?: number, { unit }: TemperatureFilterParams = { unit: TemperatureUnit.CELSIUS }) => {
    if (!value) {
        return "";
    }

    return `${Math.round(value)}${unit === TemperatureUnit.CELSIUS ? "°" : "°F"}`;
});

Vue.filter("dayString", (value?: Date) => {
    if (!value) {
        return "";
    }

    return I18nService.$t(`days.${value.getDay()}`);
});
