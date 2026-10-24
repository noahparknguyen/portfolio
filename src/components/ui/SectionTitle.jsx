import { borderAccent } from "../../lib/accents";

function SectionTitle({ accent = "rose", className = "", children, ...rest }) {
  return (
    <h2
      // `self-start`, or in a flex parent the default stretch drags the
      // underline across the whole card.
      className={`inline-block self-start border-b-4 ${borderAccent[accent]} pb-1 text-3xl font-bold text-ink ${className}`}
      {...rest}
    >
      {children}
    </h2>
  );
}

export default SectionTitle;
