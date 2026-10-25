import { siGithub } from "simple-icons";
import { FaLinkedinIn } from "react-icons/fa6";
import LabelTag from "../ui/LabelTag";
import SimpleIcon from "../ui/SimpleIcon";
import NewTabHint from "../ui/NewTabHint";

// LinkedIn's mark was removed from simple-icons at the rights holder's request,
// so it comes from react-icons. `FaLinkedinIn` is the bare letterform, since
// the badge version has rounded corners and the site has none.
function GithubGlyph() {
  return <SimpleIcon icon={siGithub} className="h-4 w-4 shrink-0 text-ink" />;
}

function LinkedinGlyph() {
  return (
    <FaLinkedinIn aria-hidden="true" className="h-4 w-4 shrink-0 text-ink" />
  );
}

// Email has no brand mark, so it gets a drawn glyph.
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

// Each card's tab has no bottom border and sits 2px down over the card's top
// border, in the card's tint, which joins the two. The rule under the handle
// takes the card's own hue, so every line on a card matches it.
const LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/noahparknguyen",
    handle: "@noahparknguyen",
    rotate: "-rotate-[1.5deg]",
    tint: "bg-blue-soft",
    rule: "border-blue",
    tab: "left-3",
    Glyph: GithubGlyph,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/noahparknguyen/",
    handle: "in/noahparknguyen",
    rotate: "rotate-1",
    tint: "bg-rose-soft",
    rule: "border-rose",
    tab: "left-1/2 -translate-x-1/2",
    Glyph: LinkedinGlyph,
  },
  {
    label: "Email",
    href: "mailto:noahparknguyen@gmail.com",
    handle: "noahparknguyen@gmail.com",
    rotate: "-rotate-1",
    tint: "bg-violet-soft",
    rule: "border-violet",
    tab: "right-3",
    Glyph: EnvelopeGlyph,
  },
];

function Links() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <LabelTag rotate="rotate-[1deg]">Get in touch</LabelTag>
      </div>
      {/* `gap-8`, since each tab stands 18px above its card: 32px between
          boxes shows as 14px above a tab. */}
      <div className="flex flex-col gap-8">
        {LINKS.map(
          ({ label, href, handle, rotate, tint, rule, tab, Glyph }) => {
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
                <div className="border-b-2 border-ink pb-1 font-display text-lg font-bold leading-tight text-ink">
                  {label}
                </div>
                <div
                  className={`mt-1 truncate border-b ${rule} pb-0.5 text-xs text-gray-600`}
                >
                  {handle}
                </div>
                {external && <NewTabHint />}
              </a>
            );
          },
        )}
      </div>
    </div>
  );
}

export default Links;
