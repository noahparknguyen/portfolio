// Site-section hue → literal Tailwind class, for the two layers that carry a
// section's accent: the border map (SectionTitle.jsx, Header.jsx, Credits.jsx)
// and the decoration map (TextLink.jsx). Tailwind can't scan an interpolated
// `border-${hue}` or `decoration-${hue}`, so the literal strings have to exist
// somewhere, and here they exist once.
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
