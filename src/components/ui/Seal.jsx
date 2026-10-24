import celesteSeal from "../../assets/celeste-seal.webp";

// The sticker sealing the Welcome letter, not postage, so it has no
// denomination, perforation, or postmark: those belong to Weather's stamp. Not
// called `Stamp`, a word the site already uses three ways.
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
