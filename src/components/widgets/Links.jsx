import { siGithub } from "simple-icons";
import { FaLinkedinIn } from "react-icons/fa6";
import LabelTag from "../ui/LabelTag";
import SimpleIcon from "../ui/SimpleIcon";
import NewTabHint from "../ui/NewTabHint";

// Real brand marks where one exists, a drawn glyph where none does — the same
// rule TechStack and the footer Badges already follow. GitHub comes from
// simple-icons; LinkedIn is NOT in simple-icons (removed at the rights holder's
// request), so it falls back to react-icons, exactly as Java and Steam already
// do elsewhere on the site.
//
// `FaLinkedinIn` (the bare "in" letterform), not `FaLinkedin` (the filled
// rounded-square badge) — a rounded rectangle would break the square-corners
// rule in STYLE_GUIDE.md → Shape & surface. Both marks are boxless silhouettes,
// so they sit together cleanly.
function GithubGlyph() {
  return <SimpleIcon icon={siGithub} className="h-4 w-4 shrink-0 text-ink" />;
}

function LinkedinGlyph() {
  return (
    <FaLinkedinIn aria-hidden="true" className="h-4 w-4 shrink-0 text-ink" />
  );
}

// Email has no brand mark to borrow, so it keeps a drawn glyph. At 16px it sits
// in the guide's 16-40px bracket, so it takes --stroke-regular, not the
// sub-16px --stroke-fine it used to carry.
function EnvelopeGlyph() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="h-4 w-4 shrink-0"
      fill="none"
      stroke="var(--color-ink)"
      style={{ strokeWidth: "var(--stroke-regular)" }}
    >
      <rect x="1.5" y="3.5" width="13" height="9" />
      <path
        d="M1.5 4 L8 9 L14.5 4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Three index cards from a card file. What makes them read as index cards
// rather than three tinted rectangles is real index-card anatomy: a red rule
// under the heading line, a faint blue rule under each line of writing, and
// a tab along the top edge, staggered left, centre and right the way a card
// file's dividers are so every tab stays visible. Pastel index cards are a
// real product, so the cards keep the section tints rather than going white.
//
// The tab carries the glyph. It is drawn with three borders and no bottom
// one, and sits 2px down over the card's top border in the card's own tint,
// which is what joins it to the card instead of stacking a box on top.
const LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/noahparknguyen",
    handle: "@noahparknguyen",
    rotate: "-rotate-[1.5deg]",
    tint: "bg-blue-soft",
    tab: "left-3",
    Glyph: GithubGlyph,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/noahparknguyen/",
    handle: "in/noahparknguyen",
    rotate: "rotate-1",
    tint: "bg-rose-soft",
    tab: "left-1/2 -translate-x-1/2",
    Glyph: LinkedinGlyph,
  },
  {
    label: "Email",
    href: "mailto:noahparknguyen@gmail.com",
    handle: "noahparknguyen@gmail.com",
    rotate: "-rotate-1",
    tint: "bg-violet-soft",
    tab: "right-3",
    Glyph: EnvelopeGlyph,
  },
];

function Links() {
  return (
    <div>
      <div className="text-center">
        <LabelTag rotate="rotate-[1deg]">
          <h3 className="text-xl font-semibold text-ink">Get in touch</h3>
        </LabelTag>
      </div>
      {/* `mt-6` and `gap-8` rather than the usual 4: each tab stands 18px
          above its card, and the tighter spacing let a tab touch the label
          or the card above it. */}
      <div className="mt-6 flex flex-col gap-8">
        {LINKS.map(({ label, href, handle, rotate, tint, tab, Glyph }) => {
          const external = !href.startsWith("mailto:");
          return (
            <a
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              className={`shadow-sticker relative block ${rotate} border-2 border-ink ${tint} p-3 transition-transform hover:-translate-y-0.5 focus-visible:-translate-y-0.5`}
            >
              <span
                aria-hidden="true"
                className={`absolute bottom-[calc(100%-2px)] ${tab} flex h-5 w-10 items-center justify-center border-l-2 border-r-2 border-t-2 border-ink ${tint}`}
              >
                <Glyph />
              </span>
              <div className="border-b-2 border-live pb-1 font-display text-lg font-bold leading-tight text-ink">
                {label}
              </div>
              <div className="mt-1 truncate border-b border-blue pb-0.5 text-xs text-gray-600">
                {handle}
              </div>
              {external && <NewTabHint />}
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default Links;
