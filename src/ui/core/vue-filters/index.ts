"use strict";

import Vue from "vue";
import { TemperatureUnit } from "../../../business/weather/WeatherService";

interface TemperatureFilterParams {
    unit: TemperatureUnit;
}

Vue.filter("temperature", (value: number, { unit }: TemperatureFilterParams = { unit: TemperatureUnit.CELSIUS }) => {
    if (!value) {
        return "";
    }

    return `${value}${unit === TemperatureUnit.CELSIUS ? "°" : "°F"}`;
});
