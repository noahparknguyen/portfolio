// A grid item won't shrink below its content, so without `min-h-0` an
// over-long page would grow past a fixed-height panel instead of scrolling.
// With `auto` rows it changes nothing.
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
