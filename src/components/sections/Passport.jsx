import { useRef, useState } from "react";
import headshot from "../../assets/noah-headshot.webp";
import flagCanada from "../../assets/flag-canada.svg";
import flagBc from "../../assets/flag-bc.svg";
import mapleLeaf from "../../assets/maple-leaf.svg";
import canadaMap from "../../assets/canada-map.svg";
import Panel from "../ui/Panel";
import Cell from "../ui/Cell";
import SectionTitle from "../ui/SectionTitle";
import Eyebrow from "../ui/Eyebrow";
import TextLink from "../ui/TextLink";

const ID_FIELDS = [
  { label: "Name / Nom", value: "Noah Park-Nguyen" },
  { label: "Pronouns / Pronoms", value: "He / Him" },
  { label: "Date of birth / Date de naissance", value: "18 OCT" },
  { label: "Birthplace / Lieu de naissance", value: "British Columbia" },
  { label: "Residence / Résidence", value: "Ottawa, ON" },
];

// Decorative — a nod to the games (easter egg), not a real MRZ. Both lines are
// the same length so the per-character columns line up.
const MRZ = [
  "P<CANPARK<NGUYEN<<NOAH<<<<<<<<<<<<<<<<<<<<<<",
  "HK<CELESTE<BALATRO<<<<<<<<<<<<<<<<<<<<<<<<<<",
];

// Shorter variant for below `md` — the full 44-char strip needs ~317px at
// text-xs against a 244px cell (STYLE_GUIDE.md → Mobile composition). Same
// spirit, same prefixes, just padded to a shorter shared length so the
// per-character columns still line up. Padded rather than hand-counted so the
// two lines can never drift out of sync.
const MRZ_SHORT_LEN = 28;
const MRZ_SHORT = [
  "P<CANPARK<NGUYEN<<".padEnd(MRZ_SHORT_LEN, "<"),
  "HK<CELESTE<BALATRO<".padEnd(MRZ_SHORT_LEN, "<"),
];

const TABS = [
  { key: "bio", label: "Bio", tint: "bg-rose-soft" },
  { key: "journey", label: "Journey", tint: "bg-violet-soft" },
  { key: "hobbies", label: "Hobbies", tint: "bg-blue-soft" },
  { key: "workflow", label: "Workflow", tint: "bg-orchid-soft" },
];

const CHAPTERS = {
  journey: [
    "I started coding at around 17. I took an intro programming class and was hooked immediately. After graduating, I picked up a handful of summer and online courses to meet the math prerequisites I needed for post-secondary.",
    "I worked a handful of jobs over the next year and a half to save up, then moved out to Ottawa to study Computer Science at Algonquin College. During the last four years, I earned my advanced diploma with honours, picked up about a year's worth of professional experience through my co-ops, and (after plenty of failed interviews and applications) somehow landed a developer role with the government.",
  ],
  hobbies: [
    "I'm a huge gaming fan (obviously), especially indie titles like Celeste, Hollow Knight, and Balatro. Lately I've been on a big nostalgia trip, replaying all my favourite childhood games like Pikmin, Pokémon Black and White, and Super Monkey Ball.",
    <>
      One of my favourite hobbies is{" "}
      <TextLink
        href="https://www.speedrun.com/users/SerenePrince"
        accent="violet"
        external
      >
        speedrunning
      </TextLink>
      . I used to run categories like Super Meat Boy and Hollow Knight Any%;
      these days I don't have as much time to grind, so it's mostly just for fun
      now.
    </>,
    "My favourite hobby in the world is volleyball — both playing and watching. I may not be the best (shanking passes is my specialty), but I've made a ton of great memories, from playing competitively for a club as a teenager to recreational drop-ins now.",
  ],
  workflow: [
    "For my front-ends, when I boot up a new project, I stick with my bread and butter: React and Tailwind. My main and most proficient language is Java. It was the first language I learned at college, and I've grown quite fond of its utility. It's my go-to language when doing challenges or setting up back-ends. I've also been dabbling in Python. My goal is to make it my main scripting language.",
    "I love web development, but I'm honestly pretty bad at design. I've been learning a ton about UX/UI in order to get better — and I'm trying to work Figma into my planning phases. Other tech in my toolkit includes Obsidian for notes, VS Code as my main editor, and IntelliJ IDEA for Java.",
  ],
};

function Chevron({ dir }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={dir === "left" ? "M15 5 L8 12 L15 19" : "M9 5 L16 12 L9 19"} />
    </svg>
  );
}

function Bio({ onNavigate }) {
  return (
    <div className="flex h-full flex-col">
      <p>
        What's up? I'm Noah — a full-stack developer, CS graduate, and
        competitive nap taker from Canada. You can read up on my personal
        journey by navigating through the tabs. If you want to see what I'm
        currently up to, check out the{" "}
        <span className="whitespace-nowrap">
          <TextLink accent="violet" onClick={() => onNavigate("now")}>
            Now page
          </TextLink>
          .
        </span>{" "}
        And if you'd like to peek at some of my other work, take a look at the{" "}
        <span className="whitespace-nowrap">
          <TextLink accent="violet" onClick={() => onNavigate("creations")}>
            Creations page
          </TextLink>
          ,
        </span>{" "}
        but only if you want to, no pressure.
      </p>
      <div className="mt-auto pt-6">
        <p
          aria-hidden="true"
          className="pl-2 font-hand text-3xl leading-none text-ink"
        >
          Noah :)
        </p>
        <div className="mt-1 border-t-2 border-ink pt-1">
          <Eyebrow as="p">Signature of bearer · Signature du titulaire</Eyebrow>
        </div>
      </div>
    </div>
  );
}

function PassportBio({ active, i, go, onNavigate }) {
  return (
    <div className="relative flex h-full flex-col p-4">
      <img
        src={canadaMap}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-contain"
        style={{ opacity: "var(--opacity-watermark-strong)" }}
      />
      <div className="relative flex items-center gap-3">
        <button
          type="button"
          onClick={() => go(i - 1)}
          disabled={i === 0}
          aria-label="Previous page"
          className="flex h-8 w-8 shrink-0 items-center justify-center border-2 border-ink bg-white text-ink disabled:opacity-40"
        >
          <Chevron dir="left" />
        </button>
        <h3 className="flex-1 text-center font-display text-xl font-semibold text-ink">
          {TABS[i].label}
        </h3>
        <button
          type="button"
          onClick={() => go(i + 1)}
          disabled={i === TABS.length - 1}
          aria-label="Next page"
          className="flex h-8 w-8 shrink-0 items-center justify-center border-2 border-ink bg-white text-ink disabled:opacity-40"
        >
          <Chevron dir="right" />
        </button>
      </div>

      <div
        role="tabpanel"
        id="about-passport-panel"
        aria-labelledby={`tab-${active}`}
        className="devlog-scroll relative mt-4 space-y-2 pr-1 text-gray-700 md:flex-1 md:overflow-y-auto"
      >
        {active === "bio" ? (
          <Bio onNavigate={onNavigate} />
        ) : (
          CHAPTERS[active].map((paragraph, n) => <p key={n}>{paragraph}</p>)
        )}
      </div>
    </div>
  );
}

function Passport({ onNavigate }) {
  const [i, setI] = useState(0);
  const active = TABS[i].key;
  const tabRefs = useRef([]);
  const go = (n) => setI(Math.max(0, Math.min(TABS.length - 1, n)));

  // Roving tabindex (WAI-ARIA tablist pattern): arrow keys inside the tablist
  // must move DOM focus to the newly-active tab, not just update state. Kept
  // out of `go` itself so clicking the prev/next Chevron buttons (which also
  // call `go`) doesn't yank focus away from the Chevron.
  const onKeyDown = (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next = Math.max(
      0,
      Math.min(TABS.length - 1, i + (e.key === "ArrowRight" ? 1 : -1)),
    );
    go(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="md:rotate-[-0.4deg]">
      <Panel as="div" className="shadow-sticker md:h-168 md:grid-rows-2">
        <Cell padding="p-4 md:p-6" bg="bg-paper">
          <div className="relative flex h-full flex-col">
            <img
              src={mapleLeaf}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 m-auto h-40 w-40"
              style={{ opacity: "var(--opacity-watermark)" }}
            />
            <div className="relative flex flex-wrap items-start justify-between gap-3">
              <SectionTitle accent="violet">About Me!</SectionTitle>
              <span className="mt-1 shrink-0 font-mono text-xs text-label">
                TYPE P · CAN
              </span>
            </div>
            <div className="relative mt-2 flex flex-wrap items-center gap-1.5 font-display font-bold tracking-wide text-ink">
              <img
                src={flagCanada}
                alt=""
                aria-hidden="true"
                className="h-4 w-auto shrink-0 border border-ink"
              />
              <img
                src={flagBc}
                alt=""
                aria-hidden="true"
                className="h-4 w-auto shrink-0 border border-ink"
              />
              PASSPORT · PASSEPORT
            </div>
            <div className="relative mt-4 md:flex md:gap-4">
              <img
                src={headshot}
                alt="Noah, headshot"
                width="240"
                height="240"
                decoding="async"
                className="float-left mb-2 mr-4 h-28 w-28 shrink-0 border-2 border-ink object-cover md:float-none md:mb-0 md:mr-0"
              />
              {/* Below `md` this must stay `display: block`, not a one-column
                  grid — a grid container doesn't flow around a float, it just
                  narrows and stays rectangular, which recreates the same
                  14-character column this is meant to fix (STYLE_GUIDE.md →
                  Mobile composition). Block flow's line boxes are what let
                  text wrap around the floated photo. */}
              <dl className="block md:flex-1 md:grid md:grid-cols-2 md:gap-x-4 md:gap-y-2">
                {ID_FIELDS.map((f, n) => (
                  <div
                    key={f.label}
                    /* Only the first two fields ride beside the floated photo.
                       Everything from index 2 (Date of birth) clears it, so a
                       field can never straddle the float — half its label
                       beside the photo and half wrapped underneath, which is
                       what unconstrained flow produced at some widths. Two is
                       the count that fits the photo's 112px band at 320px;
                       clearing makes the boundary deterministic instead of
                       letting it drift with the viewport. */
                    className={`mb-2 md:mb-0 ${n >= 2 ? "clear-left md:clear-none" : ""}`}
                  >
                    <Eyebrow as="dt">{f.label}</Eyebrow>
                    <dd className="mt-0.5 font-bold text-ink">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div
              aria-hidden="true"
              className="relative clear-both mt-auto border-t-2 border-ink pt-2"
            >
              {MRZ.map((line) => (
                <div
                  key={line}
                  className="hidden justify-between font-mono text-xs text-ink md:flex"
                >
                  {[...line].map((ch, idx) => (
                    <span key={idx}>{ch}</span>
                  ))}
                </div>
              ))}
              {MRZ_SHORT.map((line) => (
                <div
                  key={line}
                  className="flex justify-between font-mono text-xs text-ink md:hidden"
                >
                  {[...line].map((ch, idx) => (
                    <span key={idx}>{ch}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Cell>

        <Cell padding="p-0" bg="bg-white">
          <PassportBio active={active} i={i} go={go} onNavigate={onNavigate} />
        </Cell>
      </Panel>

      <div
        role="tablist"
        aria-label="About Noah"
        onKeyDown={onKeyDown}
        className="flex h-8 items-start gap-2 px-3"
      >
        {TABS.map((t, n) => {
          const on = n === i;
          return (
            <button
              key={t.key}
              ref={(el) => (tabRefs.current[n] = el)}
              type="button"
              role="tab"
              id={`tab-${t.key}`}
              aria-selected={on}
              aria-controls="about-passport-panel"
              aria-label={t.label}
              tabIndex={on ? 0 : -1}
              onClick={() => setI(n)}
              className="flex h-8 flex-1 items-start justify-center"
            >
              <span
                className={`flex w-full items-end justify-center border-2 border-t-0 border-ink ${t.tint} font-display text-sm font-semibold text-ink transition-all ${
                  on ? "h-8 pb-1" : "h-4"
                }`}
              >
                {on ? t.label : ""}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Passport;
