import noahCandid from "../../assets/noah-candid.webp";
import PinnedCard from "../ui/PinnedCard";
import SectionTitle from "../ui/SectionTitle";
import Eyebrow from "../ui/Eyebrow";
import LabelTag from "../ui/LabelTag";
import TextLink from "../ui/TextLink";
import Pin from "../ui/Pin";
import Tape from "../ui/Tape";
import Seal from "../ui/Seal";
import SpotifyWidget from "../widgets/SpotifyWidget";
import SteamWidget from "../widgets/SteamWidget";
import LiveReaction from "../widgets/LiveReaction";
import WeatherTime from "../widgets/WeatherTime";
import TechStack from "../widgets/TechStack";
import Links from "../widgets/Links";
import Devlog from "../widgets/Devlog";

// Each row hugs the left/right edges (`md:justify-between`, slack centered) and
// centers its widgets vertically (`md:items-center`) so short widgets sit in the
// middle of taller neighbours. Widths are per-widget knobs (`md:w-[..]`).
const ROW =
  "flex flex-col gap-5 md:flex-row md:items-center md:justify-between";

function Home() {
  const monthYear = new Date().toLocaleDateString("en-CA", {
    month: "long",
    year: "numeric",
  });

  return (
    <section
      aria-labelledby="home-heading"
      className="flex flex-col gap-5 py-3"
    >
      {/* Row 1 — Welcome ←→ Photo */}
      <div className={ROW}>
        <div className="min-w-0 md:w-[65%]">
          <PinnedCard bg="bg-paper" padding="p-4 md:p-6" className="relative">
            <Pin className="absolute -top-2 left-1/2 -translate-x-1/2" />
            <Eyebrow
              as="p"
              className="text-right md:absolute md:right-6 md:top-6"
            >
              Ottawa · {monthYear}
            </Eyebrow>
            <SectionTitle accent="rose" id="home-heading">
              Welcome!
            </SectionTitle>
            <p className="mt-2 text-gray-700">
              Thanks for stopping by! This little site right here is my personal
              take on a portfolio website.
            </p>
            <p className="mt-2 text-gray-700">
              I&rsquo;ve built many portfolios in the past, but none of them
              were really able to capture the exact tone I was looking for. That
              was until I found out about the{" "}
              <TextLink href="https://indieweb.org" accent="rose" external>
                indie web
              </TextLink>{" "}
              and{" "}
              <TextLink href="https://neocities.org" accent="rose" external>
                Neocities
              </TextLink>
              . I decided to ditch all of the jargon, and replace it with things
              that actually mattered to me.
            </p>
            <p className="mt-2 text-gray-700">
              I had a lot of fun making it, and I hope that comes through.
            </p>
            {/* The whole sign-off is aria-hidden and mirrored by the sr-only
                line below: ":)" reads badly aloud, but hiding only the
                signature left a screen reader hearing "Best," with no name. */}
            <p className="mt-4 text-right leading-tight" aria-hidden="true">
              <span className="italic text-label">Best,</span>
              <br />
              <span className="font-hand text-2xl text-ink">Noah :)</span>
            </p>
            <span className="sr-only">Best, Noah</span>
            <Seal className="absolute bottom-2 left-2" />
          </PinnedCard>
        </div>

        <div className="mx-auto min-w-0 max-w-60 md:mx-0 md:w-[30%] md:max-w-none">
          <PinnedCard
            as="figure"
            padding="p-2"
            rotate="rotate-3"
            className="relative"
          >
            {/* Counter-rotated against the card's +3°: tape applied at the
                photo's exact angle reads as printed-on, not taped-on. The
                mismatch is what sells the hand-placed look. */}
            <Tape className="absolute -top-3 left-1/2 -translate-x-1/2 -rotate-6" />
            <img
              src={noahCandid}
              alt="Noah, outdoors at golden hour"
              width="440"
              height="660"
              decoding="async"
              className="h-auto w-full border-2 border-ink"
            />
            <figcaption className="mt-2 text-center font-hand text-2xl text-ink">
              That&rsquo;s me!
            </figcaption>
          </PinnedCard>
        </div>
      </div>

      {/* Row 2 — Live Reaction · Weather · Links */}
      <div className={ROW}>
        <div className="mx-auto min-w-0 max-w-40 md:mx-0 md:w-[20%] md:max-w-none">
          <PinnedCard bg="bg-ink" padding="p-0" rotate="-rotate-[2deg]">
            <LiveReaction />
          </PinnedCard>
        </div>

        <div className="min-w-0 md:w-[45%]">
          <PinnedCard bg="bg-paper" padding="p-4" rotate="rotate-[1.5deg]">
            <WeatherTime />
          </PinnedCard>
        </div>

        <div className="min-w-0 md:w-[30%]">
          <Links />
        </div>
      </div>

      {/* Row 3 — bento: Steam ←→ [Spotify / Devlog] */}
      <div className={ROW}>
        <div className="min-w-0 w-full md:w-[40%]">
          <SteamWidget />
        </div>

        <div className="min-w-0 w-full md:w-[55%]">
          {/* The AiAi cameo now lives inside the Spotify card as the record's
              sleeve (SpotifyWidget.jsx), which frees this whole column for the
              card — it is wider here than it was when the sleeve sat beside it,
              so both the record and the track text gained room. */}
          <div className="text-center">
            <LabelTag rotate="rotate-[1deg]">
              <Eyebrow>What I&rsquo;m listening to</Eyebrow>
            </LabelTag>
          </div>
          <div className="mt-2 min-w-0 w-full">
            <PinnedCard bg="bg-blue-soft" padding="p-3" rotate="-rotate-[1deg]">
              <SpotifyWidget />
            </PinnedCard>
          </div>
          <div className="mt-5 min-w-0 w-full">
            <Devlog />
          </div>
        </div>
      </div>
      {/* Row 4 — My current toolset (full-width strip) */}
      <TechStack />
    </section>
  );
}

export default Home;
