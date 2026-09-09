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
function NotFound({ onNavigate }) {
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

        <h2
          id="notfound-heading"
          className="text-center text-3xl font-bold text-ink"
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
