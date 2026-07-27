# Style Guide

The locked visual spec for the site. Everything here is driven by tokens in
`src/index.css` (`@theme`) so changes cascade — never hardcode a hex or a
one-off size; add or reuse a token instead.

## Personality

A cosy **sky-pastel bulletin board**: hard-bordered solid panels pinned over
the pink sky, like notices pinned to a comic-panel board — some panels flat
and printed, others handcrafted objects (a taped-up photo, a wax-stamped
letter, rotated paper stamps) pinned on top of them. Deep sky-indigo linework,
square corners, rounded playful type, and a few bright accents pulled straight
from the sky photo. Opaque and chunky — a modern take on the old web, light
and cool, never childish.

---

## Color

Custom hex, defined under `@theme`, usable as normal utilities (`text-ink`,
`border-ink`, `bg-primary-soft`, …).

### Base (neutrals + text)

| Token                  | Value     | Name             | Use                                    |
| ---------------------- | --------- | ---------------- | -------------------------------------- |
| `--color-ink`          | `#3D3660` | deep sky-indigo  | Borders, headings, primary text        |
| `--color-primary`      | `#CDC4EE` | cool lilac       | Pastel fill (buttons/chips) — not text |
| `--color-primary-soft` | `#ECEAF8` | lavender-white   | Masthead/footer band fill (opaque)     |
| `--color-label`        | `#625AA0` | cool periwinkle  | Small-caps / eyebrow accent **text**   |
| `--color-on-ink`       | `#F4F2FB` | cool off-white   | Primary text on ink (dark) fills       |
| `--color-on-ink-muted` | `#B9B2D6` | muted periwinkle | Secondary/inactive text on ink fills   |

Body copy uses neutral grays — `gray-700` for primary paragraphs, `gray-600` for
secondary/meta; headings and values are `ink`. Never `gray-500` on the panels
(drops below AA on the board fill).

### Sky accents (one per section)

**Golden rule: accents live in fills, borders, underlines, and the wordmark
gradient — never as body text.** That's why they can stay bright without failing
contrast; all readable text stays `ink`.

| Token            | Value     | Section   | Soft tint (chips)     |
| ---------------- | --------- | --------- | --------------------- |
| `--color-rose`   | `#F58FBE` | Home      | `--color-rose-soft`   |
| `--color-violet` | `#9E8FD0` | About     | `--color-violet-soft` |
| `--color-blue`   | `#9DBEE6` | Now       | `--color-blue-soft`   |
| `--color-orchid` | `#C56BB8` | Creations | `--color-orchid-soft` |

Each section owns its hue as the underline under its title and as its active
nav-link underline. Soft tints (`*-soft`) are for filled chips/cells with `ink`
text on top. Section color is always paired with a text label — never the sole
signal.

### Handcrafted accents

A small second palette for the pinned-object layer (see **Handcrafted layer**
below) — not tied to a section, used for material and mood instead:

| Token           | Value     | Name            | Use                                                                                |
| --------------- | --------- | --------------- | ---------------------------------------------------------------------------------- |
| `--color-paper` | `#FBF3E9` | warm note-paper | Note-paper cells (the Welcome letter, the Devlog scroll box)                       |
| `--color-kraft` | `#B98A5E` | kraft           | Devlog's/Steam's ruled lines — never text                                          |
| `--color-live`  | `#E24B4A` | record/live red | Live Reaction REC cue; Steam's date-stamp borders (never text — see Accessibility) |

### Icon glyphs

Brand hexes are not used anywhere on the site. `SimpleIcon` (shared by `TechStack` and the
footer `Badge`s) renders every `simple-icons` glyph with `fill="currentColor"`, and
`TechStack`'s Java glyph (`FaJava`, since simple-icons has no Java mark) is `text-ink` too —
both inherit the ordinary `ink` text color like any other icon, so they read cleanly against
the varied soft-tint fills instead of going muddy against them.

---

## Type

Four families, each with a job. Loaded from Google Fonts in `index.css`.

- **Fredoka** (`font-display`) — headings. Rounded, friendly; the site's voice.
- **Nunito** (`font-sans`, the default) — body, labels, small text.
- **Lilita One** (`font-wordmark`) — the name in the banner **only**. A logotype,
  not a heading font.
- **Caveat** (`font-hand`) — handwritten accents **only**: signatures,
  polaroid/photo captions, tech-stamp hover notes, and date-stamp captions
  (an achievement's "Unlocked · …" line). Never body copy.

Base rules set `body` → Nunito and `h1`–`h3` → Fredoka, so components rarely set
a family.

### The scale (role → size)

Pick the size from the **role**, not the heading tag (see the semantics note).

| Role              | Class       | Font    | Weight   | Where                           |
| ----------------- | ----------- | ------- | -------- | ------------------------------- |
| Wordmark          | `text-5xl`  | Lilita  | —        | Banner name (the one outlier)   |
| Title             | `text-3xl`  | Fredoka | bold     | Section titles                  |
| Heading           | `text-xl`   | Fredoka | semibold | Subsections (e.g. "Journey")    |
| Subheading / card | `text-lg`   | Fredoka | semibold | Card titles                     |
| Nav link          | `text-lg`   | Fredoka | bold     | Nav bar                         |
| Body              | `text-base` | Nunito  | normal   | Paragraphs                      |
| Small / meta      | `text-sm`   | Nunito  | normal   | Secondary text, captions        |
| Overline / kicker | `text-xs`   | Nunito  | semibold | Eyebrows, tiny uppercase labels |

Overlines add `uppercase tracking-wide`. That's the whole set — seven sizes. If
something needs a size not on this list, it probably belongs to an existing role.

These roles are canonicalized as code, not just convention: the Overline role is
the `eyebrow` utility (`@utility eyebrow` in `src/index.css`) / the `<Eyebrow>`
primitive, and the Title role is the `<SectionTitle>` primitive (see
Primitives). Don't re-type either role's class string inline — use the
utility/primitive.

Handwritten (`font-hand`) accents and `font-mono` readouts (the REC label, the
Weather postcard's stamp caption and postmark) sit outside this scale on
purpose — see **Handcrafted layer** — but still pick from the same handful of
sizes used elsewhere on the page (`text-xs`–`text-2xl`) rather than an
arbitrary one-off value.

### Stat / readout role

One more named role: a large numeric readout, `text-3xl font-display font-bold`
(Weather's temperature) — the same size as Title, but a distinct role (a live value, not a
section heading), so reusing that size here is intentional, not drift.

### Weight rule

Only three weights are on-scale: `normal`, `semibold`, `bold`. Overlines and
headings/cards (Heading, Subheading/card roles) are `semibold`; Title and Nav
link are `bold`; Body and Small/meta are `normal`. `font-medium` is off-scale —
don't use it.

### Heading semantics vs. size (important)

Heading **level** is for document structure; **size** comes from the scale above.
They are independent — a `<h3>` card title and a `<h3>` overline are both valid.
The page outline is fixed:

- `h1` — the banner name (one per page).
- `h2` — the active section's title.
- `h3` — subsections and card titles inside a section.

Never add a second `h1`. Keep levels in order (no skipping). Not every
`<Eyebrow>` is a heading — a genuine card title (Devlog's "Most recent
updates", Links' "Get in Touch") stays the default `<h3>`, but a decorative status label sitting
next to a value (Weather's "Ottawa", Spotify's "Now Playing"/"Paused", Steam's
"What I've been playing") should pass `as="p"` / `as="span"` so it doesn't
register as a heading. About's `h2` lives **inside the passport** — on the
opaque ID page, not a title floating separately above it — the passport's
chapter title (e.g. "Bio") is the section's `h3`.

---

## Shape & surface

- **Corners:** square for every rectangle — panels, cells, chips, badges,
  frames. The one exception is small **round, non-rectangular** accents (the
  pushpin, the Spotify record disc, small round accent dots) — see
  **Handcrafted layer**. Rounded rectangles are still off-limits.
- **Borders:** `border-4 border-ink` for the masthead/footer bands (heavier,
  so they read as a solid pinned frame); `border-2 border-ink` for panels/
  cells/pinned cards; `border border-ink` for chips/pills; `border-b-4
border-<section hue>` for the accent underline under a section title.
- **Surface:** opaque, never transparent — no `backdrop-blur` anywhere; every
  card sits flat and solid, but the sky now shows _through_ the layout too —
  in the gaps between Home's pinned cards and behind `main` generally, not
  just the side margins (see Layout). Fill color is **not** uniformly white,
  though: see intentional panel-color variation below.
- **Pinned objects on the sky, not a touching grid.** Home's default model:
  each widget is its own opaque object — most wrapped in the `PinnedCard`
  primitive (`border-2 border-ink`, `shadow-sticker`, and — on compact objects
  — a slight `rotate`; wide panels stay level, see Rotation below), some bare
  where the widget's own fill already does the
  work (see "Text never sits directly on the sky" below). Nothing stretches
  to fill its row — Home is a **bento of rows** (see Layout), so every widget
  keeps its own deliberate width and natural height. The
  touching-cell mechanic still exists for **internal
  folds**, not page layout: `Panel` (`bg-ink` + `gap-0.5`) and `Cell` build a
  group of cells that butt together with a single `2px` ink rule, used by
  About's passport fold.
- **Text never sits directly on the sky.** Every run of text rides an opaque
  surface that is itself a discrete pinned object sized to the text — a title
  **sign** (`SectionTitle`, on the passport's opaque page), a label **tag**
  (`LabelTag`, wrapping a heading/`<Eyebrow>` — "My current toolset", "What
  I'm listening to", "Get in touch", "Most recent updates", "Where I've
  Worked", "What I've Achieved"), or a
  **note** (the work-timeline entries, each on its own small bordered
  `shadow-sticker` card beside its stamp). **Non-text decorative objects**
  (tech stamps, Links' sticky-notes, the taped photo) stay bare on the sky —
  they're already opaque and aren't read. Don't fix legibility by filling a
  big background behind unrelated items; give the _words_ their own small
  object and let everything else float free.
- **Intentional panel-color variation.** Cards are not required to be uniformly
  white — Home and About mix tints so each object reads as its own thing pinned
  to the sky. Two fills are reserved and carry meaning: `paper` for warm
  stationery (the Welcome note, the Weather postcard, the Devlog scroll) and
  plain white for objects that are literally white (the polaroid, Steam's
  library card, About's passport). Everything else that reads as a pinned note
  or stamp draws its fill from the **four section soft tints** (`rose-soft` /
  `violet-soft` / `blue-soft` / `orchid-soft`): the tech stamps (each a
  different hue), the Spotify card (`orchid-soft`), Links' sticky-notes, Now's
  stickies, and About's work-timeline note cards and diploma card. The Live
  Reaction cam keeps its dark `ink` fill. Not everything is a filled
  `PinnedCard`, though — the photo, the tech stamps, Links' sticky-notes, the
  Devlog scroll, and Steam's library card sit bare/unenclosed on the sky (see
  "Text never sits directly on the sky" above), their own fills doing the work
  without an outer card. **Rules for the tint layer:** draw only from the four
  accents (never `paper`, which is reserved), spread the hues evenly, and never
  let two of the same touch — a work note never repeats its own acronym badge,
  and adjacent tech stamps differ. Headers stay on the standard `ink` / `label`
  / `on-ink` roles regardless of a card's tint (switching to `on-ink` only
  where the fill itself is dark, e.g. the Live Reaction label bar) — the
  variation is in the fill, not the text. The touching-cell grid (About's
  passport) stays plain white.
- **Shadows:** `shadow-sticker` (`@utility` in `src/index.css`, a hard
  `4px 4px 0 0` ink offset with no blur) is the **only** shadow on the site,
  but it's no longer a narrow exception — it's the standard depth cue for
  every pinned object: all of Home's `PinnedCard`s carry it by default, the
  masthead and footer bands carry it too (so the stable frame matches the
  pinned-object depth used everywhere else), plus the rest of the handcrafted
  layer (see below for exactly where). The touching-cell group (About's
  passport) stays flat with no shadow — the ink seam is their depth
  cue instead.
- **Gradients:** one exception — the banner wordmark uses a soft sky gradient
  (blue → violet → pink) via background-clip text, with a `2px` ink outline
  painted _behind_ the fill (`-webkit-text-stroke: 2px` + `paint-order: stroke
fill`) so the gradient stays clean on top. The gradient stops are token-driven
  (`--color-wordmark-from` / `-via` / `-to` in `@theme`), not hardcoded hex. No
  other gradients.

### Handcrafted layer

A deliberate second grammar layered on top of the flat bulletin-board base,
used for objects that read as physically pinned/taped/stamped onto a panel
rather than printed on it:

- **`shadow-sticker`** (see Shadows above) — applied by default on every Home
  `PinnedCard`, plus the photo polaroid, Steam's library card, the Devlog
  scroll box, the footer badges, the Links post-its, the masthead/footer
  bands, Row 3's AiAi GIF cameo, and the tech stamps at rest too (not
  hover-only, and including TechStack's decorative, non-interactive Isaac
  stamp) — the interactive stamps additionally lift (`-translate-y`) on
  hover/focus as an interaction cue on top of their resting shadow; Isaac's
  stamp lifts on hover only, having no focus state to cue.
- **Slight rotation.** Compact objects carry a small `rotate-[n deg]` so they
  read as hand-placed rather than machine-aligned — the photo polaroid, the
  acronym badges, the tech stamps (including TechStack's decorative Isaac
  stamp), the Links post-its, Now's stickies, the small `LabelTag` signs,
  Row 3's AiAi GIF cameo, and card-sized widgets (Spotify, Weather, the
  diploma, the Live Reaction cam). **Tilt is governed by width and
  edge-proximity, not by how much text an object holds** — the visible skew of
  a fixed angle grows with an object's width, and a tilt next to a straight
  reference line reads as an error rather than character. So **wide or
  full-width panels, and anything stacked against a straight edge, stay level
  (0°)**: the Welcome letter, the Now intro card, the Colophon card, and the
  work-timeline note strips (they line up against the timeline's vertical
  spine — their acronym badges stay tilted, so the character lives in the small
  tag pinned to a level note). Keep tilts small (≤ ~3°, and ≤ ~1.5° on anything
  wider than a compact card), vary the direction per object so a row doesn't
  look mechanically repeated, and never overdo it.
- **Tape, pins, and stamps.** `<Pin>`, `<Tape>`, and `<Stamp>` (in
  `src/components/ui/`) are small decorative primitives — a pushpin, a washi-
  tape strip, and the Celeste postage-stamp image — that reinforce the
  pinned-to-a-board metaphor. All are `aria-hidden`, purely decorative.
- **`--color-paper`** — warm note-paper stationery, used for the Welcome cell
  and the Devlog scroll box.
- **`--color-kraft`** — a warm material accent used for the Devlog's and
  Steam's ruled lines — never used as text.
- **`--font-hand` (Caveat)** — signatures, photo captions, the tech-stamp
  hover notes (the note itself rides a small opaque `border-2 border-ink
bg-white shadow-sticker` tag so it reads over the sky), and handwritten
  date-stamp captions (an achievement card's "Unlocked · …" line); never body
  copy (see Type).
- **`--color-live`** — the Live Reaction cam's REC cue, and the border (never
  the text — see Accessibility) of Steam's decorative library-card date
  stamps.
- **Inline SVG stroke-width scale.** Three tokens: `--stroke-fine` (`1.5`,
  hairlines/rings/sub-16px detail), `--stroke-regular` (`2`, default line-art
  icons 16–40px), `--stroke-bold` (`2.5`, heavier affordances). Applied via
  `style={{ strokeWidth: "var(--stroke-…)" }}` so glyphs share one source of
  truth. About's passport-nav `Chevron` is the sole exception, at `3` — thinning
  it to `--stroke-bold` visibly weakens the arrows, so it stays a literal,
  documented one-off.
- **Decorative-opacity scale.** `--opacity-watermark` (`0.1`, the About maple-leaf
  watermark), `--opacity-watermark-strong` (`0.3`, the About canada-map
  watermark), `--opacity-accent-line` (`0.5`, the banner's corner hairlines),
  `--opacity-groove` (`0.3`, both Spotify vinyl groove rings). Like the stroke scale,
  these are applied via inline `style={{ opacity: "var(--opacity-…)" }}` (or
  `strokeOpacity` for the vinyl rings) — Tailwind v4 only generates utilities from
  `--color-*`, so a class like `opacity-watermark` is silently inert.
- **Round, non-rectangular shapes** are allowed here even though rectangles
  stay square-cornered everywhere (see Corners above) — the pushpin, the
  Spotify record disc, the Weather postcard's postmark ring, small round
  accent dots (the REC indicator, the banner's flanking dots), and the
  achievement cards' circular logo bezel (and its matching "Locked"
  placeholder circle).

---

## Spacing scale

- **Grid gap:** `gap-0.5` (2px) for the touching-cell grid (About's passport)
  — never `gap-[2px]`. Pinned-object grids (Home) use a real gap
  instead — `gap-5` — so the sky shows between cards. Within a widget:
  `gap-4` for sub-groups (a badge grid, a stack of link cards), `gap-3` for an
  icon beside its text, `gap-2` for tight inline groups. **Section gap:**
  `gap-8`, for major separation between whole blocks within a section (About's
  Passport / WorkTimeline / Achievements stack).
- **Cell padding:** `p-6` for roomy/section cells, `p-4` for compact widget
  cells, `p-3` for a small card or note (a work-timeline entry), `p-2` for a
  stamp/mini object (the photo polaroid, a tech stamp), `p-0` for full-bleed
  cells. No `p-8`, and no one-off pairs like `px-6 py-2`.
- **Vertical rhythm:** `mt-0.5` for tight meta stacking (a value under its
  label), `mt-2` (eyebrow/label → content), `mt-4` (within a block), `mt-6`
  (large separation). `mt-3` is retired — use `mt-2` or `mt-4`. Home's outer
  wrapper uses `py-3` as its section top/bottom padding (equivalent to, and
  replacing, a `pt-3 pb-3` pair).
- **Documented exceptions.** A few widget-internal values sit off this scale
  on purpose, kept as-is because changing them would shift pixels on an
  already-approved Home/About layout rather than just tidying notation:
  Steam's date-due block (`mt-5`, `pb-2.5` — its own tighter due-slip rhythm)
  and its rubber-stamp chips (`px-2 py-0.5` — a compact stamp padding, the same
  off-scale chip class as `LabelTag`'s `px-3 py-1`, not a cell-scale value, so
  the "no one-off `px`/`py` pairs" rule above doesn't apply to it); and a
  recurring **tight caption-under-label** micro-pattern
  at `mt-1` (2px tighter than the canonical `mt-2`) — TechStack's badge label
  and hover-note offset, the About passport's "TYPE P · CAN" chip and its Bio
  signature rule, and Weather's "OTTAWA, ON" caption and Postmark clock line.
  Devlog's git-graph spine is a further exception: `left-1.75` / `top-1.25` /
  `pb-3.5` are exact pixel math tying each commit node to the vertical spine
  line and to its neighbor's rhythm — load-bearing, not a rounding error.
  Separately, `max-w-[..]` / `w-[..]` fractions (Steam's `max-w-[85%]` title
  truncation, Credits' sign-off `w-[60%]`) aren't spacing-scale values at all —
  they're the same class of intentional per-widget **layout width** as Home's
  `md:w-[65%]` row splits, not something this scale governs.

---

## Composition may vary — the grammar doesn't

Panels are not required to be internally identical. The **grammar** is fixed and shared by
every panel: square corners on rectangles, `ink` linework, opaque token fills, the type scale,
accents in fills/borders/underlines (never as body text), and the accessibility rules. Within
that grammar a panel's **composition** may vary to suit its content — framed vs. full-bleed
imagery, where a stat or eyebrow sits, whether it belongs to the flat base layer or the
handcrafted layer, internal spacing and rhythm. Variety in composition is welcome (it suits the
bulletin-board character); variety in the grammar is not. When in doubt, keep the grammar and
change the layout.

Examples: the Live Reaction cam sits in its own bordered, `shadow-sticker`,
tilted `PinnedCard` but stays full-bleed _inside_ it — an edge-to-edge ink
label bar over a square image, no inner padding; Steam is a library checkout
card — a full-bleed header-art banner on top (its title label overlaid in
ink), a date-due slip below with an hours-logged rubber stamp and decorative
red date stamps on kraft-ruled lines; Weather is an Ottawa postcard — a
full-width skyline silhouette, a dashed-border postage stamp holding the
condition glyph, and a line-art postmark ring carrying the live clock. The
Devlog panel is a fixed-height scroll region — a git-graph timeline with a
full-height ink spine and rose square nodes per commit, scrolled with a
custom chunky scrollbar (`.devlog-scroll`, built from the `ink` / `primary` /
`primary-soft` tokens) — an intentional styled element, not the default UI
scrollbar. All obey the same grammar.

---

## Interaction

- **Cursor:** all `<button>`s get `cursor: pointer` via a base rule (Tailwind v4
  no longer defaults this). Real `<a>` links get it natively.
- **Focus:** every focusable element shows a `:focus-visible` outline —
  `2px solid currentColor` with `2px` offset. `currentColor` means it's dark on
  the light panels and light on the dark nav bar automatically. Never remove it.
  Handcrafted objects that lift on hover (tech stamps, Links cards) mirror the
  same lift on `:focus-visible`, so keyboard users get the same feedback as a
  mouse hover.
- **Hover:** links/nav brighten toward `ink` / `on-ink`; linked cards shift their
  fill from white to a faint cool tint (`hover:bg-primary-soft`). Use
  `transition-colors`, nothing flashy.
- **Active nav:** the current link is `on-ink` (off-white) with its section-hue
  underline and `aria-current="page"`; inactive links are `on-ink-muted`.

---

## Accessibility (non-negotiable)

- **Contrast — all AA (4.5:1 normal, 3:1 large). Measured on the worst-case
  opaque fill: the `primary-soft` masthead/footer bands are darker than the
  white notes, so they're the worst case for any text sitting directly on
  them (banner, footer):**

  | Pair                                    | Ratio   |
  | --------------------------------------- | ------- |
  | `ink` text on panels                    | ~9.3:1  |
  | `gray-700` body on white note           | ~10.3:1 |
  | `gray-600` meta on masthead/footer band | ~6.4:1  |
  | `label` on masthead/footer band         | ~5.1:1  |
  | `on-ink` on the nav bar                 | ~10:1   |
  | `on-ink-muted` on the nav bar           | ~5.5:1  |

  This also holds on the tinted cells (`paper`/`rose-soft`/`blue-soft`/
  `violet-soft`/`orchid-soft`) — they're all light enough that `ink`/`gray-700`/
  `gray-600` text keeps AA (`gray-600` on the darkest of them, `orchid-soft`,
  measures ~5.3:1); never drop a darker accent color in as a fill
  behind body text without rechecking. Icon glyphs (`SimpleIcon`, the footer
  `Badge`s, `TechStack`'s Java glyph) render in plain `ink`, not brand color, so
  they're already AA-safe against every tint with no per-icon hue check needed.

- **Landmarks:** `<header>` (banner), `<nav aria-label="Primary">`, `<main>`,
  `<footer>`. One `<main>` per page.
- **Headings:** single `h1`, ordered levels (see semantics note).
- **Images:** every `<img>` has meaningful `alt` (decorative-only images get
  `alt=""`).
- **State not by color alone:** the active nav link also carries `aria-current`
  and bold weight; section identity is also in the title text.
- **Images stay crisp:** never render a raster above native size (`max-w` caps
  only; no upscaling).
- **Motion:** CSS animations — `animate-vinyl` (the Spotify record spins while
  a track is playing), `animate-blink` (the Live Reaction REC dot),
  `animate-marquee`, and `animate-eq` — always play, by design; small and
  decorative, this intentionally does not honor `prefers-reduced-motion`, the
  same deliberate choice as the site's small decorative GIF cameos (the Live
  Reaction cam and footer mascot, both Celeste; Row 3's AiAi GIF; and
  TechStack's closing Isaac stamp), which are likewise a deliberate exception
  and keep playing; keep any GIFs small and non-essential. The marquee's soft
  horizontal edge fade (a mask-image, fading into the white panel — not the
  sky — applied only while scrolling) is an allowed exception to the
  opaque-panel / hard-linework grammar, alongside the wordmark gradient.
  Tailwind's built-in **`animate-pulse`** is the one allowed loading shimmer —
  used on the Spotify/Steam/Devlog/Weather skeleton states while a live widget
  is still fetching — a transient, self-limited state rather than a permanent
  decorative loop, but grouped with the same accessibility exception above
  since it likewise doesn't gate on `prefers-reduced-motion`.

---

## Layout

One centered `max-w-3xl` column over a fixed full-screen `bg-pinksky` backdrop.
The column is a **masthead band**, a **sky well**, and a **footer band**,
stacked with `gap-4`: `Banner` + `Header` (nav) sit in a solid `border-4
border-ink bg-primary-soft` band on top, `Footer` sits in an identical band on
the bottom — these are the stable frame on every page — and between them
`main` (the active section) is **transparent**, so the fixed pink sky shows
through behind the content, not just in the side margins. Home's widgets are
pinned directly to that sky; About/Now/Creations render their own bordered
panels on top of it.

**Home is a bento of rows, not a rigid grid** — a `flex flex-col gap-5`
stack. Each row is `flex flex-col gap-5 md:flex-row md:items-center
md:justify-between` (stacked on mobile; side-by-side, vertically centered,
and hugging the row's edges on `md+`, so a shorter widget sits centered
against a taller neighbour instead of pinned to its top). Each widget sits in
a `min-w-0 md:w-[N%]` wrapper — a fixed percentage gives it a **deliberate
width**, not a flex ratio. The four rows: Welcome (65%) + the photo (30%);
Live Reaction (20%) + the Weather postcard (45%) + Links (30%) — three
widgets, not a pair; then Steam (40%) beside a grouped column (55%) — the
Spotify card, with the AiAi GIF cameo framed beside it, over Devlog
full-width below; and finally a full-width TechStack strip closing the page,
ending with a decorative, `aria-hidden` Isaac GIF stamp (an easter-egg cameo,
not a fifth tool). Widget headings
that aren't already on an opaque card float as `LabelTag` strips above their
object (Steam's "What I've been playing" matches Links' "Get in Touch",
TechStack's "My current toolset", and Devlog's "Most recent updates").

**Compact masthead.** The banner and nav share a tight vertical rhythm so they
don't dominate the fold: the nav is `py-2.5` (not `py-4`) and the banner's top
padding is trimmed. `main` carries no padding of its own — the column's `px-4`
gives the horizontal inset, `gap-4` gives the vertical breathing room from the
bands, and each section supplies its own framing (Home's card gaps, About/Now/
Creations' own bordered panels).

Cells (in the touching-cell grid that remains — About's passport)
center their content vertically (`flex flex-col justify-center`) so a cell
that's shorter than its row distributes the slack evenly instead of pinning
content to the top.

---

## Mobile (≤ 767px)

Everything above describes the site at its design width of **768px**. This
section is the complete, auditable list of how the spec behaves below that —
and, separately, the short list of places where it is genuinely _broken_ on
purpose.

The governing principle is the one already stated in **Composition may vary —
the grammar doesn't**: stacking a row, dropping a widget to full width, or
reordering a footer is **composition**, and needs no permission from this
section. Only a change to the grammar itself — a size off the type scale, a
missing `shadow-sticker`, a new motion rule — is a deviation, and every one of
them is listed below.

`CLAUDE.md` holds the _process_ contract (the 320px floor, the two-tier
breakpoint rule, the verification widths). This section holds the _visual_
consequences. Neither repeats the other.

### Tiers

Two, and only two. Base (unprefixed) styles are the mobile composition and
cover **320–767px**; **`md:` (768px)** restores the desktop composition
described everywhere else in this guide.

The boundary is `md` because **`md` is the design width**. Every composition in
this guide was drawn at 768px, so 768px is the first width at which it is
correct. Gating on `sm:` (640px) would switch the desktop layout on in a
viewport 128px narrower than it was designed for and force it to compress —
percentage row splits, the four-across nav, and the footer's side-by-side
arrangement all lose their intended proportions there. No `sm:`, no `lg:`,
no `xl:`.

**`main` is capped at `max-w-md` (448px) and centered below `md`.** Because the
mobile tier now runs to 767px, an uncapped stack would stretch a
single-column phone layout across a ~743px column: cards holding one short line
of text go sparse, and Home's polaroid — 440px native — would upscale past its
own resolution, breaking the no-upscaling rule under **Accessibility**. The cap
keeps the cards phone-sized and floating on the sky, which is the
bulletin-board reading anyway, and 448px sits just above the polaroid's native
width so that rule holds without a per-image exception. The bands are
unaffected — they stay full-bleed (see deviation 3).

### Deviations from the grammar

| #   | Rule broken                                         | Where                    | Why                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| --- | --------------------------------------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Type scale** — the wordmark is a fixed `text-5xl` | Banner                   | The name is 16 glyphs of Lilita One and cannot fit 320px at 48px. It becomes a single fluid value, `--text-wordmark-fluid` in `@theme`, so it stays one line at every width and reaches the full `text-5xl` once there's room. Fluid, not a breakpoint step — a step would leave a dead zone where the name is either cramped or wrapped. It is still the one outlier size; it is now a _range_ rather than a value.                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 2   | **Wordmark stroke** — a fixed `2px` ink outline     | Banner                   | A `2px` stroke at 48px is a hairline; the same `2px` at ~29px chokes the counters and the gradient stops reading. Thins to `1.5px` below `md` — the same value as `--stroke-fine`, and for the same reason.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 3   | **`shadow-sticker` on the bands**                   | Masthead + footer bands  | The bands run edge-to-edge below `md`, and a `4px 4px` offset on a full-bleed element has its right-hand arm clipped by the viewport while the bottom arm still paints — the shadow reads as half-missing rather than as depth. (It does **not** cause horizontal scroll: `box-shadow` is a paint effect and never contributes to scrollable overflow. **Transforms do** — see the tilt note under Composition — so a rotation is an overflow risk where a shadow is not. Don't conflate the two.) Below `md` the bands carry `border-y-4` with no side border and no shadow; the heavy top/bottom rule is the depth cue instead. **This applies to the two bands only** — every pinned object inside `main` keeps its `shadow-sticker` at every width, since `main` retains a `px-3` inset and its cards are never flush to the viewport edge. |
| 4   | **Motion ignores `prefers-reduced-motion`**         | Sticky nav bar           | The blanket exception under **Accessibility → Motion** is scoped to _decorative_ motion — the vinyl spin, the REC blink, the marquee, the Celeste GIFs. The sticky bar's show/hide is **navigation chrome**, not decoration: it moves a control the user is reaching for. It honors `prefers-reduced-motion` and snaps instead of sliding. Decorative motion keeps its exception unchanged.                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 5   | **A bright fill sits behind the whole document**    | `html` background        | Mobile overscroll bounce drags the viewport past the fixed sky layer, and whatever is behind it flashes — white, by default. `html` carries `--color-sky-edge`, a pink sampled from the backdrop photo, so the bounce reveals more sky instead. It is a **new token, deliberately not `--color-rose`**: rose is Home's owned section identity (see **Color → Sky accents**), and site-wide chrome painted in one section's hue would read wrong behind About, Now, or Creations. Nothing sits on this fill and nothing is read against it, so the accents-never-behind-text rule is untouched.                                                                                                                                                                                                                                                  |
| 6   | **A hover affordance is withheld from touch**       | TechStack notes          | Each tech stamp's handwritten note is an absolute, `whitespace-nowrap` tooltip revealed on hover. On a touch device (`hover: none`) it is instead permanently visible — which works on desktop only because the seven stamps sit on one row with `pb-7` reserved beneath them. Once they wrap to three rows the open notes overlap the stamps below and the widest one overflows the column from the leftmost stamp. Below `md` the note goes **`sr-only`, not `hidden`**: `aria-describedby` pointing at a `display:none` element is honoured inconsistently across screen readers, whereas `sr-only` keeps it reliably in the accessibility tree. So the annotation is withheld from _sighted_ touch users only; nothing is removed from the document.                                                                                        |
| 7   | **The custom scrollbar steps aside**                | `.devlog-scroll` regions | The chunky square scrollbar is named an intentional styled element under **Composition may vary**, but `::-webkit-scrollbar { width: 14px }` forces a _classic_ scrollbar even on touch, where the platform would otherwise draw a zero-width overlay one. It permanently occupies 14px — 6% of a 244px panel — to draw an affordance the OS already provides better. Below `md` the custom styling is dropped and the native overlay scrollbar takes over. The scrollbar is **not hidden**: `scrollbar-width: none` would remove a real affordance from a region that genuinely scrolls. Only the site's own styling steps aside.                                                                                                                                                                                                              |

That is the whole list. Anything not on it holds at every width.

### Composition (not deviations — recorded so the intent is legible)

- **The column.** `px-4` → `px-3` below `md`. 12px is the smallest inset that
  still absorbs a pinned card's `4px` sticker shadow _and_ the horizontal
  spread of a 3° tilt (a 320px-wide card at 3° has a bounding box ~10px wider
  than itself). Going to zero would force clipping tilted corners — see
  deviation 3 for why the bands can do this and the cards can't.
- **Below `md`, tilt is governed by text density — not by width.** This is a
  deliberate inversion of the Handcrafted layer's desktop rule ("tilt is
  governed by width and edge-proximity, **not** by how much text an object
  holds"). That rule works at 768px because width and text density correlate
  there: the panels holding long copy are the wide ones. At 320px every panel
  is full width, so width stops telling the two apart and only density is left.

  The reason to care is a reading cost that scales with line count. On a
  tilted block, each successive line starts at a slightly different x, so the
  eye's return sweep has to re-find the left edge every line. Over twenty
  lines of body copy that accumulates into something that reads as broken;
  over a two-line widget it is invisible, and reads as charm.

  **Level below `md`** — only the three tallest, densest objects: Home's
  Welcome letter and Devlog, and the passport. These are the ones where a tilt
  is read across enough lines to become a cost.

  **Tilted at every width** — everything else: Weather, Spotify, Steam, the
  Links post-its, Now's note cards, the polaroid, the Live Reaction cam, the
  tech stamps, the acronym badges, and every `LabelTag`.

  **Tilted below `md` only** — the work-timeline notes. This is the one case
  that inverts, and for a reason the desktop rule already gives: on desktop a
  note is a long horizontal strip lined up against the timeline's spine, and
  the guide says anything stacked against a straight edge stays level. Below
  `md` there is no spine and the note is nearly square, so the objection is
  gone and it takes a small tilt. Each entry's `rotate` (the badge, desktop
  only) and `cardRotate` (the note, mobile only) are mirror images that never
  apply at the same width.

  **Tilt caps still apply.** The `≤ ~1.5°` limit on anything wider than a
  compact card governs every mobile tilt, since at 320px every panel is wide.

  **No section carries containment padding.** A rotated card's bounding box is
  `w·cos θ + h·sin θ`, but the number that matters is measured against the
  **viewport, not the section** — and `main` already sits inside the column's
  `px-3` gutter. At 320px the worst overhang on the site (Weather, 1.5° over a
  ~250px height) extends ~3.2px past `main`'s edge into a 12px gutter, so it
  never reaches the viewport. Adding `px-2` to a section to "contain" this was
  a mistake born of measuring against the section instead: it cost 16px of
  content width to solve a problem that wasn't there. Where a compact object's
  height is driven by its width (an image card), it still takes a **fixed
  `max-w` below `md`**, which makes its overhang constant rather than
  proportional — that one is real.

- **Small objects stay small.** A widget drawn at 20–30% of the desktop row is
  not faithfully translated by letting it fill a phone column. Home's polaroid
  and Live Reaction cam carry fixed caps below `md` and centre on the column,
  so they keep reading as small pinned objects — and, in the polaroid's case,
  stay clear of the raster's 440px native width at every viewport.
- **Nav placement.** Below `md` the primary nav lives **only** in the sticky
  bar; the masthead band holds the `Banner` alone. At `md`+ it returns to the
  band and the sticky bar is not rendered. Exactly one
  `<nav aria-label="Primary">` is ever displayed, so the landmark and the
  `aria-current="page"` marker are never duplicated.
- **The sticky bar is a separate composition, not a shrunken masthead.** The
  full `Banner` stays in the document and scrolls away normally. The bar is
  condensed chrome that takes its place, and it holds **the four nav links and
  nothing else** — spread across the full bar width. It carries no logo mark,
  no `h1`, and no heading of any kind; the document's single `h1` remains the
  Banner wordmark. A logo mark was tried and removed: at 320px the four labels
  fit beside it only barely, and the ~32px it consumed is worth more as
  breathing room between tap targets than as decoration the Banner already
  provides one line below.
- **Footer order** below `md`, centered and stacked: mascot GIF, footer note,
  copyright + Credits link, then the badge grid 2×2. The badges go fluid
  (`w-full max-w-36`) instead of the fixed `w-36`; a fixed width is what
  overflows first at 320px.

- **Text-dense cards drop to `p-4 md:p-6`.** `p-6` is 48px of a 296px column —
  16% of the width — so every card carrying running text takes the compact
  `p-4` below `md` and returns to `p-6` at the design width: Home's Welcome
  letter, the passport's ID cell, Now's intro card, and the Colophon. Cards
  holding a glyph and a line or two (the Creations placeholder) keep `p-6` at
  every width — the point of the reduction is reclaiming space for text, and
  there is none there to reclaim it for. Both values are on the cell-padding
  scale, so this is a role change, not a new size.

- **Every `<section>` carries an accessible name**, via `aria-labelledby`
  pointing at its own `SectionTitle`/`h2`. An unnamed `<section>` is not
  exposed as a region at all, so naming some and not others yields an
  inconsistent landmark list for no reason.

- **Only one column of text fits at 320px.** Body copy at `text-base` averages
  ~8px a character, so the full 296px column yields **~37 characters a line** —
  already under the comfortable 45–75. Every horizontal split spends width the
  page does not have: a two-up field list inside the passport lands at ~14
  characters a line. Below `md`, anything bearing running text spans the whole
  column. This is the constraint the passport, the timeline, and the ID block
  entries below all follow from.

- **The passport gives up equal halves below `md`, to give up nested scroll.**
  The two-up fold and its seam survive; the symmetry does not. Rows go **auto**
  rather than `grid-rows-2` on a fixed height, so each page is its natural
  height and no chapter needs an inner scroll region. That trade is deliberate:
  Journey, Hobbies and Workflow all overflow any sane fixed height, and nested
  scrolling on a phone — an inner panel inside a scrolling page — leaves the
  reader unable to predict which will move. Equal halves sized to the taller
  page were considered and rejected: Hobbies needs ~800px, which would leave
  the ID page carrying ~350px of dead space and resize the whole passport on
  every tab change.

- **The ID page floats its headshot, and clears from the third field.** Below
  `md` the photo is `float-left` and the field list runs as plain block flow
  around it. The list **must be `display: block` on mobile, not a one-column
  grid**: a grid container does not flow around a float, it merely narrows and
  stays rectangular, which reproduces the 14-character column this was meant to
  fix. Line boxes are what avoid floats, so block flow is load-bearing here.

  Flow alone is not enough, though. Left to itself a field can **straddle** the
  float — part of its label beside the photo, the rest wrapped underneath —
  and which field does so drifts with the viewport. So the first two fields
  (Name, Pronouns) ride beside the photo and **everything from Date of birth
  onward carries `clear-left`**, putting a deterministic boundary at the
  photo's bottom edge. Two is the count that fits the photo's 112px band at
  320px.

- **The MRZ strip renders a shorter string below `md`.** At `text-xs` its 44
  characters need ~317px against 244px of cell. It is `aria-hidden` decoration,
  so a shorter variant costs nothing and preserves both the type size and the
  edge-to-edge fill a real machine-readable zone has — where clipping would
  read as a rendering fault and shrinking the type would break the mono floor.
  Both variants stay in the DOM, toggled with CSS; duplicating hidden
  decoration is harmless.

- **The work timeline drops its spine below `md` and folds each badge into its
  card.** Side by side, the spine, indent, and badge consume 44% of a 296px
  column and starve the note to 166px — and stacking the badge above the note
  still leaves the indent in place. Removing the rail gives the note the full
  column; **the acronym badge is dropped entirely below `md`**. Folding it into
  the card's header row was tried first and looked wrong — with no rail to sit
  on, a 48px tinted square beside the org name reads as clutter rather than as
  a marker, because the badge's whole meaning came from its position on the
  spine. It is `aria-hidden`, so hiding it costs nothing semantically, and the
  chronological reading survives in the `<ol>`. The rail and the hanging badges
  both return at `md`+.

### Touch targets

WCAG 2.5.8 (AA) sets the floor at **24×24 CSS px** and nothing on the site may
sit below it. Primary navigation and the footer badges — the controls a thumb
actually hunts for — are raised to **44×44** below `md`, matching the platform
guidance and a measured drop in touch error rate. The nav's accent underline
must stay hugging its label while the hit area grows: the target is on the
`<button>`, the `border-b-2` is on an inner `<span>`.

The passport's tab strip uses the same split for the same reason. An inactive
tab is drawn 16px tall — deliberately, so the active tab stands proud of its
neighbours — which is below the 24px floor. The `<button>` is therefore a
full-height target at all widths and the 16px/32px tab shape lives on an inner
span, so the affordance is unchanged and only the hit area grows. **This is a
fix at every width, not a mobile concession** — the 16px target failed on
desktop too. Desktop metrics are
untouched — the masthead stays compact, as specified under **Layout**.

---

## Banner

The masthead is a fixed, spec'd composition — a deliberate diagonal around the
wordmark:

- **Reverse eyebrows.** Two matched labels bracket the name on opposite corners:
  the greeting (“Hey there, I'm”) sits **top-left**, the tagline (role) sits
  **bottom-right**. Both use the **Overline / kicker** role (`text-xs uppercase
tracking-wide`, semibold, `text-label`) — identical type, mirrored alignment.
- **Wordmark.** The name in `font-wordmark text-5xl uppercase`, sky-gradient fill
  with the `2px` ink outline behind it (see Gradients). This is the only `h1`.
- **Duo image.** The Hollow Knight pair sits **centered at the very bottom** of
  the banner, flush to the dividing rule, small (`max-w-[72px]`) — the characters
  look **up** at the name, so keep them below it and centered. Meaningful `alt`.
- **Compact.** Trimmed padding (see Layout) keeps the whole masthead short.

---

## Primitives

`src/components/ui/` holds the canonical building blocks for the repeated
patterns above — reach for these instead of re-typing their class strings:

- **`Eyebrow`** — the Overline/kicker role (`eyebrow` utility, which holds no
  color of its own — see Accessibility), with a configurable element (`as`
  prop; a genuine card title defaults to `<h3>`, a decorative status label
  should pass `as="p"` / `as="span"` / `as="dt"`) and a `tone` prop
  (`"label"` default, `"on-ink"` opt-in for a dark fill like Live Reaction's
  label bar) that supplies the one text-color class the element gets.
- **`SectionTitle`** — the `<h2>` section title with its accent underline
  (`accent` prop: `"rose" | "violet" | "blue" | "orchid"`).
- **`PinnedCard`** — the pinned-object card: opaque fill + `border-2
border-ink` + `shadow-sticker` + optional `rotate` (`bg` / `padding` /
  `rotate` props). Home's layout primitive for widgets that need their own
  fill (Spotify, Weather, Live Reaction) — not every widget uses one; some
  float bare on the sky (see Shape & surface).
- **`LabelTag`** — the opaque text plate a heading/`<Eyebrow>` sits on so it
  reads over the sky (`bg` / `rotate` props). A visual wrapper only — the real
  heading/`<Eyebrow>` element stays inside it, so semantics and heading levels
  are unaffected.
- **`Panel`** / **`Cell`** — the touching-cell grid, now scoped to About's
  passport, its one remaining internal fold: `Panel` is the `bg-ink` + `gap-0.5`
  wrapper, `Cell` is a grid cell (`padding` prop: `p-6` / `p-4` / `p-0`; `bg`
  prop for the intentional panel-color variation, default `bg-white`).
- **`Badge`** — the two-line footer badge (`top` / `bottom` props).
- **`MarqueeText`** — the auto-scrolling/edge-fade text used by the Spotify
  widget and elsewhere.
- **`TextLink`** — an inline text link riding the section-hue underline
  (`text-ink underline decoration-2 underline-offset-2`, `accent` prop:
  `"rose" | "violet" | "blue" | "orchid"`). Renders an `<a>` (pass `href` +
  `external`) for outbound links or a `<button type="button">` (pass
  `onClick`) for in-app navigation, so both Home's outbound links and About's
  in-app "Now page"/"Creations page" links share one class string.
- **`SimpleIcon`** — renders a `simple-icons` brand glyph (`icon` object +
  sizing `className`); shared by `TechStack` and `Badge` so the icon markup
  lives in one place.
- **`Pin`** / **`Tape`** / **`Stamp`** — the handcrafted-layer decorative
  accents (see Handcrafted layer above). All `aria-hidden`.

---

## Do / Don't

- **Do** drive everything from tokens and the type scale; add a token before a
  hardcoded value.
- **Do** keep rectangles square, `ink`-bordered, solid-filled.
- **Do** pin Home's widgets as individual cards — real gaps, `border-2`,
  `shadow-sticker`, and a slight tilt on compact ones (wide panels stay
  level) — so the sky shows between them; keep the
  touching-cell mechanic (shared `2px` ink rule, no gutters, no doubled
  seams) for About's passport, its one remaining internal fold.
- **Do** keep bright sky accents in fills/lines only — never as body text.
- **Do** let panel composition and color vary within the shared grammar —
  framed or full-bleed, flat or handcrafted, stats placed to suit the content —
  as long as the grammar holds.
- **Don't** add rounded _rectangles_ — round accents are only for the
  handcrafted layer's small non-rectangular shapes (pins, discs).
- **Don't** add a shadow outside `shadow-sticker` (the standard pinned-object
  depth cue now, not a narrow exception) or a gradient outside the wordmark —
  the wordmark stays the only gradient.
- **Don't** add a second `h1` or skip heading levels; don't turn a decorative
  status label into a heading just because `<Eyebrow>` defaults to `<h3>`.
- **Don't** use transparency or `backdrop-blur`; every panel is opaque.
- **Don't** remove focus outlines or rely on color as the only signal.
