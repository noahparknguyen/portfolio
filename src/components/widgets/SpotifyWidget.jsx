import aiaiAnim from "../../assets/monkey-ball-aiai.gif";
import useSpotify from "../../hooks/useSpotify";
import MarqueeText from "../ui/MarqueeText";
import Eyebrow from "../ui/Eyebrow";

function SpotifyWidget() {
  const { track, loading } = useSpotify();
  const heading = track
    ? track.isPlaying
      ? "Now Playing"
      : "Paused"
    : "Nothing playing";

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <Eyebrow as="p">{heading}</Eyebrow>
        {track?.isPlaying ? (
          <Equalizer />
        ) : (
          <span aria-hidden="true" className="text-sm leading-none text-label">
            ♪
          </span>
        )}
      </div>
      <div className="mt-2">
        {loading ? (
          <SkeletonBody />
        ) : !track ? (
          <IdlePlaceholder />
        ) : (
          <TrackBody track={track} />
        )}
      </div>
    </div>
  );
}

function Equalizer() {
  const delays = ["0s", "0.15s", "0.3s"];
  return (
    <span className="flex h-3.5 items-end gap-0.5" aria-hidden="true">
      {delays.map((d) => (
        <span
          key={d}
          className="animate-eq h-full w-1 origin-bottom bg-rose"
          style={{ animationDelay: d }}
        />
      ))}
    </span>
  );
}

// The album art IS the record: cropped to a circle, with groove rings, a rose
// label and a centre hole, spinning only while a track is playing — and it now
// sits half-drawn out of its sleeve. The sleeve is the AiAi cameo: a record
// comes out of a sleeve, so putting the two together is what earns the cameo its
// place instead of parking it beside the widget as a loose GIF.
//
// Geometry: the wrapper is 1.58 : 1, and both the disc and the sleeve are
// `h-full` squares — so each is exactly as wide as the wrapper is tall. The
// sleeve sits flush left, the disc flush right, which leaves 58% of the disc
// showing past the sleeve's edge and hides the rest behind it. The sleeve comes
// later in the DOM so it paints in front, which is the direction that reads as
// "being pulled out" rather than "resting on top".
function SleeveRecord({ albumArt, name, spinning }) {
  return (
    <div className="relative aspect-[1.58/1] w-[46%] shrink-0">
      <div className="absolute right-0 top-0 aspect-square h-full">
        <div
          className={`relative h-full w-full ${spinning ? "animate-vinyl" : ""}`}
        >
          {albumArt ? (
            <img
              src={albumArt}
              alt={`${name} album art`}
              className="h-full w-full rounded-full border-2 border-ink object-cover"
            />
          ) : (
            <div className="h-full w-full rounded-full border-2 border-ink bg-primary-soft" />
          )}
          <svg
            viewBox="0 0 100 100"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="var(--color-ink)"
              style={{ strokeOpacity: "var(--opacity-groove)" }}
            />
            <circle
              cx="50"
              cy="50"
              r="32"
              fill="none"
              stroke="var(--color-ink)"
              style={{ strokeOpacity: "var(--opacity-groove)" }}
            />
            <circle
              cx="50"
              cy="50"
              r="12"
              fill="var(--color-rose)"
              stroke="var(--color-ink)"
              strokeWidth="2"
            />
            <circle cx="50" cy="50" r="3.5" fill="var(--color-ink)" />
          </svg>
        </div>
      </div>

      <div className="absolute left-0 top-0 aspect-square h-full border-2 border-ink bg-white">
        <img
          src={aiaiAnim}
          alt=""
          aria-hidden="true"
          width="126"
          height="126"
          decoding="async"
          className="block h-full w-full object-cover"
        />
        {/* The sleeve's opening — the edge the record slides out of. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-1 top-1.5 border-t-2 border-ink"
        />
      </div>
    </div>
  );
}

function TrackBody({ track }) {
  const content = (
    <div className="flex items-center gap-3">
      <SleeveRecord
        albumArt={track.albumArt}
        name={track.name}
        spinning={track.isPlaying}
      />
      <div className="min-w-0 flex-1">
        <MarqueeText text={track.name} className="text-sm font-bold text-ink" />
        <MarqueeText text={track.artist} className="text-xs text-gray-600" />
        {track.album && (
          <MarqueeText
            text={track.album}
            className="mt-0.5 text-xs text-gray-600"
          />
        )}
      </div>
    </div>
  );

  if (!track.url) return content;

  return (
    <a
      href={track.url}
      target="_blank"
      rel="noreferrer"
      className="block transition-colors hover:bg-primary-soft"
    >
      {content}
    </a>
  );
}

function IdlePlaceholder() {
  return (
    <div className="flex items-center gap-3">
      <SleeveRecord spinning={false} />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold text-ink">404 music not found.</p>
      </div>
    </div>
  );
}

function SkeletonBody() {
  return (
    <div className="flex items-center gap-3" aria-hidden="true">
      <div className="relative aspect-[1.58/1] w-[46%] shrink-0">
        <div className="absolute right-0 top-0 aspect-square h-full animate-pulse rounded-full bg-primary-soft" />
        <div className="absolute left-0 top-0 aspect-square h-full animate-pulse border-2 border-ink bg-primary-soft" />
      </div>
      <div className="min-w-0 flex-1 space-y-2">
        <div className="h-3 w-3/4 animate-pulse bg-primary-soft" />
        <div className="h-3 w-1/2 animate-pulse bg-primary-soft" />
        <div className="h-3 w-2/3 animate-pulse bg-primary-soft" />
      </div>
    </div>
  );
}

export default SpotifyWidget;
