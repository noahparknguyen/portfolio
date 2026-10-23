import Eyebrow from "./Eyebrow";

// A dashed rubber date stamp: a small label over the date, struck slightly
// crooked at the foot of a document. Now's "Last updated" card and About's
// certificates share it.
function DateStamp({ label, date }) {
  return (
    <div className="rotate-2 border-2 border-dashed border-label px-3 py-1 text-center">
      <Eyebrow as="p">{label}</Eyebrow>
      <Eyebrow as="p" tone="ink">
        {date}
      </Eyebrow>
    </div>
  );
}

export default DateStamp;
