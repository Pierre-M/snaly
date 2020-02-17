"use strict";

import Vue from "vue";
import isToday from "date-fns/isToday";
import isTomorrow from "date-fns/isTomorrow";
import format from "date-fns/format";
import { TemperatureUnit } from "@/business/weather/WeatherService";
import { container } from "tsyringe";
import { I18nService } from "@/core/i18n/I18nService";
import { DIToken } from "@/core/dependency-injection/DIToken";
import { City } from "@/business/city-search/CitySearchService";

const i18nService = container.resolve<I18nService>(DIToken.I18N_SERVICE);

interface TemperatureFilterParams {
    unit: TemperatureUnit;
}

export function temperature(
    value?: number,
    { unit }: TemperatureFilterParams = { unit: TemperatureUnit.CELSIUS }
): string {
    if (!value) {
        return "";
    }

    return `${Math.round(value)}${unit === TemperatureUnit.CELSIUS ? "°" : "°F"}`;
}

Vue.filter("temperature", temperature);

Vue.filter("dayString", (value?: Date): string => {
    if (!value) return "";

    if (isToday(value)) {
        return i18nService.t("days.today");
    }

    if (isTomorrow(value)) {
        return i18nService.t("days.tomorrow");
    }

    return i18nService.t(`days.${value.getDay()}`);
});

export function time(value?: Date): string {
    if (!value) return "";

    const pattern = i18nService.t("date.pattern.time");

    return format(value, pattern);
}

Vue.filter("time", time);

export function location(city: City): string {
    if (!city) return "";

    return `${city.name}, ${city.countryCode.toLocaleUpperCase()}`;
}

Vue.filter("location", location);
