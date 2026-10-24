import Eyebrow from "../ui/Eyebrow";

// One boarding pass per job. The employer is the carrier, the role the seat,
// the months departure and arrival, the placement the class, and the acronym
// and year the flight number. Level at every width, since each holds a
// paragraph.

function Field({ label, className = "", children }) {
  return (
    <div className={`min-w-0 ${className}`}>
      <Eyebrow as="dt">{label}</Eyebrow>
      <dd className="mt-0.5 font-bold text-ink">{children}</dd>
    </div>
  );
}

// Bar widths come from the flight code, so each pass gets its own pattern and
// keeps it between renders. Solid rects, since the wordmark is the site's only
// gradient.
function Barcode({ seed, className = "" }) {
  const codes = [...seed].map((c) => c.charCodeAt(0));
  const bars = [];
  for (let x = 0, n = 0; x < 96; n++) {
    const v = codes[n % codes.length] + n * 7;
    const w = 1 + (v % 3);
    bars.push({ x, w });
    x += w + 1 + ((v >> 2) % 2);
  }
  return (
    <svg
      viewBox="0 0 96 40"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`block h-10 text-ink ${className}`}
    >
      {bars.map((b) => (
        <rect
          key={b.x}
          x={b.x}
          y="0"
          width={b.w}
          height="40"
          fill="currentColor"
        />
      ))}
    </svg>
  );
}

// The perforation is the stub's leading border: on the left from md, and on
// top below it, where the stub drops underneath. Seat spans two columns at
// every width, so the longest role stays on one line.
export function BoardingPass({
  carrier,
  flight,
  band,
  fare,
  seat,
  departs,
  arrives,
  remarks,
}) {
  return (
    <article className="shadow-sticker flex flex-col border-2 border-ink bg-white md:flex-row">
      <div className="min-w-0 flex-1">
        <div
          className={`flex flex-wrap items-baseline justify-between gap-x-4 border-b-2 border-ink ${band} px-4 py-2`}
        >
          <p className="font-display text-lg font-semibold text-ink">
            {carrier}
          </p>
          <Eyebrow as="p" tone="ink">
            Boarding pass · Carte d’embarquement
          </Eyebrow>
        </div>
        <div className="p-4">
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 md:grid-cols-4">
            <Field label="Seat" className="col-span-2">
              {seat}
            </Field>
            <Field label="Departs">{departs}</Field>
            <Field label="Arrives">{arrives}</Field>
          </dl>
          <div className="mt-4">
            <Eyebrow as="p">Remarks</Eyebrow>
            <p className="mt-0.5 text-sm text-gray-600">{remarks}</p>
          </div>
        </div>
      </div>
      <div
        className={`flex items-end gap-4 border-t-2 border-dashed border-ink ${band} p-4 md:w-44 md:shrink-0 md:flex-col md:items-stretch md:border-l-2 md:border-t-0`}
      >
        <dl className="flex gap-4 md:flex-col md:gap-2">
          <Field label="Flight">
            <span className="font-mono text-xl">{flight}</span>
          </Field>
          <Field label="Class">{fare}</Field>
        </dl>
        <Barcode
          seed={flight}
          className="min-w-0 flex-1 md:mt-auto md:w-full md:flex-none"
        />
      </div>
    </article>
  );
}
