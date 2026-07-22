import useCommits from "../../hooks/useCommits";
import Eyebrow from "../ui/Eyebrow";
import LabelTag from "../ui/LabelTag";

function relativeTime(dateStr) {
  const date = new Date(dateStr);
  const diffSec = Math.round((Date.now() - date.getTime()) / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHour = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHour / 24);

  if (diffSec < 60) return "just now";
  if (diffMin < 60) return `${diffMin} minute${diffMin === 1 ? "" : "s"} ago`;
  if (diffHour < 24) return `${diffHour} hour${diffHour === 1 ? "" : "s"} ago`;
  if (diffDay < 30) return `${diffDay} day${diffDay === 1 ? "" : "s"} ago`;
  const diffMonth = Math.round(diffDay / 30);
  if (diffMonth < 12)
    return `${diffMonth} month${diffMonth === 1 ? "" : "s"} ago`;
  const diffYear = Math.round(diffMonth / 12);
  return `${diffYear} year${diffYear === 1 ? "" : "s"} ago`;
}

function Devlog() {
  const { commits, loading, error } = useCommits();

  return (
    <div>
      <div className="text-center">
        <LabelTag rotate="-rotate-[1deg]">
          <Eyebrow>Most recent updates</Eyebrow>
        </LabelTag>
      </div>
      <div className="relative mt-2">
        <span
          aria-hidden="true"
          className="absolute -top-3 right-6 block h-8 w-5 border-2 border-ink bg-orchid [clip-path:polygon(0_0,50%_25%,100%_0,100%_100%,0_100%)]"
        />
        <div
          className="devlog-scroll shadow-sticker relative box-border h-32 overflow-y-auto border-2 border-ink bg-paper pl-3"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent 0, transparent 27px, color-mix(in srgb, var(--color-kraft) 25%, transparent) 27px, color-mix(in srgb, var(--color-kraft) 25%, transparent) 28px)",
          }}
          tabIndex={0}
          aria-label="Recent commits"
        >
          {loading ? (
            <div className="relative py-3 pr-5" aria-hidden="true">
              <div className="absolute inset-y-0 left-1.75 w-0.5 bg-ink" />
              <ul>
                {[0, 1, 2, 3].map((i) => (
                  <li key={i} className="relative flex pb-3.5 pl-6">
                    <span className="absolute left-0.5 top-1.25 h-3 w-3 border-2 border-ink bg-rose" />
                    <span className="h-3 w-full animate-pulse bg-primary-soft" />
                  </li>
                ))}
              </ul>
            </div>
          ) : error || commits.length === 0 ? (
            <p className="py-3 text-sm text-gray-600">No recent updates.</p>
          ) : (
            <div className="relative py-3 pr-5">
              <div
                aria-hidden="true"
                className="absolute inset-y-0 left-1.75 w-0.5 bg-ink"
              />
              <ul>
                {commits.map((commit) => (
                  <li
                    key={commit.url ?? commit.message}
                    className="relative flex"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute left-0.5 top-1.25 h-3 w-3 border-2 border-ink bg-rose"
                    />
                    <a
                      href={commit.url ?? "#"}
                      target="_blank"
                      rel="noreferrer"
                      className="group block pb-3.5 pl-6"
                    >
                      <span className="block text-sm text-gray-700 transition-colors group-hover:text-ink">
                        {commit.message}
                      </span>
                      {commit.date && (
                        <span className="mt-0.5 block text-xs italic text-gray-600 transition-colors group-hover:text-ink">
                          {relativeTime(commit.date)}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Devlog;
