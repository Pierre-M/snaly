"use strict";

import {
    WeatherDescription,
    WeatherIcon,
} from "@/business/weather-api/WeatherService";
import { iconNameMap } from "@/ui/weather-icons/IconNameMap";
import { Nullable } from "@/types/app";

type IconNameMap = Record<WeatherDescription, string>;

export class WeatherIconService {
    private iconNameMap: IconNameMap = iconNameMap;

    getByWeatherId(id: WeatherIcon): Nullable<string> {
        return this.iconNameMap[id] || null;
    }
}

export const weatherIconService = new WeatherIconService();
