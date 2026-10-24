import algonquinLogo from "../../assets/logo-algonquin.webp";
import PinnedCard from "../ui/PinnedCard";
import Eyebrow from "../ui/Eyebrow";
import LabelTag from "../ui/LabelTag";
import Rosette from "../ui/Rosette";
import DateStamp from "../ui/DateStamp";
import Passport from "./Passport";
import { BoardingPass } from "./BoardingPass";

// One pass per job, oldest first. `band` tints the carrier band and the stub,
// and adjacent passes never share one.
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
      <LabelTag id="work-heading" rotate="-rotate-[1deg]">
        Where I&rsquo;ve Worked
      </LabelTag>
      <ol className="mt-4 flex flex-col gap-8">
        {PASSES.map((pass) => (
          <li key={pass.flight}>
            <BoardingPass {...pass} />
          </li>
        ))}
      </ol>
    </section>
  );
}

// One ribbon per term, each drawn over the one before. None is blue, since
// every one touches the certificate's blue frame, and no two touching ribbons
// match.
const RIBBONS = [
  { hue: "rose", place: "left-0 top-0 -rotate-[3deg]" },
  { hue: "violet", place: "left-9 top-0 rotate-[2deg]" },
  { hue: "orchid", place: "left-18 top-0 -rotate-[1deg]" },
  { hue: "orchid", place: "left-4.5 top-8 rotate-[3deg]" },
  { hue: "rose", place: "left-13.5 top-8 -rotate-[2deg]" },
  { hue: "violet", place: "left-22.5 top-8 rotate-[1deg]" },
];

// A tinted frame around a white sheet, so the text always sits on white. The
// wording centres in whatever height the row gives it, since the diploma sets
// it. `ribbons` are children of the tilted card, so they tilt with it.
function Certificate({ frame, rotate, stamp, ribbons, children }) {
  return (
    <PinnedCard
      bg={frame}
      padding="p-6"
      rotate={rotate}
      className="relative h-full"
    >
      <div className="flex h-full flex-col items-center border-2 border-ink bg-white p-4 text-center text-balance">
        <div className="my-auto">{children}</div>
        <div className="flex w-full pt-4">
          <DateStamp label="Unlocked" date={stamp} />
        </div>
      </div>
      {ribbons}
    </PinnedCard>
  );
}

function Recipient() {
  return <p className="mt-2 font-hand text-3xl text-ink">Noah Park-Nguyen</p>;
}

function CertificateTitle({ children }) {
  return (
    <p className="mt-2 font-display text-xl font-semibold text-ink">
      {children}
    </p>
  );
}

// The ribbons are `aria-hidden` decoration, so the wording has to say
// everything they show: the award, how many, and when.
function DeansList() {
  return (
    <Certificate
      frame="bg-blue-soft"
      rotate="rotate-[1deg]"
      stamp="2023 – 2026"
      ribbons={
        <div className="absolute -bottom-5 -right-2 h-30.5 w-36.5">
          {RIBBONS.map((r, n) => (
            <span key={n} className={`absolute ${r.place}`}>
              <Rosette fill={`var(--color-${r.hue}-soft)`} label={n + 1} />
            </span>
          ))}
        </div>
      }
    >
      <Eyebrow as="p">Algonquin College</Eyebrow>
      <CertificateTitle>Dean&rsquo;s List</CertificateTitle>
      <Recipient />
      <p className="mt-2 text-sm text-gray-600">All six terms of the program</p>
    </Certificate>
  );
}

// The crest keeps its brand green, since the college's guidelines forbid
// recolouring it. Its alt is empty because the college's name is printed under
// it. HONOURS hangs beside the rosette because the footer row can't fit it at
// 320px. The rosette is the only place the GPA appears, so its wrapper names it
// for screen readers. A wrapper places it because a Rosette is `relative`
// itself, and two position classes on one element resolve by Tailwind's emit
// order.
function Diploma() {
  return (
    <Certificate
      frame="bg-rose-soft"
      rotate="-rotate-[1deg]"
      stamp="Apr 2026"
      ribbons={
        <div className="absolute -bottom-5 -right-2 flex items-start gap-2">
          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-ink">
            Honours
          </p>
          <span role="img" aria-label="3.8 GPA" className="rotate-[3deg]">
            <Rosette
              size="md"
              fill="var(--color-violet-soft)"
              label={
                <>
                  3.8<span className="mt-0.5 text-xs">GPA</span>
                </>
              }
            />
          </span>
        </div>
      }
    >
      <span className="mx-auto block h-14 w-14 overflow-hidden rounded-full border-2 border-ink">
        <img
          src={algonquinLogo}
          alt=""
          width="120"
          height="120"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </span>
      <Eyebrow as="p" className="mt-2">
        Algonquin College
      </Eyebrow>
      <CertificateTitle>Advanced Diploma</CertificateTitle>
      <Recipient />
      <p className="mt-2 text-sm text-gray-600">
        Computer Engineering Technology – Computing Science
      </p>
    </Certificate>
  );
}

// The ribbons hang 20px below a card, which the 32px gaps around it clear.
function Achievements() {
  return (
    <section aria-labelledby="ach-heading">
      <LabelTag id="ach-heading" rotate="rotate-[1deg]">
        What I&rsquo;ve Achieved
      </LabelTag>
      <div className="mt-4 grid gap-8 md:grid-cols-2">
        <DeansList />
        <Diploma />
      </div>
    </section>
  );
}

function About({ onNavigate }) {
  return (
    <section aria-labelledby="about-heading" className="flex flex-col gap-8">
      <Passport onNavigate={onNavigate} />
      <WorkHistory />
      <Achievements />
    </section>
  );
}

export default About;
