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

function JavaIcon() {
  return <FaJava aria-hidden="true" className="mx-auto h-7 w-7 text-ink" />;
}

// The strip is things I BUILD WITH. Editors and IDEs (VS Code, IntelliJ) are not
// stack — they're where I sit — so they deliberately have no stamp here and live
// in the passport's Workflow prose instead (Passport.jsx → CHAPTERS.workflow).
// Don't add a VS Code or IntelliJ stamp later; that prose is the right home.
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
    tint: "bg-rose-soft",
    note: "Because I can’t design",
  },
  {
    key: "obsidian",
    label: "Obsidian",
    icon: siObsidian,
    href: "https://obsidian.md",
    rotate: "rotate-[2deg]",
    tint: "bg-blue-soft",
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

// The handwritten note tag shared by the interactive stamps and Isaac's cameo.
// Below md the note is withheld from sighted touch users (STYLE_GUIDE.md →
// Mobile deviation 6); at md+ it's an absolute tag revealed on hover. Kept as one
// constant so the two call sites can't drift — they carried near-identical
// 20-utility copies of this before. Written out in full so Tailwind's scanner
// still sees every class name.
const NOTE_TAG =
  "md:pointer-events-none md:absolute md:left-1/2 md:top-full md:z-10 md:mt-1 md:-translate-x-1/2 md:whitespace-nowrap md:border-2 md:border-ink md:bg-white md:px-2 md:py-0.5 md:font-hand md:text-base md:text-ink md:opacity-100 md:shadow-sticker md:[@media(hover:hover)]:opacity-0 md:group-hover:opacity-100";

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
      </a>
      <span
        id={noteId}
        className={`sr-only md:not-sr-only md:group-[:has(:focus-visible)]:opacity-100 ${NOTE_TAG}`}
      >
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
      <div className="shadow-sticker block w-20 rotate-3 border-2 border-ink bg-orchid-soft p-2 text-center transition-transform hover:-translate-y-1">
        <img
          src={tboiThumbsUp}
          alt=""
          className="block h-12 w-full object-cover"
        />
      </div>
      <span className={`hidden md:block ${NOTE_TAG}`}>We love you Isaac</span>
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
      <div className="mt-2 flex flex-wrap justify-center gap-2 pb-0 md:pb-7">
        {TECH_ITEMS.map((item) => (
          <TechBadge key={item.key} item={item} />
        ))}
        <IsaacStamp />
      </div>
    </div>
  );
}

export default TechStack;
