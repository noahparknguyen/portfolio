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
- **robots.txt** — `public/robots.txt`. Human/search crawling is open; AI stance is "search + agent
  allowed, training opted out" via a `Content-signal:` line plus `Disallow` for training-only
  crawlers (see the AI Crawl Control audit below). Add a `Sitemap:` line here if a `sitemap.xml`
  is ever generated.

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
- **DNS:** DNSSEC on (**DNS → Settings** → DNSSEC → Enable DNSSEC). Anti-spoofing records under
  **DNS → Records**: SPF (`v=spf1 -all`), null-DKIM (`v=DKIM1; p=`), DMARC `p=reject`, and a
  null MX (`0 .`, added 2026-07-23) declaring the domain accepts no mail.
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
  becomes a nuisance. Not a security gap. (See the AI Crawl Control audit for the reasoning; the
  training opt-out is handled via robots.txt instead.)
- ~~**Null-MX record** — redundant on top of the SPF/DMARC lockdown.~~ **Superseded 2026-07-23:**
  null MX added (it's the _receiving_-side signal, not redundant with SPF/DMARC). See DNS audit.

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

## Dashboard audit — tab-by-tab (2026-07-23)

Working through every left-nav tab on the Free plan, exhaustively per setting. Verdicts assume
this is a Workers-served SPA on custom domains (not a classic orange-cloud proxied origin), so
some origin/caching-oriented recommendations map awkwardly and are flagged where relevant.

### Overview

Mostly a read-only summary; only two toggles are actionable.

| Setting / element             | State       | Verdict                                                                                                                                                                                                                                                                                                                             |
| ----------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Under Attack Mode**         | Off         | **Keep off.** Emergency L7-DDoS switch — challenges every visitor with an interstitial and injects a `/cdn-cgi/challenge-platform/…` script the strict `script-src 'self'` would block anyway. Flip on only during a real attack, then off. Baseline DDoS protection + the `/api/*` rate-limit rule already cover normal operation. |
| **Development Mode**          | Off         | **Keep off.** 3-hour edge-cache bypass for live editing. Not needed — Workers deploys emit new asset hashes and `?cb=` cache-busters handle verification. Turn on only while fighting a stale cache mid-edit; it auto-expires after 3h.                                                                                             |
| Plan (Free)                   | Free        | Correct. Upgrade prompts are marketing.                                                                                                                                                                                                                                                                                             |
| Domain status                 | Active      | Read-only.                                                                                                                                                                                                                                                                                                                          |
| Active nameservers            | CF-assigned | Read-only; managed automatically via Cloudflare Registrar.                                                                                                                                                                                                                                                                          |
| Zone ID / Account ID          | —           | Reference values for `wrangler`/API. No action.                                                                                                                                                                                                                                                                                     |
| Quick Start / recommendations | —           | A table of contents into other tabs, not new settings. Its caching nudges assume a classic origin — ignore for a Workers-served site.                                                                                                                                                                                               |

**Net: nothing to change.** Both toggles stay off (they don't persist unless deliberately enabled).

### AI Crawl Control (formerly AI Audit)

Available on the Free plan. Strategic note: for a portfolio, AI _search/answer_ discoverability is
a feature, not a threat — so the goal is "findable but not used for training," not "block everything."
All enforcement here is network-level (WAF-backed) and injects **no client script**, so nothing on this
tab affects the strict `script-src 'self'` CSP.

| Setting                                        | State     | Verdict                                                                                                                                                                                                                                                      |
| ---------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Analyze AI traffic**                         | —         | Read-only dashboard. Glance occasionally; sparse on a low-traffic site.                                                                                                                                                                                      |
| **Manage AI crawlers**                         | Allow-all | Baseline is fine. Intent split: **Search + Agent allowed** (discoverable/citable), **Training opted out** — enforced via robots.txt below rather than dashboard block rules.                                                                                 |
| **Block AI Bots** (1-click)                    | Off       | **Keep off.** Blanket block of known AI crawlers would suppress AI search/answer engines too — counterproductive for a portfolio. Server-side, no CSP impact either way.                                                                                     |
| **AI Labyrinth**                               | Off       | **Keep off.** Decoy maze for crawlers ignoring robots.txt. No real-user/CSP impact, but pointless for a small site.                                                                                                                                          |
| **Managed robots.txt**                         | Off       | **Keep off — matters.** Would prepend Cloudflare's managed block to `robots.txt` at the edge, creating two sources of truth for a file already version-controlled at `public/robots.txt` (same reason security.txt is Worker-served, not the native toggle). |
| **Content Signals Policy** (Overview checkbox) | n/a       | Not auto-injected because the site already serves its own `robots.txt`. Preferences instead declared manually via `Content-signal:` in `public/robots.txt` (below).                                                                                          |
| **Pay Per Crawl** (beta)                       | Off       | Irrelevant — monetization for publishers charging crawlers. Skip.                                                                                                                                                                                            |

**Change made (2026-07-23):** `public/robots.txt` rewritten from blanket-permissive to
"search/agent yes, training no." Adds `Content-signal: search=yes, ai-input=yes, ai-train=no`
on the wildcard group plus explicit `Disallow: /` for training-only crawlers (GPTBot, CCBot,
ClaudeBot, Google-Extended, Applebot-Extended, Bytespider, meta-externalagent, Amazonbot). Their
search/agent siblings (OAI-SearchBot, ChatGPT-User, Googlebot, Applebot, etc.) aren't listed, so
they inherit the permissive wildcard group and stay allowed. **Requires a deploy to go live.**
Note: Google Search Console may report `Syntax not understood` for `Content-signal` — Cloudflare
confirms no crawl/SEO impact. Compliance is voluntary; well-behaved crawlers honor it, others may not.
The Sept 15 2026 default (auto-block Training/Agent on ad-bearing pages) doesn't apply — no ads here.

### Investigate (Security Center)

A diagnostic **tool, not a settings page** — no toggles to configure.

| Element                        | Set to / action         | Notes                                                                                                                                                                                                                                                      |
| ------------------------------ | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IP / Domain / URL / ASN lookup | n/a — read-only tool    | Ad-hoc threat investigation (passive DNS, reputation, SSL, scan report). Use if investigating a suspicious IP from logs.                                                                                                                                   |
| Security scan of own domain    | n/a — automatic on Free | **This is the source of the "Security Insights" warnings** triaged in the 2026-07-23 table below. Re-runs ~every 7 days on Free; **cannot** be triggered manually (needs Business/Enterprise). So the scan verdict won't refresh on demand after a deploy. |
| Dismiss stale findings         | optional, cosmetic      | The moot `workers.dev` insights can be dismissed here. Purely to tidy the list.                                                                                                                                                                            |

**Net: nothing to change.** Diagnostic surface only. Value is knowing the periodic security scan lives here and refreshes on its own ~7-day cycle.

### Analytics

Read-only dashboards (traffic, requests, security events) — **no actionable settings** on Free.
Adjacent **Web Analytics** stays **OFF** by design (its injected beacon breaks `script-src 'self'`;
see "Deliberately skipped"). Nothing to change.

### DNS

Almost entirely correct. All changes here are dashboard actions (records live in the CF zone, not the repo).

| Setting                                     | Set to                       | Status / notes                                                                                                                                                                                                                                                                                 |
| ------------------------------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **DNSSEC**                                  | ON                           | ✅ On; DS auto-published via CF Registrar, fully active. Coexists with CNAME flattening (edge-signed live).                                                                                                                                                                                    |
| **CNAME Flattening**                        | Flatten at apex (default)    | ✅ Only option on Free; correct. Apex handled by Workers custom-domain records.                                                                                                                                                                                                                |
| **Multi-provider / Secondary DNS**          | OFF                          | ✅ Cloudflare is sole authoritative DNS.                                                                                                                                                                                                                                                       |
| `noahpn.dev` + `www` records (A/AAAA/CNAME) | Proxied (orange), untouched  | ✅ Auto-created by Workers custom-domain feature; do not hand-edit. Proxied hides origin + gives edge layer.                                                                                                                                                                                   |
| **SPF** (`TXT @`)                           | `v=spf1 -all`                | ✅ Present. Nothing authorized to send as the domain.                                                                                                                                                                                                                                          |
| **DKIM** (`TXT *._domainkey`)               | `v=DKIM1; p=`                | ✅ Present (null key). Any DKIM-signed mail claiming to be the domain fails.                                                                                                                                                                                                                   |
| **DMARC** (`TXT _dmarc`)                    | `v=DMARC1; p=reject;`        | ✅ Present. Optional cosmetic tightening: append `sp=reject; adkim=s; aspf=s;` (explicit subdomain reject + strict alignment). Low value.                                                                                                                                                      |
| **Null MX** (`MX @` → `0 .`)                | `0 .` — **ADDED 2026-07-23** | ✅ Added. Not redundant with SPF/DMARC — it's the _receiving_ side (RFC 7505): declares the domain accepts no mail, so spoof/bounce attempts reject immediately. Completes the "sends nor receives mail" lockdown. Blocks enabling Email Routing later (a real MX can't coexist with null MX). |

**Net: DNS complete.** Null MX added; SPF/DKIM/DMARC correct. DMARC subdomain
tightening (`sp=reject; adkim=s; aspf=s;`) remains optional/cosmetic — not applied unless noted.
(Supersedes the earlier "null-MX redundant" note under Deliberately skipped.)

### Email

Two features; domain sends/receives no mail.

| Setting              | Set to                   | Notes                                                                                                                                                                                                                                                                                                                                                                |
| -------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Email Routing**    | OFF                      | ✅ Keep disabled. Needs real MX → CF routing servers, which contradicts the null MX just added. No inbound mail wanted.                                                                                                                                                                                                                                              |
| **DMARC Management** | OFF (optional to enable) | Free tool (works on CF DNS only). Enabling adds a `rua=mailto:…` tag to `_dmarc` and gives a readable dashboard of DMARC reports = visibility into spoof attempts. `p=reject` already _blocks_ them, so reports are informational only. Recommendation: leave off to keep the zone minimal; enable only if spoof-attempt visibility is wanted. Zero site/CSP impact. |

**Net: both off (recommended).** DMARC Management is a harmless optional add if visibility is desired.

### SSL/TLS

Meatiest tab. Origin/client-cert sections don't apply (Workers = no origin server).

| Setting                                         | Set to                           | Notes                                                                                                                                                                                                   |
| ----------------------------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Encryption mode**                             | Full (Strict)                    | Largely moot for a Workers custom domain (no origin hop), but the correct safe default. Must NOT be Flexible/Off. "Automatic" also acceptable.                                                          |
| **SSL/TLS Recommender**                         | OFF                              | Probes an origin you don't have. Low value; cosmetic.                                                                                                                                                   |
| **Universal SSL**                               | ON (never disable)               | Free edge cert for `noahpn.dev` + `www`.                                                                                                                                                                |
| **Always Use HTTPS**                            | ON                               | ✅ Already on.                                                                                                                                                                                          |
| **Automatic HTTPS Rewrites**                    | ON                               | ✅ Already on.                                                                                                                                                                                          |
| **TLS 1.3**                                     | ON                               | Confirm it's on.                                                                                                                                                                                        |
| **Opportunistic Encryption**                    | ON (default)                     | Harmless; leave.                                                                                                                                                                                        |
| **Certificate Transparency Monitoring**         | ON (recommended — enable if off) | Emails on any cert issued for the domain = early mis-issuance/hijack warning. Zero downside.                                                                                                            |
| **Minimum TLS Version**                         | **TLS 1.2** (chosen 2026-07-23)  | Universal safe floor; blocks obsolete 1.0/1.1, admits all modern clients. (1.3 considered and declined for compatibility.)                                                                              |
| **HSTS**                                        | 6-month now; ramp ~Oct 2026      | Now: Enable ON, Max-Age 6mo (15552000), includeSubDomains OFF, Preload OFF. ~Oct 2026: Max-Age 12mo, includeSubDomains ON, Preload ON. Managed in dashboard, NOT the Worker (see worker/index.js note). |
| Client Certs / Origin Certs / Auth Origin Pulls | n/a — skip                       | Secure a CF→origin connection that doesn't exist. No origin cert needed.                                                                                                                                |

**Net: confirm Encryption mode = Full (Strict), set Min TLS = 1.2, enable CT Monitoring if off.**
Always Use HTTPS / Auto HTTPS Rewrites / HSTS already correct. Follow the HSTS ramp reminder.

### Security

Big tab, mostly Enterprise (API Shield, Page Shield, OWASP Core, Bot Management, schema validation
= all n/a on Free). Two items interact with the strict CSP and are worth verifying in the dashboard.

**⚠️ Verify these two:**

- **Email Address Obfuscation** (Client-side abuse / old Scrape Shield) — **Set to: OFF.** ON by
  default; injects script to scramble on-page emails = exactly what `script-src 'self'` blocks (a
  suspected CSP-error source), and could render a broken email if any is displayed. Contact lives in
  the Worker-served security.txt anyway. Confirm it's off.
- **WAF → Cloudflare Free Managed Ruleset** — **Set to: ON / deployed.** The core free WAF
  (curated exploit rules). Highest-value free control; easy to leave un-deployed. Confirm enabled.

| Category / Setting                                  | Set to                                   | Notes                                                                                                                                                                                                                                                                                                              |
| --------------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Web app exploits**                                |                                          |                                                                                                                                                                                                                                                                                                                    |
| Security Level                                      | Medium (default)                         | High over-challenges real visitors; UAM emergency-only.                                                                                                                                                                                                                                                            |
| Cloudflare Free Managed Ruleset                     | ON (verify)                              | Core free WAF — see above.                                                                                                                                                                                                                                                                                         |
| Leaked credentials detection                        | ON by default (no action)                | Free and auto-enabled; harmless — only inspects auth requests, of which the site has none. Nothing to do.                                                                                                                                                                                                          |
| Malicious uploads detection                         | n/a                                      | No upload endpoints.                                                                                                                                                                                                                                                                                               |
| Replace insecure JS libraries                       | OFF                                      | Self-hosted Vite bundle, no 3rd-party JS to replace; don't let edge rewrite scripts under strict CSP.                                                                                                                                                                                                              |
| OWASP Core / Sensitive data / AI Sec                | n/a                                      | Paid/Enterprise.                                                                                                                                                                                                                                                                                                   |
| Managed security.txt                                | OFF                                      | Served by the Worker instead (version-controlled).                                                                                                                                                                                                                                                                 |
| **DDoS attacks**                                    |                                          |                                                                                                                                                                                                                                                                                                                    |
| HTTP / SSL-TLS / Network-layer DDoS                 | always-on, no action                     | Managed automatically; overrides Enterprise-only.                                                                                                                                                                                                                                                                  |
| Browser Integrity Check                             | ON (default, keep)                       | Server-side header inspection; no CSP impact; won't block same-origin `/api/*` fetches.                                                                                                                                                                                                                            |
| Challenge Passage                                   | 30 min (default)                         | Passed-challenge memory window.                                                                                                                                                                                                                                                                                    |
| **Bot traffic**                                     |                                          |                                                                                                                                                                                                                                                                                                                    |
| Bot Fight Mode                                      | ON (keep)                                | Free-plan JS Detections inject the `/cdn-cgi/challenge-platform/…` script CSP blocks = expected console error, no functional loss. Turning off is the only way to silence it — not recommended.                                                                                                                    |
| Super Bot Fight Mode                                | n/a                                      | Pro+ only.                                                                                                                                                                                                                                                                                                         |
| AI Labyrinth / Block AI Bots / Managed robots.txt   | OFF                                      | Covered under AI Crawl Control.                                                                                                                                                                                                                                                                                    |
| **Client-side abuse**                               |                                          |                                                                                                                                                                                                                                                                                                                    |
| Email Address Obfuscation                           | OFF (verify)                             | CSP interaction — see above.                                                                                                                                                                                                                                                                                       |
| Hotlink Protection                                  | OFF (default)                            | Low value; widget art is 3rd-party anyway.                                                                                                                                                                                                                                                                         |
| Continuous script monitoring (Page Shield)          | ON (free — recommend enabling)           | **Script monitoring is free** (Free/Pro). Gives a live inventory of every script executing on the site — excellent fit alongside the strict `script-src 'self'` CSP (spot anything unexpected). Only the threat-feed _classification_ of scripts/connections is Enterprise. Zero site impact; passive observation. |
| **WAF tools**                                       |                                          |                                                                                                                                                                                                                                                                                                                    |
| Rate limiting `api-throttle-per-ip`                 | keep (20 req/10s/IP → block on `/api/*`) | The one free rate-limit rule; well-targeted. Verify active.                                                                                                                                                                                                                                                        |
| Custom rules / IP Access / UA block / Zone Lockdown | none (unused)                            | Up to 5 custom rules available if ever needed; method guard already in the Worker.                                                                                                                                                                                                                                 |
| **API abuse**                                       | n/a                                      | Entire category is Enterprise (API Shield).                                                                                                                                                                                                                                                                        |

**Net: verify Email Address Obfuscation = OFF and Free Managed Ruleset = ON.** Set Security Level =
Medium. Optionally enable Page Shield script monitoring (free, passive, pairs with the CSP).
Everything else already correct or n/a. Rate-limit rule and Bot Fight Mode unchanged.

### Speed

One CSP trap to verify; a few free wins; one optional hardening experiment.

| Setting                          | Set to                    | Notes                                                                                                                                                                                                                                                                                                                         |
| -------------------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Rocket Loader**                | **OFF (verify)**          | Injects inline JS to async-load scripts → blocked by `script-src 'self'`; suspected CSP-error source. (Still a maintained CF product — kept off for the CSP conflict, not because it's deprecated.)                                                                                                                           |
| HTTP/3 (with QUIC)               | ON                        | Modern/faster; auto-falls back to HTTP/2.                                                                                                                                                                                                                                                                                     |
| 0-RTT Connection Resumption      | ON                        | Speeds repeat visits. Replay caveat doesn't apply — Worker method guard is GET/HEAD only.                                                                                                                                                                                                                                     |
| Speed Brain                      | ON                        | Free speculative prefetch (Speculation Rules at edge). Passive, harmless.                                                                                                                                                                                                                                                     |
| Early Hints                      | ON                        | Sends `103 Early Hints`. No downside.                                                                                                                                                                                                                                                                                         |
| Auto Minify                      | n/a (removed Aug 2024)    | Vite build already minifies. No toggle exists anymore.                                                                                                                                                                                                                                                                        |
| Brotli                           | n/a (always on)           | Made always-on for all plans; toggle removed.                                                                                                                                                                                                                                                                                 |
| Polish / Mirage / Image Resizing | n/a                       | Pro+/paid.                                                                                                                                                                                                                                                                                                                    |
| **Cloudflare Fonts**             | OFF today — optional test | Self-hosts Google Fonts via own domain; if it worked, could drop `fonts.googleapis.com`/`fonts.gstatic.com` from CSP. **Caveat:** rewrites HTML `<link>` tags, but fonts here load via CSS `@import` in `src/index.css` — may not be detected. Try + verify in DevTools before relying on it; hold until after the tab sweep. |

**Net: verify Rocket Loader = OFF.** Enable HTTP/3, 0-RTT, Speed Brain, Early Hints if not already.
Cloudflare Fonts is a deferred experiment (potential CSP tightening, uncertain due to `@import`).

### Caching

Key fact: **Workers scripts override zone cache rules.** Caching is code-defined — the Worker's
`Cache-Control` on `/api/*` and Workers Assets' automatic hashed-asset caching win over this tab.
So most settings have limited effect; one can actively fight the Worker's headers if misconfigured.

| Setting                                       | Set to                                | Notes                                                                                                                                                                                                              |
| --------------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Browser Cache TTL**                         | **Respect Existing Headers (verify)** | If set to a fixed value it clobbers the Worker's tuned `max-age`/`s-maxage`/`stale-while-revalidate` on the widget APIs. "Respect Existing Headers" defers to the Worker. The one setting that can harm the setup. |
| Caching Level                                 | Standard (default)                    | Moot for Workers, but correct. Don't change.                                                                                                                                                                       |
| Always Online                                 | ON (default, leave)                   | Archive.org fallback if origin unreachable; "origin" is CF edge, rarely triggers. Harmless.                                                                                                                        |
| Tiered Cache (Smart)                          | ON (free, optional)                   | Minor cache-hit benefit for a small Workers-Assets SPA. No downside.                                                                                                                                               |
| Crawler Hints                                 | ON (optional)                         | Tells crawlers when content changed. Minor, harmless.                                                                                                                                                              |
| Cache Rules                                   | none                                  | Worker overrides them; caching logic already in code. Adding = weaker second source of truth.                                                                                                                      |
| Purge Cache                                   | action, not a setting                 | Use after deploy if stale; `?cb=` buster already covers verification.                                                                                                                                              |
| Cache Reserve / Argo / custom Tiered topology | n/a                                   | Paid.                                                                                                                                                                                                              |

**Net: verify Browser Cache TTL = Respect Existing Headers.** Everything else default-correct or
overridden by the Worker. Tiered Cache/Crawler Hints optional, harmless.

### Workers Routes

**Set to: leave dashboard untouched — `wrangler.jsonc` is source of truth.** Custom domains
(`noahpn.dev`, `www.noahpn.dev`) + disabled `workers.dev` all defined in code. Don't hand-edit.

**Finding:** both apex and `www` serve the SPA with **no canonical redirect** = duplicate content,
split SEO signal. Apex is canonical (branding + security.txt). Fix: 301 `www` → apex, done in the
Worker (see code review). This is the one real improvement across Workers Routes / Rules / Network.

### Rules

All empty, should stay empty — routing/headers/caching all live in code (correct, version-controlled).

| Rule type                               | Set to | Notes                                                               |
| --------------------------------------- | ------ | ------------------------------------------------------------------- |
| Page Rules                              | none   | Legacy; superseded by Worker/modern rules.                          |
| Redirect Rules                          | none   | www→apex handled in Worker instead (alt: one Single Redirect here). |
| Transform Rules                         | none   | Headers set in `_headers` + Worker.                                 |
| Configuration / Origin Rules / Snippets | none   | No origin; nothing to override.                                     |

### Network

All defaults, all correct — nothing to change.

| Setting            | Set to            | Notes                                                       |
| ------------------ | ----------------- | ----------------------------------------------------------- |
| HTTP/2             | ON (always-on)    | —                                                           |
| HTTP/3 (QUIC)      | ON                | Same toggle as Speed; confirm once.                         |
| 0-RTT              | ON                | Safe; GET/HEAD-only Worker.                                 |
| IPv6 Compatibility | ON (default)      | Broadens reach, edge-handled.                               |
| WebSockets         | ON (default)      | Unused but harmless.                                        |
| Onion Routing      | ON (default)      | Serves Tor users; harmless.                                 |
| gRPC               | ON (default)      | Unused; harmless.                                           |
| Pseudo IPv4        | Off/default (n/a) | Bridges IPv6→IPv4 _origins_; no origin here, so irrelevant. |
| IP Geolocation     | ON (default)      | Adds `CF-IPCountry`; harmless.                              |

**Net (all three tabs): one improvement — add www→apex 301 in the Worker.** Everything else is
code-managed or default-correct.

## Code review — 2026-07-23

Reviewed `public/_headers`, `public/robots.txt`, `worker/index.js`, `wrangler.jsonc`. Already strong
(CSP identical across `_headers` and Worker, full error handling, method guard, RFC 9116 security.txt).

**Changes applied (need deploy):**

- `worker/index.js` — **www→apex 301 redirect** at the top of `fetch()` (`url.hostname.startsWith("www.")`),
  preserving path + query, wrapped in `withSecurityHeaders`. Fixes the duplicate-content/canonical gap.
- `worker/index.js` — **`json()` now defaults to `Cache-Control: no-store`** so transient error
  responses (502/500/405) aren't cached; success handlers still override with their tuned values.
- `public/robots.txt` — rewritten for the AI training opt-out (see AI Crawl Control audit).
- `wrangler.jsonc` — `assets.run_worker_first: true` so the Worker runs before asset serving
  (required for the www→apex redirect to fire on the root; see "www redirect" note below).

**Optional / not applied (noted for consideration):**

- **CSP sync risk** — the CSP string is duplicated in `_headers` and `worker/index.js` and must be kept
  identical by hand. Inherent to the static/dynamic split; acceptable, just remember when editing either.
- **Cross-Origin-Resource-Policy: `same-origin`** — could add to both header sets as defense-in-depth
  (limits other origins embedding your resources). Marginal for a portfolio; COEP is intentionally _not_
  added (it would break the broad `img-src https:` widget artwork). Skipped to keep changes focused.
- **`wrangler.jsonc` `$schema`** — could add `"$schema": "node_modules/wrangler/config-schema.json"`
  for editor validation/autocomplete. Cosmetic.
- **security.txt `Expires`** — still `2027-07-23`; bump before then (existing dated reminder).

**Re-verify after deploy:** `curl -sI https://www.noahpn.dev/` returns `301` → `https://noahpn.dev/`;
widgets still render; error responses carry `Cache-Control: no-store`.

**www redirect — root cause + real fix (2026-07-23):** after first deploy, `www.noahpn.dev/` still
returned `200`, not the 301, while `/verify-redirect-<ts>` correctly returned 301. **Not a cache problem.**
Root cause: Workers Static Assets use **asset-first routing** by default — a request matching a real
asset (like `/` → `index.html`) is served directly and the Worker is _skipped_, so the redirect never
ran for the root or other asset paths. Verified against CF docs (static-assets/routing/worker-script).
**Fix applied:** `wrangler.jsonc` `assets.run_worker_first: true` — Worker now runs on every request
before asset serving, so the redirect fires for `/` too. The default route still delegates to
`env.ASSETS.fetch()`, so assets serve as before (now also carrying the Worker's security headers, which
unifies the previously dual-sourced CSP). Overhead: one Worker invocation per request — negligible at
this traffic. **Needs redeploy.** After deploy, purge once (`https://www.noahpn.dev/`) to clear the old
cached 200, then verify `curl -sI https://www.noahpn.dev/` → 301. Caveat: `?cb=` can't bust the HTML
root (Assets normalizes the query string in the cache key) — verify via an uncached path or a real purge.

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
