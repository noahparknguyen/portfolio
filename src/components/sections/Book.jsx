import Eyebrow from "../ui/Eyebrow";
import ProjectLinks from "../ui/ProjectLinks";

// Statmon's own favicon is a Poké Ball on a rounded dark tile with a purple
// flame gradient — both a rounded rectangle and a gradient, so neither can come
// across (STYLE_GUIDE.md → Shape & surface, Gradients). The ball itself is a
// CIRCLE, though, and small round non-rectangular accents are explicitly allowed
// in the handcrafted layer. So the mark is redrawn here in flat ink linework
// rather than imported: tile dropped, gradient dropped, ball kept.
//
// It is also why Statmon's cover carries no screenshot: its social image is a
// centred Poké Ball above the wordmark above the tagline — the same three things
// in the same order as the cover itself, so pasting it in would have printed the
// cover's own contents twice. That cover IS the image, redrawn in paper.
// One size for every mark, so a new book can't quietly draw its device larger.
const DEVICE = "h-16 w-16 shrink-0 md:h-20 md:w-20";

function PokeballDevice() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={DEVICE}>
      <circle cx="24" cy="24" r="18" fill="var(--color-paper)" />
      <path d="M6 24 A18 18 0 0 1 42 24 Z" fill="var(--color-violet)" />
      <g
        stroke="var(--color-ink)"
        style={{ strokeWidth: "var(--stroke-bold)" }}
        fill="none"
        strokeLinecap="round"
      >
        <line x1="6" y1="24" x2="42" y2="24" />
        <circle cx="24" cy="24" r="18" />
      </g>
      <circle
        cx="24"
        cy="24"
        r="6"
        fill="var(--color-on-ink)"
        stroke="var(--color-ink)"
        style={{ strokeWidth: "var(--stroke-bold)" }}
      />
    </svg>
  );
}

// Inbox's mark, redrawn on the same terms as the Poké Ball above: their favicon
// is three rectangles on a rounded brand-dark tile, so the tile goes (rounded
// rectangles are out) and the brand orange becomes a palette accent, but the
// composition — including both columns ending on the same line — is preserved.
function InboxDevice() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={DEVICE}>
      <g
        stroke="var(--color-ink)"
        style={{ strokeWidth: "var(--stroke-bold)" }}
      >
        <rect x="10" y="10" width="11" height="11" fill="var(--color-blue)" />
        <rect x="10" y="25" width="11" height="13" fill="var(--color-paper)" />
        <rect x="26" y="10" width="11" height="28" fill="var(--color-paper)" />
      </g>
    </svg>
  );
}

// Each book names its mark in the data; the drawing lives here, because
// `src/lib/projects.js` stays data and holds no JSX.
const DEVICES = {
  pokeball: PokeballDevice,
  inbox: InboxDevice,
};

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

// A closed book is ONE page wide and the same height as the pages inside it, so
// the cover is `md:w-1/2` against the open spread's full width, and both are
// `md:h-[30rem]`. Opening therefore unfolds the object rightward at a constant
// height instead of changing both dimensions at once. Below md the spread is
// already a single column, so the cover matches it at full width and takes its
// natural height (the passport's reason: no fixed heights on a phone).
function Book({ project, onOpen, openRef }) {
  const Device = DEVICES[project.mark];

  return (
    // Level at every width and centred on the column. No tilt: this is the most
    // text-dense object in the section, and the reason the guide already
    // straightens the Welcome letter, Devlog and the passport applies here too
    // (STYLE_GUIDE.md → Handcrafted layer → Slight rotation).
    //
    // The hover lift lives on this wrapper, not on the cover boards inside it.
    // On the boards it moved the cover alone and left the page block and shadow
    // behind — the cover peeling off its own pages. `has-[button:hover]` keeps
    // it scoped to the open button, so hovering a link lifts that link alone.
    <div className="relative mx-auto transition-transform has-[button:hover]:-translate-y-0.5 has-[button:focus-visible]:-translate-y-0.5 md:w-1/2">
      {/* The page block, offset down-right so the closed book reads as a thick
          object rather than a card. It carries the shadow-sticker for the whole
          book, being the lowest layer. */}
      <span
        aria-hidden="true"
        className="shadow-sticker pointer-events-none absolute inset-0 translate-x-1 translate-y-1 border-2 border-ink bg-paper"
      />

      <div
        className={`relative border-2 border-ink ${project.coverTint} md:h-120`}
      >
        {/* Spine, with its head and tail bands. */}
        <span
          aria-hidden="true"
          className={`absolute inset-y-0 left-0 w-5 border-r-2 border-ink ${project.spineTint}`}
        >
          <span className="absolute inset-x-0 top-1.5 h-2 border-y-2 border-ink bg-primary" />
          <span className="absolute inset-x-0 bottom-1.5 h-2 border-y-2 border-ink bg-primary" />
        </span>

        <div className="relative flex h-full flex-col pl-5">
          {/* The blind-stamped rule frame an old cloth binding carries. It is
              stamped on the COVER BOARD only, so it has to stop at the spine.
              `inset-2` doesn't do that on its own: an absolute element resolves
              against its containing block's padding box, so this parent's `pl-5`
              — which clears the spine for the content — does nothing for it, and
              the frame's left edge landed on the dark spine. `left-7` is the
              spine's `w-5` plus the same 8px inset the other three sides use. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-2 left-7 right-2 border border-ink"
            style={{ opacity: "var(--opacity-accent-line)" }}
          />

          {/* Mark, title, blurb and links are one centred cluster rather than a
              content block pushed up and links pinned down — the two halves
              being separately placed left a void through the middle of the
              cover. Only the imprint sits apart, at the foot. */}
          <div className="relative flex flex-1 flex-col items-center justify-center gap-4 p-4 md:p-6">
            <div className="relative flex flex-col items-center gap-3 text-center">
              <Device />
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
                open me up
                <ArrowRight />
              </p>

              {/* Transparent overlay: the mark, title and blurb are the control.
                  It stops short of the links — a <button> may only contain
                  phrasing content, so the <h3> and the two <a>s cannot live
                  inside one, and an overlay over the links would swallow their
                  clicks. */}
              <button
                ref={openRef}
                type="button"
                onClick={onOpen}
                aria-label={`Open the ${project.title} book`}
                className="absolute inset-0"
              />
            </div>

            {/* Sibling of the overlay button, never inside it: a <button> may
                only contain phrasing content, and an overlay covering these
                would swallow their clicks. */}
            <ProjectLinks
              liveUrl={project.liveUrl}
              repoUrl={project.repoUrl}
              title={project.title}
            />
          </div>

          <Eyebrow
            as="p"
            className="relative shrink-0 px-4 pb-4 text-center md:px-6"
          >
            {project.imprint}
          </Eyebrow>
        </div>
      </div>
    </div>
  );
}

export default Book;
