function ArrowOut() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="h-3.5 w-3.5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ strokeWidth: "var(--stroke-regular)" }}
    >
      <path d="M6 3 h7 v7" />
      <path d="M13 3 L4 12" />
    </svg>
  );
}

// The live/source pair, used twice per project: on the book's cover and again in
// its colophon at the back. That repetition is deliberate — it is how a real
// book works, with the essentials on the jacket and the production details
// inside — and the reader most likely to want the link is the one who has just
// finished reading, with the cover no longer in front of them.
//
// One component so the two placements cannot drift apart. Note the markup
// constraint it has to satisfy on the cover: an <a> may not sit inside the
// transparent overlay <button> that opens the book, so on that side this is
// rendered as the button's SIBLING (see Book.jsx).
function ProjectLinks({ liveUrl, repoUrl, title }) {
  const chip =
    "flex min-h-11 flex-1 items-center justify-center gap-2 border-2 border-ink bg-white px-2 font-display text-sm font-bold text-ink transition-transform hover:-translate-y-0.5 focus-visible:-translate-y-0.5 md:min-h-10";

  return (
    <div className="flex w-full gap-2">
      <a href={liveUrl} target="_blank" rel="noreferrer" className={chip}>
        Live site
        {/* The arrow is the sighted cue for "leaves the site" and is
            aria-hidden; this is its spoken equivalent. It also names the
            project, since "Live site" alone doesn't say whose — and with one
            book open the other book's cover still shows its own pair. */}
        <span className="sr-only">{` for ${title}, opens in a new tab`}</span>
        <ArrowOut />
      </a>
      <a href={repoUrl} target="_blank" rel="noreferrer" className={chip}>
        Source
        <span className="sr-only">
          {` code for ${title} on GitHub, opens in a new tab`}
        </span>
        <ArrowOut />
      </a>
    </div>
  );
}

export default ProjectLinks;
