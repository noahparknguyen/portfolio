// Site-section hue → literal Tailwind class, for the two grammar layers that
// carry a section's accent (SectionTitle.jsx, Header.jsx, and Credits.jsx all
// used to keep their own copy of the border map; TextLink.jsx its own
// decoration map). Centralized here since Tailwind can't scan an interpolated
// `border-${hue}` / `decoration-${hue}`, so the literal strings still have to
// exist somewhere — just in one place instead of four.
export const borderAccent = {
  rose: "border-rose",
  violet: "border-violet",
  blue: "border-blue",
  orchid: "border-orchid",
};

export const decorationAccent = {
  rose: "decoration-rose",
  violet: "decoration-violet",
  blue: "decoration-blue",
  orchid: "decoration-orchid",
  // Neutral treatment for links outside the four owned section hues
  // (e.g. the footer's Credits link).
  label: "decoration-label",
};
