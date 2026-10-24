import { useEffect, useRef, useState } from "react";
import PROJECTS from "../../lib/projects";
import PinnedCard from "../ui/PinnedCard";
import SectionTitle from "../ui/SectionTitle";
import Pin from "../ui/Pin";
import Tape from "../ui/Tape";
import Book from "./Book";
import BookSpread from "./BookSpread";

// Book art lives in `assets/books/`, out of reach of App.jsx's single-`*`
// preload, so a visit that never comes here doesn't download it. It's warmed
// here instead, when Creations first mounts.
const BOOK_ASSETS = import.meta.glob(
  "../../assets/books/*.{png,jpg,jpeg,gif,webp,svg}",
  { eager: true, query: "?url", import: "default" },
);

// The screenshot and stamps beside a closed cover. The stamps read the book's
// own stats page, so the board and the book can't drift apart. Only a stat
// with a short `stamp` label appears here.
function ProjectEvidence({ project, rotate }) {
  const stats =
    project.spreads
      .flatMap((spread) => [spread.verso, spread.recto])
      .find((page) => page.kind === "stats")?.items ?? [];
  const stamped = stats.filter((stat) => stat.stamp);

  return (
    <div className="flex flex-col gap-4 md:w-[44%]">
      <figure className="relative">
        <Tape className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 -rotate-3" />
        <PinnedCard padding="p-2" rotate={rotate}>
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

      {/* Named, since "list, 3 items" alone doesn't say which project. */}
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

  // Closing swaps the cover back in, and focus returns to it rather than to the
  // top of the document. The pending id is a ref, so clearing it costs no
  // second render.
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
      className="flex flex-col gap-8"
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

      {/* Rows alternate with `flex-row-reverse` rather than reordered
          markup, so the DOM reads cover then evidence in both. Opening a book
          replaces its whole row with the spread. */}
      <ol className="flex flex-col gap-8">
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
                  rotate={i % 2 === 0 ? "-rotate-[1deg]" : "rotate-[1deg]"}
                  onOpen={() => setOpenId(project.id)}
                  openRef={(el) => {
                    coverRefs.current[project.id] = el;
                  }}
                />
                <ProjectEvidence
                  project={project}
                  rotate={i % 2 === 0 ? "rotate-[1.5deg]" : "-rotate-[1.5deg]"}
                />
              </div>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}

export default Creations;
