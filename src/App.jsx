import { useEffect, useRef } from "react";
import pinksky from "./assets/bg-pinksky.jpg";
import useRoute from "./hooks/useRoute";
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

// Section images are ESM-imported and only fetched when their section first
// mounts, which flashes alt text on first visit. Warm the browser cache for
// every asset on mount so later section switches paint instantly.
const ASSET_URLS = import.meta.glob("./assets/*.{png,jpg,jpeg,gif,webp,svg}", {
  eager: true,
  query: "?url",
  import: "default",
});

// The browser's own scroll restoration assumes a document swap. With pushState
// the DOM is replaced under a URL change it never sees, so its guess lands the
// reader at an arbitrary offset in content that isn't the content they left.
// Taking it manual makes the behaviour below the only behaviour.
if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

function App() {
  const { active, navigate } = useRoute();
  const ActiveSection = SECTIONS[active] ?? NotFound;
  const mainRef = useRef(null);
  // Seeded with the section the page loaded on, so the mount pass is already
  // "current" and does nothing. A plain isFirstRender flag flipped inside the
  // effect body looked equivalent and was not: StrictMode invokes effects twice
  // in development, the first pass cleared the flag, and the second pass then
  // stole focus on arrival. Comparing against the value instead is idempotent,
  // so running the effect any number of times has the same result as once.
  const lastActive = useRef(active);

  useEffect(() => {
    Object.values(ASSET_URLS).forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  // A section swap replaces the whole page's content under a URL change, so it
  // has to behave like a page load: start at the top, and put focus at the head
  // of the new content. Without the focus move a screen-reader or keyboard user
  // stays parked wherever they were in a DOM that no longer exists, and the next
  // Tab resumes from the document start with no announcement that anything
  // changed. Same move BookSpread makes when a book replaces its cover.
  //
  // Skipped on arrival: the browser has already placed focus and scroll, and
  // stealing either on first paint is its own bug.
  useEffect(() => {
    if (lastActive.current === active) return;
    lastActive.current = active;
    window.scrollTo({ top: 0 });
    mainRef.current?.focus({ preventScroll: true });
  }, [active]);

  return (
    <div className="w-full">
      {/* Skip link — WCAG 2.4.1 Bypass Blocks (Level A). The banner, the four
          nav links and the footer badges repeat on every page, and before this
          the first focusable element on the site was the "Home" nav link, so a
          keyboard user had no way past the chrome.

          It is the first element in the DOM on purpose, ahead of the sticky
          nav, and `focus:z-60` puts it above that bar's `z-50` — a skip link
          that renders behind the thing it skips is worse than none. It targets
          `<main>`, which already carries `tabIndex={-1}` for the route-change
          focus move, so the anchor actually lands focus there rather than only
          scrolling. Invisible until focused, then a normal pinned object: ink
          border, square corners, `shadow-sticker`, Nav-link type. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-60 focus:border-2 focus:border-ink focus:bg-primary-soft focus:px-3 focus:py-2 focus:font-display focus:text-lg focus:font-semibold focus:text-ink focus:shadow-sticker"
      >
        Skip to content
      </a>

      {/* Fixed viewport-covering layer rather than a background-attachment
          wrapper: under the sticky nav's moving compositing layer, a
          background-attachment: fixed element repaints incorrectly in Blink,
          leaving the sky visibly tearing as the bar slides. A separate fixed
          layer composites independently and is immune to it. */}
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

        {/* tabIndex={-1} makes this a programmatic focus target for the route
            change above. It is not in the tab order. */}
        <main
          id="main"
          ref={mainRef}
          tabIndex={-1}
          className="mx-auto max-w-md flex-1 focus:outline-none md:mx-0 md:max-w-none"
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
