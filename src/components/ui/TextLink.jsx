import { decorationAccent } from "../../lib/accents";
import { pathForId, isPlainClick } from "../../lib/routes";
import NewTabHint from "./NewTabHint";

// An inline text link riding the section-hue underline. Three shapes, one class
// string:
//
//   href + external  → an outbound <a> in a new tab
//   to               → an in-app <a> pointing at that section's real URL
//   onClick alone    → a <button>, for a control that isn't navigation
//
// `to` exists because every section has an address now. In-app navigation that
// renders a <button> lies to the user: no destination on hover, no ctrl-click,
// and assistive tech announces a control instead of a link. Passing the section
// id gives the anchor a real href while the handler keeps the navigation client
// side for plain left clicks.
function TextLink({
  href,
  to,
  accent = "rose",
  external = false,
  onClick,
  children,
}) {
  const className = `text-ink underline decoration-2 underline-offset-2 ${decorationAccent[accent]} focus-visible:[outline:2px_solid_var(--color-ink)] focus-visible:outline-offset-2`;

  if (to) {
    return (
      <a
        href={pathForId(to)}
        onClick={(event) => {
          if (!isPlainClick(event)) return;
          event.preventDefault();
          onClick?.(event);
        }}
        className={className}
      >
        {children}
      </a>
    );
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={className}>
        {children}
      </button>
    );
  }

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={className}
    >
      {children}
      {external && <NewTabHint />}
    </a>
  );
}

export default TextLink;
