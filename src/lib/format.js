// Display formatters for the live widgets.
//
// These live here rather than inside their components so a test can reach them
// as the pure functions they are.

// Steam playtime. Zero is its own answer, not "<1h", which would read as "a
// little, but under an hour" for a game that wasn't played. It's the ordinary
// value for `playtime_2weeks` on any game not touched this fortnight, so it's
// the common path rather than an edge case.
export function formatHours(hours) {
  if (hours <= 0) return "0h";
  if (hours < 1) return "<1h";
  return `${Math.round(hours)}h`;
}

// Devlog commit timestamps. `now` is injectable so a test can pin the clock
// without reaching for fake timers; production never passes it.
export function relativeTime(dateStr, now = Date.now()) {
  const date = new Date(dateStr);
  const diffSec = Math.round((now - date.getTime()) / 1000);
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
