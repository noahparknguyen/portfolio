# Cloudflare setup & hardening — noahpn.dev

React/Vite SPA on **Cloudflare Workers**, custom domains `noahpn.dev` + `www.noahpn.dev`,
registered through **Cloudflare Registrar**.

**Status: complete.** Everything below is live and verified. Keep this as the record of how the
domain is configured, plus a couple of dated reminders at the bottom.

---

## What's in place

### Code (in this repo, live on deploy)

- **Security headers** — CSP, X-Frame-Options `DENY`, X-Content-Type-Options `nosniff`,
  Referrer-Policy, Permissions-Policy, Cross-Origin-Opener-Policy, X-DNS-Prefetch-Control.
  Split by response type because static assets bypass the Worker:
  - `public/_headers` → static assets (HTML/CSS/JS), applied at Cloudflare's edge.
  - `worker/index.js` (`withSecurityHeaders`) → dynamic routes (`/api/*`, `/.well-known/security.txt`).
  - The two CSP strings must stay identical. `script-src` stays `'self'` (no inline JS,
    no third-party scripts). `style-src` allows `https://fonts.googleapis.com` and
    `font-src` allows `https://fonts.gstatic.com` for the Google Fonts stylesheet
    imported in `src/index.css` — the only third-party origins in the policy besides
    the broad `img-src https:` for widget artwork.
- **Method guard** — non-GET/HEAD requests rejected with 405.
- **security.txt** — served by the Worker at `/.well-known/security.txt` (RFC 9116).
- **workers.dev disabled** — `workers_dev: false` + `preview_urls: false` in `wrangler.jsonc`,
  so the site serves only from the custom domains.
- **Observability on** — `observability.enabled` in `wrangler.jsonc` for Worker logs/metrics
  (Workers & Pages → this Worker → Observability); useful for debugging the `/api/*` routes.
- **robots.txt** — `public/robots.txt`, permissive (whole site is public). Add a `Sitemap:`
  line here if a `sitemap.xml` is ever generated.

### Cloudflare dashboard

Paths below use the classic navigation. Cloudflare is rolling out a **new security dashboard**
that consolidates the security items under **Security → Settings** (grouped by category —
Web application exploits, Bot traffic, etc.). If your sidebar looks different, that's why; the
new path is noted where it differs.

- **Account:** 2FA on (My Profile → Authentication). Worker secrets present
  (Workers & Pages → `portfolio` → Settings → Variables and Secrets).
- **TLS:** Always Use HTTPS + Automatic HTTPS Rewrites on, HSTS at 6-month max-age — all under
  **SSL/TLS → Edge Certificates**. HSTS is the "HTTP Strict Transport Security (HSTS)" card;
  the duration field is labelled **Max Age Header** (max 12 months).
- **DNS:** DNSSEC on (**DNS → Settings** → DNSSEC → Enable DNSSEC). Anti-spoofing TXT records
  (SPF / null-DKIM / DMARC `p=reject`) under **DNS → Records**.
- **Bot Fight Mode:** on — classic **Security → Bots**; new **Security → Settings → Bot
  traffic**. On the free plan this force-enables JavaScript Detections (no separate toggle),
  which injects a `/cdn-cgi/challenge-platform/…` inline script that the strict
  `script-src 'self'` blocks — the resulting console error is expected (see "Known console
  noise" below).
- **Rate limiting:** rule `api-throttle-per-ip` on `/api/*` (20 req / 10s per IP → block) —
  classic **Security → WAF → Rate limiting rules**; new **Security → Security rules**.
- **Registrar:** auto-renew on, registrar lock on (**Domain Registration → Manage Domains →
  `noahpn.dev` → Configuration**).

### Verified live

- Security headers present on both `/` (static) and `/api/*` (dynamic).
- `security.txt` served by the Worker route.
- workers.dev URL returns 404 (no longer serves the site).
- HSTS header confirmed: `Strict-Transport-Security: max-age=15552000`.
- Weather/Spotify/Steam/commits widgets render under the CSP.

---

## Reminders (dated)

- **~Oct 2026** — if the site's been stable on HTTPS, widen HSTS to 1 year +
  `includeSubDomains` + `preload` (SSL/TLS → Edge Certificates → HSTS). Preload is hard to
  undo, so only with every subdomain committed to HTTPS forever.
- **Before Jul 2027** — bump the `Expires` date in the `security.txt` route (`worker/index.js`)
  so it stays valid.

---

## Deliberately skipped

- **Web Analytics** (account) — the automatic-setup mode injects an inline bootstrap plus
  `static.cloudflareinsights.com/beacon.min.js` into every HTML response at the edge, both of
  which the strict `script-src 'self'` blocks. Rather than weaken `script-src` with
  `'unsafe-inline'` or a brittle script hash, Web Analytics is kept **off**; Cloudflare's
  edge/HTTP analytics still works without any injected client script. **Disable it at**
  Analytics & Logs → Web Analytics → the site's ⋯ menu → remove the automatic setup (it was
  briefly on, which is what was injecting the beacon). If an inline-script CSP error lingers
  after that, also check Scrape Shield → Email Address Obfuscation and Speed → Optimization →
  Rocket Loader, which likewise inject inline JS. If ever re-enabled deliberately, allow
  `https://static.cloudflareinsights.com` in `script-src`, `https://cloudflareinsights.com` in
  `connect-src`, and handle the injected inline script (hash or nonce).
- **Turnstile** (account) — a CAPTCHA for forms; the site has none. Add only with a contact form.
- **AI Labyrinth / Block AI bots** — optional anti-scraper tools. Enable only if crawler traffic
  becomes a nuisance. Not a security gap.
- **Null-MX record** — redundant on top of the SPF/DMARC lockdown.

---

## How to re-verify (any time)

1. `curl -sI "https://noahpn.dev/?cb=$(date +%s)"` → CSP + framing headers present on the document.
2. `curl -sI "https://noahpn.dev/api/weather?cb=$(date +%s)"` → same headers on a dynamic route.
3. `curl -s https://noahpn.dev/.well-known/security.txt` → returns the contact file.
4. `https://securityheaders.com/?q=noahpn.dev` → grade A / A+.
5. Open the site and confirm all four widgets render (CSP not blocking anything).

> Note: the edge may serve a stale cached copy for a request or two after deploy — the `?cb=`
> cache-buster avoids it.

---

## Known console noise (expected, not bugs)

- **Bot Fight Mode inline script** — `script-src-elem` CSP error for an inline
  `/cdn-cgi/challenge-platform/…` script (`window.__CF$cv$params`). It's Bot Fight Mode's
  JavaScript Detections, which can't be disabled separately on the free plan. The script
  embeds a per-request token, so it can't be allowlisted with a static hash; the CSP blocks it
  and it simply doesn't run (no loss — Bot Fight Mode's server-side checks are unaffected).
  Leaving Bot Fight Mode on and accepting the error. Removing it entirely is the only way to
  silence it.
- **Firefox fingerprinting notice** — a warning that `screen.availWidth/availHeight` were
  altered. That's Firefox's anti-fingerprinting spoofing those values; it's a browser feature,
  not something the site does. Only visible to users with that setting on. Nothing to fix.

## Scan insights — 2026-07-23 review

Latest Security Insights export reviewed. Verdicts:

| Insight (severity)                | Host        | Verdict                                                                                                                                                                                                                                                             |
| --------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Block AI bots (Moderate)          | workers.dev | Moot — subdomain disabled, 404s. Cloudflare still scans the name.                                                                                                                                                                                                   |
| AI Labyrinth (Low)                | workers.dev | Moot — same reason.                                                                                                                                                                                                                                                 |
| Security.txt not configured (Low) | workers.dev | Moot — same reason.                                                                                                                                                                                                                                                 |
| Bot Fight Mode not enabled (Mod.) | workers.dev | Moot — Bot Fight Mode is already on for noahpn.dev.                                                                                                                                                                                                                 |
| AI Labyrinth (Low)                | noahpn.dev  | Skipped by choice — optional anti-scraper, not a security gap.                                                                                                                                                                                                      |
| Security.txt not configured (Low) | noahpn.dev  | **False positive.** File is served live by the Worker (verified). The insight only checks whether Cloudflare's _native_ Security.txt toggle is on, not whether a file is actually served. Keeping the Worker route (in version control) over the dashboard feature. |
| No Turnstile (Low)                | account     | Skipped by choice — no forms on the site.                                                                                                                                                                                                                           |

The workers.dev rows persist because the subdomain name still exists in Cloudflare's registry even with `workers_dev: false`; they carry no real exposure (the host returns 404). Dismiss them in Security Center if the list bothers you.

## Reference — original Cloudflare scan warnings

Most warnings were against the free `*.noahparknguyen.workers.dev` subdomain, not the real
domain — disabling that subdomain cleared them in one move.

| Warning                     | Host                     | Resolution                                     |
| --------------------------- | ------------------------ | ---------------------------------------------- |
| Missing TLS encryption      | workers.dev              | ✅ Disabled workers.dev                        |
| No "Always Use HTTPS"       | workers.dev              | ✅ Disabled workers.dev                        |
| No HSTS                     | workers.dev              | ✅ Disabled workers.dev (+ HSTS on noahpn.dev) |
| Review/Block AI bots        | workers.dev              | ✅ Disabled workers.dev                        |
| Security.txt not configured | both                     | ✅ Served by the Worker                        |
| Bot Fight Mode not enabled  | noahpn.dev + workers.dev | ✅ Enabled                                     |
| AI Labyrinth                | both                     | Skipped (optional)                             |
| No Turnstile                | account                  | Skipped (no forms)                             |
