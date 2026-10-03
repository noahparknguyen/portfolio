import Eyebrow from "../ui/Eyebrow";
import PinnedCard from "../ui/PinnedCard";
import TextLink from "../ui/TextLink";
import Tape from "../ui/Tape";

// Follows Credits' composition rather than the four hued sections: this page
// owns no section hue (STYLE_GUIDE.md → Color → Sky accents), so like the
// Colophon it takes warm `paper`, is taped up rather than pinned, and its <h2>
// skips SectionTitle's single-accent underline because there is no accent to
// carry. The Home link takes TextLink's neutral `label` treatment for the same
// reason, matching the footer's Credits link.
//
// The worker serves this path with a real 404 status (worker/index.js), so the
// status line and the rendered page agree instead of returning a soft 404.
//
// THE CARD IS A RETURNED LETTER, and it obeys returned-mail anatomy the way
// Weather obeys a postcard's: the sender's address in the top-left corner, the
// address the visitor actually typed as the addressee, and a RETURN TO SENDER
// stamp struck across it. There is deliberately NO postage stamp: stamp and
// postmark are Weather's gag (STYLE_GUIDE.md → Composition may vary), and the
// returned-mail stamp is what says "undeliverable" on its own. Like About's
// STANDBY stamp it is crooked on purpose and opts out of the tilt cap.
function NotFound({ onNavigate }) {
  // Read during render: the site is client-rendered only (createRoot in
  // main.jsx), so `window` always exists here, and reading it fresh keeps the
  // envelope right if the visitor reaches a second unknown path in-app.
  const address = `${window.location.host}${window.location.pathname}`;

  return (
    <section
      aria-labelledby="notfound-heading"
      className="flex justify-center py-8"
    >
      <PinnedCard
        bg="bg-paper"
        padding="p-4 md:p-6"
        className="relative max-w-xl"
      >
        <Tape className="absolute -top-3 left-1/2 -translate-x-1/2 -rotate-3" />

        {/* Decorative envelope front. Everything it says, the heading and
            paragraphs below say in words, so it is hidden from assistive tech
            rather than read out as a jumble of mail labels. */}
        <div aria-hidden="true">
          <Eyebrow as="p">Noah Park-Nguyen · noahpn.dev</Eyebrow>
          <div className="relative mt-6 flex flex-col items-center">
            <p className="max-w-full break-all border-b-2 border-ink pb-1 text-center font-mono text-sm text-ink">
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
        </div>

        <h2
          id="notfound-heading"
          className="mt-6 text-center text-3xl font-bold text-ink"
        >
          Nothing here
        </h2>

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
