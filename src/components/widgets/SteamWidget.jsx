import { useState } from "react";
import useSteam from "../../hooks/useSteam";
import Eyebrow from "../ui/Eyebrow";
import LabelTag from "../ui/LabelTag";
import PinnedCard from "../ui/PinnedCard";

function formatHours(hours) {
  if (hours < 1) return "<1h";
  return `${Math.round(hours)}h`;
}

const DATE_STAMPS = [
  { label: "CHECKED OUT", rotate: "-rotate-2" },
  { label: "RENEWED", rotate: "rotate-1" },
  { label: "RENEWED AGAIN", rotate: "-rotate-1" },
];

function SteamWidget() {
  const { game, loading, error } = useSteam();

  return (
    <div>
      <div className="text-center">
        <LabelTag rotate="rotate-[1deg]">
          <Eyebrow>What I&rsquo;ve been playing</Eyebrow>
        </LabelTag>
      </div>
      <PinnedCard padding="p-0" rotate="rotate-[1deg]" className="mt-2">
        {loading ? (
          <div
            className="aspect-460/215 w-full animate-pulse border-b-2 border-ink bg-primary-soft"
            aria-hidden="true"
          />
        ) : error ? (
          <p className="p-3 text-sm text-gray-600">Offline / Steam</p>
        ) : !game ? (
          <p className="p-3 text-sm text-gray-600">No recent games / Steam</p>
        ) : (
          <GameCard game={game} />
        )}
      </PinnedCard>
    </div>
  );
}

function GameCard({ game }) {
  const [useFallback, setUseFallback] = useState(false);

  return (
    <div>
      <div className="relative aspect-460/215 w-full border-b-2 border-ink bg-primary-soft">
        {useFallback ? (
          <img
            src={game.iconFallback}
            alt={game.name}
            className="h-full w-full object-contain p-4"
          />
        ) : (
          <img
            src={game.image}
            alt={`${game.name} header art`}
            className="h-full w-full object-cover"
            onError={() => setUseFallback(true)}
          />
        )}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1 top-1 block max-w-[85%] truncate bg-ink px-2 py-1 text-xs font-bold tracking-wide text-on-ink"
        >
          {game.name}
        </span>
      </div>

      <div className="p-3">
        <div className="flex items-center justify-between gap-2">
          <Eyebrow as="p">Date Due</Eyebrow>
          <span
            aria-label={`${formatHours(game.hoursTotal)} logged`}
            className="shadow-sticker rotate-2 border-2 border-ink bg-white px-2 py-0.5 font-display text-xs font-bold text-ink"
          >
            {formatHours(game.hoursTotal)} LOGGED
          </span>
        </div>
        <div className="mt-5 space-y-2.5">
          {DATE_STAMPS.map((stamp) => (
            <div
              key={stamp.label}
              className="flex items-center justify-end border-b border-kraft pb-2.5"
            >
              <span
                aria-hidden="true"
                className={`border-2 border-live px-2 py-0.5 font-display text-xs font-bold text-ink ${stamp.rotate}`}
              >
                {stamp.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SteamWidget;
