import { useEffect, useRef, useState } from "react";
import PROJECTS from "../../lib/projects";
import PinnedCard from "../ui/PinnedCard";
import SectionTitle from "../ui/SectionTitle";
import Pin from "../ui/Pin";
import Tape from "../ui/Tape";
import Book from "./Book";
import BookSpread from "./BookSpread";

// Book art deliberately lives in `assets/books/`, a SUBDIRECTORY. App.jsx's
// site-wide preload globs `./assets/*.{…}` — a single `*`, which does not match
// across a `/` — so nothing in here is pulled into the page weight on a visit
// that never reaches this section (STYLE_GUIDE.md → Assets). That does leave
// the alt-text flash the preload exists to prevent, so the same warming trick
// runs here instead, once, when Creations first mounts.
const BOOK_ASSETS = import.meta.glob(
  "../../assets/books/*.{png,jpg,jpeg,gif,webp,svg}",
  { eager: true, query: "?url", import: "default" },
);

// The evidence pinned beside a closed cover: what the project looks like, and
// two or three numbers that say how substantial it is.
//
// This is the space the section used to leave empty. A closed cover can only
// carry a name, a mark, a blurb, a year and two links — everything a scanning
// visitor most wants (what does it look like, what is it built from, how big is
// it) was locked behind a click. Now the board answers the first two before
// anyone opens anything.
//
// The stamps read their numbers straight out of the book's own stats page, so
// the board and the book cannot drift apart. A stat appears here only if it
// carries a short `stamp` label; the rest stay inside.
function ProjectEvidence({ project }) {
  const stats =
    project.spreads
      .flatMap((spread) => [spread.verso, spread.recto])
      .find((page) => page.kind === "stats")?.items ?? [];
  const stamped = stats.filter((stat) => stat.stamp);

  return (
    <div className="flex flex-col gap-4 md:w-[44%]">
      {/* Taped up like Home's polaroid. The tape is counter-rotated against the
          card, which is what sells it as placed by hand rather than printed on
          (STYLE_GUIDE.md → Handcrafted layer). The card itself stays within the
          1.5 degree cap that applies to anything wider than a compact card. */}
      <figure className="relative">
        <Tape className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 -rotate-3" />
        <PinnedCard padding="p-2" rotate="rotate-[1.5deg]">
          <img
            src={project.board.src}
            alt={project.board.alt}
            width={project.board.width}
            height={project.board.height}
            decoding="async"
            className="block h-auto w-full border-2 border-ink"
          />
          <figcaption className="mt-2 text-center text-sm text-gray-600">
            {project.board.caption}
          </figcaption>
        </PinnedCard>
      </figure>

      {/* Rubber stamps, the same object Steam's "1466h LOGGED" chip already
          establishes. Small enough to scatter, so they fill the board the way a
          board fills rather than adding a second big rectangle. Under 280px
          wide, so the 3 degree tilt cap applies rather than 1.5.

            The list is NAMED: on its own a screen reader announces "list, 3
            items: 1,259 Pokemon, 0 API calls, 480 tests" with nothing tying
            those figures to the project they describe. Sighted readers get that
            from the stamps sitting beside the cover. */}
      {stamped.length > 0 && (
        <ul
          aria-label={`${project.title} by the numbers`}
          className="flex flex-wrap justify-center gap-2"
        >
          {stamped.map((stat, i) => (
            <li
              key={stat.label}
              className={`shadow-sticker border-2 border-ink bg-white px-2 py-0.5 font-display text-xs font-bold uppercase text-ink ${
                i % 2 === 0 ? "rotate-2" : "-rotate-2"
              }`}
            >
              {stat.value} {stat.stamp}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Creations() {
  const [openId, setOpenId] = useState(null);
  const coverRefs = useRef({});
  const pendingFocus = useRef(null);

  useEffect(() => {
    Object.values(BOOK_ASSETS).forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  // Closing swaps the spread back out for the cover, so the control that was
  // focused is gone by the time this runs — hand focus back to the cover the
  // reader opened, not to the top of the document. The pending id is held in a
  // ref rather than state: clearing it must not cost a second render, and it is
  // read only after the cover has remounted.
  useEffect(() => {
    if (openId !== null) return;
    const id = pendingFocus.current;
    if (!id) return;
    pendingFocus.current = null;
    coverRefs.current[id]?.focus();
  }, [openId]);

  const close = (id) => {
    pendingFocus.current = id;
    setOpenId(null);
  };

  return (
    <section
      aria-labelledby="creations-heading"
      className="flex flex-col gap-5"
    >
      <PinnedCard
        bg="bg-orchid-soft"
        padding="p-4 md:p-6"
        className="relative md:mx-auto md:w-1/2"
      >
        <Pin className="absolute -top-2 left-1/2 -translate-x-1/2" />
        <SectionTitle accent="orchid" id="creations-heading">
          Creations
        </SectionTitle>
        <p className="mt-2 max-w-prose text-gray-700">
          This is where I keep my projects. The links will take you straight
          there if you want to try them out. But if you open a book up,
          you&rsquo;ll get the whole story on why I built that one and how it
          works.
        </p>
      </PinnedCard>

      {/* Each closed book is a bento row: the cover at its fixed one-page width
          on the left, its evidence on the right, hugging the row's edges with
          sky between. Same grammar as Home, whose rows also all read
          left-to-right at varied widths rather than alternating.

          Rows ALTERNATE: cover left with its evidence right, then the reverse.
          A column of identically-arranged rows was the original complaint in
          miniature, and flipping every other one turns the stack into a zig-zag
          without resizing anything.

          `flex-row-reverse` rather than reordered markup, so the DOM order stays
          cover-then-evidence in both rows. That is the logical reading order
          either way, and it keeps the visual flip from becoming a focus-order
          problem. It could not become one here regardless: `ProjectEvidence`
          holds an image, a caption and stat stamps, and not one focusable
          element, so every control in the row lives in the cover.

          Opening REPLACES the whole row with the full-width spread, so the
          evidence steps aside while you are reading the book, which is exactly
          when it is redundant. */}
      <ol className="flex flex-col gap-5">
        {PROJECTS.map((project, i) => (
          <li key={project.id}>
            {openId === project.id ? (
              <BookSpread project={project} onClose={() => close(project.id)} />
            ) : (
              <div
                className={`flex flex-col gap-5 md:items-center md:justify-between ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <Book
                  project={project}
                  onOpen={() => setOpenId(project.id)}
                  openRef={(el) => {
                    coverRefs.current[project.id] = el;
                  }}
                />
                <ProjectEvidence project={project} />
              </div>
            )}
          </li>
        ))}
      </ol>

      {/* Last, which is the only place a forward-looking card reads correctly:
          after the projects, "Up next" means what it says. It sat second from
          the top before, where it announced the next project ahead of the real
          ones. Dashed border over warm `paper` is the site's established "blank
          form waiting to be filled in" language, already carrying About's
          Pending entry and its Locked achievement card. */}
      <PinnedCard
        bg="bg-paper"
        padding="p-6"
        rotate="-rotate-[1deg]"
        className="flex flex-col items-center gap-3 border-dashed text-center md:mx-auto md:w-1/2"
      >
        <span
          aria-hidden="true"
          className="font-display text-3xl font-bold text-ink"
        >
          ???
        </span>
        <h3 className="font-display text-xl font-semibold leading-tight text-ink">
          Up next
        </h3>
        <p className="text-sm text-gray-700">
          I&rsquo;m brainstorming what to build next. Whatever it turns out to
          be will end up here.
        </p>
      </PinnedCard>
    </section>
  );
}

export default Creations;
