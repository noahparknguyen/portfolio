// `min-h-0` is applied here, not left to each call site.
//
// A grid item defaults to `min-height: auto` and so refuses to shrink below its
// own content: an over-long page grows the cell past the panel's fixed height
// and the text spills outside the border, while the inner `overflow-y-auto`
// never engages. The guide calls this "not optional" and BookSpread passed it
// explicitly — but About's passport, which uses the same primitive with the
// same fixed-height panel, did not. A rule that every call site has to remember
// is a rule that eventually gets forgotten, so it lives in the primitive now.
//
// Safe as a default: with `auto` rows the track still sizes to its content, so
// this only ever removes a floor that a fixed-height panel needs removed.
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
