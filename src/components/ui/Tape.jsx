// Exempt from the audit's tilt cap: tape counter-rotated against what it holds
// is most of the effect.
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
