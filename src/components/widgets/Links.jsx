import Eyebrow from "../ui/Eyebrow";
import LabelTag from "../ui/LabelTag";

function LineGlyph({ children }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="h-4 w-4 shrink-0"
      fill="none"
      stroke="var(--color-ink)"
      style={{ strokeWidth: "var(--stroke-fine)" }}
    >
      {children}
    </svg>
  );
}

function CodeGlyph() {
  return (
    <LineGlyph>
      <path
        d="M5 3 L1 8 L5 13 M11 3 L15 8 L11 13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </LineGlyph>
  );
}

function BriefcaseGlyph() {
  return (
    <LineGlyph>
      <rect x="1.5" y="5" width="13" height="8.5" />
      <path d="M5.5 5 V3.5 a1 1 0 0 1 1-1 h3 a1 1 0 0 1 1 1 V5" />
      <line x1="1.5" y1="9" x2="14.5" y2="9" />
    </LineGlyph>
  );
}

function EnvelopeGlyph() {
  return (
    <LineGlyph>
      <rect x="1.5" y="3.5" width="13" height="9" />
      <path
        d="M1.5 4 L8 9 L14.5 4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </LineGlyph>
  );
}

const LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/noahparknguyen",
    handle: "@noahparknguyen",
    rotate: "-rotate-2",
    tint: "bg-blue-soft",
    Glyph: CodeGlyph,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/noahparknguyen/",
    handle: "in/noahparknguyen",
    rotate: "rotate-1",
    tint: "bg-rose-soft",
    Glyph: BriefcaseGlyph,
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
              className={`shadow-sticker block ${rotate} border-2 border-ink ${tint} px-3 py-2 transition-transform hover:-translate-y-0.5 focus-visible:-translate-y-0.5`}
            >
              <div className="flex items-center gap-2">
                <Glyph />
                <div className="min-w-0">
                  <div className="font-display text-lg font-bold leading-tight text-ink">
                    {label}
                  </div>
                  <div className="truncate text-xs text-gray-600">{handle}</div>
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
