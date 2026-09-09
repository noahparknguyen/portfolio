import SimpleIcon from "./SimpleIcon";
import Eyebrow from "./Eyebrow";
import NewTabHint from "./NewTabHint";

// Hover lifts rather than shifting fill. The previous `hover:bg-<accent>` moved
// each badge from its soft tint onto the FULL accent while the label stayed
// `ink` — which failed AA on two of the four (violet ~3.8:1, orchid ~3.3:1;
// neither line qualifies as large text). It also contradicted the golden rule in
// STYLE_GUIDE.md → Color: bright accents live in fills/borders/underlines, and
// it's the *soft* tints that are specified to carry `ink` text on top. The lift
// is the site's established handcrafted hover cue (tech stamps, Links post-its),
// so this is also more consistent than what it replaces.
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
