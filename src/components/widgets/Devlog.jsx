import useCommits from "../../hooks/useCommits";
import { relativeTime } from "../../lib/format";
import LabelTag from "../ui/LabelTag";
import NewTabHint from "../ui/NewTabHint";

function Devlog() {
  const { commits, loading } = useCommits();

  // From md the log fills the height Home's left column leaves it, which is
  // what keeps the two columns level. Three rules shape that:
  // - Size containment keeps the twelve commits inside from counting toward
  //   the column's height, or the box would grow to show every one.
  // - The height rounds down to 24px plus a whole number of 20px rules, so the
  //   paper always ends the same distance below its last rule (STYLE_GUIDE →
  //   Spacing scale). The columns can end up to 19px apart because of it.
  // - It never drops below its phone height, 144px.
  return (
    <div className="flex flex-1 flex-col">
      <div className="text-center">
        <LabelTag rotate="rotate-[1deg]">
          <h3 className="text-xl font-semibold text-ink">
            Most recent updates
          </h3>
        </LabelTag>
      </div>
      <div className="relative mt-2 flex flex-1 flex-col">
        <span
          aria-hidden="true"
          className="absolute -top-3 right-6 block h-8 w-5 border-2 border-ink bg-orchid [clip-path:polygon(0_0,50%_25%,100%_0,100%_100%,0_100%)]"
        />
        <div
          className="devlog-scroll shadow-sticker relative box-border h-36 overflow-y-auto md:h-[calc(round(down,100%_-_24px,20px)_+_24px)] md:min-h-36 md:[contain:size] border-2 border-ink bg-paper pl-3"
          style={{
            // The ruled lines scroll with the content. The default, `scroll`,
            // pins the background to the element, so the lines would match the
            // text only at the top and drift off it as soon as you scroll.
            backgroundAttachment: "local",
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent 0, transparent 11px, color-mix(in srgb, var(--color-kraft) 25%, transparent) 11px, color-mix(in srgb, var(--color-kraft) 25%, transparent) 12px, transparent 12px, transparent 20px)",
          }}
          tabIndex={0}
          role="region"
          aria-label="Recent commits"
          // Commit messages come from GitHub, so their punctuation is not the
          // site's to control. Excluded from the typography audit.
          data-live-text="true"
        >
          {loading ? (
            <div className="relative py-3 pr-5" aria-hidden="true">
              <div className="absolute inset-y-0 left-1.75 w-0.5 bg-ink" />
              <ul>
                {[0, 1, 2, 3].map((i) => (
                  <li key={i} className="relative flex pb-5 pl-6">
                    <span className="absolute left-0.5 top-1.25 h-3 w-3 border-2 border-ink bg-rose" />
                    <span className="h-3 w-full animate-pulse bg-primary-soft" />
                  </li>
                ))}
              </ul>
            </div>
          ) : commits.length === 0 ? (
            <div className="relative py-3 pr-5">
              <div
                aria-hidden="true"
                className="absolute inset-y-0 left-1.75 w-0.5 bg-ink"
              />
              <ul>
                <li className="relative flex">
                  <span
                    aria-hidden="true"
                    className="absolute left-0.5 top-1.25 h-3 w-3 border-2 border-ink bg-rose"
                  />
                  <div className="block pb-5 pl-6">
                    <span className="block text-sm leading-5 text-gray-700">
                      Couldn&rsquo;t reach the repo
                    </span>
                    <span className="block text-xs italic leading-5 text-gray-600">
                      try again in a bit
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          ) : (
            <div className="relative py-3 pr-5">
              <div
                aria-hidden="true"
                className="absolute inset-y-0 left-1.75 w-0.5 bg-ink"
              />
              <ul>
                {commits.map((commit, n) => {
                  const body = (
                    <>
                      <span className="block text-sm leading-5 text-gray-700 transition-colors group-hover:text-ink">
                        {commit.message}
                      </span>
                      {commit.date && (
                        <span className="block text-xs italic leading-5 text-gray-600 transition-colors group-hover:text-ink">
                          {relativeTime(commit.date)}
                        </span>
                      )}
                    </>
                  );
                  return (
                    // The index only breaks a tie between two commits that share
                    // a message AND have no url; url alone is unique in practice.
                    <li
                      key={commit.url ?? `${commit.message}-${n}`}
                      className="relative flex"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute left-0.5 top-1.25 h-3 w-3 border-2 border-ink bg-rose"
                      />
                      {/* An entry with nowhere to go isn't a link. `href="#"`
                          would be a real one that scrolls the page to the
                          top. */}
                      {commit.url ? (
                        <a
                          href={commit.url}
                          target="_blank"
                          rel="noreferrer"
                          className="group block pb-5 pl-6"
                        >
                          {body}
                          <NewTabHint />
                        </a>
                      ) : (
                        <div className="block pb-5 pl-6">{body}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Devlog;
