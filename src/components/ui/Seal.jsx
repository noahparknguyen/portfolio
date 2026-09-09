import celesteStamp from "../../assets/celeste-stamp.webp";

function Stamp({ className = "" }) {
  return (
    <img
      src={celesteStamp}
      alt=""
      aria-hidden="true"
      className={`h-14 w-auto rotate-3 [image-rendering:pixelated] ${className}`}
    />
  );
}

export default Stamp;
