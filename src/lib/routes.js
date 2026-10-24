// Every page: its path, section id, nav entry, and head metadata. The nav is
// derived from this list, so a route can't gain a nav link by accident.
//
// `accent` is the section's hue, null for Credits and the 404, which own none.
// `board` marks a page of many small pieces (Home, Now), packed 20px apart
// rather than 32px. App.jsx sets the page's edges from it.

const SITE = "https://noahpn.dev";

const BASE_DESCRIPTION =
  "I'm Noah, a computer science grad living in Ottawa, Ontario. This is my personal take on a portfolio website, where my hobbies and interests come before my work.";

const ROUTES = [
  {
    id: "home",
    path: "/",
    label: "Home",
    accent: "rose",
    board: true,
    nav: true,
    title: "Noah Park-Nguyen · Full-Stack Developer",
    description: BASE_DESCRIPTION,
  },
  {
    id: "about",
    path: "/about",
    label: "About",
    accent: "violet",
    nav: true,
    title: "About · Noah Park-Nguyen",
    description:
      "Where I grew up, how I ended up in Ottawa, what I do outside of work, and the places I've worked so far.",
  },
  {
    id: "now",
    path: "/now",
    label: "Now",
    accent: "blue",
    board: true,
    nav: true,
    title: "Now · Noah Park-Nguyen",
    description:
      "A snapshot of what I'm up to these days, the sort of thing I'd tell a friend I haven't seen in a year.",
  },
  {
    id: "creations",
    path: "/creations",
    label: "Creations",
    accent: "orchid",
    nav: true,
    title: "Creations · Noah Park-Nguyen",
    description:
      "The projects I've built, each one written up as a short book covering why I made it and how it works.",
  },
  {
    id: "credits",
    path: "/credits",
    label: "Credits",
    accent: null,
    nav: false,
    title: "Colophon · Noah Park-Nguyen",
    description:
      "The people who helped make this possible. Art, game assets, inspirations, and the rest.",
  },
  {
    id: "notfound",
    path: "/404",
    label: "Not found",
    accent: null,
    nav: false,
    title: "Page not found · Noah Park-Nguyen",
    description: BASE_DESCRIPTION,
  },
];

// The four that appear in the primary nav, in nav order.
export const NAV_ROUTES = ROUTES.filter((r) => r.nav);

const BY_ID = new Map(ROUTES.map((r) => [r.id, r]));
const BY_PATH = new Map(
  ROUTES.filter((r) => r.id !== "notfound").map((r) => [r.path, r]),
);

// Paths the Worker and the app both treat as pages. Anything else is a 404 in
// both, so the status and the rendered page agree.
export const KNOWN_PATHS = [...BY_PATH.keys()];

// "/about/" and "/about" are the same page.
export function normalizePath(pathname) {
  if (!pathname || pathname === "/") return "/";
  return pathname.replace(/\/+$/, "") || "/";
}

export function idForPath(pathname) {
  return BY_PATH.get(normalizePath(pathname))?.id ?? "notfound";
}

export function routeFor(id) {
  return BY_ID.get(id) ?? BY_ID.get("notfound");
}

// The not-found route has a path only so it has a canonical URL. It's never
// pushed, since the visitor keeps the URL they typed.
export function pathForId(id) {
  return routeFor(id).path;
}

export { SITE };
export default ROUTES;

// A plain left click is the app's to handle. One with a modifier key or another
// button belongs to the browser, so ctrl-click and middle-click still open a
// new tab.
export function isPlainClick(event) {
  return (
    !event.defaultPrevented &&
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  );
}

// Is this missing path a page or a file? `Sec-Fetch-Dest` decides when the
// browser sends it, since Vite's dev modules like `/@vite/client` have no
// extension. Most crawlers don't send it, so then a path with an extension is a
// file and anything else is a page.
export function isPageRequest(secFetchDest, pathname) {
  if (secFetchDest) return secFetchDest === "document";
  return !/\.[a-zA-Z0-9]+$/.test(pathname);
}
