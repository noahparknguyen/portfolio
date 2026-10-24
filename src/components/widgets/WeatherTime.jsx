import { useEffect, useState } from "react";
import ottawaSkyline from "../../assets/ottawa-skyline.webp";
import mapleLeaf from "../../assets/maple-leaf.svg";
import useApiResource from "../../hooks/useApiResource";
import { weatherLabel, glyphFor } from "../../lib/weather";

const TIMEZONE = "America/Toronto";
const REFRESH_MS = 600000;

// Every condition composes from these two clouds, so they can't drift into
// slightly different copies.
const BIG_CLOUD_TAIL =
  "a6.5 6.5 0 0 1 0-13 8.5 8.5 0 0 1 16 2 5.5 5.5 0 0 1 1 11H13Z";
const SMALL_CLOUD = "M12 33a6 6 0 0 1 0-12 8 8 0 0 1 15 2 5 5 0 0 1 1 10H13Z";

function WeatherGlyph({ name, muted = false }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={`h-10 w-10 ${muted ? "text-gray-600" : "text-ink"}`}
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
  const { data: weather, loading } = useApiResource("/api/weather", {
    key: "weather",
    pollMs: REFRESH_MS,
  });

  // The clock shows h:mm, so it ticks once a minute from the minute boundary
  // rather than re-rendering every second.
  useEffect(() => {
    let intervalId;
    const timeoutId = setTimeout(
      () => {
        setNow(new Date());
        intervalId = setInterval(() => setNow(new Date()), 60000);
      },
      60000 - (Date.now() % 60000),
    );
    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
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
  // The hook keeps the last good reading through a failed poll, so the postcard
  // only goes blank when there has never been a reading to show.
  const empty = !loading && !weather;

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          {loading ? (
            <div className="flex flex-col gap-1" aria-hidden="true">
              <div className="h-9 w-20 animate-pulse bg-primary-soft" />
              <div className="h-4 w-24 animate-pulse bg-primary-soft" />
            </div>
          ) : empty ? (
            <>
              <p className="font-display text-3xl font-bold text-ink">—°C</p>
              <p className="text-sm text-gray-600">
                couldn&rsquo;t get a reading
              </p>
            </>
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

        <div className="flex shrink-0 items-center">
          <div className="border-2 border-dashed border-ink bg-white p-2 text-center">
            {/* The glyph's size while loading, so the stamp doesn't grow
                40px when the fetch lands. */}
            {loading ? (
              <div
                aria-hidden="true"
                className="h-10 w-10 animate-pulse bg-primary-soft"
              />
            ) : (
              <WeatherGlyph
                name={weather ? glyphFor(weather.code, weather.isDay) : "cloud"}
                muted={empty}
              />
            )}
            <span className="mt-1 flex items-center justify-center gap-1 font-mono text-xs tracking-wide text-ink">
              <img
                src={mapleLeaf}
                alt=""
                aria-hidden="true"
                width="650"
                height="650"
                className="h-3 w-auto"
              />
              CANADA
            </span>
          </div>
          <Postmark clock={clock} dayPeriod={dayPeriod} />
        </div>
      </div>
      {/* The negative margins cancel the card's `p-4` in Home.jsx, so they
          change with it. */}
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
