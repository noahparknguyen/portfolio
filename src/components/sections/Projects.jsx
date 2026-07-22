import PinnedCard from "../ui/PinnedCard";
import SectionTitle from "../ui/SectionTitle";
import Eyebrow from "../ui/Eyebrow";
import LabelTag from "../ui/LabelTag";
import Pin from "../ui/Pin";

function BarricadeGlyph() {
  return (
    <svg
      viewBox="0 0 130 78"
      aria-hidden="true"
      className="mx-auto h-16 w-auto"
    >
      <g
        stroke="var(--color-ink)"
        strokeLinecap="round"
        style={{ strokeWidth: "var(--stroke-bold)" }}
      >
        <line x1="34" y1="40" x2="20" y2="70" />
        <line x1="20" y1="40" x2="34" y2="70" />
        <line x1="110" y1="40" x2="96" y2="70" />
        <line x1="96" y1="40" x2="110" y2="70" />
      </g>
      <rect
        x="14"
        y="22"
        width="102"
        height="22"
        fill="var(--color-orchid-soft)"
        stroke="var(--color-ink)"
        style={{ strokeWidth: "var(--stroke-bold)" }}
      />
      <clipPath id="barricade-board">
        <rect x="14" y="22" width="102" height="22" />
      </clipPath>
      <g clipPath="url(#barricade-board)" fill="var(--color-ink)">
        <polygon points="14,22 24,22 46,44 36,44" />
        <polygon points="36,22 46,22 68,44 58,44" />
        <polygon points="58,22 68,22 90,44 80,44" />
        <polygon points="80,22 90,22 112,44 102,44" />
        <polygon points="102,22 112,22 134,44 124,44" />
      </g>
      <rect
        x="14"
        y="22"
        width="102"
        height="22"
        fill="none"
        stroke="var(--color-ink)"
        style={{ strokeWidth: "var(--stroke-bold)" }}
      />
    </svg>
  );
}

function Projects() {
  return (
    <section className="flex justify-center py-8">
      <PinnedCard
        padding="p-6"
        rotate="-rotate-[1.5deg]"
        className="relative max-w-md text-center"
      >
        <Pin className="absolute -top-2 left-1/2 -translate-x-1/2" />
        <SectionTitle accent="orchid">Creations</SectionTitle>
        <BarricadeGlyph />
        <LabelTag bg="bg-orchid-soft" className="mt-4">
          <Eyebrow as="p">Under construction</Eyebrow>
        </LabelTag>
        <p className="mx-auto mt-4 max-w-[32ch] text-sm text-gray-700">
          Check back soon!
        </p>
      </PinnedCard>
    </section>
  );
}

export default Projects;
