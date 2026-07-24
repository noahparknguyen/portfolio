import { useState } from "react";
import { FaSteam } from "react-icons/fa6";
import useSteam from "../../hooks/useSteam";
import Eyebrow from "../ui/Eyebrow";
import LabelTag from "../ui/LabelTag";
import PinnedCard from "../ui/PinnedCard";

function formatHours(hours) {
  if (hours < 1) return "<1h";
  return `${Math.round(hours)}h`;
}

function SteamWidget() {
  const { game, loading, error } = useSteam();
  const empty = !loading && (error || !game);

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
        ) : (
          <GameCard game={empty ? null : game} />
        )}
      </PinnedCard>
    </div>
  );
}

// The Steam brand mark rendered as a faded library due-date stamp — a
// monochrome impression (currentColor + reduced opacity), not the full-color
// brand glyph. The emblem's own ring gives it the postmark feel.
function SteamStamp() {
  return (
    <FaSteam
      aria-hidden="true"
      style={{ opacity: "var(--opacity-accent-line)" }}
      className="pointer-events-none absolute right-2 top-2 h-14 w-14 -rotate-12 text-ink"
    />
  );
}

function GameCard({ game }) {
  const [useFallback, setUseFallback] = useState(false);

  return (
    <div>
      <div className="relative aspect-460/215 w-full border-b-2 border-ink bg-primary-soft">
        {game &&
          (useFallback ? (
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
          ))}
        {!game && <SteamStamp />}
      </div>

      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <p className="min-w-0 wrap-break-word font-display text-lg font-semibold text-ink">
            {game ? game.name : "Shelf empty"}
          </p>
          {game?.iconFallback && (
            <img
              src={game.iconFallback}
              alt=""
              aria-hidden="true"
              width="32"
              height="32"
              onError={(e) => {
                e.currentTarget.style.visibility = "hidden";
              }}
              className="pointer-events-none h-8 w-8 shrink-0 -rotate-2 border-2 border-ink"
            />
          )}
        </div>
        <div className="mt-2 flex items-center justify-between gap-2">
          <Eyebrow as="p">All-time</Eyebrow>
          {game ? (
            <span
              aria-label={`${formatHours(game.hoursTotal)} logged all-time`}
              className="shadow-sticker rotate-1 border-2 border-ink bg-white px-2 py-0.5 font-display text-xs font-bold text-ink"
            >
              {formatHours(game.hoursTotal)} LOGGED
            </span>
          ) : (
            <span
              aria-hidden="true"
              className="rotate-2 border-2 border-dashed border-kraft px-2 py-0.5 font-display text-xs font-bold text-gray-600"
            >
              — LOGGED
            </span>
          )}
        </div>
        <div className="mt-5 flex items-center justify-between border-b border-kraft pb-2.5">
          <Eyebrow as="p">This Week</Eyebrow>
          {game ? (
            <span
              aria-label={`${formatHours(
                game.playtime2Weeks / 60,
              )} logged in the last two weeks`}
              className="-rotate-1 border-2 border-live px-2 py-0.5 font-display text-xs font-bold text-ink"
            >
              {formatHours(game.playtime2Weeks / 60)} RECENT
            </span>
          ) : (
            <span
              aria-hidden="true"
              className="-rotate-1 border-2 border-dashed border-kraft px-2 py-0.5 font-display text-xs font-bold text-gray-600"
            >
              — RECENT
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default SteamWidget;
