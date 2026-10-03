// A prize ribbon: two tails behind, a pleated rosette over them, and a white
// centre disc carrying a short label. Drawn rather than imported so its fill
// can come from the four section tints like every other object on the board,
// and its outline from the same ink stroke tokens.
//
// No <Pin>, deliberately. It had one, and the ribbon reads better standing on
// its own: the pleats and tails already say "prize ribbon", and a pin on top
// competed with the label for the eye (Noah's call, after the first build).
//
// The pleats are generated rather than hand-written: 32 points alternating
// between two radii, which is what makes the edge read as gathered ribbon
// instead of a star.
const PLEATS = Array.from({ length: 32 }, (_, n) => {
  const r = n % 2 ? 32 : 37;
  const a = (n / 32) * 2 * Math.PI;
  return `${(40 + r * Math.sin(a)).toFixed(1)},${(40 - r * Math.cos(a)).toFixed(1)}`;
}).join(" ");

// `fill` is a token reference ("var(--color-rose-soft)"), not a class, because
// it paints SVG shapes. `label` sits in an HTML overlay rather than an SVG
// <text>, so it uses the site's own type scale and font stack.
function Rosette({ fill, label, size = "md", className = "" }) {
  const box = size === "sm" ? "w-14" : "w-20";
  const type = size === "sm" ? "text-sm" : "text-lg";
  return (
    <span aria-hidden="true" className={`relative block ${box} ${className}`}>
      <svg viewBox="0 0 80 128" className="block w-full">
        <g
          fill={fill}
          stroke="var(--color-ink)"
          strokeLinejoin="round"
          style={{ strokeWidth: "var(--stroke-regular)" }}
        >
          <polygon points="27,60 41,64 31,126 24,116 15,124" />
          <polygon points="53,60 39,64 49,126 56,116 65,124" />
          <polygon points={PLEATS} />
        </g>
        <circle
          cx="40"
          cy="40"
          r="23"
          fill="var(--color-white)"
          stroke="var(--color-ink)"
          style={{ strokeWidth: "var(--stroke-regular)" }}
        />
      </svg>
      {/* The disc is centred 40 units down an 80-unit-wide drawing, so a
          square the width of the ribbon puts the label exactly on it at any
          size. */}
      <span
        className={`absolute inset-x-0 top-0 flex aspect-square items-center justify-center font-display ${type} font-bold text-ink`}
      >
        {label}
      </span>
    </span>
  );
}

export default Rosette;
