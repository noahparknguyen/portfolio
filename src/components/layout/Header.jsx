import { useRef } from "react";
import SECTIONS from "../../lib/sections";
import { borderAccent } from "../../lib/accents";
import useScrollDirection from "../../hooks/useScrollDirection";

// `sticky` doubles this as the mobile nav bar: pinned to the viewport top,
// hiding on scroll-down/revealing on scroll-up (see useScrollDirection). The
// masthead instance renders with `sticky` unset — a normal in-flow nav.
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
        {SECTIONS.map((link) => {
          const isActive = active === link.id;
          return (
            <li key={link.id}>
              <button
                type="button"
                onClick={() => onNavigate(link.id)}
                aria-current={isActive ? "page" : undefined}
                className="group flex min-h-11 items-center md:min-h-0"
              >
                <span
                  className={`border-b-2 pt-1 pb-0.5 font-display text-lg leading-none transition-colors ${
                    isActive
                      ? `${borderAccent[link.accent]} font-bold text-on-ink`
                      : "border-transparent font-semibold text-on-ink-muted group-hover:text-on-ink"
                  }`}
                >
                  {link.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Header;
