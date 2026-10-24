import noahCandid from "../../assets/noah-candid.webp";
import PinnedCard from "../ui/PinnedCard";
import SectionTitle from "../ui/SectionTitle";
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

// Two columns split 3 : 2. Each piece is a little narrower than its column and
// flush with the outer edge, so the outer edges stay straight while the seam
// down the middle wanders.
//
// The letter and the photo are a pair on top rather than the heads of the
// columns, so the markup reads in screen order at every width. Reordering the
// columns on phones instead would make focus skip around. The devlog takes
// whatever height balances the columns (Devlog.jsx).
function Home() {
  return (
    <section aria-labelledby="home-heading" className="flex flex-col gap-5">
      <div className="flex flex-col gap-5 md:flex-row md:items-end">
        <div className="min-w-0 md:w-[64%] md:shrink-0">
          <PinnedCard bg="bg-paper" padding="p-4 md:p-6" className="relative">
            <Pin className="absolute -top-2 left-1/2 -translate-x-1/2" />
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
            {/* Hidden and mirrored by the sr-only line below, since ":)"
                reads badly aloud and "Best," alone has no name. */}
            <p className="mt-4 text-right leading-tight" aria-hidden="true">
              <span className="italic text-label">Best,</span>
              <br />
              <span className="font-hand text-2xl text-ink">Noah :)</span>
            </p>
            <span className="sr-only">Best, Noah</span>
            <Seal className="absolute bottom-2 left-2" />
          </PinnedCard>
        </div>

        <div className="mx-auto min-w-0 max-w-60 md:mx-0 md:flex md:max-w-none md:flex-1 md:justify-end">
          <PinnedCard
            as="figure"
            padding="p-2"
            rotate="rotate-3"
            className="relative md:w-[92%]"
          >
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

      <div className="flex flex-col gap-5 md:flex-row">
        {/* Left column, flush left. */}
        <div className="flex min-w-0 flex-col gap-5 md:flex-3">
          <div className="flex flex-col gap-5 md:w-[94%] md:flex-row md:items-center">
            {/* A fixed width from md: any narrower and the "Live Reaction"
                label wraps onto two lines. */}
            <div className="mx-auto min-w-0 max-w-40 md:mx-0 md:w-33 md:max-w-none md:shrink-0">
              <PinnedCard bg="bg-ink" padding="p-0" rotate="-rotate-[2deg]">
                <LiveReaction />
              </PinnedCard>
            </div>
            <div className="min-w-0 md:flex-1">
              <PinnedCard bg="bg-paper" padding="p-4" rotate="rotate-[1.5deg]">
                <WeatherTime />
              </PinnedCard>
            </div>
          </div>

          {/* The heading and the card are one piece, since the AiAi cameo
              lives inside the card as the record's sleeve (SpotifyWidget.jsx). */}
          <div className="flex min-w-0 flex-col gap-3 md:w-[90%]">
            <div className="text-center">
              <LabelTag rotate="rotate-[1deg]">
                What I&rsquo;ve been listening to
              </LabelTag>
            </div>
            <div>
              <PinnedCard
                bg="bg-blue-soft"
                padding="p-3"
                rotate="-rotate-[1deg]"
              >
                <SpotifyWidget />
              </PinnedCard>
            </div>
          </div>

          <div className="flex min-w-0 flex-col md:w-[92%] md:flex-1">
            <Devlog />
          </div>
        </div>

        {/* Right column, flush right. */}
        <div className="flex min-w-0 flex-col gap-5 md:flex-2 md:items-end">
          <div className="w-full min-w-0 md:w-[93%]">
            <Links />
          </div>
          <div className="w-full min-w-0 md:w-[97%]">
            <SteamWidget />
          </div>
        </div>
      </div>

      <TechStack />
    </section>
  );
}

export default Home;
