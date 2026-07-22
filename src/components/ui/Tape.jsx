function Tape({ className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`block h-5 w-14 border-2 border-ink bg-primary ${className}`}
    />
  );
}

export default Tape;
