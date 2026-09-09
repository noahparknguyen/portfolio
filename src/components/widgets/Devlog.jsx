import useCommits from "../../hooks/useCommits";
import { relativeTime } from "../../lib/format";
import Eyebrow from "../ui/Eyebrow";
import LabelTag from "../ui/LabelTag";
import NewTabHint from "../ui/NewTabHint";

function Devlog() {
  const { commits, loading } = useCommits();

  return (
    <div>
      <div className="text-center">
        <LabelTag rotate="rotate-[1deg]">
          <Eyebrow>Most recent updates</Eyebrow>
        </LabelTag>
      </div>
      <div className="relative mt-2">
        <span
          aria-hidden="true"
          className="absolute -top-3 right-6 block h-8 w-5 border-2 border-ink bg-orchid [clip-path:polygon(0_0,50%_25%,100%_0,100%_100%,0_100%)]"
        />
        <div
          className="devlog-scroll shadow-sticker relative box-border h-36 overflow-y-auto border-2 border-ink bg-paper pl-3"
          style={{
            // Rules scroll WITH the content. The default (`scroll`) pins the
            // background to the element, so alignment could only ever hold at
            // scroll position 0 — the rules drifted off the text as soon as you
            // moved.
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
                      {/* A commit with no url used to render `href="#"`, which
                          is a real link that scrolls the page to the top. An
                          entry with nowhere to go is not a link. */}
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
