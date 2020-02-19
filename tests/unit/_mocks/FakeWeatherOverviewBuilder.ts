"use strict";

import { WeatherOverview, WeatherOverviewBuilder } from "@/business/weather/WeatherService";
import { Nullable } from "@/types/app";

export class FakeWeatherOverviewBuilder implements WeatherOverviewBuilder {
    returnedValue: Nullable<WeatherOverview> = null;
    build = jest.fn(() => this.returnedValue);
}
