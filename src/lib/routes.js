// Single source of truth for every addressable page: its path, its section id,
// its nav identity, and the per-route metadata the document head carries.
//
// The nav is derived from this list (NAV_ROUTES) rather than kept as a second
// one, so the two can't drift: a route can never exist without a path or gain
// a nav link by accident.
//
// `accent` is the section's owned hue. Routes with no owned hue (Credits, the
// not-found page) carry `null`: Credits spreads all four across its group
// headers instead, and the 404 owns nothing.

const SITE = "https://noahpn.dev";

const BASE_DESCRIPTION =
  "I'm Noah, a computer science grad living in Ottawa, Ontario. This is my personal take on a portfolio website, where my hobbies and interests come before my work.";

const ROUTES = [
  {
    id: "home",
    path: "/",
    label: "Home",
    accent: "rose",
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
      "Thank you to everyone who inspired me to make something unique. Art, game assets, inspirations and the rest.",
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

// Paths the worker and the app both treat as real pages. Anything else is a 404
// in BOTH places, so the status line and the rendered page always agree.
export const KNOWN_PATHS = [...BY_PATH.keys()];

// "/about/" and "/about" are the same page; "" can't happen but is cheap to guard.
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

// The not-found route has a path only so it has a canonical URL to name; it is
// never pushed, because the URL the visitor typed is the one they should keep.
export function pathForId(id) {
  return routeFor(id).path;
}

export { SITE };
export default ROUTES;

// A plain left click is ours to handle; anything with a modifier key or a
// non-primary button belongs to the browser, so ctrl/cmd-click still opens a
// section in a new tab and middle-click still opens a background tab. Shared by
// Header's nav and TextLink so the two can't diverge on what counts as "plain".
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

// Is this request for a page or for a file? The Worker asks only once no asset
// matched: a missing page gets the app's shell with a real 404, and a missing
// file gets a plain 404.
//
// Two signals, in order, because neither is enough alone:
//
//   1. `Sec-Fetch-Dest`, which the browser sets and is authoritative. Vite's
//      dev modules, such as `/@vite/client`, have no extension, so the
//      extension alone would take them for pages.
//   2. When the header is absent, as it is from most crawlers, the file
//      extension. A path ending in an extension is a file, and anything else
//      is a page, so a crawler still gets a real 404 for a page that doesn't
//      exist.
export function isPageRequest(secFetchDest, pathname) {
  if (secFetchDest) return secFetchDest === "document";
  return !/\.[a-zA-Z0-9]+$/.test(pathname);
}
