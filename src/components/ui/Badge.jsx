import SimpleIcon from "./SimpleIcon";
import Eyebrow from "./Eyebrow";
import NewTabHint from "./NewTabHint";

// Hover lifts the badge rather than changing its fill, since its `ink` label
// fails AA on the full violet and orchid accents (3.85:1 and 3.26:1).
function Badge({ href, icon, top, bottom, tint = "bg-rose-soft" }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`shadow-sticker flex h-11 w-full max-w-36 items-center justify-center gap-2 border-2 border-ink px-2 transition-transform hover:-translate-y-0.5 focus-visible:-translate-y-0.5 md:h-10 ${tint}`}
    >
      <SimpleIcon icon={icon} className="h-6 w-6 shrink-0 text-ink" />
      <span className="text-center leading-none">
        <Eyebrow as="span" tone="ink" className="block leading-none">
          {top}
        </Eyebrow>
        <span className="block font-display text-sm font-bold leading-none text-ink">
          {bottom}
        </span>
        <NewTabHint />
      </span>
    </a>
  );
}

export default Badge;
