// `data-tilt-exempt` marks this as exempt from the tilt cap that
// scripts/audit-browser.mjs enforces. The guide requires Tape to be
// counter-rotated against whatever it tapes — the polaroid sits at +3 and its
// tape at -6 — and that deliberate mismatch is most of what sells the gesture.
// Capping it would defeat the rule rather than uphold it.
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
