// A prize ribbon, drawn so its fill can come from the section tints. The 32
// pleat points alternate between two radii, which reads as gathered ribbon
// rather than a star.
const PLEATS = Array.from({ length: 32 }, (_, n) => {
  const r = n % 2 ? 32 : 37;
  const a = (n / 32) * 2 * Math.PI;
  return `${(40 + r * Math.sin(a)).toFixed(1)},${(40 - r * Math.cos(a)).toFixed(1)}`;
}).join(" ");

// `fill` is a token reference, since it paints SVG. The label is HTML rather
// than SVG <text>, so it uses the site's type scale and can run two lines.
function Rosette({ fill, label, size = "sm" }) {
  const box = size === "md" ? "w-18" : "w-14";
  const type = size === "md" ? "text-base" : "text-sm";
  return (
    <span aria-hidden="true" className={`relative block ${box}`}>
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
          square the ribbon's width centres the label on it. */}
      <span
        className={`absolute inset-x-0 top-0 flex aspect-square flex-col items-center justify-center font-display ${type} font-bold leading-none text-ink`}
      >
        {label}
      </span>
    </span>
  );
}

export default Rosette;
