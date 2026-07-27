import hk_knights from "../../assets/hk-the-hollow-knight-and-knight.webp";
import Eyebrow from "../ui/Eyebrow";

function Banner() {
  return (
    <header className="relative px-4 pb-1 pt-4 text-center md:px-8">
      <span
        aria-hidden="true"
        className="absolute left-2 top-2 h-3 w-3 border-l-2 border-t-2 border-ink"
        style={{ opacity: "var(--opacity-accent-line)" }}
      />
      <span
        aria-hidden="true"
        className="absolute right-2 top-2 h-3 w-3 border-r-2 border-t-2 border-ink"
        style={{ opacity: "var(--opacity-accent-line)" }}
      />
      <div className="inline-block text-left">
        <Eyebrow as="p">Hey there, I'm</Eyebrow>
        <h1
          className="wordmark font-wordmark text-wordmark-fluid uppercase leading-none text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(100deg, var(--color-wordmark-from), var(--color-wordmark-via), var(--color-wordmark-to))",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextStroke: "var(--wordmark-stroke) var(--color-ink)",
            paintOrder: "stroke fill",
          }}
        >
          Noah Park-Nguyen
        </h1>
        <Eyebrow as="p" className="text-right">
          A Full-Stack Developer
        </Eyebrow>
      </div>
      <div className="flex items-end justify-center gap-2">
        <span aria-hidden="true" className="mb-1 h-0.5 flex-1 bg-ink" />
        <span
          aria-hidden="true"
          className="mb-0.5 h-1.5 w-1.5 rounded-full bg-ink"
        />
        <img
          src={hk_knights}
          alt="The Knight and the Hollow Knight looking up"
          width="144"
          height="84"
          decoding="async"
          className="-mb-0.5 block h-auto max-w-18"
        />
        <span
          aria-hidden="true"
          className="mb-0.5 h-1.5 w-1.5 rounded-full bg-ink"
        />
        <span aria-hidden="true" className="mb-1 h-0.5 flex-1 bg-ink" />
      </div>
    </header>
  );
}

export default Banner;
