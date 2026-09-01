import { useEffect, useRef, useState } from "react";
import PROJECTS from "../../lib/projects";
import PinnedCard from "../ui/PinnedCard";
import SectionTitle from "../ui/SectionTitle";
import Pin from "../ui/Pin";
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
      <PinnedCard bg="bg-orchid-soft" padding="p-4 md:p-6" className="relative">
        <Pin className="absolute -top-2 left-1/2 -translate-x-1/2" />
        <SectionTitle accent="orchid" id="creations-heading">
          Creations
        </SectionTitle>
        <p className="mt-2 max-w-prose text-gray-700">
          This is where I keep my passion projects — the ones I still actively
          maintain, and the finished ones I&rsquo;m proud enough to show off.
          The links will take you straight there if you just want to try them.
          Open a book up and you&rsquo;ll get the full deep dive into why and
          how I made it.
        </p>
      </PinnedCard>

      <ol className="flex flex-col gap-5">
        {PROJECTS.map((project) => (
          <li key={project.id}>
            {openId === project.id ? (
              <BookSpread project={project} onClose={() => close(project.id)} />
            ) : (
              <Book
                project={project}
                onOpen={() => setOpenId(project.id)}
                openRef={(el) => {
                  coverRefs.current[project.id] = el;
                }}
              />
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}

export default Creations;
