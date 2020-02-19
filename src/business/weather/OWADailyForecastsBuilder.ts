"use strict";

import { chain, groupBy, last } from "lodash";
import {
    WeatherBuilderParams,
    WeatherDailyForecast,
    WeatherDailyForecastsBuilder,
    WeatherDescription,
    WeatherForecastEntry,
    WeatherOverviewBuilder
} from "@/business/weather/WeatherService";
import { weatherIconService } from "@/business/weather/WeatherIconService";
import { inject, injectable, singleton } from "tsyringe";
import { DIToken } from "@/core/dependency-injection/DIToken";
import { AlertingService } from "@/core/alerting/AlertingService";

@injectable()
@singleton()
export class OWADailyForecastsBuilder implements WeatherDailyForecastsBuilder {
    constructor(
        @inject(DIToken.WEATHER_OVERVIEW_BUILDER) private weatherOverviewBuilder: WeatherOverviewBuilder,
        @inject(DIToken.ALERTING_SERVICE) private alertingService: AlertingService
    ) {}

    build(forecasts: any[], params: WeatherBuilderParams): WeatherDailyForecast[] {
        const forecastsByDate = this.groupForecastsByDate(forecasts);

        return Object.keys(forecastsByDate).reduce((forecasts: WeatherDailyForecast[], date: string) => {
            const current = forecastsByDate[date];
            const forecast = this.buildForecastEntries(current, params);

            try {
                return [
                    ...forecasts,
                    {
                        date: new Date(parseInt(date, 10)),
                        temperatureRange: {
                            average: OWADailyForecastsBuilder.computeAvergageTemperature(current),
                            min: OWADailyForecastsBuilder.getMinTemperature(current),
                            max: OWADailyForecastsBuilder.getMaxTemperature(current),
                            unit: params.unit
                        },
                        description: OWADailyForecastsBuilder.computeAverageDescription(current),
                        forecast
                    }
                ];
            } catch (err) {
                this.alertingService.logError(err);

                return forecasts;
            }
        }, []);
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

    private buildForecastEntries(entries: any[], params: WeatherBuilderParams): WeatherForecastEntry[] {
        return entries.reduce((forecast: WeatherForecastEntry[], current: any) => {
            const overview = this.weatherOverviewBuilder.build(current, params);

            if (!overview) return forecast;

            return [
                ...forecast,
                {
                    date: new Date(current.dt * 1000),
                    overview
                }
            ];
        }, []);
    }
}
