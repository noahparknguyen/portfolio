import { useRef } from "react";
import { NAV_ROUTES, isPlainClick } from "../../lib/routes";
import { borderAccent } from "../../lib/accents";
import useScrollDirection from "../../hooks/useScrollDirection";

// `sticky` makes this the phone's nav bar, which hides on scroll down
// (useScrollDirection). The links are real <a href>s, since each section has a
// URL, and the handler takes only plain left clicks.
function Header({ active, onNavigate, className = "", sticky = false }) {
  const barRef = useRef(null);
  const hidden = useScrollDirection(barRef, sticky);

  return (
    <nav
      ref={barRef}
      aria-label="Primary"
      className={`bg-ink px-2 py-1 md:px-6 md:py-2.5 ${
        sticky
          ? `sticky top-0 z-50 transition-transform motion-reduce:transition-none ${
              hidden ? "-translate-y-full" : "translate-y-0"
            }`
          : ""
      } ${className}`}
    >
      <ul className="flex items-center justify-evenly">
        {NAV_ROUTES.map((link) => {
          const isActive = active === link.id;
          return (
            <li key={link.id}>
              <a
                href={link.path}
                onClick={(event) => {
                  if (!isPlainClick(event)) return;
                  event.preventDefault();
                  onNavigate(link.id);
                }}
                aria-current={isActive ? "page" : undefined}
                className="group flex min-h-11 items-center md:min-h-0"
              >
                <span
                  className={`border-b-2 pt-1 pb-0.5 font-display text-lg font-semibold leading-none transition-colors ${
                    isActive
                      ? `${borderAccent[link.accent]} text-on-ink`
                      : "border-transparent text-on-ink-muted group-hover:border-on-ink group-hover:text-on-ink"
                  }`}
                >
                  {link.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Header;
