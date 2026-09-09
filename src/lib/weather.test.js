import { describe, it, expect } from "vitest";
import { weatherLabel, glyphFor, GLYPH_NAMES } from "./weather";

// The full WMO code range the Open-Meteo `weather_code` field can return.
const WMO = [
  0, 1, 2, 3, 45, 48, 51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 71, 73, 75, 77,
  80, 81, 82, 85, 86, 95, 96, 99,
];

describe("glyphFor", () => {
  // A glyph name with no matching branch in WeatherGlyph renders an empty
  // <svg>: invisible in code review, obvious to a visitor.
  it("only ever names a glyph the component can actually draw", () => {
    for (const code of WMO) {
      for (const isDay of [true, false]) {
        expect(GLYPH_NAMES).toContain(glyphFor(code, isDay));
      }
    }
  });

  it("falls back to a cloud for an unknown code", () => {
    expect(glyphFor(12345, true)).toBe("cloud");
  });

  it("is the only mapping that cares about day or night", () => {
    expect(glyphFor(0, true)).toBe("sun");
    expect(glyphFor(0, false)).toBe("moon");
    expect(glyphFor(2, true)).toBe("partly-day");
    expect(glyphFor(2, false)).toBe("partly-night");
    // Everything else looks the same after dark.
    expect(glyphFor(95, true)).toBe(glyphFor(95, false));
  });
});

describe("weatherLabel", () => {
  it("names every WMO code the API can send", () => {
    for (const code of WMO) {
      expect(weatherLabel(code)).toBeTruthy();
      expect(weatherLabel(code)).not.toBe("unsettled");
    }
  });

  it("falls back for an unknown code rather than showing nothing", () => {
    expect(weatherLabel(12345)).toBe("unsettled");
  });

  // The two tables group codes differently on purpose: drizzle and rain are one
  // picture but two different words.
  it("separates drizzle from rain in words where the glyph does not", () => {
    expect(weatherLabel(51)).toBe("drizzle");
    expect(weatherLabel(61)).toBe("rain");
    expect(glyphFor(51, true)).toBe(glyphFor(61, true));
  });
});
