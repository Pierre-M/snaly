"use strict";

import { WeatherOverview, WeatherOverviewBuilder } from "@/business/weather/WeatherService";
import { Nullable } from "@/types/app";

export class FakeWeatherOverviewBuilder implements WeatherOverviewBuilder {
    build(data: any): Nullable<WeatherOverview> {
        return null;
    }
}
