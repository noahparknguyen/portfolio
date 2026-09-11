import { useRef, useState } from "react";
// `about/` is a SUBDIRECTORY on purpose: App.jsx's site-wide preload globs
// `./assets/*.{…}` with a single `*`, which does not match across a `/`, so
// nothing in here is pulled into the weight of a visit that never reaches this
// section (STYLE_GUIDE.md → Assets). Between them canada-map.svg and
// flag-bc.svg are 226 KB — about a fifth of everything the site preloads — for
// two images only this page ever shows.
//
// Neither needs the warming that `books/` does: both are `alt="" aria-hidden`
// decoration, so there is no alt text to flash while they load. The headshot
// stays at the top level precisely because it DOES carry real alt text.
import headshot from "../../assets/noah-headshot.webp";
import flagCanada from "../../assets/flag-canada.svg";
import flagBc from "../../assets/about/flag-bc.svg";
import mapleLeaf from "../../assets/maple-leaf.svg";
import canadaMap from "../../assets/about/canada-map.svg";
import Panel from "../ui/Panel";
import Cell from "../ui/Cell";
import SectionTitle from "../ui/SectionTitle";
import Eyebrow from "../ui/Eyebrow";
import TextLink from "../ui/TextLink";
import Chevron from "../ui/Chevron";

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
    "I was born and raised in BC, and went through high school with no idea what I wanted to do for a living. During my last year, I forgot to hand in my elective selections, and ended up in an intro programming class on a whim. That ended up being my best grade in all of high school.",
    "Unfortunately, it only counted as an elective, and I was short the math prerequisites needed for college. I spent the following year taking summer courses and working to prepare and save money. My aunt then told my parents about Algonquin College, which had a co-op program where I could work while I studied. That was what moved me out to Ottawa.",
    "Looking back, I still have no idea why I moved across the country. But I’m glad I pushed myself out of my comfort zone and took a risk I never thought I would.",
  ],
  hobbies: [
    "I mainly play a lot of indie games, the kind that are easy to pick up but hard to master. The games I probably replay the most are Celeste, The Binding of Isaac, and Balatro.",
    <>
      I’ve also been replaying a lot of my childhood favourites like Pikmin,
      Super Monkey Ball, and Pokémon, basically anything from the GameCube era
      to the early 2010s. I also love to{" "}
      <TextLink
        href="https://www.speedrun.com/users/SerenePrince"
        accent="violet"
        external
      >
        speedrun
      </TextLink>
      . I used to run games like Super Meat Boy and Hollow Knight Any%, but had
      to take a break when school got too busy. I’d like to get back into it
      someday, when I have a bit more time.
    </>,
    "Volleyball is one of my oldest passions. I used to play on my high school team and for a few clubs, but now I just play recreationally at drop-ins and tournaments.",
  ],
  workflow: [
    "React and Tailwind are my bread and butter, and I reach for them on almost everything I build. They’re quick to start with and easy to extend later on.",
    "Java was the first programming language I ever learned. What made me stick with it was how easy it made learning the more advanced concepts like OOP and data structures. Spring was the obvious next step, since it\u2019s practically synonymous with enterprise applications. Right now I\u2019m trying to make Python more a part of my workflow, both as my main scripting language and because of how common it is in the industry.",
    "I\u2019m also learning Figma to improve my design skills. I was never the best artist growing up, I was more a math and science guy, but building a clean interface has been some of the most fun I\u2019ve had learning anything.",
    "The rest of my toolkit is pretty standard. I use Obsidian for notes, IntelliJ IDEA for Java, and VS Code for everything else.",
  ],
};

function Bio({ onNavigate }) {
  return (
    <div className="flex h-full flex-col">
      <p>
        Hey, my name is Noah, I&rsquo;m a full-stack developer, CS graduate, and
        professional nap taker born in BC, living in Ottawa, Ontario. I mainly
        focus on web development and frontends for fun, while my professional
        experience has mostly been in the backend and internal tools.
      </p>
      <p className="mt-2">
        If you want to know more about my journey, click through each tab to
        read more. If you want to know what I&rsquo;m up to at this very moment,
        check out the{" "}
        <span className="whitespace-nowrap">
          <TextLink accent="violet" to="now" onClick={() => onNavigate("now")}>
            Now page
          </TextLink>
          .
        </span>{" "}
        For a look into my personal projects, check out the{" "}
        <span className="whitespace-nowrap">
          <TextLink
            accent="violet"
            to="creations"
            onClick={() => onNavigate("creations")}
          >
            Creations page
          </TextLink>
          .
        </span>{" "}
        But only if you want to, no pressure.
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
    <div className="relative flex h-full flex-col p-4 md:p-6">
      <img
        src={canadaMap}
        alt=""
        aria-hidden="true"
        width="1114"
        height="942"
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
          <Chevron dir="left" strokeWidth="3" />
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
          <Chevron dir="right" strokeWidth="3" />
        </button>
      </div>

      <div
        role="tabpanel"
        tabIndex={0}
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
  const touchStart = useRef(null);
  const go = (n) => setI(Math.max(0, Math.min(TABS.length - 1, n)));

  // Touch-swipe over the passport card. Only start/end deltas are used (no
  // touchmove, no preventDefault), so native vertical scroll is never
  // intercepted — a swipe that's more vertical than horizontal is simply
  // ignored rather than special-cased away from scrolling.
  const onTouchStart = (e) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e) => {
    if (!touchStart.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) < 50 || Math.abs(dx) <= Math.abs(dy)) return;
    go(dx < 0 ? i + 1 : i - 1);
  };

  // Roving tabindex (WAI-ARIA tablist pattern): arrow keys inside the tablist
  // must move DOM focus to the newly-active tab, not just update state. Kept
  // out of `go` itself so clicking the prev/next Chevron buttons (which also
  // call `go`) doesn't yank focus away from the Chevron.
  const onKeyDown = (e) => {
    // Home/End are part of the APG tablist pattern and were missing, so the
    // only way to the first or last chapter was to arrow through the others.
    // preventDefault stops Home/End scrolling the page out from under the
    // strip, and stops the arrows scrolling it sideways.
    const MOVES = {
      ArrowRight: i + 1,
      ArrowLeft: i - 1,
      Home: 0,
      End: TABS.length - 1,
    };
    if (!(e.key in MOVES)) return;
    e.preventDefault();
    const next = Math.max(0, Math.min(TABS.length - 1, MOVES[e.key]));
    go(next);
    tabRefs.current[next]?.focus();
  };

  return (
    // Level at every width. It was `md:rotate-[-0.4deg]`, but the passport is
    // the most text-dense object on the site and it already straightened below
    // md for that reason — a tilt makes the eye re-find the left edge on every
    // line, which costs nothing over two lines and compounds over twenty
    // (STYLE_GUIDE.md → Handcrafted layer → Slight rotation).
    <div>
      <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <Panel as="div" className="shadow-sticker md:h-168 md:grid-rows-2">
          <Cell padding="p-4 md:p-6" bg="bg-paper">
            <div className="relative flex h-full flex-col">
              <img
                src={mapleLeaf}
                alt=""
                aria-hidden="true"
                width="650"
                height="650"
                className="pointer-events-none absolute inset-0 m-auto h-40 w-40"
                style={{ opacity: "var(--opacity-watermark)" }}
              />
              <div className="relative flex flex-wrap items-start justify-between gap-3">
                <SectionTitle accent="violet" id="about-heading">
                  About Me!
                </SectionTitle>
                <span className="mt-1 shrink-0 font-mono text-xs text-label">
                  TYPE P · CAN
                </span>
              </div>
              <div className="relative mt-2 flex flex-wrap items-center gap-1.5 font-display font-bold tracking-wide text-ink">
                <img
                  src={flagCanada}
                  alt=""
                  aria-hidden="true"
                  width="1200"
                  height="600"
                  className="h-4 w-auto shrink-0 border border-ink"
                />
                <img
                  src={flagBc}
                  alt=""
                  aria-hidden="true"
                  width="1000"
                  height="600"
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
            <PassportBio
              active={active}
              i={i}
              go={go}
              onNavigate={onNavigate}
            />
          </Cell>
        </Panel>
      </div>

      <div
        role="tablist"
        aria-label="About Noah"
        onKeyDown={onKeyDown}
        className="flex h-11 items-start gap-1 px-2 md:gap-2 md:px-3"
      >
        {TABS.map((t, n) => {
          const on = n === i;
          return (
            <button
              key={t.key}
              ref={(el) => {
                tabRefs.current[n] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${t.key}`}
              aria-selected={on}
              aria-controls="about-passport-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => setI(n)}
              className="flex h-11 flex-1 items-start justify-center"
            >
              <span
                className={`flex w-full items-end justify-center border-2 border-t-0 border-ink ${t.tint} font-display text-sm font-semibold text-ink transition-all ${
                  on ? "h-11 pb-1.5" : "h-7 pb-1"
                }`}
              >
                {t.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Passport;
