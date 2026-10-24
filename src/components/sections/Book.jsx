import Eyebrow from "../ui/Eyebrow";
import ProjectLinks from "../ui/ProjectLinks";
import BookDevice from "./BookDevice";

function ArrowRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ strokeWidth: "var(--stroke-bold)" }}
    >
      <path d="M5 12 h13" />
      <path d="M12 6 L18 12 L12 18" />
    </svg>
  );
}

// A closed book is one page wide and as tall as its pages, so opening it
// unfolds rightward at a constant height. Below md the cover takes the spread's
// full width and its natural height.
function Book({ project, onOpen, openRef, rotate }) {
  return (
    // The hover lift is on this wrapper, so the page block lifts with the
    // cover. `has-[button:hover]` scopes it to the open button, so hovering a
    // link lifts the link alone. No margins: the row in Creations.jsx places
    // the cover, and centring it here would make it open in both directions.
    <div
      className={`relative transition-transform has-[button:hover]:-translate-y-0.5 has-[button:focus-visible]:-translate-y-0.5 md:w-1/2 ${rotate}`}
    >
      {/* The page block. Its 4px offset is the book's depth, so it has no
          shadow. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 translate-x-1 translate-y-1 border-2 border-ink bg-paper"
      />

      <div
        className={`relative border-2 border-ink ${project.coverTint} md:h-120`}
      >
        {/* Spine, with its head and tail bands. */}
        <span
          aria-hidden="true"
          className={`absolute inset-y-0 left-0 w-3 border-r-2 border-ink ${project.spineTint}`}
        >
          <span className="absolute inset-x-0 top-1.5 h-2 border-y-2 border-ink bg-primary" />
          <span className="absolute inset-x-0 bottom-1.5 h-2 border-y-2 border-ink bg-primary" />
        </span>

        <div className="relative flex h-full flex-col pl-3">
          {/* The whole cover is the control, so the book opens wherever you
              touch it. First in the DOM, so it's the first stop inside the
              cover. It paints under the contents, which are
              `pointer-events-none` so clicks fall through to it, and only the
              links opt back in. `inset-0` reaches over the spine too. */}
          <button
            ref={openRef}
            type="button"
            onClick={onOpen}
            aria-label={`Open the ${project.title} book`}
            className="absolute inset-0"
          />

          {/* The rule frame stops at the spine. An absolute element ignores
              the parent's `pl-3`, so `left-5` is the spine's `w-3` plus the
              8px inset the other sides use. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-2 left-5 right-2 border border-ink"
            style={{ opacity: "var(--opacity-accent-line)" }}
          />

          <div className="pointer-events-none relative flex flex-1 flex-col items-center justify-center gap-4 p-4 md:p-6">
            <div className="relative flex flex-col items-center gap-3 text-center">
              <BookDevice mark={project.mark} />
              <div>
                <h3 className="font-display text-xl font-semibold leading-tight text-ink">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-gray-700">{project.summary}</p>
              </div>

              {/* Nothing about a cover says it opens, so a handwritten note
                  does, without reading as a third control. */}
              <p className="flex items-center gap-1 font-hand text-xl leading-none text-ink">
                read more
                <ArrowRight />
              </p>
            </div>

            {/* A sibling of the overlay, since a <button> can't contain links.
                Only the chips take pointer events back, so the note under them
                still opens the book. */}
            <div className="w-full">
              <ProjectLinks
                liveUrl={project.liveUrl}
                liveLabel={project.liveLabel}
                repoUrl={project.repoUrl}
                title={project.title}
                liveNote={project.liveNote}
                bg="bg-paper"
              />
            </div>
          </div>

          {/* pointer-events-none so the foot of the cover opens the book too. */}
          <Eyebrow
            as="p"
            className="pointer-events-none relative shrink-0 px-4 pb-4 text-center md:px-6"
          >
            {project.imprint}
          </Eyebrow>
        </div>
      </div>
    </div>
  );
}

export default Book;
