import noahCandid from "../../assets/noah-candid.webp";
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

// Each row hugs the left/right edges (`sm:justify-between`, slack centered) and
// centers its widgets vertically (`sm:items-center`) so short widgets sit in the
// middle of taller neighbours. Widths are per-widget knobs (`sm:w-[..]`).
const ROW =
  "flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between";

function Home() {
  const monthYear = new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col gap-5 py-3">
      {/* Row 1 — Welcome ←→ Photo */}
      <div className={ROW}>
        <div className="min-w-0 sm:w-[65%]">
          <PinnedCard bg="bg-paper" padding="p-6" className="relative">
            <Pin className="absolute -top-2 left-1/2 -translate-x-1/2" />
            <Eyebrow as="p" className="absolute right-6 top-6 text-right">
              Ottawa · {monthYear}
            </Eyebrow>
            <SectionTitle accent="rose" className="self-start">
              Welcome!
            </SectionTitle>
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
            <p className="mt-4 self-end text-right leading-tight">
              <span className="italic text-label">Best,</span>
              <br />
              <span className="font-hand text-2xl text-ink" aria-hidden="true">
                Noah :)
              </span>
            </p>
            <Stamp className="absolute bottom-2 left-2" />
          </PinnedCard>
        </div>

        <div className="min-w-0 sm:w-[30%]">
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
        <div className="min-w-0 sm:w-[20%]">
          <PinnedCard bg="bg-ink" padding="p-0" rotate="-rotate-[2deg]">
            <LiveReaction />
          </PinnedCard>
        </div>

        <div className="min-w-0 sm:w-[45%]">
          <PinnedCard bg="bg-paper" padding="p-4" rotate="rotate-[1.5deg]">
            <WeatherTime />
          </PinnedCard>
        </div>

        <div className="min-w-0 sm:w-[30%]">
          <Links />
        </div>
      </div>

      {/* Row 3 — My Personal Stack (full-width strip) */}
      <TechStack />

      {/* Row 4 — bento: [Spotify / Devlog] ←→ Steam */}
      <div className={ROW}>
        <div className="flex w-full flex-col gap-5 sm:w-[55%] sm:items-center">
          <div className="min-w-0 w-full sm:w-[70%]">
            <div className="text-center">
              <LabelTag rotate="-rotate-[1deg]">
                <Eyebrow>What I&rsquo;m listening to</Eyebrow>
              </LabelTag>
            </div>
            <PinnedCard
              bg="bg-blue-soft"
              padding="p-3"
              rotate="-rotate-[1deg]"
              className="mt-2"
            >
              <SpotifyWidget />
            </PinnedCard>
          </div>
          <div className="min-w-0 w-full">
            <Devlog />
          </div>
        </div>

        <div className="min-w-0 w-full sm:w-[40%]">
          <SteamWidget />
        </div>
      </div>
    </div>
  );
}

export default Home;
