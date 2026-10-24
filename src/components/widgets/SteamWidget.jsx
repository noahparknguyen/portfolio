import { useState } from "react";
import { FaSteam } from "react-icons/fa6";
import useApiResource from "../../hooks/useApiResource";
import { formatHours } from "../../lib/format";
import Eyebrow from "../ui/Eyebrow";
import LabelTag from "../ui/LabelTag";
import PinnedCard from "../ui/PinnedCard";

function SteamWidget() {
  const { data: game, loading } = useApiResource("/api/steam", {
    key: "game",
  });
  const empty = !loading && !game;

  return (
    <div className="flex flex-col gap-3">
      <div className="text-center">
        <LabelTag rotate="-rotate-[1deg]">
          What I&rsquo;ve been playing
        </LabelTag>
      </div>
      <PinnedCard padding="p-0" rotate="rotate-[1deg]">
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

// The Steam mark as a faded stamp, shown only in the empty state. Its -12
// degree tilt is exempt from the tilt cap: a struck stamp is crooked by nature,
// and at 3 degrees it would look like a misaligned icon.
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
            game.iconFallback && (
              <img
                src={game.iconFallback}
                alt={game.name}
                width="32"
                height="32"
                decoding="async"
                className="h-full w-full object-contain p-4"
              />
            )
          ) : (
            <img
              src={game.image}
              alt={`${game.name} header art`}
              /* Steam serves every header.jpg at 460x215, this container's
                 ratio, so the browser gets a real intrinsic size. */
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
        {/* From Steam, so the quote audit skips it. */}
        <p
          data-live-text="true"
          className="wrap-break-word font-display text-lg font-semibold text-ink"
        >
          {game ? game.name : "Nothing lately"}
        </p>
        {/* A real <dl>, since ARIA prohibits naming a bare <span>, and a
            screen reader could drop the "All-time" label. */}
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
