import SimpleIcon from "./SimpleIcon";

const HOVER_TINT = {
  "bg-rose-soft": "hover:bg-rose",
  "bg-blue-soft": "hover:bg-blue",
  "bg-violet-soft": "hover:bg-violet",
  "bg-orchid-soft": "hover:bg-orchid",
};

function Badge({ href, icon, top, bottom, tint = "bg-rose-soft" }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`shadow-sticker flex h-11 w-full max-w-36 items-center justify-center gap-2 border-2 border-ink px-2 transition-colors md:h-10 ${tint} ${HOVER_TINT[tint] ?? ""}`}
    >
      <SimpleIcon icon={icon} className="h-6 w-6 shrink-0" />
      <span className="text-center leading-none">
        <span className="block text-xs font-bold uppercase leading-none tracking-wide text-ink">
          {top}
        </span>
        <span className="block font-display text-sm font-bold leading-none text-ink">
          {bottom}
        </span>
      </span>
    </a>
  );
}

export default Badge;
