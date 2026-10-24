import PinnedCard from "../ui/PinnedCard";
import TextLink from "../ui/TextLink";
import Tape from "../ui/Tape";

// No section hue, so like the Colophon it's paper, taped, and skips
// SectionTitle's underline. The Worker serves this page with a real 404
// (worker/index.js).
function NotFound({ onNavigate }) {
  // The site is client-rendered only, so `window` exists here, and reading it
  // fresh keeps the envelope right on a second unknown path.
  const address = `${window.location.host}${window.location.pathname}`;

  return (
    <section aria-labelledby="notfound-heading" className="flex justify-center">
      <PinnedCard
        bg="bg-paper"
        padding="p-4 md:p-6"
        className="relative max-w-xl"
      >
        <Tape className="absolute -top-3 left-1/2 -translate-x-1/2 -rotate-3" />

        <h2
          id="notfound-heading"
          className="text-center text-3xl font-bold text-ink"
        >
          Nothing here
        </h2>

        {/* Hidden from assistive tech, since the text says it all in words.
            The stamp is crooked on purpose and exempt from the tilt cap. */}
        <div aria-hidden="true" className="mt-6 flex flex-col items-center">
          <p className="max-w-full wrap-break-word border-b-2 border-ink pb-1 text-center font-mono text-sm text-ink">
            {address}
          </p>
          <span
            data-tilt-exempt="true"
            className="pointer-events-none mt-2 -rotate-6 border-2 border-live px-3 py-1 text-center font-display font-bold text-ink"
          >
            RETURN TO SENDER
            <span className="block text-xs">ADDRESS UNKNOWN</span>
          </span>
        </div>

        <p className="mt-4 text-gray-700">
          This page doesn&rsquo;t exist. The link is probably old, or I moved
          something and forgot to leave a note behind. But I did check, and it
          really isn&rsquo;t here.
        </p>
        <p className="mt-4 text-gray-700">
          Everything else is still where it was, so head back to the{" "}
          <span className="whitespace-nowrap">
            <TextLink
              accent="label"
              to="home"
              onClick={() => onNavigate("home")}
            >
              Home page
            </TextLink>
          </span>{" "}
          and have a look around.
        </p>
      </PinnedCard>
    </section>
  );
}

export default NotFound;
