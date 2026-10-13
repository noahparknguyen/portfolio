# Security policy

## Reporting a vulnerability

Please report security problems privately: open the repository's **Security** tab and choose
**Report a vulnerability**. Please don't open a public issue for them.

Say what you found, which page or address it affects, and how to reproduce it. I'll reply as
soon as I can.

## Supported versions

Only the live site at [noahpn.dev](https://noahpn.dev) is fixed. It's deployed from `main`.

## What the site does

The site is static pages served by a Cloudflare Worker. The Worker answers four read-only
endpoints under `/api/`, for Spotify, Steam, GitHub, and the weather, each with fixed
parameters. It holds the API keys, so the browser never sees them. It accepts only `GET` and
`HEAD` requests, sets no cookies, and stores nothing about visitors.
