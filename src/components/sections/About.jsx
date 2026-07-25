import algonquinLogo from "../../assets/logo-algonquin.webp";
import PinnedCard from "../ui/PinnedCard";
import Eyebrow from "../ui/Eyebrow";
import LabelTag from "../ui/LabelTag";
import Passport from "./Passport";

const WORK = [
  {
    acronym: "FIN",
    org: "FINTRAC",
    role: "Application Developer · Jan – Apr 2024",
    summary:
      "My first professional experience ever. I was given basic tasks and tickets to handle — fairly simple, but an awesome way to get my foot in the door.",
    rotate: "rotate-[2deg]",
    tint: "bg-violet-soft",
    cardTint: "bg-violet-soft",
  },
  {
    acronym: "ALG",
    org: "Algonquin College",
    role: "Software Tester · Sep – Dec 2024",
    summary:
      "Spent my time creating test cases, writing up bug reports, and making sure the new student information system we were working on was sound and stable.",
    rotate: "-rotate-[1.5deg]",
    tint: "bg-blue-soft",
    cardTint: "bg-blue-soft",
  },
  {
    acronym: "DND",
    org: "Department of National Defence",
    role: "Application Developer · Feb – Dec 2025",
    summary:
      "A true professional position. Worked on professional projects, developing internal tools for clients across various teams within DND. My first time owning my features end-to-end.",
    rotate: "rotate-[1.5deg]",
    tint: "bg-orchid-soft",
    cardTint: "bg-orchid-soft",
  },
];

const ACHIEVEMENTS = [
  {
    title: "Advanced Diploma",
    issuer: "Algonquin College · Computer Science",
    detail:
      "A three-year advanced diploma covering computing top to bottom — hardware, software, testing, and design — capped by a real-world team capstone. Graduated with honours, 6× Dean's List, 3.8 GPA.",
    date: "Unlocked · Apr 2026",
    logo: algonquinLogo,
    logoAlt: "Algonquin College logo",
    rotate: "-rotate-[1deg]",
    tint: "bg-blue-soft",
  },
];

function DiplomaGlyph() {
  return (
    <svg viewBox="0 0 70 70" aria-hidden="true" className="h-9 w-9">
      <polygon
        points="35,14 58,25 35,36 12,25"
        fill="var(--color-violet-soft)"
        stroke="var(--color-ink)"
        style={{ strokeWidth: "var(--stroke-bold)" }}
        strokeLinejoin="round"
      />
      <path
        d="M23,29 V41 Q35,48 47,41 V29"
        fill="none"
        stroke="var(--color-ink)"
        style={{ strokeWidth: "var(--stroke-bold)" }}
      />
      <path
        d="M58,25 V44"
        stroke="var(--color-ink)"
        style={{ strokeWidth: "var(--stroke-regular)" }}
      />
      <circle cx="58" cy="46" r="3" fill="var(--color-ink)" />
    </svg>
  );
}

function WorkTimeline() {
  return (
    <section aria-labelledby="work-heading">
      <LabelTag rotate="-rotate-[1deg]">
        <h3 id="work-heading" className="text-xl font-semibold text-ink">
          Where I've Worked
        </h3>
      </LabelTag>
      <div className="mt-4 ml-8">
        <ol className="flex flex-col">
          {WORK.map((job) => (
            <li
              key={job.acronym}
              className="flex items-start gap-4 border-l-2 border-ink pb-6 pl-8"
            >
              <span
                aria-hidden="true"
                className={`shadow-sticker -ml-14 flex h-12 w-12 shrink-0 items-center justify-center border-2 border-ink ${job.tint} font-display font-bold text-ink ${job.rotate}`}
              >
                {job.acronym}
              </span>
              <PinnedCard bg={job.cardTint} padding="p-3">
                <p className="font-display font-semibold text-ink">{job.org}</p>
                <p className="text-xs text-label">{job.role}</p>
                <p className="mt-0.5 text-sm text-gray-600">{job.summary}</p>
              </PinnedCard>
            </li>
          ))}
          <li className="flex items-start gap-4 pl-8">
            <span
              aria-hidden="true"
              className="-ml-14 flex h-12 w-12 shrink-0 items-center justify-center border-2 border-dashed border-ink bg-paper font-display text-lg font-bold text-ink"
            >
              ???
            </span>
            <div className="shadow-sticker border-2 border-dashed border-ink bg-paper p-3">
              <p className="font-display font-semibold text-ink">Pending</p>
              <p className="text-xs text-label">New role incoming</p>
              <p className="mt-0.5 text-sm text-gray-600">
                In the middle of getting my security clearance, wish me luck!
              </p>
              <span className="sr-only">Incoming role: pending.</span>
            </div>
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
          What I've Achieved
        </h3>
      </LabelTag>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {ACHIEVEMENTS.map((a) => (
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
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-violet-soft"
                >
                  <DiplomaGlyph />
                </span>
              )}
              <div className="min-w-0">
                <p className="whitespace-nowrap font-display font-semibold leading-tight text-ink">
                  {a.title}
                </p>
                <p className="text-xs text-label">{a.issuer}</p>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-gray-600">{a.detail}</p>
            <p className="mt-auto self-end font-hand text-label">{a.date}</p>
          </PinnedCard>
        ))}

        <div className="flex flex-col gap-3 border-2 border-dashed border-ink p-4">
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
            <p className="text-xs text-gray-600">Working on the next one.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function About({ onNavigate }) {
  return (
    <div className="flex flex-col gap-8">
      <Passport onNavigate={onNavigate} />
      <WorkTimeline />
      <Achievements />
    </div>
  );
}

export default About;
