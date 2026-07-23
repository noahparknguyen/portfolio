function json(body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...extraHeaders },
  });
}

async function getSpotifyAccessToken(clientId, clientSecret, refreshToken) {
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
  return data.access_token;
}

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
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
  } catch {
    return json({ track: null }, 502);
  }
  if (res.status === 204) return json({ track: null });
  if (!res.ok) return json({ track: null }, 502);
  let data;
  try {
    data = await res.json();
  } catch {
    return json({ track: null }, 502);
  }
  const item = data?.item;
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
        isPlaying: data.is_playing ?? false,
      },
    },
    200,
    {
      "Cache-Control":
        "public, max-age=30, s-maxage=30, stale-while-revalidate=60",
    },
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
        iconFallback: `https://media.steampowered.com/steamcommunity/public/images/apps/${g.appid}/${g.img_icon_url}.jpg`,
        hoursTotal: g.playtime_forever / 60,
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
    return json({ commits: [] }, 502);
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

// Content Security Policy. script-src stays 'self' because Vite emits external,
// hashed module scripts (no inline JS) and Cloudflare Web Analytics is disabled
// (no injected beacon/inline script). style-src allows 'unsafe-inline' for
// React's inline style attributes and Tailwind's injected styles, plus
// fonts.googleapis.com for the Google Fonts stylesheet imported in index.css;
// the font files themselves load from fonts.gstatic.com (font-src). img-src is
// broad because the live widgets pull album/game art from third-party CDNs.
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: https:",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

// Applied to every response. HSTS is intentionally NOT set here — it is managed
// in the Cloudflare dashboard (SSL/TLS -> Edge Certificates -> HSTS) so it can be
// ramped up safely and isn't duplicated at the edge.
function withSecurityHeaders(response) {
  const res = new Response(response.body, response);
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

// RFC 9116 vulnerability-disclosure contact. Served from the Worker so it works
// regardless of how static-asset dotfile (.well-known) handling behaves. Bump the
// Expires date within a year to keep it valid.
const SECURITY_TXT = [
  "Contact: mailto:noahparknguyen@gmail.com",
  "Expires: 2027-07-23T00:00:00.000Z",
  "Preferred-Languages: en",
  "Canonical: https://noahpn.dev/.well-known/security.txt",
  "",
].join("\n");

async function route(request, env) {
  const { pathname } = new URL(request.url);
  switch (pathname) {
    case "/.well-known/security.txt":
      return new Response(SECURITY_TXT, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "public, max-age=86400",
        },
      });
    case "/api/spotify":
      return handleSpotify(env);
    case "/api/steam":
      return handleSteam(env);
    case "/api/commits":
      return handleCommits(env);
    case "/api/weather":
      return handleWeather();
    default:
      if (pathname.startsWith("/api/")) {
        return json({ error: "Not found" }, 404);
      }
      return env.ASSETS.fetch(request);
  }
}

export default {
  async fetch(request, env) {
    // Only GET/HEAD are ever needed; reject the rest before doing any work.
    if (request.method !== "GET" && request.method !== "HEAD") {
      return withSecurityHeaders(
        json({ error: "Method not allowed" }, 405, { Allow: "GET, HEAD" }),
      );
    }
    const response = await route(request, env);
    return withSecurityHeaders(response);
  },
};
