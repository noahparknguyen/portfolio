// The nav chevron, shared by About's passport pager and Creations' book pages.
//
// `strokeWidth` is a prop rather than a constant because the passport's arrows
// are the site's one documented deviation from the stroke scale, at `3` —
// thinning them to `--stroke-bold` visibly weakens them (STYLE_GUIDE.md →
// Handcrafted layer → Inline SVG stroke-width scale). Everything else takes the
// token default, so a second copy of that exception can't drift in by accident.
function Chevron({
  dir,
  className = "h-4 w-4",
  strokeWidth = "var(--stroke-bold)",
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ strokeWidth }}
    >
      <path d={dir === "left" ? "M15 5 L8 12 L15 19" : "M9 5 L16 12 L9 19"} />
    </svg>
  );
}

export default Chevron;
