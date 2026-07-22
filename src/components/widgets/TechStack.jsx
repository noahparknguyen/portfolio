import {
  siReact,
  siTailwindcss,
  siPython,
  siFigma,
  siObsidian,
  siSpring,
} from "simple-icons";
import { FaJava } from "react-icons/fa6";
import Eyebrow from "../ui/Eyebrow";
import SimpleIcon from "../ui/SimpleIcon";
import LabelTag from "../ui/LabelTag";

function JavaIcon() {
  return (
    <FaJava aria-hidden="true" className="mx-auto h-7 w-7 text-brand-java" />
  );
}

const TECH_ITEMS = [
  {
    key: "react",
    label: "React",
    icon: siReact,
    href: "https://react.dev",
    rotate: "rotate-[-3deg]",
    tint: "bg-rose-soft",
    note: "How I made the site",
  },
  {
    key: "tailwind",
    label: "Tailwind",
    icon: siTailwindcss,
    href: "https://tailwindcss.com",
    rotate: "rotate-[2deg]",
    tint: "bg-violet-soft",
    note: "How I styled the site",
  },
  {
    key: "java",
    label: "Java",
    Glyph: JavaIcon,
    href: "https://www.java.com",
    rotate: "rotate-[-2deg]",
    tint: "bg-blue-soft",
    note: "My first and main language",
  },
  {
    key: "python",
    label: "Python",
    icon: siPython,
    href: "https://www.python.org",
    rotate: "rotate-[3deg]",
    tint: "bg-orchid-soft",
    note: "Learning",
  },
  {
    key: "figma",
    label: "Figma",
    icon: siFigma,
    href: "https://www.figma.com",
    rotate: "rotate-[-3deg]",
    tint: "bg-rose-soft",
    note: "Also learning",
  },
  {
    key: "obsidian",
    label: "Obsidian",
    icon: siObsidian,
    href: "https://obsidian.md",
    rotate: "rotate-[2deg]",
    tint: "bg-blue-soft",
    note: "My primary notes app",
  },
  {
    key: "spring",
    label: "Spring",
    icon: siSpring,
    href: "https://spring.io",
    rotate: "rotate-[-2deg]",
    tint: "bg-violet-soft",
    note: "My go-to backend tool",
  },
];

const TECH_NAMES = TECH_ITEMS.map((tech) => tech.label).join(", ");

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
          <SimpleIcon icon={item.icon} className="mx-auto h-7 w-7" />
        )}
        <span className="mt-1 block text-xs font-bold text-ink">
          {item.label}
        </span>
      </a>
      <span
        id={noteId}
        className="shadow-sticker pointer-events-none absolute left-1/2 top-full z-10 mt-1 -translate-x-1/2 whitespace-nowrap border-2 border-ink bg-white px-2 py-0.5 font-hand text-base text-ink opacity-100 [@media(hover:hover)]:opacity-0 group-hover:opacity-100 group-[:has(:focus-visible)]:opacity-100"
      >
        {item.note}
      </span>
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
      <div className="mt-2 flex flex-wrap justify-center gap-2 pb-7">
        {TECH_ITEMS.map((item) => (
          <TechBadge key={item.key} item={item} />
        ))}
      </div>
      <span className="sr-only">My current toolset: {TECH_NAMES}.</span>
    </div>
  );
}

export default TechStack;
