import algonquinLogo from "../../assets/logo-algonquin.webp";
import PinnedCard from "../ui/PinnedCard";
import Eyebrow from "../ui/Eyebrow";
import LabelTag from "../ui/LabelTag";
import Rosette from "../ui/Rosette";
import Passport from "./Passport";
import { BoardingPass, StandbyPass } from "./BoardingPass";

// One pass per job, oldest first. `band` tints the carrier band and the stub,
// which are two parts of one object, so they share a hue. Adjacent passes
// never do, and the standby pass below is on paper, so it can't collide.
const PASSES = [
  {
    carrier: "FINTRAC",
    flight: "FIN 24",
    fare: "Co-op",
    seat: "Application Developer",
    departs: "Jan 2024",
    arrives: "Apr 2024",
    band: "bg-rose-soft",
    remarks:
      "My very first co-op. I spent a couple of months on basic bug tickets, then built a tool to keep the team’s API documentation up to date. It worked, but in hindsight the code was honestly pretty bad. It was my first time, what can you expect.",
  },
  {
    carrier: "Algonquin College",
    flight: "ALG 24",
    fare: "Co-op",
    seat: "Software Tester",
    departs: "Sep 2024",
    arrives: "Dec 2024",
    band: "bg-violet-soft",
    remarks:
      "I got to work on the R3 project, which was a student information system being built to replace the old one at Algonquin. I spent most of my day on manual test cases, running them step by step, making sure features like menus and links behaved the way they were supposed to. Not the most exciting, but I learned a lot about Azure DevOps and Scrum.",
  },
  {
    carrier: "Department of National Defence",
    flight: "DND 25",
    fare: "FSWEP",
    seat: "Application Developer",
    departs: "Feb 2025",
    arrives: "Dec 2025",
    band: "bg-blue-soft",
    remarks:
      "This was my most recent job, and the one that felt closest to the real thing. I had never heard of the Power Platform before my first day, so I had no idea what I was doing. I had to learn quick though. They gave me real client work, I sat in on client meetings, and I saw a couple of the bigger features through from planning to release. It’s easily the most fulfilling work I’ve done.",
  },
];

function WorkHistory() {
  return (
    <section aria-labelledby="work-heading">
      <LabelTag rotate="-rotate-[1deg]">
        <h3 id="work-heading" className="text-xl font-semibold text-ink">
          Where I&rsquo;ve Worked
        </h3>
      </LabelTag>
      <ol className="mt-4 flex flex-col gap-5">
        {PASSES.map((pass) => (
          <li key={pass.flight}>
            <BoardingPass {...pass} />
          </li>
        ))}
        <li>
          <StandbyPass remarks="I don’t have a start date yet, and it could still be a while before I do. Until then, I’m making sure I stay sharp and don’t lose any of my skills. Wish me luck!" />
        </li>
      </ol>
    </section>
  );
}

// One ribbon per term of the program, which Algonquin numbers as levels 01 to
// 06. The hues are solved against both layouts: a single row of six from `md`
// up, and two rows of three below it, so ribbons 1 and 3 apart must differ.
// Opening on the site's canonical rose → violet → blue → orchid order and
// repeating it satisfies both.
const RIBBONS = [
  { level: "01", fill: "var(--color-rose-soft)", rotate: "-rotate-[2deg]" },
  { level: "02", fill: "var(--color-violet-soft)", rotate: "rotate-[1.5deg]" },
  { level: "03", fill: "var(--color-blue-soft)", rotate: "-rotate-[1deg]" },
  { level: "04", fill: "var(--color-orchid-soft)", rotate: "rotate-[2deg]" },
  { level: "05", fill: "var(--color-rose-soft)", rotate: "-rotate-[1.5deg]" },
  { level: "06", fill: "var(--color-violet-soft)", rotate: "rotate-[1deg]" },
];

// The ribbons are `aria-hidden` decoration, so the placard beneath them has to
// say everything they show: the award, how many, and when.
function DeansList() {
  return (
    <div className="flex flex-col gap-4">
      <div aria-hidden="true" className="flex flex-wrap justify-center gap-4">
        {RIBBONS.map((r) => (
          <Rosette
            key={r.level}
            fill={r.fill}
            label={r.level}
            className={r.rotate}
          />
        ))}
      </div>
      <PinnedCard bg="bg-white" padding="p-4">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
          <p className="font-display text-lg font-semibold text-ink">
            Dean&rsquo;s List ×6
          </p>
          <Eyebrow as="p">Algonquin College · Levels 01 to 06</Eyebrow>
        </div>
        <p className="mt-1 text-sm text-gray-600">
          I made the Dean&rsquo;s List in every one of the program&rsquo;s six
          terms. I like being able to see my progress, and getting that proof at
          the end of each term really helped with the stress.
        </p>
        <p className="mt-2 text-right font-hand text-label">
          Unlocked · 2023 – 2026
        </p>
      </PinnedCard>
    </div>
  );
}

// Card stock with a double rule, which is what reads as "certificate" at a
// glance: the outer PinnedCard border, a gap of white, then an inner rule.
// The Algonquin crest sits where a certificate's seal would, in the round
// bezel its brand-colour exception requires (Color → the Algonquin crest).
function Diploma() {
  return (
    <div className="relative">
      <PinnedCard
        bg="bg-white"
        padding="p-2"
        rotate="-rotate-[1deg]"
        className="h-full"
      >
        <div className="flex h-full flex-col items-center border-2 border-ink p-4 text-center">
          <Eyebrow as="p">Algonquin College</Eyebrow>
          <p className="mt-2 font-display text-xl font-semibold text-ink">
            Advanced Diploma
          </p>
          <p className="mt-1 text-sm text-gray-600">
            Computer Engineering Technology – Computing Science
          </p>
          <p className="mt-2 font-bold text-ink">
            Graduated with honours and a 3.8 GPA
          </p>
          <span className="mt-4 block h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-ink">
            <img
              src={algonquinLogo}
              alt="Algonquin College logo"
              width="120"
              height="120"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </span>
          <p className="mt-2 font-hand text-label">Unlocked · Apr 2026</p>
        </div>
      </PinnedCard>
      {/* Honours, on the corner. The GPA in its disc is decoration; the
          sentence above is what states it. The wrapper does the positioning
          because a Rosette is `relative` itself (its label is placed against
          it), and a second position class on the same element loses to
          whichever Tailwind happens to emit later. */}
      <span className="absolute -top-4 right-4 rotate-[3deg]">
        <Rosette size="sm" fill="var(--color-violet-soft)" label="3.8" />
      </span>
    </div>
  );
}

// The next one, not earned yet. A blank certificate in the site's "blank
// form" grammar: dashed rules on warm paper, and an empty seal where the crest
// will go.
function BlankCertificate() {
  return (
    <PinnedCard
      bg="bg-paper"
      padding="p-2"
      rotate="rotate-[1deg]"
      className="border-dashed"
    >
      <div className="flex h-full flex-col items-center justify-center border-2 border-dashed border-ink p-4 text-center">
        <Eyebrow as="p">Locked</Eyebrow>
        <p className="mt-2 font-display text-xl font-semibold text-gray-600">
          Future certification
        </p>
        <p className="mt-1 text-sm text-gray-600">
          Still working on the next one.
        </p>
        <span
          aria-hidden="true"
          className="mt-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-dashed border-ink font-display text-xl font-bold text-gray-600"
        >
          ?
        </span>
      </div>
    </PinnedCard>
  );
}

function Achievements() {
  return (
    <section aria-labelledby="ach-heading">
      <LabelTag rotate="rotate-[1deg]">
        <h3 id="ach-heading" className="text-xl font-semibold text-ink">
          What I&rsquo;ve Achieved
        </h3>
      </LabelTag>
      <div className="mt-4 flex flex-col gap-8">
        <DeansList />
        <div className="grid gap-8 md:grid-cols-2">
          <Diploma />
          <BlankCertificate />
        </div>
      </div>
    </section>
  );
}

function About({ onNavigate }) {
  return (
    // Named like every other section. Home and About were the last two
    // rendering as a bare <div>, so their region was the only one an assistive
    // tech user could not identify or jump to by name.
    <section aria-labelledby="about-heading" className="flex flex-col gap-8">
      <Passport onNavigate={onNavigate} />
      <WorkHistory />
      <Achievements />
    </section>
  );
}

export default About;
