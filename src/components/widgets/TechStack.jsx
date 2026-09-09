import {
  siReact,
  siTailwindcss,
  siPython,
  siFigma,
  siObsidian,
  siSpring,
} from "simple-icons";
import { FaJava } from "react-icons/fa6";
import tboiThumbsUp from "../../assets/tboi-thumbs-up.gif";
import Eyebrow from "../ui/Eyebrow";
import SimpleIcon from "../ui/SimpleIcon";
import LabelTag from "../ui/LabelTag";
import NewTabHint from "../ui/NewTabHint";

function JavaIcon() {
  return <FaJava aria-hidden="true" className="mx-auto h-7 w-7 text-ink" />;
}

// The strip is things I BUILD WITH. Editors and IDEs (VS Code, IntelliJ) are not
// stack — they're where I sit — so they deliberately have no stamp here and live
// in the passport's Workflow prose instead (Passport.jsx → CHAPTERS.workflow).
// Don't add a VS Code or IntelliJ stamp later; that prose is the right home.
// TINT ORDER IS SOLVED, NOT CHOSEN. The strip wraps to 3 columns at 320px, 4 at
// 375px and a single row of 8 at md+, so two stamps end up touching whenever
// they sit 1, 3 or 4 apart in this array — and the guide's rule is that adjacent
// stamps must differ at EVERY width. The previous order failed three times over:
// React/Figma (distance 4), Java/Obsidian (distance 3) and Python/Isaac
// (distance 4), each visible only after a wrap.
//
// rose -> violet -> blue -> orchid opens the run deliberately: those first four
// are the site's canonical hue order. The sequence then mirrors itself, which is
// what satisfies all three wraps at once. Isaac's stamp counts here even though
// it is decorative, because the eye does not know that.
//
// If you reorder or add a stamp, re-check distances 1, 3 and 4 — not just
// neighbours in this list.
const TECH_ITEMS = [
  {
    key: "react",
    label: "React",
    icon: siReact,
    href: "https://react.dev",
    rotate: "rotate-[-3deg]",
    tint: "bg-rose-soft",
    note: "My bread and butter",
  },
  {
    key: "tailwind",
    label: "Tailwind",
    icon: siTailwindcss,
    href: "https://tailwindcss.com",
    rotate: "rotate-[2deg]",
    tint: "bg-violet-soft",
    note: "The other half of that",
  },
  {
    key: "java",
    label: "Java",
    Glyph: JavaIcon,
    href: "https://www.java.com",
    rotate: "rotate-[-2deg]",
    tint: "bg-blue-soft",
    note: "My first language",
  },
  {
    key: "python",
    label: "Python",
    icon: siPython,
    href: "https://www.python.org",
    rotate: "rotate-[3deg]",
    tint: "bg-orchid-soft",
    note: "Learning this one now",
  },
  {
    key: "figma",
    label: "Figma",
    icon: siFigma,
    href: "https://www.figma.com",
    rotate: "rotate-[-3deg]",
    tint: "bg-blue-soft",
    note: "Because I can’t design",
  },
  {
    key: "obsidian",
    label: "Obsidian",
    icon: siObsidian,
    href: "https://obsidian.md",
    rotate: "rotate-[2deg]",
    tint: "bg-orchid-soft",
    note: "Where my notes go",
  },
  {
    key: "spring",
    label: "Spring",
    icon: siSpring,
    href: "https://spring.io",
    rotate: "rotate-[-2deg]",
    tint: "bg-violet-soft",
    note: "My go-to for backends",
  },
];

// The annotation is a named class rather than a 20-utility Tailwind string,
// because it needs a compound `(hover: hover) and (min-width: 768px)` query and
// repeating that arbitrary variant on every declaration was unreadable. Same
// precedent as `.devlog-scroll`. See src/index.css for why it is gated on hover
// capability rather than width.
function TechBadge({ item }) {
  const noteId = `tech-note-${item.key}`;
  const Glyph = item.Glyph;
  return (
    <div className="group relative">
      <a
        href={item.href}
        target="_blank"
        rel="noreferrer"
        aria-describedby={noteId}
        className={`shadow-sticker block w-20 border-2 border-ink ${item.tint} p-2 text-center transition-transform hover:-translate-y-1 focus-visible:-translate-y-1 ${item.rotate}`}
      >
        {Glyph ? (
          <Glyph />
        ) : (
          <SimpleIcon icon={item.icon} className="mx-auto h-7 w-7 text-ink" />
        )}
        <span className="mt-1 block text-xs font-bold text-ink">
          {item.label}
        </span>
        <NewTabHint />
      </a>
      <span id={noteId} className="tech-note">
        {item.note}
      </span>
    </div>
  );
}

// Decorative easter-egg cameo, not a tool — kept out of TECH_ITEMS and fully
// aria-hidden, so it never reaches the accessibility tree.
function IsaacStamp() {
  return (
    <div className="group relative" aria-hidden="true">
      <div className="shadow-sticker block w-20 rotate-3 border-2 border-ink bg-rose-soft p-2 text-center transition-transform hover:-translate-y-1">
        <img
          src={tboiThumbsUp}
          alt=""
          width="128"
          height="128"
          decoding="async"
          className="block h-12 w-full object-cover"
        />
      </div>
      <span className="tech-note">We love you Isaac</span>
    </div>
  );
}

function TechStack() {
  return (
    <div>
      <div className="text-center">
        <LabelTag rotate="rotate-[1deg]">
          <Eyebrow>My current toolset</Eyebrow>
        </LabelTag>
      </div>
      <div className="tech-strip mt-2 flex flex-wrap justify-center gap-2">
        {TECH_ITEMS.map((item) => (
          <TechBadge key={item.key} item={item} />
        ))}
        <IsaacStamp />
      </div>
    </div>
  );
}

export default TechStack;
