import algonquinLogo from "../../assets/logo-algonquin.webp";
import PinnedCard from "../ui/PinnedCard";
import Eyebrow from "../ui/Eyebrow";
import LabelTag from "../ui/LabelTag";
import Passport from "./Passport";

// `rotate` is the acronym badge's tilt (desktop only — the badge is hidden
// below md). `cardRotate` is the note card's tilt, and is the mirror image:
// mobile only, because on desktop the note is a long horizontal strip lined up
// against the timeline's spine, where a tilt reads as a misalignment. Below md
// there is no spine and the card is nearly square, so it can carry one. The
// two never apply at the same width, which is why they can differ freely —
// and why `cardRotate` stays within the guide's cap for anything wider than a
// compact card.
//
// `tint` (badge) and `cardTint` (note) must never match: a badge sits flush
// against its own card across a 16px gap, so sharing a hue makes the pair read
// as one block of colour instead of a marker pinned beside a note. The sequence
// below also keeps adjacent badges, and adjacent cards, distinct.
const WORK = [
  {
    acronym: "FIN",
    org: "FINTRAC",
    role: "Application Developer · Jan – Apr 2024",
    summary:
      "My very first co-op. I spent a couple of months on basic bug tickets, then built a tool to keep the team’s API documentation up to date. It worked, but in hindsight the code was honestly pretty bad. It was my first time, what can you expect.",
    rotate: "rotate-[2deg]",
    cardRotate: "-rotate-[1deg] md:rotate-none",
    tint: "bg-violet-soft",
    cardTint: "bg-rose-soft",
  },
  {
    acronym: "ALG",
    org: "Algonquin College",
    role: "Software Tester · Sep – Dec 2024",
    summary:
      "I got to work on the R3 project, which was a student information system being built to replace the old one at Algonquin. I spent most of my day on manual test cases, running them step by step, making sure features like menus and links behaved the way they were supposed to. Not the most exciting, but I learned a lot about Azure DevOps and Scrum.",
    rotate: "-rotate-[1.5deg]",
    cardRotate: "rotate-[1.5deg] md:rotate-none",
    tint: "bg-blue-soft",
    cardTint: "bg-violet-soft",
  },
  {
    acronym: "DND",
    org: "Department of National Defence",
    role: "Application Developer · Feb – Dec 2025",
    summary:
      "This was my most recent job, and the one that felt closest to the real thing. I had never heard of the Power Platform before my first day, so I had no idea what I was doing. I had to learn quick though. They gave me real client work, I sat in on client meetings, and I saw a couple of the bigger features through from planning to release. It\u2019s easily the most fulfilling work I\u2019ve done.",
    rotate: "rotate-[1.5deg]",
    cardRotate: "-rotate-[1.5deg] md:rotate-none",
    tint: "bg-orchid-soft",
    cardTint: "bg-blue-soft",
  },
];

// The achievement mark for a card with no logo of its own. A star, not a
// mortarboard: at 36px inside the 56px bezel a laurel's leaves collapse into
// mush, and a cap would read as "diploma" right beside the actual diploma card.
function StarGlyph() {
  return (
    <svg viewBox="0 0 70 70" aria-hidden="true" className="h-9 w-9">
      <polygon
        points="35,10 40.9,26.9 58.8,27.3 44.5,38.1 49.7,55.2 35,45 20.3,55.2 25.5,38.1 11.2,27.3 29.1,26.9"
        fill="var(--color-violet-soft)"
        stroke="var(--color-ink)"
        style={{ strokeWidth: "var(--stroke-bold)" }}
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Honours and Dean's List are separate achievements, not one line item: honours
// is a program-level GPA threshold, Dean's List is earned term by term.
const ACHIEVEMENTS = [
  {
    title: "Advanced Diploma",
    issuer: "Algonquin College · Computing Science",
    detail:
      "Computer Engineering Technology \u2013 Computing Science. A three-year program learning about software, hardware, and everything in between. Graduated with honours and averaged a 3.8 GPA.",
    date: "Unlocked · Apr 2026",
    logo: algonquinLogo,
    logoAlt: "Algonquin College logo",
    rotate: "-rotate-[1deg]",
    tint: "bg-blue-soft",
  },
  {
    title: "Dean’s List ×6",
    issuer: "Algonquin College · Computing Science",
    detail:
      "Averaged at least a 3.6 for the term without a single grade below C-, for all 6 terms of the program.",
    date: "Unlocked · 2023 – 2026",
    Glyph: StarGlyph,
    rotate: "rotate-[1deg]",
    tint: "bg-orchid-soft",
  },
];

function WorkTimeline() {
  return (
    <section aria-labelledby="work-heading">
      <LabelTag rotate="-rotate-[1deg]">
        <h3 id="work-heading" className="text-xl font-semibold text-ink">
          Where I&rsquo;ve Worked
        </h3>
      </LabelTag>
      <div className="mt-4 md:ml-8">
        <ol className="flex flex-col">
          {WORK.map((job) => (
            <li
              key={job.acronym}
              className="flex flex-col gap-2 pb-6 md:flex-row md:items-start md:gap-4 md:border-l-2 md:border-ink md:pl-8"
            >
              {/* Desktop-only: the badge hangs off the spine. Below md there
                  is neither spine nor badge — with no rail to sit on it read as
                  clutter beside the org name rather than as a marker. It's
                  aria-hidden, so hiding it costs nothing semantically, and the
                  card takes the full column. */}
              <span
                aria-hidden="true"
                className={`shadow-sticker hidden h-12 w-12 shrink-0 items-center justify-center border-2 border-ink ${job.tint} font-display font-bold text-ink ${job.rotate} md:-ml-14 md:flex`}
              >
                {job.acronym}
              </span>
              <PinnedCard
                bg={job.cardTint}
                padding="p-3"
                rotate={job.cardRotate}
              >
                <p className="font-display font-semibold text-ink">{job.org}</p>
                <p className="text-xs text-label">{job.role}</p>
                <p className="mt-0.5 text-sm text-gray-600">{job.summary}</p>
              </PinnedCard>
            </li>
          ))}
          {/* The spine deliberately stops before this entry — the line ends
              because the future isn't drawn yet, and the ??? badge floats past
              where the rail ran out. Don't "fix" the missing border-l-2. */}
          <li className="flex flex-col gap-2 md:flex-row md:items-start md:gap-4 md:pl-8">
            <span
              aria-hidden="true"
              className="hidden h-12 w-12 shrink-0 items-center justify-center border-2 border-dashed border-ink bg-paper font-display text-lg font-bold text-ink md:-ml-14 md:flex"
            >
              ???
            </span>
            <PinnedCard
              bg="bg-paper"
              padding="p-3"
              rotate="rotate-1 md:rotate-none"
              className="border-dashed"
            >
              <p className="font-display font-semibold text-ink">Pending</p>
              <p className="text-xs text-label">New role incoming</p>
              <p className="mt-0.5 text-sm text-gray-600">
                Security clearance can take up to a year, so for now
                there&rsquo;s not much to do but wait. Wish me luck!
              </p>
            </PinnedCard>
          </li>
        </ol>
      </div>
    </section>
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
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {ACHIEVEMENTS.map((a) => {
          const Glyph = a.Glyph;
          return (
            <PinnedCard
              key={a.title}
              bg={a.tint}
              padding="p-4"
              rotate={a.rotate}
              className="flex flex-col gap-3"
            >
              <div className="flex items-center gap-3">
                {a.logo ? (
                  <span className="block h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-ink">
                    <img
                      src={a.logo}
                      alt={a.logoAlt}
                      width="120"
                      height="120"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </span>
                ) : (
                  <span
                    aria-hidden="true"
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-white"
                  >
                    <Glyph />
                  </span>
                )}
                <div className="min-w-0">
                  <p className="font-display font-semibold leading-tight text-ink">
                    {a.title}
                  </p>
                  <p className="text-xs text-label">{a.issuer}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-gray-600">
                {a.detail}
              </p>
              <p className="mt-auto self-end font-hand text-label">{a.date}</p>
            </PinnedCard>
          );
        })}

        {/* Matches the timeline's Pending card: dashed border + warm paper reads
            as a blank form waiting to be filled in. The fill is not optional —
            without it this card's text sat directly on the sky photo, where
            contrast can't be measured at all. */}
        <PinnedCard
          bg="bg-paper"
          padding="p-4"
          rotate="-rotate-1"
          className="flex flex-col gap-3 border-dashed"
        >
          <Eyebrow as="p" className="text-center">
            Locked
          </Eyebrow>
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-ink font-display text-xl font-bold text-gray-600"
            >
              ?
            </span>
            <div className="min-w-0">
              <p className="font-display font-semibold leading-tight text-gray-600">
                Future certification
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600">
              Still working on the next one.
            </p>
          </div>
        </PinnedCard>
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
      <WorkTimeline />
      <Achievements />
    </section>
  );
}

export default About;
