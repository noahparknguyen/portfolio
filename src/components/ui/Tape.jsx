// `data-tilt-exempt` exempts this from the tilt cap that
// scripts/audit-browser.mjs enforces. Tape is counter-rotated against whatever
// it holds (the polaroid sits at +3 and its tape at -6), and that mismatch is
// most of what sells the gesture, so capping it would undo the effect.
function Tape({ className = "" }) {
  return (
    <span
      data-tilt-exempt="true"
      aria-hidden="true"
      className={`block h-5 w-14 border-2 border-ink bg-primary ${className}`}
    />
  );
}

export default Tape;
