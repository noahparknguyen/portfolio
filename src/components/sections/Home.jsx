import noahCandid from "../../assets/noah-candid.webp";
import aiaiGif from "../../assets/monkey-ball-aiai.gif";
import PinnedCard from "../ui/PinnedCard";
import SectionTitle from "../ui/SectionTitle";
import Eyebrow from "../ui/Eyebrow";
import LabelTag from "../ui/LabelTag";
import TextLink from "../ui/TextLink";
import Pin from "../ui/Pin";
import Tape from "../ui/Tape";
import Stamp from "../ui/Stamp";
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
  const monthYear = new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col gap-5 py-3">
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
            <SectionTitle accent="rose">Welcome!</SectionTitle>
            <p className="mt-2 max-w-prose text-gray-700">
              This little site right here is a personal space where I can show
              off more than just my work. Inspired by the{" "}
              <TextLink href="https://indieweb.org" accent="rose" external>
                indie web
              </TextLink>{" "}
              and{" "}
              <TextLink href="https://neocities.org" accent="rose" external>
                Neocities
              </TextLink>
              , I wanted to make something that really reflected me more
              earnestly, sharing my hobbies and interests outside of coding. I
              hope you like it, and thanks for stopping by!
            </p>
            <p className="mt-4 text-right leading-tight">
              <span className="italic text-label">Best,</span>
              <br />
              <span className="font-hand text-2xl text-ink" aria-hidden="true">
                Noah :)
              </span>
            </p>
            <Stamp className="absolute bottom-2 left-2" />
          </PinnedCard>
        </div>

        <div className="mx-auto min-w-0 max-w-60 md:mx-0 md:w-[30%] md:max-w-none">
          <PinnedCard
            as="figure"
            padding="p-2"
            rotate="rotate-3"
            className="relative"
          >
            <Tape className="absolute -top-3 left-1/2 -translate-x-1/2" />
            <img
              src={noahCandid}
              alt="Noah, outdoors at golden hour"
              width="440"
              height="660"
              decoding="async"
              className="h-auto w-full border-2 border-ink"
            />
            <figcaption className="mt-2 text-center font-hand text-2xl text-ink">
              That's me!
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

      {/* Row 3 — bento: Steam ←→ [Spotify + AiAi / Devlog] */}
      <div className={ROW}>
        <div className="min-w-0 w-full md:w-[40%]">
          <SteamWidget />
        </div>

        <div className="min-w-0 w-full md:w-[55%]">
          <div className="flex flex-col items-center md:grid md:grid-cols-[auto_1fr] md:gap-x-4 md:gap-y-2">
            {/* AiAi is placed in the card's grid row (row 2), not spanning the
                label's row, so it centres vertically on the Spotify card itself
                rather than on the taller label+card stack. */}
            <div className="mb-3 flex justify-center md:col-start-1 md:row-start-2 md:mb-0 md:self-center">
              <img
                src={aiaiGif}
                alt=""
                aria-hidden="true"
                width="126"
                height="151"
                decoding="async"
                className="h-auto w-20 rotate-1 border-2 border-ink shadow-sticker"
              />
            </div>
            <div className="text-center md:col-start-2 md:row-start-1">
              <LabelTag rotate="-rotate-[1deg]">
                <Eyebrow>What I&rsquo;m listening to</Eyebrow>
              </LabelTag>
            </div>
            <div className="mt-2 min-w-0 w-full md:col-start-2 md:row-start-2 md:mt-0">
              <PinnedCard
                bg="bg-blue-soft"
                padding="p-3"
                rotate="-rotate-[1deg]"
              >
                <SpotifyWidget />
              </PinnedCard>
            </div>
          </div>
          <div className="mt-5 min-w-0 w-full">
            <Devlog />
          </div>
        </div>
      </div>
      {/* Row 4 — My Personal Stack (full-width strip) */}
      <TechStack />
    </div>
  );
}

export default Home;
