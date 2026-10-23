import { siSpotify } from "simple-icons";
import aiaiAnim from "../../assets/monkey-ball-aiai.gif";
import useSpotify from "../../hooks/useSpotify";
import MarqueeText from "../ui/MarqueeText";
import Eyebrow from "../ui/Eyebrow";
import SimpleIcon from "../ui/SimpleIcon";
import NewTabHint from "../ui/NewTabHint";

// The top track of the last four weeks, not what's playing now, so the widget
// says what I listen to without saying when (worker/index.js). The label is
// the same whatever loads, so it never needs a skeleton.
function SpotifyWidget() {
  const { track, loading } = useSpotify();

  return (
    <div>
      <Eyebrow as="p">Top track, last 4 weeks</Eyebrow>
      <div className="mt-2">
        {loading ? (
          <SkeletonBody />
        ) : !track ? (
          <IdlePlaceholder />
        ) : (
          <TrackBody track={track} />
        )}
      </div>
      <SpotifyAttribution url={track?.url} />
    </div>
  );
}

// REQUIRED, not decorative. Spotify's Developer Policy: "If you display any
// Spotify Content you must clearly attribute the content as being supplied and
// made available by Spotify, by using the Spotify Marks", and their design
// guidelines add that metadata "must always link back to the Spotify Service".
// The widget shows the track name, artist, album, and cover art, so it carries
// the mark and the link.
//
// The link falls back to open.spotify.com so the link-back exists even when the
// track carries no url of its own. The word "Spotify" sits in `ink` beside the
// mark, so the meaning never rests on the green alone.
function SpotifyAttribution({ url }) {
  return (
    <a
      href={url ?? "https://open.spotify.com"}
      target="_blank"
      rel="noreferrer"
      className="mt-2 flex items-center justify-end gap-1.5"
    >
      <SimpleIcon icon={siSpotify} className="h-4 w-4 text-spotify" />
      <span className="text-xs font-semibold text-ink">Spotify</span>
      <NewTabHint />
    </a>
  );
}

// The album art is the record: cropped to a circle, with groove rings, a rose
// label, and a centre hole, and half drawn out of its sleeve. It stays still,
// since a spinning record would say something is playing now. The sleeve is
// the AiAi cameo: a record comes out of a sleeve, so putting the two together
// is what earns the cameo its place instead of parking it beside the widget as
// a loose GIF.
//
// Geometry: the wrapper is 1.58 : 1, and both the disc and the sleeve are
// `h-full` squares, so each is exactly as wide as the wrapper is tall. The
// sleeve sits flush left, the disc flush right, which leaves 58% of the disc
// showing past the sleeve's edge and hides the rest behind it. The sleeve comes
// later in the DOM so it paints in front, which is the direction that reads as
// "being pulled out" rather than "resting on top".
function SleeveRecord({ albumArt, name }) {
  return (
    <div className="relative aspect-[1.58/1] w-[46%] shrink-0">
      <div className="absolute right-0 top-0 aspect-square h-full">
        <div className="relative h-full w-full">
          {albumArt ? (
            <img
              src={albumArt}
              alt={`${name} album art`}
              /* Spotify's album art is square, and the Worker picks its 300px
                 size, so the browser gets a real intrinsic size up front. */
              width="300"
              height="300"
              decoding="async"
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
          height="151"
          decoding="async"
          className="block h-full w-full object-cover"
        />
        {/* The sleeve's opening, the edge the record slides out of. */}
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
      <SleeveRecord albumArt={track.albumArt} name={track.name} />
      {/* Track, artist, and album come from Spotify, so their punctuation
          isn't the site's to control (see Devlog.jsx). */}
      <div data-live-text="true" className="min-w-0 flex-1">
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
      <SleeveRecord />
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
