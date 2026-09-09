import { describe, it, expect } from "vitest";
import { formatHours, relativeTime } from "./format";

describe("formatHours", () => {
  // REGRESSION: this returned "<1h" for zero, which reads as "a little, but
  // under an hour" for a game that was not played at all. `playtime_2weeks` is
  // 0 for any game untouched this fortnight, so it was the common path.
  it("reports zero as zero, not as a small amount", () => {
    expect(formatHours(0)).toBe("0h");
  });

  it("still distinguishes a real sliver of playtime from none", () => {
    expect(formatHours(4 / 60)).toBe("<1h"); // 4 minutes, the live value
    expect(formatHours(0.9)).toBe("<1h");
  });

  it("rounds whole hours", () => {
    expect(formatHours(1)).toBe("1h");
    expect(formatHours(1.4)).toBe("1h");
    expect(formatHours(1.5)).toBe("2h");
    expect(formatHours(1465.98)).toBe("1466h");
  });

  it("never returns a negative reading", () => {
    expect(formatHours(-5)).toBe("0h");
  });
});

describe("relativeTime", () => {
  const NOW = Date.parse("2026-09-08T12:00:00Z");
  const ago = (ms) => relativeTime(new Date(NOW - ms).toISOString(), NOW);

  it("collapses anything under a minute", () => {
    expect(ago(0)).toBe("just now");
    expect(ago(59_000)).toBe("just now");
  });

  it("singularises exactly one unit", () => {
    expect(ago(60_000)).toBe("1 minute ago");
    expect(ago(3_600_000)).toBe("1 hour ago");
    expect(ago(86_400_000)).toBe("1 day ago");
  });

  it("pluralises everything else", () => {
    expect(ago(120_000)).toBe("2 minutes ago");
    expect(ago(2 * 3_600_000)).toBe("2 hours ago");
    expect(ago(5 * 86_400_000)).toBe("5 days ago");
  });

  it("steps up through months and years", () => {
    expect(ago(60 * 86_400_000)).toBe("2 months ago");
    expect(ago(400 * 86_400_000)).toBe("1 year ago");
  });
});
