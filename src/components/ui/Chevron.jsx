// The page-turn arrow for the passport and the books. Its stroke of 3 is the one
// exception to the stroke scale, since at --stroke-bold the arrows look weak.
function Chevron({ dir, className = "h-4 w-4" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ strokeWidth: "3" }}
    >
      <path d={dir === "left" ? "M15 5 L8 12 L15 19" : "M9 5 L16 12 L9 19"} />
    </svg>
  );
}

export default Chevron;
