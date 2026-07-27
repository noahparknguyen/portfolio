import { useEffect, useState } from "react";
import pinksky from "./assets/bg-pinksky.jpg";
import Banner from "./components/layout/Banner";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/sections/Home";
import About from "./components/sections/About";
import Now from "./components/sections/Now";
import Projects from "./components/sections/Projects";
import Credits from "./components/sections/Credits";

const SECTIONS = {
  home: Home,
  about: About,
  now: Now,
  creations: Projects,
  credits: Credits,
};

// Section images are ESM-imported and only fetched when their section first
// mounts, which flashes alt text on first visit. Warm the browser cache for
// every asset on mount so later section switches paint instantly.
const ASSET_URLS = import.meta.glob("./assets/*.{png,jpg,jpeg,gif,svg}", {
  eager: true,
  query: "?url",
  import: "default",
});

function App() {
  const [active, setActive] = useState("home");
  const ActiveSection = SECTIONS[active] ?? Home;

  useEffect(() => {
    Object.values(ASSET_URLS).forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  return (
    <div className="w-full">
      {/* Fixed viewport-covering layer instead of a background-attachment
          wrapper — see CLAUDE.md → Mechanics for why that's disallowed
          (repaints incorrectly under the sticky nav's moving compositing
          layer). */}
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${pinksky})` }}
      />

      <Header
        active={active}
        onNavigate={setActive}
        sticky
        className="md:hidden"
      />
      <div className="mx-auto flex min-h-dvh max-w-3xl flex-col gap-4 px-3 py-6 md:px-4">
        <div className="-mx-3 border-x-0 border-y-4 border-ink bg-primary-soft shadow-none md:mx-0 md:border-4 md:shadow-sticker">
          <Banner />
          <Header
            active={active}
            onNavigate={setActive}
            className="hidden md:block"
          />
        </div>

        <main className="mx-auto max-w-md flex-1 md:mx-0 md:max-w-none">
          <ActiveSection onNavigate={setActive} />
        </main>

        <div className="-mx-3 border-x-0 border-y-4 border-ink bg-primary-soft shadow-none md:mx-0 md:border-4 md:shadow-sticker">
          <Footer active={active} onNavigate={setActive} />
        </div>
      </div>
    </div>
  );
}

export default App;
