"use strict";

import Vue from "vue";
import isToday from "date-fns/isToday";
import isTomorrow from "date-fns/isTomorrow";
import format from "date-fns/format";
import { TemperatureUnit } from "@/business/weather/WeatherService";
import { I18nService } from "@/ui/core/vue-plugins/I18nPlugin";

interface TemperatureFilterParams {
    unit: TemperatureUnit;
}

export function temperature(value?: number, { unit }: TemperatureFilterParams = { unit: TemperatureUnit.CELSIUS }) {
    if (!value) {
        return "";
    }

    return `${Math.round(value)}${unit === TemperatureUnit.CELSIUS ? "°" : "°F"}`;
}

Vue.filter("temperature", temperature);

Vue.filter("dayString", (value?: Date) => {
    if (!value) return "";

    if (isToday(value)) {
        return I18nService.$t("days.today");
    }

    if (isTomorrow(value)) {
        return I18nService.$t("days.tomorrow");
    }

    return I18nService.$t(`days.${value.getDay()}`);
});

export function time(value?: Date) {
    if (!value) return;

    const pattern = I18nService.$t("date.pattern.time") as string;

    return format(value, pattern);
}

Vue.filter("time", time);
