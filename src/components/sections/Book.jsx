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

// A closed book is one page wide and the same height as the pages inside it, so
// the cover is `md:w-1/2` against the open spread's full width, and both are
// `md:h-[30rem]`. Opening therefore unfolds the object rightward at a constant
// height instead of changing both dimensions at once. Below md the spread is
// already a single column, so the cover matches it at full width and takes its
// natural height (the passport's reason: no fixed heights on a phone).
function Book({ project, onOpen, openRef, rotate }) {
  return (
    // A closed book lies on the board a little crooked, like everything else
    // pinned there (`rotate`, alternating from Creations.jsx). The cover holds
    // a centred blurb of a few lines, not running text, so the tilt costs no
    // reading; opening the book straightens it, like picking it up.
    //
    // The hover lift lives on this wrapper, not on the cover boards inside it.
    // On the boards it would move the cover alone and leave the page block and
    // shadow behind, the cover peeling off its own pages. `has-[button:hover]`
    // keeps it scoped to the open button, so hovering a link lifts that link
    // alone.
    //
    // No margin utilities and no `mx-auto`: the cover sits in a bento row
    // (Creations.jsx), and the row's `justify-between` places it. Centred here,
    // it would open by expanding in both directions instead of unfolding
    // rightward.
    <div
      className={`relative transition-transform has-[button:hover]:-translate-y-0.5 has-[button:focus-visible]:-translate-y-0.5 md:w-1/2 ${rotate}`}
    >
      {/* The page block, offset down-right so the closed book reads as a thick
          object rather than a card. Its 4px offset is the book's depth, the
          same 4px every pinned object's shadow reaches, so it carries no shadow
          of its own. */}
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
          {/* The whole cover is the control, which is what a book is: you open it
              by touching it anywhere rather than by hunting for a region.
              Overlaying only the mark, title, and blurb would leave 39% of the
              cover clickable, with dead bands on all four sides.

              First in the DOM, so it's the first control a keyboard user
              reaches inside the cover: opening the book is the primary action,
              and the two outbound links are secondary.

              It still paints under the cover's contents, which is why they stay
              crisp. The content is `pointer-events-none` so clicks fall through
              to this button, and only the links opt back in. That also keeps the
              hover lift honest: hovering the title lifts the whole book, and
              hovering a link lifts the link alone.

              `inset-0` resolves against this parent's padding box, so the
              overlay reaches over the spine as well, which is right: the spine
              is part of the book. */}
          <button
            ref={openRef}
            type="button"
            onClick={onOpen}
            aria-label={`Open the ${project.title} book`}
            className="absolute inset-0"
          />

          {/* The blind-stamped rule frame an old cloth binding carries. It's
              stamped on the cover board only, so it has to stop at the spine.
              `inset-2` doesn't do that on its own: an absolute element resolves
              against its containing block's padding box, so this parent's
              `pl-3`, which clears the spine for the content, does nothing for
              it. `left-5` is the spine's `w-3` plus the same 8px inset the
              other three sides use. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-2 left-5 right-2 border border-ink"
            style={{ opacity: "var(--opacity-accent-line)" }}
          />

          {/* Mark, title, blurb, and links are one centred cluster rather than
              a content block pushed up and links pinned down, which would leave
              a void through the middle of the cover. Only the imprint sits
              apart, at the foot. */}
          <div className="pointer-events-none relative flex flex-1 flex-col items-center justify-center gap-4 p-4 md:p-6">
            <div className="relative flex flex-col items-center gap-3 text-center">
              <BookDevice mark={project.mark} />
              <div>
                <h3 className="font-display text-xl font-semibold leading-tight text-ink">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-gray-700">{project.summary}</p>
              </div>

              {/* Nothing about a cover says "this one is a button", and the lift
                  only shows once you're already hovering it. The site's own
                  annotation voice does the job: handwriting reads as a note
                  pointing at the object rather than as a third control
                  competing with the two links below. */}
              <p className="flex items-center gap-1 font-hand text-xl leading-none text-ink">
                read more
                <ArrowRight />
              </p>
            </div>

            {/* A sibling of the overlay rather than its child: a <button> can't
                contain interactive content, so the two <a>s can never live
                inside one. The opt-in to pointer events is scoped to the chips
                themselves inside ProjectLinks, so the note beneath them doesn't
                punch a dead strip through the cover. */}
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
