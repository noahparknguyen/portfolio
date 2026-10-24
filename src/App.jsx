import { useEffect, useRef } from "react";
import pinksky from "./assets/bg-pinksky.jpg";
import useRoute from "./hooks/useRoute";
import { routeFor } from "./lib/routes";
import Banner from "./components/layout/Banner";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/sections/Home";
import About from "./components/sections/About";
import Now from "./components/sections/Now";
import Creations from "./components/sections/Creations";
import Credits from "./components/sections/Credits";
import NotFound from "./components/sections/NotFound";

const SECTIONS = {
  home: Home,
  about: About,
  now: Now,
  creations: Creations,
  credits: Credits,
  notfound: NotFound,
};

// A section's images load only when it first mounts, which flashes alt text.
// Every top-level asset is warmed on mount, so later sections paint at once.
const ASSET_URLS = import.meta.glob("./assets/*.{png,jpg,jpeg,gif,webp,svg}", {
  eager: true,
  query: "?url",
  import: "default",
});

// The browser's scroll restoration assumes a document swap, so after pushState
// it lands at an arbitrary offset. Manual leaves the effect below in charge.
if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

function App() {
  const { active, navigate } = useRoute();
  const ActiveSection = SECTIONS[active] ?? NotFound;
  const mainRef = useRef(null);
  // Seeded with the first section, so the mount pass does nothing. Comparing
  // values stays right when StrictMode runs effects twice, where a first-render
  // flag would steal focus on arrival.
  const lastActive = useRef(active);

  useEffect(() => {
    Object.values(ASSET_URLS).forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  // A section swap behaves like a page load: back to the top, with focus on the
  // new content. Otherwise a keyboard user is left in a DOM that no longer
  // exists. Skipped on arrival, where the browser has already placed both.
  useEffect(() => {
    if (lastActive.current === active) return;
    lastActive.current = active;
    window.scrollTo({ top: 0 });
    mainRef.current?.focus({ preventScroll: true });
  }, [active]);

  return (
    <div className="w-full">
      {/* The skip link (WCAG 2.4.1). First in the DOM, and `focus:z-60`
          puts it above the sticky nav's `z-50`. <main>'s `tabIndex={-1}` lets
          it move focus, not just scroll. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-60 focus:border-2 focus:border-ink focus:bg-primary-soft focus:px-3 focus:py-2 focus:font-display focus:text-lg focus:font-semibold focus:text-ink focus:shadow-sticker"
      >
        Skip to content
      </a>

      {/* A fixed layer rather than `background-attachment: fixed`, which
          Blink repaints wrongly under the sliding nav, tearing the sky. */}
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${pinksky})` }}
      />

      <Header
        active={active}
        onNavigate={navigate}
        sticky
        className="md:hidden"
      />
      <div className="mx-auto flex min-h-dvh max-w-3xl flex-col gap-4 px-3 py-6 md:px-4">
        <div className="-mx-3 border-x-0 border-y-4 border-ink bg-primary-soft shadow-none md:mx-0 md:border-4 md:shadow-sticker">
          <Banner />
          <Header
            active={active}
            onNavigate={navigate}
            className="hidden md:block"
          />
        </div>

        {/* tabIndex={-1} makes it a focus target for the route change,
            outside the tab order. `w-full` because `mx-auto` stops a flex item
            stretching, and one long line, like a marquee's track title, would
            widen the page past a phone's screen. The padding sets every page's
            distance from the masthead and footer (`board` in routes.js), so no
            section pads itself. */}
        <main
          id="main"
          ref={mainRef}
          tabIndex={-1}
          className={`mx-auto w-full max-w-md flex-1 focus:outline-none md:mx-0 md:max-w-none ${
            routeFor(active).board ? "py-1" : "py-4"
          }`}
        >
          <ActiveSection onNavigate={navigate} />
        </main>

        <div className="-mx-3 border-x-0 border-y-4 border-ink bg-primary-soft shadow-none md:mx-0 md:border-4 md:shadow-sticker">
          <Footer active={active} onNavigate={navigate} />
        </div>
      </div>
    </div>
  );
}

export default App;
