# Third-party notices

This site's own code is MIT — see [`LICENSE`](../LICENSE). This file covers
everything it depends on, displays or redistributes. Some of these are
**obligations** rather than courtesies, and those are marked.

The short version of what's required: Font Awesome is CC BY 4.0, Open-Meteo's
data is CC BY 4.0, and Spotify requires its mark on anything it supplies. All
three are credited on the site's Colophon, not only here.

## Fonts — loaded from Google Fonts, not redistributed

All four are under the **SIL Open Font License 1.1** (confirmed present under
`ofl/` in the `google/fonts` repository). They are served from
`fonts.gstatic.com` rather than committed here, so the OFL's
"licence must travel with the font" clause binds Google as the distributor, not
this repository. Listed anyway, because the designers deserve naming.

| Font           | Designers                               | Licence     |
| -------------- | --------------------------------------- | ----------- |
| **Fredoka**    | Milena Brandão, Hafontia                | SIL OFL 1.1 |
| **Nunito**     | Vernon Adams, Cyreal, Jacques Le Bailly | SIL OFL 1.1 |
| **Lilita One** | Juan Montoreano                         | SIL OFL 1.1 |
| **Caveat**     | Impallari Type                          | SIL OFL 1.1 |

If a font is ever vendored into this repo, its `OFL.txt` has to come with it —
that is the point at which the clause starts binding us instead of Google.

## Icons — bundled into the shipped bundle

| Set                                         | Used for                       | Licence                                                                               |
| ------------------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------- |
| **Simple Icons**                            | Most brand glyphs              | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) — no attribution needed |
| **Font Awesome 6 Free** (`react-icons/fa6`) | Java, Steam and LinkedIn marks | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) — **attribution required**  |

`react-icons` is MIT, but it is a wrapper: its own LICENSE says "Icons are taken
from the other projects so please check each project licences accordingly."
Font Awesome Free is therefore CC BY 4.0 and **must** be credited on the site,
which is why it appears in the Colophon and not only in this file.

LinkedIn is the reason a Font Awesome glyph is used at all: Simple Icons removed
the LinkedIn mark at the rights holder's request, so it cannot come from there.

## Live data — fetched at runtime through this site's Worker

| Source                                           | What                                       | Terms                                                          |
| ------------------------------------------------ | ------------------------------------------ | -------------------------------------------------------------- |
| [Open-Meteo](https://open-meteo.com)             | Ottawa temperature and condition           | **CC BY 4.0 — attribution required.** Credited on the Colophon |
| [Spotify Web API](https://developer.spotify.com) | Current track, artist, album, cover art    | **Attribution required.** See below                            |
| [Steam Web API](https://steamcommunity.com/dev)  | Recently played game, playtime, header art | Valve API Terms of Use                                         |
| [GitHub REST API](https://docs.github.com/rest)  | Recent commit messages for the devlog      | No attribution required                                        |

### Spotify — a live obligation, not a courtesy

Spotify's Developer Policy: _"If you display any Spotify Content you must
clearly attribute the content as being supplied and made available by Spotify,
by using the Spotify Marks."_ Their design guidelines add that metadata
_"must always link back to the Spotify Service."_

The widget displays track name, artist, album and cover art, so both apply. It
carries the Spotify mark and a link back to Spotify on every render, including
when the API returns no track url of its own. **Don't remove either**, and don't
recolour the mark — `--color-spotify` exists so it stays Spotify green rather
than being pulled onto the site's `ink`, which their guidelines forbid.

### Steam

Valve, Steam, the Valve logo and the Steam logo are registered trademarks of
Valve Corporation. This site is not affiliated with or endorsed by Valve. Game
header artwork is served from Steam's own CDN and belongs to its publisher.

## Images

| Asset                                                                | Source                                       | Terms                                             |
| -------------------------------------------------------------------- | -------------------------------------------- | ------------------------------------------------- |
| `bg-pinksky.jpg`                                                     | Royalty-free wallpaper, found via PixelStalk | Royalty-free                                      |
| `ottawa-skyline.webp`                                                | Meli Julianti, via KindPNG                   | Credited on the Colophon                          |
| `noah-candid.webp`, `noah-headshot.webp`                             | Sweet Dreams Photo Studio                    | Commissioned photographs, used with permission    |
| `canada-map.svg`, `flag-canada.svg`, `flag-bc.svg`, `maple-leaf.svg` | Wikimedia Commons                            | Public domain                                     |
| `logo-algonquin.webp`                                                | Algonquin College                            | Used per the college's published brand guidelines |
| `statmon-compare.webp`, `hubspot-report.webp`                        | Screenshots of my own projects               | Mine                                              |

Favicons, the OG image and everything in `public/` are mine.

## Game assets — unofficial fan use

Four small decorative cameos are copyrighted game art, used at thumbnail size as
personal, non-commercial fan references. They are not licensed, and no
endorsement is implied or claimed. Each is credited by rights holder on the
Colophon.

| Asset                                                                        | Game                 | Rights holder      |
| ---------------------------------------------------------------------------- | -------------------- | ------------------ |
| `celeste-madeline.gif`, `celeste-madeline-portrait.gif`, `celeste-seal.webp` | Celeste              | Extremely OK Games |
| `hk-the-hollow-knight-and-knight.webp`                                       | Hollow Knight        | Team Cherry        |
| `monkey-ball-aiai.gif`                                                       | Super Monkey Ball    | SEGA               |
| `tboi-thumbs-up.gif`                                                         | The Binding of Isaac | Edmund McMillen    |

If any rights holder would rather these came down, they come down.

## Runtime dependencies — compiled into the shipped bundle

Not redistributed as files, but their code ends up in `dist/client/assets/*.js`,
and MIT asks for its notice to travel with substantial portions. Minifiers drop
the banners, so this is where they live.

| Package                        | Licence                                            |
| ------------------------------ | -------------------------------------------------- |
| react, react-dom               | MIT                                                |
| tailwindcss, @tailwindcss/vite | MIT                                                |
| react-icons                    | MIT (see Icons above for the icon sets themselves) |
| simple-icons                   | CC0 1.0                                            |

Build-only tooling (Vite, ESLint, Wrangler) ships nothing to the browser and is
not listed.

## Brand marks

Every brand glyph on this site names a product or service, and each mark remains
the trademark of its owner. They are used to identify the thing they name and
imply no affiliation or endorsement.
