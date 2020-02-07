"use strict";

import { chain, groupBy, last } from "lodash";
import {
    OWACurrentWeatherBuilderParams,
    OWAWeatherOverviewBuilder
} from "@/business/weather/OWAWeatherOverviewBuilder";
import { WeatherDailyForecast, WeatherDescription } from "@/business/weather/WeatherService";
import { weatherIconService } from "@/business/weather/WeatherIconService";

class OWADailyForecastsBuilder {
    build(forecasts: any[], params: OWACurrentWeatherBuilderParams): WeatherDailyForecast[] {
        const forecastsByDate = this.groupForecastsByDate(forecasts);

        return Object.keys(forecastsByDate).map(date => {
            const forecasts = forecastsByDate[date];

            return {
                date: new Date(parseInt(date, 10)),
                temperatureRange: {
                    average: OWADailyForecastsBuilder.computeAvergageTemperature(forecasts),
                    min: OWADailyForecastsBuilder.getMinTemperature(forecasts),
                    max: OWADailyForecastsBuilder.getMaxTemperature(forecasts),
                    unit: params.unit
                },
                description: OWADailyForecastsBuilder.computeAverageDescription(forecasts),
                forecast: forecasts.map(entry => {
                    return {
                        date: new Date(entry.dt * 1000),
                        overview: OWAWeatherOverviewBuilder(entry, params)
                    };
                })
            };
        });
    }

    private groupForecastsByDate(data: any[]): Record<string, any[]> {
        return groupBy(data, d => {
            const date = new Date(d.dt * 1000);
            const timeOffsetInMinutes = date.getTimezoneOffset();

            return date.setHours(0, -timeOffsetInMinutes, 0, 0);
        });
    }

    private static computeAvergageTemperature(forecasts: any[]): number {
        return forecasts.reduce((acc, curr) => acc + curr.main.temp, 0) / forecasts.length;
    }

    private static getMinTemperature(forecasts: any[]): number {
        return Math.min(...forecasts.map(c => c.main.temp_min));
    }

    private static getMaxTemperature(forecasts: any[]): number {
        return Math.max(...forecasts.map(c => c.main.temp_max));
    }

    private static computeAverageDescription(forecasts: any[]): WeatherDescription {
        const text = OWADailyForecastsBuilder.getElementWithMostOccurences(
            forecasts.map(f => f.weather[0].description)
        );
        const icon = OWADailyForecastsBuilder.getElementWithMostOccurences(forecasts.map(f => f.weather[0].icon));

        return {
            text,
            icon: weatherIconService.getByWeatherIcon(icon)
        };
    }

    private static getElementWithMostOccurences(elements: string[]): string {
        return chain(elements)
            .countBy()
            .toPairs()
            .maxBy(last)
            .head()
            .value() as string;
    }
}

export const owaDailyForecastsBuilder = new OWADailyForecastsBuilder();
