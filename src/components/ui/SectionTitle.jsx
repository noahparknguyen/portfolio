import { borderAccent } from "../../lib/accents";

function SectionTitle({ accent = "rose", className = "", children, ...rest }) {
  return (
    <h2
      // `self-start` is load-bearing, not decoration. `inline-block` is blockified
      // inside a flex container, and the default `align-items: stretch` then
      // pulls the heading to the container's full width — which drags its accent
      // underline across the whole card instead of hugging the word. It happened
      // the moment Now's intro card became `flex flex-col`. `align-self` is inert
      // outside a flex parent, so this costs nothing everywhere else.
      className={`inline-block self-start border-b-4 ${borderAccent[accent]} pb-1 text-3xl font-bold text-ink ${className}`}
      {...rest}
    >
      {children}
    </h2>
  );
}

export default SectionTitle;
