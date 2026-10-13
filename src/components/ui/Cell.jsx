// `min-h-0` is applied here, not left to each call site.
//
// A grid item defaults to `min-height: auto` and won't shrink below its own
// content, so an over-long page grows the cell past the panel's fixed height,
// the text spills outside the border, and the inner `overflow-y-auto` never
// engages. The passport and the book spread both need it, and a rule every
// call site has to remember eventually gets forgotten.
//
// Safe as a default: with `auto` rows the track still sizes to its content, so
// this only removes a floor that a fixed-height panel needs removed.
function Cell({ padding = "p-6", bg = "bg-white", className = "", children }) {
  return (
    <div
      className={`flex min-h-0 flex-col justify-center ${bg} ${padding} ${className}`}
    >
      {children}
    </div>
  );
}

export default Cell;
