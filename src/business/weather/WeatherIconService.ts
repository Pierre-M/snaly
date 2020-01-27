"use strict";

import { iconNameMap } from "@/business/weather/IconNameMap";
import { Nullable } from "@/types/app";

type IconNameMap = Record<string, string>;

export class WeatherIconService {
    private iconNameMap: IconNameMap = iconNameMap;

    getByWeatherIcon(id: string): Nullable<string> {
        return this.iconNameMap[id] || null;
    }
}

export const weatherIconService = new WeatherIconService();
