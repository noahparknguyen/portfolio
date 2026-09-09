import celesteSeal from "../../assets/celeste-seal.webp";

// The sticker that seals the Welcome letter shut, NOT postage.
//
// This was called `Stamp` and documented as "the Celeste postage-stamp image",
// which put it in direct conflict with the guide's own rule that the Welcome
// card is a letter and must not carry postage — the distinction that keeps
// Weather's stamp-and-postmark gag distinctive. The Personality section had it
// right all along ("a sticker-sealed letter"); only the primitive's name and
// its one-line description had drifted.
//
// What makes it legible as a seal rather than postage is what it LACKS: no
// denomination, no perforated edge, no cancelling postmark. Weather's stamp has
// all three. Don't add any of them here.
//
// The rename also disambiguates a word this codebase overloads four ways — the
// tech stamps, Steam's hours-logged rubber stamp, Steam's red Last-2-Weeks
// chip, and this. Only one of them was ever meant to read as postage.
function Seal({ className = "" }) {
  return (
    <img
      src={celesteSeal}
      alt=""
      aria-hidden="true"
      width="122"
      height="111"
      className={`h-14 w-auto rotate-3 [image-rendering:pixelated] ${className}`}
    />
  );
}

export default Seal;
