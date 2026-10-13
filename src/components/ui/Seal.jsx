import celesteSeal from "../../assets/celeste-seal.webp";

// The sticker that seals the Welcome letter shut, not postage. The letter
// carries no postage, so the stamp and postmark stay Weather's gag alone.
//
// What makes it read as a seal is what it lacks: no denomination, no
// perforated edge, no cancelling postmark. Weather's stamp has all three.
// Don't add any of them here.
//
// Not called `Stamp`, because that word already means the tech stamps, Steam's
// hours-logged rubber stamp, and Steam's red Last-2-Weeks chip.
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
