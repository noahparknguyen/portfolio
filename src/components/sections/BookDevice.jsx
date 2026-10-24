// A book's mark: the project's own logo, redrawn in the site's flat ink
// linework. One size per placement, so a new book can't quietly draw its mark
// larger.
const SIZES = {
  cover: "h-16 w-16 shrink-0 md:h-20 md:w-20",
  title: "h-24 w-24 shrink-0",
};

// Statmon's Poké Ball, without the rounded tile and gradient of its favicon.
function PokeballDevice({ className }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <circle cx="24" cy="24" r="18" fill="var(--color-paper)" />
      <path d="M6 24 A18 18 0 0 1 42 24 Z" fill="var(--color-violet)" />
      <g
        stroke="var(--color-ink)"
        style={{ strokeWidth: "var(--stroke-bold)" }}
        fill="none"
        strokeLinecap="round"
      >
        <line x1="6" y1="24" x2="42" y2="24" />
        <circle cx="24" cy="24" r="18" />
      </g>
      <circle
        cx="24"
        cy="24"
        r="6"
        fill="var(--color-on-ink)"
        stroke="var(--color-ink)"
        style={{ strokeWidth: "var(--stroke-bold)" }}
      />
    </svg>
  );
}

// Inbox's three rectangles, without the rounded tile. Both columns end on the
// same line.
function InboxDevice({ className }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <g
        stroke="var(--color-ink)"
        style={{ strokeWidth: "var(--stroke-bold)" }}
      >
        <rect x="10" y="10" width="11" height="11" fill="var(--color-blue)" />
        <rect x="10" y="25" width="11" height="13" fill="var(--color-paper)" />
        <rect x="26" y="10" width="11" height="28" fill="var(--color-paper)" />
      </g>
    </svg>
  );
}

// Elbaite's tourmaline crystal, without the pixel stepping. The ink wash on the
// right face makes it a stone. Narrower, or with a straight base, it reads as
// a pencil.
function CrystalDevice({ className }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <polygon points="11,14 24,3 37,14" fill="var(--color-rose)" />
      <rect x="11" y="14" width="26" height="8" fill="var(--color-paper)" />
      <rect x="11" y="22" width="26" height="8" fill="var(--color-blue)" />
      <polygon
        points="11,30 37,30 37,40 24,45 11,40"
        fill="var(--color-violet)"
      />
      <polygon
        points="24,3 37,14 37,40 24,45"
        fill="var(--color-ink)"
        style={{ opacity: "var(--opacity-watermark)" }}
      />
      <g
        stroke="var(--color-ink)"
        style={{ strokeWidth: "var(--stroke-bold)" }}
        fill="none"
        strokeLinejoin="round"
      >
        <polygon points="24,3 37,14 37,40 24,45 11,40 11,14" />
        <line x1="11" y1="14" x2="37" y2="14" />
        <line x1="24" y1="3" x2="24" y2="45" />
      </g>
    </svg>
  );
}

// lite-type's "lt" over a progress bar, without the rounded tile. The letters
// are the logo's own outlines, scaled into this 48-unit frame.
function LiteTypeDevice({ className }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <path
        fill="var(--color-ink)"
        transform="translate(1.08 0.97) scale(0.18)"
        d="M98.08 158.5Q86.89 158.5 80.2 151.98Q73.53 145.46 73.53 134.72L73.53 59.09L44.38 59.09L44.38 46.5L87.34 46.5L87.34 134.72Q87.34 139.95 90.24 142.94Q93.17 145.91 98.08 145.91L124.16 145.91L124.16 158.5L98.08 158.5ZM186.3 158.5Q175.87 158.5 169.57 152.43Q163.29 146.37 163.29 136.25L163.29 86.7L139.05 86.7L139.05 74.12L163.29 74.12L163.29 50.34L177.1 50.34L177.1 74.12L211.62 74.12L211.62 86.7L177.1 86.7L177.1 136.25Q177.1 140.54 179.61 143.23Q182.15 145.91 186.3 145.91L210.85 145.91L210.85 158.5L186.3 158.5Z"
      />
      <g
        stroke="var(--color-ink)"
        style={{ strokeWidth: "var(--stroke-bold)" }}
      >
        <rect x="9" y="34" width="30" height="6" fill="var(--color-paper)" />
        <rect x="9" y="34" width="16.5" height="6" fill="var(--color-orchid)" />
      </g>
    </svg>
  );
}

// Each book names its mark in projects.js, which holds no JSX.
const DEVICES = {
  pokeball: PokeballDevice,
  inbox: InboxDevice,
  crystal: CrystalDevice,
  lt: LiteTypeDevice,
};

function BookDevice({ mark, size = "cover" }) {
  const Device = DEVICES[mark];
  return <Device className={SIZES[size]} />;
}

export default BookDevice;
