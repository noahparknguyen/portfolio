import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { KNOWN_PATHS, SITE } from "../src/lib/routes";

// The Worker runs here against stand-ins for the static assets, the edge
// cache, and the upstream APIs. Each test loads a fresh copy, since the module
// keeps a Spotify token between requests. DEV is off, as in the deployed
// Worker, and it's read once at load.

const SHELL = "<!doctype html><title>shell</title>";
const FILES = {
  "/": [SHELL, "text/html"],
  "/robots.txt": ["User-agent: *", "text/plain"],
  "/assets/app-abc123.js": ["export {}", "text/javascript"],
  "/fonts/nunito-latin.woff2": ["wOF2", "font/woff2"],
};

let assetRequests;
let cache;
let pending;
let upstream;

const pathOf = (input) =>
  new URL(input instanceof Request ? input.url : String(input)).pathname;

const env = {
  ASSETS: {
    async fetch(input) {
      assetRequests.push(input);
      const file = FILES[pathOf(input)];
      return file
        ? new Response(file[0], { headers: { "Content-Type": file[1] } })
        : new Response(null, { status: 404 });
    },
  },
  SPOTIFY_CLIENT_ID: "id",
  SPOTIFY_CLIENT_SECRET: "secret",
  SPOTIFY_REFRESH_TOKEN: "refresh",
  STEAM_API_KEY: "key",
  STEAM_ID: "76561190000000000",
  GITHUB_REPO: "noahparknguyen/portfolio",
};

const ctx = { waitUntil: (promise) => pending.push(promise) };

async function loadWorker() {
  vi.resetModules();
  vi.stubEnv("DEV", false);
  return (await import("./index.js")).default;
}

function get(worker, path, headers = {}, method = "GET", envOverride = env) {
  return worker.fetch(
    new Request(`${SITE}${path}`, { method, headers }),
    envOverride,
    ctx,
  );
}

// Answers each upstream by URL, and counts the calls so a test can tell a
// cached answer from a fresh one.
function respondWith(routes) {
  upstream = vi.fn(async (url) => {
    for (const [prefix, answer] of Object.entries(routes)) {
      if (String(url).startsWith(prefix)) return answer();
    }
    throw new Error(`unexpected upstream call: ${url}`);
  });
  vi.stubGlobal("fetch", upstream);
}

const callsTo = (prefix) =>
  upstream.mock.calls.filter(([url]) => String(url).startsWith(prefix)).length;

const WEATHER = "https://api.open-meteo.com/";
const SPOTIFY_TOKEN = "https://accounts.spotify.com/api/token";
const SPOTIFY_TOP = "https://api.spotify.com/";
const STEAM = "https://api.steampowered.com/";

const weatherOk = () =>
  Response.json({
    current: { temperature_2m: 11.6, weather_code: 3, is_day: 1 },
  });
const spotifyToken = () =>
  Response.json({ access_token: "access", expires_in: 3600 });
const noTopTracks = () => Response.json({ items: [] });

beforeEach(() => {
  assetRequests = [];
  pending = [];
  const store = new Map();
  cache = {
    async match(request) {
      return store.get(request.url)?.clone();
    },
    async put(request, response) {
      store.set(request.url, response);
    },
    clear: () => store.clear(),
  };
  vi.stubGlobal("caches", { default: cache });
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("pages", () => {
  it("serves the app's shell for each of its pages", async () => {
    const worker = await loadWorker();
    for (const path of [...KNOWN_PATHS, "/about/"]) {
      const res = await get(worker, path, { "Sec-Fetch-Dest": "document" });
      expect(res.status, path).toBe(200);
      expect(await res.text(), path).toBe(SHELL);
    }
  });

  it("passes a page request's conditional headers to the shell", async () => {
    const worker = await loadWorker();
    await get(worker, "/about", { "If-None-Match": '"etag"' });
    expect(assetRequests[0].headers.get("If-None-Match")).toBe('"etag"');
  });

  it("answers a page that doesn't exist with the shell and a real 404", async () => {
    const worker = await loadWorker();
    // With the browser's header, and without it, as most crawlers send.
    for (const headers of [{ "Sec-Fetch-Dest": "document" }, {}]) {
      const res = await get(worker, "/no-such-page", headers);
      expect(res.status).toBe(404);
      expect(await res.text()).toBe(SHELL);
    }
  });
});

describe("files", () => {
  it("caches build files and fonts for a year, and nothing else", async () => {
    const worker = await loadWorker();
    const cacheOf = async (path) =>
      (await get(worker, path)).headers.get("Cache-Control");
    const year = "public, max-age=31536000, immutable";
    expect(await cacheOf("/assets/app-abc123.js")).toBe(year);
    expect(await cacheOf("/fonts/nunito-latin.woff2")).toBe(year);
    expect(await cacheOf("/robots.txt")).not.toBe(year);
    expect(await cacheOf("/about")).not.toBe(year);
  });

  it("serves a file that exists, even when it's opened as a page", async () => {
    const worker = await loadWorker();
    for (const headers of [{ "Sec-Fetch-Dest": "document" }, {}]) {
      const res = await get(worker, "/robots.txt", headers);
      expect(res.status).toBe(200);
      expect(await res.text()).toBe("User-agent: *");
    }
  });

  it("answers a missing file with a 404, never the shell", async () => {
    const worker = await loadWorker();
    for (const [path, headers] of [
      ["/definitely-missing.txt", {}],
      ["/assets/old-chunk.js", { "Sec-Fetch-Dest": "script" }],
      ["/missing.png", { "Sec-Fetch-Dest": "image" }],
    ]) {
      const res = await get(worker, path, headers);
      expect(res.status, path).toBe(404);
      expect(await res.text(), path).not.toContain("shell");
    }
  });
});

describe("the API", () => {
  it("serves the weather, and caches it at the edge", async () => {
    respondWith({ [WEATHER]: weatherOk });
    const worker = await loadWorker();

    const first = await get(worker, "/api/weather");
    expect(first.status).toBe(200);
    expect(await first.json()).toEqual({
      weather: { temperature: 12, code: 3, isDay: true },
    });
    await Promise.all(pending);

    // A query string doesn't get past the cache.
    const second = await get(worker, "/api/weather?nocache=1");
    expect(second.status).toBe(200);
    expect(callsTo(WEATHER)).toBe(1);
  });

  it("never caches a failed answer", async () => {
    respondWith({ [WEATHER]: () => new Response(null, { status: 503 }) });
    const worker = await loadWorker();
    expect((await get(worker, "/api/weather")).status).toBe(502);
    await Promise.all(pending);
    expect((await get(worker, "/api/weather")).status).toBe(502);
    expect(callsTo(WEATHER)).toBe(2);
  });

  it("serves the top track of the last four weeks, with no sign of when it played", async () => {
    respondWith({
      [SPOTIFY_TOKEN]: spotifyToken,
      [SPOTIFY_TOP]: () =>
        Response.json({
          items: [
            {
              name: "Song",
              artists: [{ name: "One" }, { name: "Two" }],
              album: {
                name: "Album",
                images: [{ url: "big" }, { url: "mid" }],
              },
              external_urls: { spotify: "https://open.spotify.com/track/x" },
            },
          ],
        }),
    });
    const worker = await loadWorker();
    const res = await get(worker, "/api/spotify");
    const asked = new URL(
      upstream.mock.calls.find(([url]) =>
        String(url).startsWith(SPOTIFY_TOP),
      )[0],
    );
    expect(asked.pathname).toBe("/v1/me/top/tracks");
    expect(asked.searchParams.get("time_range")).toBe("short_term");
    expect(asked.searchParams.get("limit")).toBe("1");
    expect(await res.json()).toEqual({
      track: {
        name: "Song",
        artist: "One, Two",
        album: "Album",
        albumArt: "mid",
        url: "https://open.spotify.com/track/x",
      },
    });
  });

  it("keeps a Spotify token for its lifetime rather than fetching one per request", async () => {
    respondWith({
      [SPOTIFY_TOKEN]: spotifyToken,
      [SPOTIFY_TOP]: noTopTracks,
    });
    const worker = await loadWorker();
    expect((await get(worker, "/api/spotify")).status).toBe(200);
    cache.clear();
    expect((await get(worker, "/api/spotify")).status).toBe(200);
    expect(callsTo(SPOTIFY_TOP)).toBe(2);
    expect(callsTo(SPOTIFY_TOKEN)).toBe(1);
  });

  it("drops a Spotify token that Spotify rejects", async () => {
    respondWith({
      [SPOTIFY_TOKEN]: spotifyToken,
      [SPOTIFY_TOP]: () => new Response(null, { status: 401 }),
    });
    const worker = await loadWorker();
    expect((await get(worker, "/api/spotify")).status).toBe(502);
    expect((await get(worker, "/api/spotify")).status).toBe(502);
    expect(callsTo(SPOTIFY_TOKEN)).toBe(2);
  });

  it("leaves out the Steam icon when the game has none", async () => {
    respondWith({
      [STEAM]: () =>
        Response.json({
          response: {
            games: [{ appid: 10, name: "Game", img_icon_url: "" }],
          },
        }),
    });
    const worker = await loadWorker();
    const { game } = await (await get(worker, "/api/steam")).json();
    expect(game.iconFallback).toBeNull();
    expect(game.image).toContain("/apps/10/");
  });

  it("answers missing configuration the same way for every widget", async () => {
    const worker = await loadWorker();
    const bare = { ASSETS: env.ASSETS };
    for (const path of ["/api/spotify", "/api/steam", "/api/commits"]) {
      const res = await get(worker, path, {}, "GET", bare);
      expect(res.status, path).toBe(500);
      expect((await res.json()).error, path).toMatch(/^Missing /);
    }
  });

  it("answers an unknown endpoint with a JSON 404", async () => {
    const worker = await loadWorker();
    const res = await get(worker, "/api/nope");
    expect(res.status).toBe(404);
    expect(await res.json()).toEqual({ error: "Not found" });
  });
});

describe("every response", () => {
  it("carries the security headers, errors included", async () => {
    respondWith({ [WEATHER]: () => new Response(null, { status: 503 }) });
    const worker = await loadWorker();
    const responses = [
      await get(worker, "/about"),
      await get(worker, "/no-such-page"),
      await get(worker, "/definitely-missing.txt"),
      await get(worker, "/api/weather"),
      await get(worker, "/about", {}, "POST"),
    ];
    for (const res of responses) {
      expect(res.headers.get("Content-Security-Policy")).toContain(
        "default-src 'self'",
      );
      expect(res.headers.get("X-Frame-Options")).toBe("DENY");
      expect(res.headers.get("X-Content-Type-Options")).toBe("nosniff");
    }
  });

  it("refuses anything but GET and HEAD", async () => {
    const worker = await loadWorker();
    const res = await get(worker, "/about", {}, "POST");
    expect(res.status).toBe(405);
    expect(res.headers.get("Allow")).toBe("GET, HEAD");
  });

  it("sends www to the bare domain, keeping the path and query", async () => {
    const worker = await loadWorker();
    const res = await worker.fetch(
      new Request("https://www.noahpn.dev/about?x=1"),
      env,
      ctx,
    );
    expect(res.status).toBe(301);
    expect(res.headers.get("Location")).toBe("https://noahpn.dev/about?x=1");
  });
});

describe("the generated files", () => {
  it("lists every page in the sitemap", async () => {
    const worker = await loadWorker();
    const xml = await (await get(worker, "/sitemap.xml")).text();
    for (const path of KNOWN_PATHS) {
      expect(xml).toContain(`<loc>${SITE}${path}</loc>`);
    }
  });

  it("points security.txt at private reporting, and keeps it in date", async () => {
    const worker = await loadWorker();
    const txt = await (await get(worker, "/.well-known/security.txt")).text();
    expect(txt).toContain(
      "Contact: https://github.com/noahparknguyen/portfolio/security/advisories/new",
    );
    expect(txt).not.toContain("mailto:");
    // RFC 9116 wants Expires less than a year away. This fails a month before
    // the date passes, so there's time to bump it.
    const expires = new Date(txt.match(/^Expires: (.+)$/m)[1]);
    const month = 30 * 24 * 60 * 60 * 1000;
    expect(expires.getTime() - Date.now()).toBeGreaterThan(month);
  });
});
