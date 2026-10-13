import { borderAccent } from "../../lib/accents";

function SectionTitle({ accent = "rose", className = "", children, ...rest }) {
  return (
    <h2
      // `self-start` matters. Inside a flex container, such as Now's intro
      // card, `inline-block` is blockified, and the default `align-items:
      // stretch` pulls the heading to the container's full width, dragging its
      // accent underline across the whole card instead of hugging the word.
      // `align-self` does nothing outside a flex parent.
      className={`inline-block self-start border-b-4 ${borderAccent[accent]} pb-1 text-3xl font-bold text-ink ${className}`}
      {...rest}
    >
      {children}
    </h2>
  );
}

export default SectionTitle;
