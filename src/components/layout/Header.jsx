import SECTIONS from "../../lib/sections";
import { borderAccent } from "../../lib/accents";

function Header({ active, onNavigate }) {
  return (
    <nav aria-label="Primary" className="bg-ink px-6 py-2.5">
      <ul className="flex items-center justify-evenly">
        {SECTIONS.map((link) => {
          const isActive = active === link.id;
          return (
            <li key={link.id}>
              <button
                type="button"
                onClick={() => onNavigate(link.id)}
                aria-current={isActive ? "page" : undefined}
                className={`border-b-2 pt-1 pb-0.5 font-display text-lg leading-none transition-colors ${
                  isActive
                    ? `${borderAccent[link.accent]} font-bold text-on-ink`
                    : "border-transparent font-semibold text-on-ink-muted hover:text-on-ink"
                }`}
              >
                {link.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Header;
