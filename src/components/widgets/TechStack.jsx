import {
  siReact,
  siTailwindcss,
  siNodedotjs,
  siPython,
  siFigma,
  siObsidian,
} from "simple-icons";
import { FaJava } from "react-icons/fa6";
import tboiThumbsUp from "../../assets/tboi-thumbs-up.gif";
import SimpleIcon from "../ui/SimpleIcon";
import LabelTag from "../ui/LabelTag";
import NewTabHint from "../ui/NewTabHint";

function JavaIcon() {
  return <FaJava aria-hidden="true" className="mx-auto h-7 w-7 text-ink" />;
}

// Touching stamps never share a tint, at any width. The strip wraps 3 across
// at 320px, 4 at 375px, and 8 in a row from md, so stamps 1, 3, or 4 apart here
// touch, Isaac's included. Re-check all three distances after reordering or
// adding one.
const TECH_ITEMS = [
  {
    key: "java",
    label: "Java",
    Glyph: JavaIcon,
    href: "https://www.java.com",
    rotate: "rotate-[-3deg]",
    tint: "bg-rose-soft",
    note: "My first and main language",
  },
  {
    key: "react",
    label: "React",
    icon: siReact,
    href: "https://react.dev",
    rotate: "rotate-[2deg]",
    tint: "bg-violet-soft",
    note: "How I made the site",
  },
  {
    key: "tailwind",
    label: "Tailwind",
    icon: siTailwindcss,
    href: "https://tailwindcss.com",
    rotate: "rotate-[-2deg]",
    tint: "bg-blue-soft",
    note: "How I styled the site",
  },
  {
    key: "node",
    label: "Node.js",
    icon: siNodedotjs,
    href: "https://nodejs.org",
    rotate: "rotate-[3deg]",
    tint: "bg-orchid-soft",
    note: "My main scripting language",
  },
  {
    key: "python",
    label: "Python",
    icon: siPython,
    href: "https://www.python.org",
    rotate: "rotate-[-3deg]",
    tint: "bg-blue-soft",
    note: "Learning",
  },
  {
    key: "figma",
    label: "Figma",
    icon: siFigma,
    href: "https://www.figma.com",
    rotate: "rotate-[2deg]",
    tint: "bg-orchid-soft",
    note: "Also learning",
  },
  {
    key: "obsidian",
    label: "Obsidian",
    icon: siObsidian,
    href: "https://obsidian.md",
    rotate: "rotate-[-2deg]",
    tint: "bg-violet-soft",
    note: "My primary notes app",
  },
];

// The note is a named class in index.css, since it needs a compound hover and
// width query.
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

// A cameo, not a tool, so it's outside TECH_ITEMS and hidden from assistive
// tech.
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
    <div className="flex flex-col gap-3">
      <div className="text-center">
        <LabelTag rotate="rotate-[1deg]">My current toolset</LabelTag>
      </div>
      <div className="tech-strip flex flex-wrap justify-center gap-2">
        {TECH_ITEMS.map((item) => (
          <TechBadge key={item.key} item={item} />
        ))}
        <IsaacStamp />
      </div>
    </div>
  );
}

export default TechStack;
