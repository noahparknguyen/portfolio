import Eyebrow from "../ui/Eyebrow";

// About's work history, one boarding pass per job. The passport above it is
// the page's identity document, and these are the trips it went on, so the
// section reads as one travel wallet rather than a passport followed by a
// generic timeline.
//
// It follows real boarding-pass anatomy, the way Weather follows a postcard's:
// a carrier band across the top, passenger, seat, class, and departure
// fields, and a perforated stub that carries the flight number and the
// barcode. The job maps onto it without stretching: the employer is the
// carrier, the role is the seat, the start and end months are departure and
// arrival, and the employer's acronym and the year make the flight number.
//
// Level at every width. Each pass carries a paragraph, and anything holding
// running text stays at 0°, since a tilt makes the eye re-find the left edge
// on every line. The character lives in the stub and the barcode instead.

const PASSENGER = "PARK-NGUYEN/NOAH";

// A nod to speedrunning, the same kind of easter egg as the passport's MRZ.
// Every pass carries it, because a boarding group is printed on every pass.
const GROUP = "ANY%";

function Field({ label, className = "", children }) {
  return (
    <div className={`min-w-0 ${className}`}>
      <Eyebrow as="dt">{label}</Eyebrow>
      <dd className="mt-0.5 font-bold text-ink">{children}</dd>
    </div>
  );
}

// Decorative only. Bar and gap widths come from the flight code, so each pass
// gets its own pattern and the pattern never changes between renders. Bars
// are solid rects, not a repeating gradient, because the wordmark is the
// site's only gradient.
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

// One outline around the body and the stub. The perforation is the stub's
// leading border: dashed, on the left from `md` up and on top below it, where
// the stub drops underneath the way a phone boarding pass stacks.
//
// The flight number is printed once, on the stub, where it's the biggest
// thing. Repeating it in the body would cost a whole row of fields on a phone.
// Below `md` the grid is two columns, so Seat and Class share a row; from `md`
// it is four, and the six fields fit in two rows.
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
            <Field label="Passenger" className="col-span-2">
              {PASSENGER}
            </Field>
            <Field label="Seat" className="md:col-span-2">
              {seat}
            </Field>
            <Field label="Class">{fare}</Field>
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
        {/* The stub repeats the date the way a real one does, but only where
            there is room for it: on a phone the stub is one short row. */}
        <dl className="flex gap-4 md:flex-col md:gap-2">
          <Field label="Flight">
            <span className="font-mono text-xl">{flight}</span>
          </Field>
          <Field label="Group">{GROUP}</Field>
          <Field label="Date" className="hidden md:block">
            {departs}
          </Field>
        </dl>
        <Barcode
          seed={flight}
          className="min-w-0 flex-1 md:mt-auto md:w-full md:flex-none"
        />
      </div>
    </article>
  );
}
