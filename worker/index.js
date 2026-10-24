import {
  KNOWN_PATHS,
  SITE,
  isPageRequest,
  normalizePath,
} from "../src/lib/routes";

// The app's pages, from the table the client renders from, so the Worker never
// serves a 200 for a page the app calls unknown, or a 404 for one it renders.
const APP_PATHS = new Set(KNOWN_PATHS);

function json(body, status = 200, extraHeaders = {}) {
  // no-store by default, so an error is never cached. A success passes its own
  // Cache-Control.
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      ...extraHeaders,
    },
  });
}

// A Spotify access token lasts an hour, so it's kept for the life of the
// isolate rather than fetched on every request. It's dropped a minute early, so
// an expiring token is never used, and dropped at once if Spotify rejects it.
let spotifyToken = null;

async function getSpotifyAccessToken(clientId, clientSecret, refreshToken) {
  if (spotifyToken && Date.now() < spotifyToken.expiresAt) {
    return spotifyToken.value;
  }
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Token refresh failed (${res.status}): ${body}`);
  }
  const data = await res.json();
  const lifetime = (data.expires_in ?? 3600) - 60;
  spotifyToken = {
    value: data.access_token,
    expiresAt: Date.now() + lifetime * 1000,
  };
  return spotifyToken.value;
}

// The top track of about the last four weeks rather than what's playing now:
// it shows what I listen to without showing when. Needs the `user-top-read`
// scope on the refresh token.
async function handleSpotify(env) {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } =
    env;
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    return json({ error: "Missing Spotify credentials" }, 500);
  }
  let accessToken;
  try {
    accessToken = await getSpotifyAccessToken(
      SPOTIFY_CLIENT_ID,
      SPOTIFY_CLIENT_SECRET,
      SPOTIFY_REFRESH_TOKEN,
    );
  } catch {
    return json({ track: null }, 502);
  }
  let res;
  try {
    res = await fetch(
      "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=1",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
  } catch {
    return json({ track: null }, 502);
  }
  if (res.status === 401) spotifyToken = null;
  if (!res.ok) return json({ track: null }, 502);
  let data;
  try {
    data = await res.json();
  } catch {
    return json({ track: null }, 502);
  }
  const item = data?.items?.[0];
  if (!item) return json({ track: null });
  const images = item.album?.images ?? [];
  const albumArt = (images[1] ?? images[0])?.url ?? null;
  return json(
    {
      track: {
        name: item.name,
        artist: item.artists?.map((a) => a.name).join(", ") ?? "Unknown",
        album: item.album?.name ?? null,
        albumArt,
        url: item.external_urls?.spotify ?? null,
      },
    },
    200,
    // An hour: the short-term top track moves over days, not minutes.
    { "Cache-Control": "public, max-age=3600, s-maxage=3600" },
  );
}

async function handleSteam(env) {
  const { STEAM_API_KEY, STEAM_ID } = env;
  if (!STEAM_API_KEY || !STEAM_ID) {
    return json({ error: "Missing Steam credentials" }, 500);
  }
  let data;
  try {
    const url =
      `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/` +
      `?key=${STEAM_API_KEY}&steamid=${STEAM_ID}&count=1&format=json`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Steam API returned ${res.status}`);
    data = await res.json();
  } catch {
    return json({ game: null }, 502);
  }
  const games = data.response?.games ?? [];
  if (games.length === 0) return json({ game: null });
  const g = games[0];
  return json(
    {
      game: {
        name: g.name,
        image: `https://cdn.cloudflare.steamstatic.com/steam/apps/${g.appid}/header.jpg`,
        // Some games have no icon, and an empty hash would build a URL that
        // can only fail.
        iconFallback: g.img_icon_url
          ? `https://media.steampowered.com/steamcommunity/public/images/apps/${g.appid}/${g.img_icon_url}.jpg`
          : null,
        hoursTotal: g.playtime_forever / 60,
        playtime2Weeks: g.playtime_2weeks ?? 0,
      },
    },
    200,
    {
      "Cache-Control":
        "public, max-age=300, s-maxage=300, stale-while-revalidate=600",
    },
  );
}

async function handleWeather() {
  let data;
  try {
    const res = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=45.4215&longitude=-75.6972&current=temperature_2m,weather_code,is_day&timezone=America/Toronto",
    );
    if (!res.ok) throw new Error(`Open-Meteo returned ${res.status}`);
    data = await res.json();
  } catch {
    return json({ weather: null }, 502);
  }
  const current = data?.current;
  if (!current) return json({ weather: null }, 502);
  return json(
    {
      weather: {
        temperature: Math.round(current.temperature_2m),
        code: current.weather_code,
        isDay: current.is_day === 1,
      },
    },
    200,
    {
      "Cache-Control":
        "public, max-age=300, s-maxage=600, stale-while-revalidate=3600",
    },
  );
}

async function handleCommits(env) {
  const { GITHUB_REPO, GITHUB_TOKEN } = env;
  if (!GITHUB_REPO) {
    return json({ error: "Missing GitHub repository" }, 500);
  }
  let data;
  try {
    const headers = {
      "User-Agent": "portfolio-devlog",
      Accept: "application/vnd.github+json",
    };
    if (GITHUB_TOKEN) headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/commits?per_page=12`,
      { headers },
    );
    if (!res.ok) throw new Error(`GitHub API returned ${res.status}`);
    data = await res.json();
  } catch {
    return json({ commits: [] }, 502);
  }
  if (!Array.isArray(data)) return json({ commits: [] }, 502);
  const commits = data.map((c) => ({
    message: c.commit?.message?.split("\n")[0] ?? "",
    date: c.commit?.author?.date ?? null,
    url: c.html_url ?? null,
  }));
  return json({ commits }, 200, {
    "Cache-Control":
      "public, max-age=600, s-maxage=600, stale-while-revalidate=1800",
  });
}

// script-src stays 'self': Vite emits hashed module scripts with no inline JS,
// and Cloudflare Web Analytics is off, so nothing injects one. style-src needs
// no 'unsafe-inline', since React sets `style` props through the CSSOM, which
// CSP doesn't govern. img-src is broad for the widgets' album and game art.
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

// True only under `vite dev`. The build replaces it with `false`.
const DEV = import.meta.env.DEV;

// Applied to every response. `run_worker_first` (wrangler.jsonc) runs the
// Worker ahead of the static assets, which makes this the site's one source of
// security headers. HSTS is set in the Cloudflare dashboard instead.
function withSecurityHeaders(response) {
  const res = new Response(response.body, response);
  // Vite's dev page needs inline scripts and an HMR WebSocket, which this CSP
  // blocks, so dev gets none of these headers, even one set upstream.
  if (DEV) {
    res.headers.delete("Content-Security-Policy");
    return res;
  }
  res.headers.set("Content-Security-Policy", CSP);
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  );
  res.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  res.headers.set("X-DNS-Prefetch-Control", "off");
  return res;
}

// RFC 9116 disclosure contact, pointing at GitHub's private reporting like
// SECURITY.md does. Served here so dotfile handling can't break .well-known.
// Move Expires forward before it passes, keeping it within a year, or the file
// stops being valid.
const SECURITY_TXT = [
  "Contact: https://github.com/noahparknguyen/portfolio/security/advisories/new",
  "Policy: https://github.com/noahparknguyen/portfolio/security/policy",
  "Expires: 2027-07-23T00:00:00.000Z",
  "Preferred-Languages: en",
  "Canonical: https://noahpn.dev/.well-known/security.txt",
  "",
].join("\n");

// Built from the app's route table, so it can't list a page that doesn't exist
// or miss one that does.
function sitemap() {
  const urls = KNOWN_PATHS.map(
    (path) => `  <url><loc>${SITE}${path}</loc></url>`,
  ).join("\n");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=86400",
      },
    },
  );
}

// Cached for a year. A build file's name carries a hash of its contents, so a
// change is a new name. The vendored fonts keep theirs, but change only on a
// re-vendor. Everything else revalidates on each visit.
const LONG_LIVED = /^\/(assets|fonts)\//;

// A Worker's own responses never reach Cloudflare's CDN cache, whatever their
// Cache-Control says, so the widget endpoints use the Cache API. Without it,
// every visitor's poll would go straight to Spotify, Steam, GitHub, and
// Open-Meteo. Only a 200 is stored, so an outage is never cached. Keyed on the
// path alone, so a query string can't bypass it and spend the rate limits.
async function cached(request, ctx, handle) {
  if (DEV) return handle();
  const url = new URL(request.url);
  const key = new Request(url.origin + url.pathname);
  const hit = await caches.default.match(key);
  if (hit) return hit;
  const response = await handle();
  if (response.status === 200) {
    ctx.waitUntil(caches.default.put(key, response.clone()));
  }
  return response;
}

async function route(request, env, ctx) {
  const { pathname } = new URL(request.url);
  switch (pathname) {
    case "/sitemap.xml":
      return sitemap();
    case "/.well-known/security.txt":
      return new Response(SECURITY_TXT, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "public, max-age=86400",
        },
      });
    case "/api/spotify":
      return cached(request, ctx, () => handleSpotify(env));
    case "/api/steam":
      return cached(request, ctx, () => handleSteam(env));
    case "/api/commits":
      return cached(request, ctx, () => handleCommits(env));
    case "/api/weather":
      return cached(request, ctx, () => handleWeather());
    default: {
      if (pathname.startsWith("/api/")) {
        return json({ error: "Not found" }, 404);
      }

      // Every page of the app is the one shell, which renders the page for the
      // path it's on. Passing the request along keeps its conditional headers,
      // so a revisit can still get a 304.
      if (APP_PATHS.has(normalizePath(pathname))) {
        return env.ASSETS.fetch(
          new Request(new URL("/", request.url), request),
        );
      }

      // Anything else is a file, served if it exists, whoever asked for it.
      // `not_found_handling` is "none" (wrangler.jsonc), so a missing file
      // comes back as a 404 rather than as the shell with a 200.
      const asset = await env.ASSETS.fetch(request);
      if (asset.ok && LONG_LIVED.test(pathname)) {
        const res = new Response(asset.body, asset);
        res.headers.set("Cache-Control", "public, max-age=31536000, immutable");
        return res;
      }
      if (asset.status !== 404) return asset;
      if (!isPageRequest(request.headers.get("Sec-Fetch-Dest"), pathname)) {
        return asset;
      }

      // A page that doesn't exist gets the shell, so the app renders its
      // "Nothing here" section. The 404 stops a crawler indexing it as a copy
      // of the home page. Fetched without the conditional headers, because a
      // 304 can't carry a 404.
      const shell = await env.ASSETS.fetch(new URL("/", request.url));
      return new Response(shell.body, {
        status: 404,
        headers: shell.headers,
      });
    }
  }
}

export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);

      // www redirects to the apex, keeping the path and query, so the two
      // domains don't serve duplicate pages.
      if (url.hostname.startsWith("www.")) {
        url.hostname = url.hostname.slice(4);
        return withSecurityHeaders(Response.redirect(url.toString(), 301));
      }

      // Only GET and HEAD are ever needed.
      if (request.method !== "GET" && request.method !== "HEAD") {
        return withSecurityHeaders(
          json({ error: "Method not allowed" }, 405, { Allow: "GET, HEAD" }),
        );
      }
      const response = await route(request, env, ctx);
      return withSecurityHeaders(response);
    } catch (err) {
      // The handlers catch their own upstream failures, so this is a bug. The
      // 500 still carries the security headers, and json() makes it no-store.
      console.error("Unhandled worker error:", err);
      return withSecurityHeaders(json({ error: "Internal error" }, 500));
    }
  },
};
