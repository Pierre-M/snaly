"use strict";

import { temperature } from "@/ui/core/vue-filters";
import { TemperatureUnit } from "@/business/weather/WeatherService";

describe("Vue filters : temperature", () => {
    it("should round given value", () => {
        const res = temperature(7.6666);
        expect(res).toContain("8");
    });

    it("should apply given unit", () => {
        const resFahrenheit = temperature(8, { unit: TemperatureUnit.FAHRENHEIT });
        expect(resFahrenheit).toBe("8°F");

        const resCelcius = temperature(8, { unit: TemperatureUnit.CELSIUS });
        expect(resCelcius).toBe("8°");
    });

    it("should apply Celcius unit by default", () => {
        const res = temperature(8);
        expect(res).toBe("8°");
    });
});
