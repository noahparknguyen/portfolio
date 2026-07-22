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
    <div
      className="min-h-screen w-full bg-cover bg-center bg-fixed bg-no-repeat"
      style={{ backgroundImage: `url(${pinksky})` }}
    >
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col gap-4 px-4 py-6">
        <div className="shadow-sticker border-4 border-ink bg-primary-soft">
          <Banner />
          <Header active={active} onNavigate={setActive} />
        </div>

        <main className="flex-1">
          <ActiveSection onNavigate={setActive} />
        </main>

        <div className="shadow-sticker border-4 border-ink bg-primary-soft">
          <Footer active={active} onNavigate={setActive} />
        </div>
      </div>
    </div>
  );
}

export default App;
