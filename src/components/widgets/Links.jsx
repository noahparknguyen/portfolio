import { siGithub } from "simple-icons";
import { FaLinkedinIn } from "react-icons/fa6";
import Eyebrow from "../ui/Eyebrow";
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

const LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/noahparknguyen",
    handle: "@noahparknguyen",
    rotate: "-rotate-[1.5deg]",
    tint: "bg-blue-soft",
    Glyph: GithubGlyph,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/noahparknguyen/",
    handle: "in/noahparknguyen",
    rotate: "rotate-1",
    tint: "bg-rose-soft",
    Glyph: LinkedinGlyph,
  },
  {
    label: "Email",
    href: "mailto:noahparknguyen@gmail.com",
    handle: "noahparknguyen@gmail.com",
    rotate: "-rotate-1",
    tint: "bg-violet-soft",
    Glyph: EnvelopeGlyph,
  },
];

function Links() {
  return (
    <div>
      <div className="text-center">
        <LabelTag rotate="rotate-[1deg]">
          <Eyebrow>Get in touch</Eyebrow>
        </LabelTag>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        {LINKS.map(({ label, href, handle, rotate, tint, Glyph }) => {
          const external = !href.startsWith("mailto:");
          return (
            <a
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              className={`shadow-sticker block ${rotate} border-2 border-ink ${tint} p-3 transition-transform hover:-translate-y-0.5 focus-visible:-translate-y-0.5`}
            >
              <div className="flex items-center gap-2">
                <Glyph />
                <div className="min-w-0">
                  <div className="font-display text-lg font-bold leading-tight text-ink">
                    {label}
                  </div>
                  <div className="truncate text-xs text-gray-600">{handle}</div>
                  {external && <NewTabHint />}
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default Links;
