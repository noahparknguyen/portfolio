import { describe, it, expect } from "vitest";
import ROUTES, {
  NAV_ROUTES,
  KNOWN_PATHS,
  idForPath,
  routeFor,
  pathForId,
  normalizePath,
  isPlainClick,
  isPageRequest,
} from "./routes";
import { borderAccent } from "./accents";

describe("the route table", () => {
  it("gives every route a unique id and a unique path", () => {
    const ids = ROUTES.map((r) => r.id);
    const paths = ROUTES.map((r) => r.path);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("gives every route a title and a description for the document head", () => {
    for (const r of ROUTES) {
      expect(r.title, r.id).toBeTruthy();
      expect(r.description, r.id).toBeTruthy();
    }
  });

  it("keeps page titles distinct so tabs and search results are separable", () => {
    const titles = ROUTES.map((r) => r.title);
    expect(new Set(titles).size).toBe(titles.length);
  });

  // If a nav route names an accent `accents.js` doesn't map, the underline
  // class comes out `undefined` and the active-page marker silently vanishes.
  it("only lets a nav route claim an accent that actually resolves", () => {
    for (const r of NAV_ROUTES) {
      expect(Object.keys(borderAccent), r.id).toContain(r.accent);
    }
  });

  it("puts exactly the four nav sections in the nav, in order", () => {
    expect(NAV_ROUTES.map((r) => r.id)).toEqual([
      "home",
      "about",
      "now",
      "creations",
    ]);
  });
});

// KNOWN_PATHS is imported by the Worker as well as the client. If the two ever
// disagreed, an unknown path would render "Nothing here" under a 200, or a real
// page would be served with a 404.
describe("KNOWN_PATHS — the contract the Worker shares with the client", () => {
  it("lists every addressable page and nothing else", () => {
    expect([...KNOWN_PATHS].sort()).toEqual(
      ["/", "/about", "/creations", "/credits", "/now"].sort(),
    );
  });

  it("excludes the not-found route, so /404 is itself a 404", () => {
    expect(KNOWN_PATHS).not.toContain("/404");
    expect(idForPath("/404")).toBe("notfound");
  });

  it("round-trips every known path back to its own id", () => {
    for (const path of KNOWN_PATHS) {
      expect(pathForId(idForPath(path))).toBe(path);
    }
  });
});

describe("normalizePath", () => {
  it("treats a trailing slash as the same page", () => {
    expect(normalizePath("/about/")).toBe("/about");
    expect(idForPath("/about/")).toBe("about");
  });

  it("leaves the root alone", () => {
    expect(normalizePath("/")).toBe("/");
    expect(normalizePath("")).toBe("/");
  });

  it("collapses a path that is nothing but slashes", () => {
    expect(normalizePath("///")).toBe("/");
  });
});

describe("idForPath", () => {
  it("maps an unknown path to the not-found route", () => {
    expect(idForPath("/nope")).toBe("notfound");
    expect(idForPath("/about/extra")).toBe("notfound");
  });
});

describe("routeFor", () => {
  it("falls back to not-found for an unrecognised id", () => {
    expect(routeFor("nonsense").id).toBe("notfound");
  });
});

describe("isPlainClick", () => {
  const click = (over = {}) => ({
    defaultPrevented: false,
    button: 0,
    metaKey: false,
    ctrlKey: false,
    shiftKey: false,
    altKey: false,
    ...over,
  });

  it("claims an ordinary left click", () => {
    expect(isPlainClick(click())).toBe(true);
  });

  // Each of these must fall through to the browser, or ctrl-click stops opening
  // a new tab and middle-click stops opening a background one.
  it.each([
    ["meta", { metaKey: true }],
    ["ctrl", { ctrlKey: true }],
    ["shift", { shiftKey: true }],
    ["alt", { altKey: true }],
    ["middle button", { button: 1 }],
    ["already handled", { defaultPrevented: true }],
  ])("leaves a %s click to the browser", (_label, over) => {
    expect(isPlainClick(click(over))).toBe(false);
  });
});

// REGRESSION: two earlier versions of this each broke production or dev.
describe("isPageRequest — page vs file", () => {
  it("trusts Sec-Fetch-Dest when the browser sends it", () => {
    expect(isPageRequest("document", "/about")).toBe(true);
    expect(isPageRequest("script", "/@vite/client")).toBe(false);
    expect(isPageRequest("image", "/og-image.png")).toBe(false);
    expect(isPageRequest("style", "/assets/index.css")).toBe(false);
  });

  // Judging by the header alone, and treating "absent" as a page, 404'd every
  // static file for any client that omits it — which is most crawlers. Search
  // engines could not read robots.txt and social scrapers could not fetch the
  // card image.
  it.each([
    "/robots.txt",
    "/sitemap.xml",
    "/site.webmanifest",
    "/favicon.ico",
    "/favicon.svg",
    "/og-image.png",
    "/apple-touch-icon.png",
    "/android-chrome-192x192.png",
  ])("serves %s as a file when no header is sent", (path) => {
    expect(isPageRequest(null, path)).toBe(false);
  });

  it("still 404s an unknown page for a client that sends no header", () => {
    expect(isPageRequest(null, "/nope")).toBe(true);
    expect(isPageRequest(null, "/about")).toBe(true);
  });

  // Judging by extension alone 404'd Vite's extensionless dev modules and broke
  // the dev server, which is why the header is checked first.
  it("does not mistake an extensionless dev module for a page", () => {
    expect(isPageRequest("script", "/@react-refresh")).toBe(false);
  });
});
