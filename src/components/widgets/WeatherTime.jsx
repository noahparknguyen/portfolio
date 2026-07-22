import { useEffect, useState } from "react";
import ottawaSkyline from "../../assets/ottawa-skyline.webp";
import mapleLeaf from "../../assets/maple-leaf.svg";
import useWeather from "../../hooks/useWeather";

const TIMEZONE = "America/Toronto";

function weatherLabel(code) {
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

function glyphFor(code, isDay) {
  if (code === 0) return isDay ? "sun" : "moon";
  if (code === 1 || code === 2) return isDay ? "partly-day" : "partly-night";
  if (code === 45 || code === 48) return "fog";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "snow";
  if ([95, 96, 99].includes(code)) return "storm";
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code))
    return "rain";
  return "cloud";
}

// Shared cloud silhouettes: every condition below composes from one of these
// two spines (positioned per-condition), instead of each carrying its own
// slightly-drifted copy behind a one-off <g transform>.
const BIG_CLOUD_TAIL =
  "a6.5 6.5 0 0 1 0-13 8.5 8.5 0 0 1 16 2 5.5 5.5 0 0 1 1 11H13Z";
const SMALL_CLOUD = "M12 33a6 6 0 0 1 0-12 8 8 0 0 1 15 2 5 5 0 0 1 1 10H13Z";

function WeatherGlyph({ name, isDay = true }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={`h-10 w-10 ${isDay ? "text-ink" : "text-on-ink"}`}
      fill="none"
      stroke="currentColor"
      style={{ strokeWidth: "var(--stroke-regular)" }}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {name === "sun" && (
        <>
          <circle cx="20" cy="20" r="7.5" fill="var(--color-rose)" />
          <line x1="20" y1="2" x2="20" y2="7" />
          <line x1="20" y1="33" x2="20" y2="38" />
          <line x1="2" y1="20" x2="7" y2="20" />
          <line x1="33" y1="20" x2="38" y2="20" />
          <line x1="7.5" y1="7.5" x2="11" y2="11" />
          <line x1="29" y1="29" x2="32.5" y2="32.5" />
          <line x1="32.5" y1="7.5" x2="29" y2="11" />
          <line x1="11" y1="29" x2="7.5" y2="32.5" />
        </>
      )}
      {name === "moon" && (
        <path
          d="M30 24A11 11 0 1 1 19 9a8.5 8.5 0 0 0 11 15Z"
          fill="var(--color-primary-soft)"
        />
      )}
      {name === "cloud" && (
        <path d={`M12 29${BIG_CLOUD_TAIL}`} fill="var(--color-primary-soft)" />
      )}
      {name === "partly-day" && (
        <>
          <circle cx="28" cy="13" r="6" fill="var(--color-rose)" />
          <path d={SMALL_CLOUD} fill="var(--color-primary-soft)" />
        </>
      )}
      {name === "partly-night" && (
        <>
          <path
            d="M32.5 16A7 7 0 1 1 25.5 6.5a5.5 5.5 0 0 0 7 9.5Z"
            fill="var(--color-primary-soft)"
          />
          <path d={SMALL_CLOUD} fill="var(--color-primary-soft)" />
        </>
      )}
      {name === "rain" && (
        <>
          <path
            d={`M12 23.5${BIG_CLOUD_TAIL}`}
            fill="var(--color-primary-soft)"
          />
          <line
            x1="14"
            y1="29.5"
            x2="12"
            y2="34.5"
            stroke="var(--color-rose)"
          />
          <line
            x1="21"
            y1="29.5"
            x2="19"
            y2="34.5"
            stroke="var(--color-rose)"
          />
          <line
            x1="28"
            y1="29.5"
            x2="26"
            y2="34.5"
            stroke="var(--color-rose)"
          />
        </>
      )}
      {name === "snow" && (
        <>
          <path
            d={`M12 24${BIG_CLOUD_TAIL}`}
            fill="var(--color-primary-soft)"
          />
          <circle
            cx="14"
            cy="32"
            r="1.4"
            fill="var(--color-rose)"
            stroke="none"
          />
          <circle
            cx="20"
            cy="33"
            r="1.4"
            fill="var(--color-rose)"
            stroke="none"
          />
          <circle
            cx="26"
            cy="32"
            r="1.4"
            fill="var(--color-rose)"
            stroke="none"
          />
        </>
      )}
      {name === "fog" && (
        <>
          <path
            d={`M12 23${BIG_CLOUD_TAIL}`}
            fill="var(--color-primary-soft)"
          />
          <line x1="12" y1="31" x2="24" y2="31" />
          <line x1="16" y1="35" x2="28" y2="35" />
        </>
      )}
      {name === "storm" && (
        <>
          <path
            d={`M12 21${BIG_CLOUD_TAIL}`}
            fill="var(--color-primary-soft)"
          />
          <polyline
            points="21,26 17,32 21,32 18,37"
            fill="none"
            stroke="var(--color-rose)"
          />
        </>
      )}
    </svg>
  );
}

function Postmark({ clock, dayPeriod }) {
  return (
    <div className="relative -ml-6 flex h-24 w-24 shrink-0 items-center justify-center">
      <svg
        viewBox="0 0 100 100"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      >
        <circle
          cx="50"
          cy="50"
          r="47"
          fill="none"
          stroke="var(--color-ink)"
          style={{ strokeWidth: "var(--stroke-regular)" }}
        />
        <circle
          cx="50"
          cy="50"
          r="38"
          fill="none"
          stroke="var(--color-ink)"
          style={{ strokeWidth: "var(--stroke-fine)" }}
        />
      </svg>
      <div className="relative text-center leading-none">
        <span className="block font-mono text-xs font-bold text-ink">
          OTTAWA
        </span>
        <span className="mt-1 block font-display text-lg font-bold text-ink">
          {clock}
        </span>
        <span className="block font-mono text-xs font-bold text-ink">
          {dayPeriod}
        </span>
      </div>
    </div>
  );
}

function WeatherTime() {
  const [now, setNow] = useState(() => new Date());
  const { weather, loading, error } = useWeather();

  useEffect(() => {
    const intervalId = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(intervalId);
  }, []);

  const timeParts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIMEZONE,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(now);
  const clock = `${timeParts.find((p) => p.type === "hour")?.value ?? ""}:${
    timeParts.find((p) => p.type === "minute")?.value ?? ""
  }`;
  const dayPeriod = (
    timeParts.find((p) => p.type === "dayPeriod")?.value ?? ""
  ).toUpperCase();

  return (
    <div>
      <div className="flex items-start justify-between gap-2">
        <img src={mapleLeaf} alt="" aria-hidden="true" className="h-6 w-auto" />
        <div className="flex shrink-0 items-center">
          <div className="border-2 border-dashed border-ink bg-white p-2 text-center">
            {weather && (
              <WeatherGlyph name={glyphFor(weather.code, weather.isDay)} />
            )}
            <span className="mt-1 block font-mono text-xs tracking-wide text-ink">
              OTTAWA, ON
            </span>
          </div>
          <Postmark clock={clock} dayPeriod={dayPeriod} />
        </div>
      </div>
      <div className="mt-2 text-center">
        {loading ? (
          <div className="flex flex-col items-center gap-1" aria-hidden="true">
            <div className="h-9 w-20 animate-pulse bg-primary-soft" />
            <div className="h-4 w-24 animate-pulse bg-primary-soft" />
          </div>
        ) : error || !weather ? (
          <p className="text-sm text-gray-600">Weather unavailable</p>
        ) : (
          <>
            <p className="font-display text-3xl font-bold text-ink">
              {weather.temperature}°C
            </p>
            <p className="text-sm text-gray-600">
              {weatherLabel(weather.code)}
            </p>
          </>
        )}
      </div>
      <img
        src={ottawaSkyline}
        alt=""
        aria-hidden="true"
        width="720"
        height="186"
        decoding="async"
        className="-mx-4 -mb-4 mt-2 block w-[calc(100%+2rem)] max-w-none"
      />
    </div>
  );
}

export default WeatherTime;
