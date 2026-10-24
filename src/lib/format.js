// Display formatters for the live widgets, kept pure so tests can reach them.

// Steam playtime. Zero is its own answer, not "<1h", and the usual one for
// `playtime_2weeks`.
export function formatHours(hours) {
  if (hours <= 0) return "0h";
  if (hours < 1) return "<1h";
  return `${Math.round(hours)}h`;
}

// Devlog commit timestamps. `now` is there so a test can pin the clock.
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
