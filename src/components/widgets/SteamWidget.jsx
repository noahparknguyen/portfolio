import { useState } from "react";
import { FaSteam } from "react-icons/fa6";
import useSteam from "../../hooks/useSteam";
import { formatHours } from "../../lib/format";
import Eyebrow from "../ui/Eyebrow";
import LabelTag from "../ui/LabelTag";
import PinnedCard from "../ui/PinnedCard";

function SteamWidget() {
  const { game, loading } = useSteam();
  const empty = !loading && !game;

  return (
    <div>
      <div className="text-center">
        <LabelTag rotate="-rotate-[1deg]">
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
// The -12 degree tilt is deliberate and exempt from the cap. That cap governs
// objects that read as HAND-PLACED, where a fixed angle grows visibly skewed
// with width. This is a different gesture: a rubber stamp struck onto paper,
// which is crooked by nature. At 3 degrees it stops reading as a stamp and
// starts reading as a misaligned icon. It is `aria-hidden`, half-opacity, and
// only ever appears in the empty state.
function SteamStamp() {
  return (
    <FaSteam
      data-tilt-exempt="true"
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
              width="32"
              height="32"
              decoding="async"
              className="h-full w-full object-contain p-4"
            />
          ) : (
            <img
              src={game.image}
              alt={`${game.name} header art`}
              /* Steam serves every `header.jpg` at a fixed 460x215, which is
                 also this container's aspect ratio. Remote and dynamic, but the
                 dimensions are a known constant, so the browser gets a real
                 intrinsic size rather than none. */
              width="460"
              height="215"
              decoding="async"
              className="h-full w-full object-cover"
              onError={() => setUseFallback(true)}
            />
          ))}
        {!game && <SteamStamp />}
      </div>

      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          {/* The game name comes from Steam (see Devlog.jsx). */}
          <p
            data-live-text="true"
            className="min-w-0 wrap-break-word font-display text-lg font-semibold text-ink"
          >
            {game ? game.name : "Nothing lately"}
          </p>
          {game?.iconFallback && !useFallback && (
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
        {/* A real <dl>. These were label/value pairs expressed as two loose
            spans, with the pairing carried by an `aria-label` on a bare
            <span> — and ARIA prohibits naming role=generic, so that label was
            free to be dropped entirely, taking the "all-time" / "last two
            weeks" context with it. The <dt> now carries the label
            programmatically, which is both valid and the same structure the
            book's stats page already uses. */}
        <dl>
          <div className="mt-2 flex items-center justify-between gap-2 border-b border-kraft pb-2.5">
            <Eyebrow as="dt">All-time</Eyebrow>
            <dd>
              {game ? (
                <span className="shadow-sticker inline-block rotate-1 border-2 border-ink bg-white px-2 py-0.5 font-display text-xs font-bold text-ink">
                  {formatHours(game.hoursTotal)} LOGGED
                </span>
              ) : (
                <>
                  <span
                    aria-hidden="true"
                    className="inline-block rotate-2 border-2 border-dashed border-kraft px-2 py-0.5 font-display text-xs font-bold text-gray-600"
                  >
                    — LOGGED
                  </span>
                  <span className="sr-only">Not available</span>
                </>
              )}
            </dd>
          </div>
          <div className="mt-5 flex items-center justify-between border-b border-kraft pb-2.5">
            <Eyebrow as="dt">Last 2 Weeks</Eyebrow>
            <dd>
              {game ? (
                <span className="-rotate-1 inline-block border-2 border-live px-2 py-0.5 font-display text-xs font-bold text-ink">
                  {formatHours(game.playtime2Weeks / 60)} RECENT
                </span>
              ) : (
                <>
                  <span
                    aria-hidden="true"
                    className="-rotate-1 inline-block border-2 border-dashed border-kraft px-2 py-0.5 font-display text-xs font-bold text-gray-600"
                  >
                    — RECENT
                  </span>
                  <span className="sr-only">Not available</span>
                </>
              )}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export default SteamWidget;
