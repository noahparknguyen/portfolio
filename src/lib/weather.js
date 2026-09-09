// WMO weather-code interpretation for the Weather postcard.
//
// Two separate mappings on purpose: `weatherLabel` is the words the reader sees
// and `glyphFor` picks the drawing, and they group the codes differently —
// drizzle and rain read as one picture but not as one word. Extracted from the
// component so both tables can be checked for coverage by a test.

export function weatherLabel(code) {
  if (code === 0) return "clear";
  if (code === 1 || code === 2) return "partly cloudy";
  if (code === 3) return "cloudy";
  if (code === 45 || code === 48) return "foggy";
  if ([51, 53, 55, 56, 57].includes(code)) return "drizzle";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "rain";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "snow";
  if ([95, 96, 99].includes(code)) return "thunderstorm";
  return "unsettled";
}

export function glyphFor(code, isDay) {
  if (code === 0) return isDay ? "sun" : "moon";
  if (code === 1 || code === 2) return isDay ? "partly-day" : "partly-night";
  if (code === 45 || code === 48) return "fog";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "snow";
  if ([95, 96, 99].includes(code)) return "storm";
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code))
    return "rain";
  return "cloud";
}

// Every glyph name `glyphFor` can return. WeatherGlyph must be able to draw all
// of them — a name with no matching branch renders an empty <svg>, which is
// invisible in review and obvious to a visitor.
export const GLYPH_NAMES = [
  "sun",
  "moon",
  "partly-day",
  "partly-night",
  "fog",
  "snow",
  "storm",
  "rain",
  "cloud",
];
