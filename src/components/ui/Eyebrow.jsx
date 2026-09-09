// The one text-color class an <Eyebrow> is allowed to carry. Never pass a
// competing color through `className` — see STYLE_GUIDE.md → Primitives.
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
    // A typo'd tone used to interpolate the literal string "undefined" into
    // the class list, which is not a class, so the element silently inherited
    // whatever colour its parent had. Falling back to the documented default
    // keeps it on-palette and keeps the failure visible in review rather than
    // invisible in the browser.
    <Tag
      className={`eyebrow ${TONE[tone] ?? TONE[DEFAULT_TONE]} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default Eyebrow;
