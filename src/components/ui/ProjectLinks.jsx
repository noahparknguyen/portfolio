import NewTabHint from "./NewTabHint";

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

// The live and source links, on a book's cover and again in its colophon. On
// the cover it's a sibling of the overlay <button>, which can't contain links
// (see Book.jsx).
function ProjectLinks({
  liveUrl,
  liveLabel = "Live site",
  repoUrl,
  title,
  liveNote,
  bg = "bg-white",
}) {
  const chip = `flex min-h-11 flex-1 items-center justify-center gap-2 border-2 border-ink ${bg} px-2 font-display text-sm font-bold text-ink transition-transform hover:-translate-y-0.5 focus-visible:-translate-y-0.5 md:min-h-10`;

  return (
    <div className="w-full">
      <div className="pointer-events-auto flex w-full gap-2">
        <a href={liveUrl} target="_blank" rel="noreferrer" className={chip}>
          {liveLabel}
          {/* Names the project, since the other covers show their own
              pairs. */}
          <span className="sr-only">{` for ${title}`}</span>
          <NewTabHint />
          <ArrowOut />
        </a>
        <a href={repoUrl} target="_blank" rel="noreferrer" className={chip}>
          Source
          <span className="sr-only">{` code for ${title} on GitHub`}</span>
          <NewTabHint />
          <ArrowOut />
        </a>
      </div>
      {/* A caption, not a control, so it keeps the cover's
          `pointer-events-none` and the cover's foot still opens the book. */}
      {liveNote && (
        <p className="mt-2 text-center text-sm text-gray-600">{liveNote}</p>
      )}
    </div>
  );
}

export default ProjectLinks;
