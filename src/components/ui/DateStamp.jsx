import Eyebrow from "./Eyebrow";

// A dashed date stamp, for Now's intro and About's certificates.
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
