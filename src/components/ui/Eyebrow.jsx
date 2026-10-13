// The one text-colour class an <Eyebrow> is allowed to carry. Never pass a
// competing colour through `className`: which of two text-colour utilities
// wins depends on Tailwind's source order, not on the class list.
const TONE = {
  label: "text-label",
  ink: "text-ink",
  "on-ink": "text-on-ink",
};

const DEFAULT_TONE = "label";

function Eyebrow({
  as: Tag = "h3",
  tone = DEFAULT_TONE,
  className = "",
  children,
  ...rest
}) {
  return (
    // An unknown tone falls back to the default. Otherwise the string
    // "undefined" lands in the class list and the element silently inherits
    // its parent's colour.
    <Tag
      className={`eyebrow ${TONE[tone] ?? TONE[DEFAULT_TONE]} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default Eyebrow;
