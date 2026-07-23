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
- **Method guard** — non-GET/HEAD requests rejected with 405.
- **security.txt** — served by the Worker at `/.well-known/security.txt` (RFC 9116).
- **workers.dev disabled** — `workers_dev: false` + `preview_urls: false` in `wrangler.jsonc`,
  so the site serves only from the custom domains.

### Cloudflare dashboard

- **Account:** 2FA on. Production Worker secrets confirmed present.
- **TLS:** Always Use HTTPS + Automatic HTTPS Rewrites on. HSTS enabled at 6-month max-age.
- **DNS:** DNSSEC enabled. Anti-spoofing records added (SPF / null-DKIM / DMARC `p=reject`).
- **Security:** Bot Fight Mode on. Rate-limit rule `api-throttle-per-ip` on `/api/*`
  (20 req / 10s per IP → block).
- **Registrar:** auto-renew on, registrar lock on.

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
