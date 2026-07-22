import { decorationAccent } from "../../lib/accents";

function TextLink({
  href,
  accent = "rose",
  external = false,
  onClick,
  children,
}) {
  const className = `text-ink underline decoration-2 underline-offset-2 ${decorationAccent[accent]}`;

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
    </a>
  );
}

export default TextLink;
