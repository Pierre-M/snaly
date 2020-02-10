"use strict";

import { TemperatureUnit } from "@/business/weather/WeatherService";
import { RootState } from "@/store/state";
import { Module } from "vuex";

export interface UserPreferencesModuleState {
    temperatureUnit: TemperatureUnit;
}

export const userPreferencesModule: Module<UserPreferencesModuleState, RootState> = {
    state: {
        temperatureUnit: TemperatureUnit.CELSIUS
    }
};
