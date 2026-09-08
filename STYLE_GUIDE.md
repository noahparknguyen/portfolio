# Style Guide

The locked visual spec for the site. Everything here is driven by tokens in
`src/index.css` (`@theme`) so changes cascade — never hardcode a hex or a
one-off size; add or reuse a token instead.

## Personality

A cosy **sky-pastel bulletin board**: hard-bordered solid panels pinned over
the pink sky, like notices pinned to a comic-panel board — some panels flat
and printed, others handcrafted objects (a taped-up photo, a sticker-sealed
letter, rotated paper stamps) pinned on top of them. Deep sky-indigo linework,
square corners, rounded playful type, and a few bright accents pulled straight
from the sky photo. Opaque and chunky — a modern take on the old web, light
and cool, never childish.

---

## Voice

The locked verbal spec, and it is as binding as the colour tokens. Derived from a
~4,000-word transcript of Noah answering questions out loud about himself and
these projects, measured rather than guessed. **When a line is in doubt, read it
aloud. If he wouldn't say it that way, it's wrong, however well it reads.**

The failure mode this section exists to prevent is not bad writing. It is _good_
writing in the wrong voice — polished, aphoristic marketing prose that reads as
though the site were written about him rather than by him.

### Written register vs spoken register (read this first)

**The measurements below were taken from a voice memo. His writing is a
different register, and the site is writing.** Applying the spoken tics to prose
is what made an earlier pass feel wrong sentence by sentence — every line
carried a marker he would never type.

Measured against a home-page draft he wrote himself, per 1,000 words:

|                         | Speech | **Writing** | What that means                                   |
| ----------------------- | ------ | ----------- | ------------------------------------------------- |
| `So` opening a sentence | 3.0    | **0.0**     | Never open a written sentence with "So"           |
| `so` anywhere           | 10.3   | **0.0**     | Join with "but", "and", "that was until"          |
| `a ton of`              | 1.3    | **0.0**     | In writing the quantifier is **"many"** (7.6/1k)  |
| `I think`               | 5.0    | **0.0**     | The written voice states things; it doesn't hedge |
| sentence fragments      | 69     | **0**       | Every written sentence is a complete clause       |
| median sentence         | 14     | **14**      | **Rhythm is the one thing that carries over**     |

**Measured across both drafts he wrote himself (181 words), every spoken tic is
at exactly zero:** `I love` 2.3 → **0** · `super` 3.5 → **0** · `a ton of`
1.3 → **0** · `so` 10.3 → **0** · `I think` 5.0 → **0** · `just` 7.0 → **0**.

Markers that appear only when he writes: `really` (5.5/1k), `many` (5.5/1k),
the parallel `If you want to…` opener (16.6/1k), and sentence-initial `But`
(5.5/1k). Median sentence length is 14 words in both registers and is the only
figure that transfers.

**Writing understates where speech enthuses.** This is the trap that survived
longest. He said, out loud:

> "I love making websites so I'd say I have a stronger attachment to frontend
> and web development. But I do love making backends as well. It's always so
> satisfying when you get an API up and running."

He wrote:

> "I mainly focus on web development and frontends, but know my way around the
> backend as well."

The enthusiasm is gone, the second sentence is gone, and "I love" became "I
mainly focus on". **Do not port transcript enthusiasm into prose** — the written
voice is level and slightly understated, and reaches for an idiom ("know my way
around", "taken a back seat") where the spoken voice reaches for an intensifier.

**Parallel construction is a written-only device.** He builds a run of clauses
on the same stem rather than varying them:

> "**If you want to know** more about my journey… **If you want to know** what
> I'm up to at this very moment… **For a look into** my personal projects…"

**Two more confirmed in his own edits:**

- **Comma splices join independent clauses** — "Hey, my name is Noah, I'm a
  full-stack developer…". He deleted an "and" to get there. Leave them.
- **The appended beat gets its own sentence, opening with "But".** Not a
  trailing clause after a comma: "…check out the Creations page. **But only if
  you want to, no pressure.**" Full stop, then the beat, exactly as the Humour
  section requires.

**Written form is fuller than spoken form.** He expands what he clips aloud:

| Says               | Writes                                  |
| ------------------ | --------------------------------------- |
| "comp sci"         | "computer science grad"                 |
| "I'm Noah"         | "My name is Noah"                       |
| "Ottawa"           | "Ottawa, Ontario"                       |
| "a ton of"         | "many"                                  |
| "living in Ottawa" | "living and working in Ottawa, Ontario" |
| "from Canada"      | "born in BC, living in Ottawa, Ontario" |

Other things his own draft establishes:

- **The greeting comes first, not last.** "Thanks for stopping by!" is sentence
  one. An earlier pass moved it to the end; that was wrong.
- **"This little site right here" is his phrase, not a formula.** An earlier
  rule capped it at two uses across the site. He put it back unprompted. Keep it.
- **He claims the genre rather than rejecting it** — "my personal take on a
  portfolio website", not "it's not really a portfolio". No arguing with a
  premise the reader never held.
- **Mild formality is correct in prose**: "professional experience", "typically
  aimed at", "represented who I am as a person". This is not résumé-speak, and
  it is not the same thing as the banned words list.
- **A comma splice is rhythm, not an error** — "it's all here, it's just taken a
  back seat". Leave them.
- **The front door carries no jokes at all.** Humour stays sparse and appended
  (see Humour above), and it is not required in every block.

Everything below this section still holds for **structure** — architecture,
placement of humour, no em-dashes, sentence rhythm. The tic _rates_ are
spoken-register reference only.

---

### The measurements

Per 1,000 words of natural speech, and the site should land near these:

| Tic                       | Rate | Examples from the transcript                         |
| ------------------------- | ---- | ---------------------------------------------------- |
| `just`                    | 7.0  | "it's just easy to get moving", "just bad"           |
| `I think`                 | 5.0  | "I think what I'm most proud of…"                    |
| `super` (the intensifier) | 3.8  | "super proud", "super easy", "super calming"         |
| `So` opening a sentence   | 3.0  | "So it started off simple."                          |
| Honesty hedges            | 2.8  | "If I'm being honest", "If I remember correctly"     |
| `pretty` (the softener)   | 2.5  | "pretty rough", "pretty much", "pretty simple stuff" |
| Wrap-up words             | 2.5  | "Overall", "Ultimately"                              |
| Flat self-deprecation     | 2.5  | "I'm not the best designer in the world"             |
| `actually`                | 2.2  | "my actual current skill set"                        |
| `that's why` (causal)     | 2.0  | "That's why the Dex table came to be."               |
| Back-references           | 2.0  | "Like I said before", "I mentioned before"           |

### Punctuation (the biggest single tell)

In 4,000 words of speech he produced **zero** em-dashes, **zero** semicolons,
**zero** parentheses and **zero** exclamation marks. The site had **57 em-dashes**
in displayed copy.

- **Don't use em-dashes.** The `thing — restatement of the thing` appositive is
  the site's old default and it is a written device he does not have. Use a
  comma, a full stop, or `so` / `but` / `and` / `which is`.
- **The one exception is a credit-list separator** (`Ottawa skyline — Meli
Julianti`). There the dash is a label separator doing the job of a colon, not
  a prose appositive, so the Colophon's list keeps it.
- **Don't use semicolons or parentheses in body copy.** Brackets survive only in
  the handwriting layer and short asides.
- Exclamation marks are rationed to greetings and the odd genuine one
  (`Welcome!`, `About Me!`). Never inside a paragraph.

### Rhythm

|               | Him          | The old site copy |
| ------------- | ------------ | ----------------- |
| under 8 words | **10%**      | 29%               |
| 8–19 words    | **62%**      | 43%               |
| 20–34 words   | 24%          | 23%               |
| median        | **14 words** | —                 |

He is a steady mid-length talker, not a punchy one. **Kill the fragment
punchline** — "So we built them a shortcut.", "first time it was all mine",
"The one you can click through to is mine." Those are ad-copy cadence. He
explains, then keeps going, then wraps up with "Overall" or "Ultimately".

### How he builds a thought

Not filler — **scaffolding**. He is verbose because he shows his work, and that
is the texture to reproduce:

1. **Reason before conclusion.** He sets up the problem, then names the thing
   that solved it. "I wanted Jolteon, and then I realised Zapdos was sitting
   right there and was just better. That's why I built the dex table."
2. **Hedge the claim about himself.** "I think", "I'd say", "probably",
   "pretty much". He rarely asserts flatly about his own work.
3. **Back-reference.** "Like I said before…" He threads earlier points back in
   rather than treating each paragraph as standalone.
4. **State the flaw flatly, then move past it.** "the code was just bad", "I'm
   honestly a pretty bad passer", "not the most interesting". No wallowing and
   no spin. One clause, then onward.
5. **Concede, then pivot.** "Of course X, but Y."
6. **Enumerate, then wave.** "Power Apps, Power Automate, Power Bi" · "menus
   worked, links worked, pretty simple stuff" · lists trailing into "etc."
7. **Close with a verdict.** "Overall my experience was fantastic." "Ultimately
   I think we landed on something I'm pretty proud of."

### Words

- **Canadian spelling throughout.** `favourite`, `colour`, `behaviour`,
  `catalogue`. Not `analyzed` or `agonizing`. The About section is a Canadian
  passport; the copy has to agree with it.
- **`super` is his intensifier**, not "incredibly" or "remarkably".
- **`a ton of` is his quantifier**, not "a great deal" or "numerous".
- He says **`comp sci`**, not "Computer Science" — the real program name is
  "Computer Engineering Technology, Computer Science" and he calls that "a
  mouthful".
- **Never**: "heartfelt", "passionate about", "leverage", "end-to-end",
  "owned features", "rigorous", "seamless", "a testament to". Résumé words.
- **`little site`** is a real tic of his, but it had become a formula. Twice
  across the whole site, maximum.

### Register

He is warm, self-deprecating and concrete, and he never oversells. Where a
sentence could be read as a boast, he has already hedged it. Two of the best
lines in the transcript, for calibration:

> "I need to remember that it's a tool, not a miracle worker."

> "I have no idea why I moved across the entire country. I could have found
> another college somewhere within BC with a coop program. But in hindsight I'm
> super proud of myself for pushing myself outside my comfort zone."

That second one is the register the whole site should sit in: admits the thing
doesn't quite make sense, doesn't resolve it, lands on genuine pride anyway.

### Humour

**He is sincere by default.** Humour is sparse, and it is always **appended,
never embedded.** The information-carrying clause is complete and useful on its
own; the joke arrives after it, syntactically detachable, usually at his own
expense. **Delete the joke and the reader loses nothing.**

His own example of the shape:

> "You can find my projects on the creations page, **if there are any left since
> I deleted most of the bad ones.**"

Sincere info, then the joke, bolted on the end. Compare a failure that shipped
briefly in the Home letter:

> ✗ "My work and my projects are on here **somewhere**."

There the vagueness _is_ the punchline, so the joke is load-bearing on the
information and the reader pays for it in comprehension. His never do.

The same shape governs the Bio: "a full-stack developer, CS graduate, and
**competitive nap taker** from Canada" — two sincere list items, then the joke as
the third. Strike it and the sentence still does its job.

**Rules:**

- Never let a joke modify, hedge or blur a fact. Facts get stated straight.
- Put the joke **after** the complete thought — a trailing clause after a comma,
  a following sentence, or the last item in a list.
- Aim it at himself. Self-deprecation, not wit at someone else's expense.
- Keep it rare. A page with a joke in every paragraph is not this voice; the
  default register is plain sincerity, and the beats land because they are
  scarce.
- A flat admission of a flaw ("the code was just bad", "I'm honestly a pretty
  bad passer", "not the most interesting") counts as one of these beats and
  follows the same placement rule: state the fact, then the admission.

---

### Architecture (the part that matters most)

Tics and rhythm are the easy half. The reason copy can hit every metric above and
still read wrong is **sentence architecture** — which idea gets the subject slot,
and how clauses join. This is where the old copy actually went wrong.

**1. He is the subject. The artifact arrives later.**

**38% of his sentences open with `I` / `I'm` / `I'd` / `My`.** The old copy led
with the thing instead, which is what makes it read as written _about_ him:

> ✗ "The comparison is the main event."
> ✓ "I think what I'm most proud of is the compare tool."

> ✗ "The detection engine was the hard part."
> ✓ "I struggled the most with the detection engine."

> ✗ "The mapping from a detected tool to a HubSpot product is a JSON file rather than code."
> ✓ "I put the mapping in a JSON file instead of in the code."

**2. His cleft is `I think what X is Y`. Never `The X is that Y`.**

He used the first six times and the second **zero** times. The difference is the
hedge arriving first and `what` standing in for the noun:

> ✗ "The part I'm smug about is that Statmon doesn't call an API."
> ✓ "I think what I'm smug about is that Statmon never calls an API."

**3. Clauses join with `so`, `but` and `because`.**

`so` 10.3/1k · `but` 9.0/1k · `because` 3.0/1k. These do the work em-dashes and
appositives were doing. Never restate a noun after a dash.

**4. Passive voice at 3.0/1k, no higher.**

> ✗ "Everything gets pulled once at build time and every sprite is committed into the repo."
> ✓ "I pull everything once at build time, and I commit every sprite into the repo."

**5. His most common sentence openers**, in order — useful when a paragraph
refuses to start: `I think` · `I was` · `I wanted` · `I love` · `Like I said` ·
`I had` · `This was` · `That's why` · `Of course` · `If I'm being honest` · `So I`.

### How to write a block from scratch

Do not edit an existing sentence into shape. That preserves the architecture,
which is the actual defect, and it is how the first Statmon pass still came out
half wrong. Instead:

1. Find what he said about it in the transcript. If he never said it, that block
   is a candidate for cutting, not for invention.
2. Write it fresh from the facts, out loud, in his order: **problem first, then
   what he did, then the verdict.**
3. Check it against the metrics above before committing.

---

### Accessible names count as copy

`aria-label`, `sr-only` text and alt text are read by people, so they follow
this section too. A screen-reader user should not meet a more formal site than
a sighted one does.

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

Brand hexes are not used anywhere on the site. `SimpleIcon` (shared by `TechStack`, `Links`
and the footer `Badge`s) renders every `simple-icons` glyph with `fill="currentColor"`, so it
inherits the ordinary `ink` text color like any other icon and reads cleanly against the
varied soft-tint fills instead of going muddy against them.

**Use a real brand mark wherever one exists; fall back to a drawn or
`react-icons` glyph only where it does not.** `simple-icons` is the default
source. Three documented fallbacks, all for marks it does not ship: Java and
Steam (`FaJava`, `FaSteam`) and **LinkedIn** — `simple-icons` removed LinkedIn at
the rights holder's request, so it comes from `react-icons` as **`FaLinkedinIn`**,
the bare "in" letterform. Not `FaLinkedin`, which is a filled rounded-square
badge and would drop a rounded rectangle onto a board whose rule is square
corners (see Shape & surface). Hand-drawing a mark the library deliberately
dropped is not an option either. Email keeps a drawn glyph because no brand mark
applies to it.

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
| Nav link          | `text-lg`   | Fredoka | semibold | Nav bar                         |
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

Only three weights are on-scale: `normal`, `semibold`, `bold`. Overlines,
headings/cards (Heading, Subheading/card roles) **and the Nav link** are
`semibold`; Title is `bold`; Body and Small/meta are `normal`. `font-medium` is
off-scale — don't use it. The nav label is `semibold` in **every** state,
including active — the active link is marked by its underline and
`aria-current`, not by a weight change, so its width never shifts when the
section changes (see Interaction, and Accessibility → State not by color alone).

One documented tracking exception: the Live Reaction label carries
`tracking-widest` rather than the Overline role's `tracking-wide`. Wide-
letterspaced uppercase micro-type is the broadcast-chyron convention that widget
imitates, and it is the only place on the site that deviates. Its **weight**
still follows the role.

### Heading semantics vs. size (important)

Heading **level** is for document structure; **size** comes from the scale above.
They are independent — a `<h3>` card title and a `<h3>` overline are both valid.
The page outline is fixed:

- `h1` — the banner name (one per page).
- `h2` — the active section's title.
- `h3` — subsections and card titles inside a section.
- `h4` — **only inside a Creations book**, for a chapter title under the book's
  own `h3`. This is the one place the outline goes four deep, because it is the
  one place a named object nests inside a section: `h2` Creations → `h3` the
  book's title → `h4` the chapter. Every spread renders exactly one of each, so
  the level is never skipped. Don't reach for `h4` anywhere else — outside a
  book there is nothing for it to sit under.

Never add a second `h1`. Keep levels in order (no skipping). Not every
`<Eyebrow>` is a heading — a genuine card title (Devlog's "Most recent
updates", Links' "Get in touch") stays the default `<h3>`, but a decorative status label sitting
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
  different hue), the Spotify card (`blue-soft`), Links' sticky-notes, Now's
  stickies, and About's work-timeline note cards and diploma card. The Live
  Reaction cam keeps its dark `ink` fill. Not everything is a filled
  `PinnedCard`, though — the photo, the tech stamps, Links' sticky-notes, the
  Devlog scroll, and Steam's library card sit bare/unenclosed on the sky (see
  "Text never sits directly on the sky" above), their own fills doing the work
  without an outer card. **Rules for the tint layer:** draw only from the four
  accents (never `paper`, which is reserved except for the dashed "blank form"
  placeholders noted under Handcrafted layer), spread the hues evenly, and never
  let two of the same touch — **a work note never repeats its own acronym
  badge** (they sit flush across a 16px gap, so sharing a hue makes the pair read
  as one block of colour rather than a marker pinned beside a note), and adjacent
  tech stamps differ. Now's eleven stickies are checked for this at **both**
  tiers — the `md` three-column grid and the single-column mobile stack — since a
  pair that is diagonal on desktop becomes vertically adjacent on a phone.

- **A section's intro panel wears its own section hue.** Section identity already
  lives in the `SectionTitle` underline and the active nav underline; the panel
  fill is the third place it belongs. Now is `blue-soft`, Creations is
  `orchid-soft`. **Credits is the principled exception and keeps `paper`:** it is
  the one section with no owned hue (its four group headers carry all four
  instead) and it is taped up rather than pinned, so warm stationery is right
  there. This is also why `primary-soft` means _masthead/footer band_ and
  nothing else, and why plain white means "literally white". Watch for a knock-on
  when a panel takes a hue: a Creations book sits directly under the orchid-soft
  intro panel, so its cover draws from a different tint (Statmon's is
  `violet-soft`) — two orchid-soft objects touching would read as one block of
  colour rather than a book pinned below a note.
- **Headers ignore the tint.** They stay on the standard `ink` / `label`
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
  bands, and the tech stamps at rest too (not
  hover-only, and including TechStack's decorative, non-interactive Isaac
  stamp) — the interactive stamps additionally lift (`-translate-y`) on
  hover/focus as an interaction cue on top of their resting shadow; Isaac's
  stamp lifts on hover only, having no focus state to cue.
- **Slight rotation.** Compact objects carry a small `rotate-[n deg]` so they
  read as hand-placed rather than machine-aligned — the photo polaroid, the
  acronym badges, the tech stamps (including TechStack's decorative Isaac
  stamp), the Links post-its, Now's stickies, the small `LabelTag` signs,
  the AiAi record sleeve inside the Spotify card, and card-sized widgets (Spotify, Weather, the
  diploma, the Live Reaction cam). **Three things govern tilt: how much running
  text an object holds, its width, and whether it sits against a straight edge.**

  **Text density comes first, and it applies at every width.** On a tilted
  block each line starts at a slightly different x, so the eye has to re-find
  the left edge on every return sweep. Over two lines that is invisible and
  reads as charm; over twenty it accumulates into something that reads as
  broken. So **anything carrying sustained running text stays level (0°) at
  every width**: Home's Welcome letter, Devlog, About's passport, and the
  Creations book — closed cover and open spread alike.

  This rule used to apply below `md` only, with the desktop tier governed by
  width alone ("not by how much text an object holds"). That split was the
  inconsistent half: the reading cost does not switch off at 768px, it is just
  easier to notice on a phone. The passport was the only object the two tiers
  actually disagreed about, and it now reads calmer level.

  **Width and edge-proximity still govern everything else** — the visible skew
  of a fixed angle grows with an object's width, and a tilt next to a straight
  reference line reads as an error rather than character. So wide or full-width
  panels and anything stacked against a straight edge stay level too: the Now
  intro card, the Colophon card, and the work-timeline note strips (they line up
  against the timeline's vertical spine — their acronym badges stay tilted, so
  the character lives in the small tag pinned to a level note).

  Keep the tilts that remain small (≤ ~3°, and ≤ ~1.5° on anything wider than a
  compact card), vary the direction per object so a row doesn't look
  mechanically repeated, and never overdo it.

- **Tape, pins, and stamps.** `<Pin>`, `<Tape>`, and `<Stamp>` (in
  `src/components/ui/`) are small decorative primitives — a pushpin, a washi-
  tape strip, and the Celeste postage-stamp image — that reinforce the
  pinned-to-a-board metaphor. All are `aria-hidden`, purely decorative.
  **`<Tape>` must be counter-rotated against whatever it is taping.** A strip
  sitting inside a rotated card inherits that card's exact angle, and two
  objects moving as one rigid unit read as printed together rather than placed
  by hand — the mismatch between the tape's angle and the object's is most of
  what sells the gesture. The polaroid tilts `+3°` and its tape `-6°`. This
  applies to `<Tape>` only: `<Pin>` is radially symmetric, so it has no angle to
  mismatch, and `<Stamp>` carries its own fixed tilt.
- **The record sleeve.** The AiAi cameo lives inside the Spotify card as the
  sleeve the vinyl is being drawn out of: a square panel flush left, the disc
  flush right, in a `1.58 : 1` wrapper so both are `h-full` squares and 58% of
  the disc shows past the sleeve's edge. The sleeve paints **in front** (it is
  later in the DOM), which is the direction that reads as "being pulled out"
  rather than "resting on top", and an inset hairline near its top edge stands
  in for the sleeve's opening. The point is the adjacency: every other object on
  Home _is_ something, and before this the cameo was a GIF in a box — the only
  object on the board described by its file format.
- **`--color-paper`** — warm note-paper stationery, used for the Welcome letter
  and the Devlog scroll box, and — paired with a **dashed** ink border — for the
  site's two "not yet" placeholders: the work timeline's Pending entry (with its
  `???` badge) and Achievements' Locked card. Dashed border plus warm paper reads
  as a blank form waiting to be filled in, which is exactly what those entries
  mean, so this is a legitimate stationery use rather than tint drift. The Locked
  card's fill is **not optional**: without it, that card's text sat directly on
  the sky photograph, where contrast cannot be measured at all.
- **`--color-kraft`** — a warm material accent used for Devlog's and Steam's
  ruled lines — never used as text. Steam carries a rule under **both** stat
  rows, not only the last: one rule reads as an underline, and it is the
  repetition that reads as a due-date slip. Devlog's ruling repeats every 20px
  to match its line grid (see Spacing scale) and **must** carry
  `background-attachment: local` — the default pins the background to the
  element, so the rules would hold alignment only at scroll position 0 and drift
  off the text as soon as you scrolled.
- **`--font-hand` (Caveat)** — signatures, photo captions, the tech-stamp
  hover notes (the note itself rides a small opaque `border-2 border-ink
bg-white shadow-sticker` tag so it reads over the sky), handwritten date-stamp
  captions (an achievement card's "Unlocked · …" line), and the footer's
  per-page aside; never body copy (see Type). The footer aside is handwritten so
  it reads as a scribble in the margin rather than as a second line of
  fine print — it and the copyright line sat at identical `text-xs text-gray-600`
  before, which classified the joke as boilerplate and got it skipped.
- **`--color-live`** — the Live Reaction cam's REC cue, and the border (never
  the text — see Accessibility) of Steam's decorative library-card date
  stamps.
- **Inline SVG stroke-width scale.** Three tokens: `--stroke-fine` (`1.5`,
  hairlines/rings/sub-16px detail), `--stroke-regular` (`2`, default line-art
  icons 16–40px), `--stroke-bold` (`2.5`, heavier affordances). Applied via
  `style={{ strokeWidth: "var(--stroke-…)" }}` so glyphs share one source of
  truth. `Chevron` (`src/components/ui/`) takes it as a **prop**, defaulting to
  `--stroke-bold`. About's passport pager is the sole exception on the site and
  passes `strokeWidth="3"` explicitly — thinning those arrows to the token
  visibly weakens them, so it stays a literal, documented one-off, and making it
  a per-call-site prop is what stops a second copy of the exception drifting in.
  Creations' book pager takes the default.
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

### The Creations book

Creations is a stack of **books lying face-up on the board** — one per project,
closed by default, opening into a two-page spread. The section deliberately has
no shelf, case, or rack: nothing else on the site is stored in furniture, every
object simply sits on the board, and a shelf would also collide with Steam's
library-card widget.

**The proportions are the whole illusion.** A closed book is ONE page wide and
exactly as tall as the pages inside it, so the cover is `md:w-1/2` against the
open spread's full width and both are `md:h-[30rem]`. Opening therefore unfolds
the object rightward at a constant height, instead of changing width and height
at once — which is what made an earlier full-width, short cover read as a card
that swapped for a book. Below `md` the spread is already a single column, so the
cover matches it at full width and takes its natural height. It is **centred**
on the column and **level at every width** — see the tilt rule above.

**Closed** (`Book.jsx`) — flat, square-cornered linework throughout:

- **The page block.** A `paper` rectangle offset **4px** down-right behind the
  cover, carrying the `shadow-sticker` for the whole book since it is the lowest
  layer. This is what makes the object read as thick rather than flat, and it is
  the drawn convention for book depth, not a literal top-down view. Keep the
  offset small: at 7px the cover visibly floated off its own pages.
- **The spine**, a full-accent fill down the left edge (no text on it, so a
  bright accent is legal), with **head and tail bands** capping its ends.
- **A blind-stamped rule frame** inset from the cover edge, at
  `--opacity-accent-line` — the plain ruled rectangle an old cloth binding
  carries.
- **The device** — the project's own mark, _redrawn_ in ink linework rather than
  imported. Statmon's favicon is a gradient on a rounded tile, and neither
  crosses over; its Poké Ball is a circle, which the round-accent rule above
  already allows, so the tile and gradient are dropped and the ball is kept.
  **Translate a project's mark into this grammar; never paste it in.** Statmon's
  Poké Ball keeps its circle and loses its tile and gradient; Inbox's mark keeps
  its three rectangles and loses its rounded tile, with the brand orange becoming
  a palette accent. Each book names its mark as a string in `src/lib/projects.js`
  and `Book.jsx` maps that to the drawing, because the data file holds no JSX.
- **A cue that it opens.** Nothing about a cover says "this one is a button",
  and the hover lift only appears once you are already on it. A short line in the
  site's handwriting (`font-hand`, "open me up" with a drawn arrow) sits inside
  the clickable region and does the job — handwriting reads as a note pointing at
  the object rather than as a third control competing with the two links.
- **The imprint says what the project IS**, not where it sits in a sequence —
  `A personal project · 2026`, `Capstone for Inbox · 2026`. Volume numbers were
  tried and dropped: the books are ordered by what should lead, not by date, so
  numbering them read backwards the moment an older project sat below a newer
  one. Naming the kind of work also puts the most useful fact about a project on
  the outside of it, where someone who never opens the book still sees it.
- **Nothing else.** The cover is the mark, the title, a blurb, the cue, the two
  links, and the imprint at the foot — one centred cluster, not a content block
  pushed up with links pinned down, which leaves a void through the middle. It
  carries **no screenshot**: Statmon's social image is a centred Poké Ball above the wordmark
  above the tagline, which is the same three things in the same order as the
  cover itself, so pasting it in would have printed the cover's contents twice.
  The cover **is** that image, redrawn in paper. Check for that overlap before
  putting art on any future cover.

**Both cover links are plain white**, not a soft tint each. The site's usual
move is a different tint per item (the footer badges, Links' post-its), but those
sit on the sky; on a violet cover a rose and a blue chip made three hues fight.
White reads as a pair of controls belonging to the cover.

**The links appear twice per project, and that is deliberate** — on the cover and
again in the colophon at the back, which is how a real book works: the essentials
on the jacket, the production details inside. The reader most likely to want a
link is the one who has just finished reading, and by then the cover is no longer
in front of them; without the colophon pair they would have to close the book to
reach one. Both placements render the same `ProjectLinks` primitive so they
cannot drift.

**Links live on the cover, and the overlay button stops short of them.** The
cover is click-to-open, but a `<button>` may only contain phrasing content, so
neither the title `<h3>` nor the two `<a>`s can sit inside one. The mark, title
and blurb are wrapped in a transparent overlay button; the links are a **sibling
below it**, so the markup stays valid and both are independently reachable. Any
future click-the-whole-card object should copy this arrangement rather than nest.

**Open** (`BookSpread.jsx`) — `Panel` + two `Cell`s with `md:grid-cols-2`, so the
primitive's 2px ink seam becomes the **gutter**. The passport uses the same
primitive with `md:grid-rows-2`, a horizontal fold; a book's is a vertical spine,
which is what keeps the two objects from reading as the same thing. Then:
**running heads** (verso the book's title, recto its chapter — the print
convention, and never both on one spread) and **folios** that are real page
numbers, incrementing across turns.

**The first spread is pages 1–2, which puts odd numbers on the left.** That
inverts the print convention deliberately. This book's title page already sits on
the verso rather than the recto, so it was never a faithful opening, and
numbering from the inside-front-cover meant the book opened on page 2 — a worse
thing to explain to a reader than a broken pedantry is to a typographer.

**The book's own furniture carries the controls; nothing floats beneath it.**
Page-turn chevrons sit in the **outer bottom corners** beside the folios, where a
thumb turns a page, with no border or fill of their own so they stay quieter than
the page. The **bookmark ribbon closes the book** — the thing you reach for when
you put one down — using Devlog's notched tab shape widened to carry its label.
It sits **behind the pages and pokes out of the top**, the way a bookmark
actually sits in a book, which is why the open article carries `mt-6` to clear
the intro card above it. Being behind has a real cost worth knowing: a
`clip-path` clips hit testing and the covered part is unreachable, so **the
visible 32px is the entire target**. That clears the 24px floor under
Accessibility → Touch targets but not the 44px the nav and footer badges take,
which is accepted here. It takes `orchid-soft`, not the full `orchid` of the
decorative version, because it now has text on it and `ink` on full orchid
measures ~3.3:1. A row of white
buttons under the book was tried first and read as site chrome parked beneath a
paper object rather than as part of it.

**Both pages turn together.** A spread where only one page moved would give the
whole thing away. Interaction is lifted from `Passport.jsx`: clamped `go(n)`,
bounds-disabled arrows, and the start/end-delta swipe that ignores a mostly
vertical drag rather than stealing it from the page scroll.

**A plate gets a printed caption**, set in the Small/meta role rather than the
site's handwriting: `font-hand` covers photo captions, but a book sets a figure
caption in type, and this one describes the image rather than joking about it. It
also stops a plate page from ending in dead space.

**The cells must carry `min-h-0`, and this is not optional.** A grid item
defaults to `min-height: auto` and so refuses to shrink below its own content.
Without it an over-long page did not scroll — the cell grew past the panel's
fixed height and the text spilled outside the book's border, 55px past it in the
case that found this. The inner `overflow-y-auto` never engaged, so a check that
only asked "did the page scroll?" reported success while the book was visibly
broken. **Verify the geometry, not the scrollbar:** the panel must measure its
fixed height and every cell must sit inside it.

**A book doesn't resize when you turn a page**, so the spread is a fixed height at
`md` and auto below it (the passport's call, for the passport's reason — nested
scroll on a phone leaves the reader unable to predict which thing moves).
**The consequence is editorial: chapter copy is written to a page budget.** A
page that overruns scrolls rather than breaking, but a scrolling book page reads
as an overflow bug, so trim to fit instead. Roughly three short paragraphs per
prose page at the design width; the budget note lives with the copy in
`src/lib/projects.js`.

**The copy is the site's voice, not a portfolio's.** The books carry the longest
prose on the site, which makes them the easiest place to drift into sounding like
a CV. They follow Home's Welcome letter and Now's notes instead: contractions
throughout, asides in brackets, the odd exclamation mark, and a real willingness
to say what went wrong. Concrete beats impressive — "that's how I found out
Dragon was too dark to read" earns more than "a rigorous contrast audit" does.

**`--color-paper` extends to book pages and the page block.** The token is
otherwise reserved for stationery, but a book's pages are the most literal paper
on the site, and it puts the book in the same material family as the Welcome
letter and the Devlog scroll.

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
  signature rule, and Weather's "CANADA" stamp caption and Postmark clock line.
  Devlog is a further exception, and it is now a **grid** rather than a set of
  one-off values: every line in the scroll region is exactly 20px tall
  (`text-sm` at its natural 20px leading, the timestamp forced to `leading-5`,
  and `pb-5` closing each entry), so the kraft ruling can repeat every 20px and
  land under **every** line — including the second and third lines of a wrapped
  commit message. `left-1.75` / `top-1.25` remain exact pixel math tying each
  commit node to the vertical spine; they are measured from the entry's top-left
  and so are unaffected by the entry's height. Verified after the change: node
  centre and spine centre both land on the same subpixel.

  **Devlog's height is constrained twice over.** It must be `24 + 20k` px so the
  paper never ends mid-rule (the 24 is the container's `py-3` top and bottom), and
  it was originally chosen so the Spotify + Devlog stack roughly matches the
  height of the Steam card beside it — a deliberate Row 3 balance, not an
  arbitrary number. `h-36` (144px, `k = 6`) satisfies the grid and shows exactly
  two full commits; it leaves the right column ~45px taller than Steam, which
  reads fine because the row is `md:items-center` and the two centre against each
  other. The next legal step down is 124px. Don't change this to a value off the
  `24 + 20k` grid.
  Separately, `w-[..]` fractions (Credits' sign-off `w-[60%]`) aren't
  spacing-scale values at all — they're the same class of intentional
  per-widget **layout width** as Home's `md:w-[65%]` row splits, not something
  this scale governs. (Steam's title no longer uses a `max-w` fraction; it wraps
  via `min-w-0 wrap-break-word`.)

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
red date stamps, both stat rows sitting on kraft rules; **Weather is an Ottawa
postcard, and it obeys real postcard anatomy** — the message (temperature and
condition) on the left, postage in the top-right corner, the postmark ring
cancelling the stamp by overlapping it, and a full-width skyline silhouette
across the bottom. The stamp carries country and design (a maple leaf and
`CANADA`), never the mailing city — the city belongs to the postmark, which is
also what carries the live clock. **The Welcome card is a letter, not a second
postcard**; that distinction is what keeps Weather's stamp-and-postmark gag
distinctive, so don't give Welcome postage. The Devlog panel is a fixed-height
scroll region — a git-graph timeline with a full-height ink spine and rose
square nodes per commit, written on kraft-ruled note paper whose rules land
under every line of text (see Spacing scale), scrolled with a custom chunky
scrollbar (`.devlog-scroll`, built from the `ink` / `primary` / `primary-soft`
tokens) — an intentional styled element, not the default UI scrollbar. All obey
the same grammar.

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
  fill toward a faint cool tint (`hover:bg-primary-soft` — from white on most
  cards, and from `blue-soft` on the Spotify card, which is not white to begin
  with). Use `transition-colors`, nothing flashy. **Never hover a card onto a
  full accent while `ink` text sits on it** — `violet` and `orchid` measure
  ~3.8:1 and ~3.3:1 against `ink`, both below AA. The footer badges used to do
  this and now lift instead (see below).
- **Hover lift, not fill, on the handcrafted layer.** Objects that already carry
  `shadow-sticker` — the tech stamps, Links' post-its, the footer badges —
  signal hover with a small `-translate-y`, mirrored on `:focus-visible`. This
  is the site's standard hover cue for pinned objects, and it sidesteps the
  contrast trap above entirely.
- **Nav underline is two-stage.** An inactive link has no underline at rest;
  on hover it takes an `on-ink` (off-white) underline while its label brightens
  to `on-ink` in the same motion; the **active** link wears its section hue.
  Neutral on preview, identity on commit — the hue only ever appears on the page
  you are actually on.
- **Active nav:** the current link is `on-ink` (off-white) with its section-hue
  underline and `aria-current="page"`; inactive links are `on-ink-muted`. The
  weight does **not** change (see Type → Weight rule).

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
  | `label` on masthead/footer band         | ~5.7:1  |
  | `label` on the darkest soft tint        | ~4.6:1  |
  | `on-ink` on the nav bar                 | ~10:1   |
  | `on-ink-muted` on the nav bar           | ~5.5:1  |

  This also holds on the tinted cells (`paper`/`rose-soft`/`blue-soft`/
  `violet-soft`/`orchid-soft`) — they're all light enough that `ink`/`gray-700`/
  `gray-600` text keeps AA (`gray-600` on the darkest of them, `orchid-soft`,
  measures ~5.3:1); never drop a darker accent color in as a fill
  behind body text without rechecking.

  **`label` on a soft tint used to fail, and this table is why it went
  unnoticed.** The row above only ever certified `label` against the
  masthead/footer band, and the paragraph only ever certified `ink`/`gray-700`/
  `gray-600` against the tints — so the one pairing nobody had measured was the
  `<Eyebrow>` default (`label`) sitting on a tinted card, which is a pattern the
  site uses constantly: Now's eleven stickies, About's timeline and achievement
  cards, Home's Spotify card, and every book cover. Measured across the rendered
  page it came to **4.03–4.31:1 against the four tints — 21 failing elements**.
  Fixed at the token: `--color-label` was darkened 8% (`#625AA0` → `#5A5393`),
  which clears 4.5:1 on **every** opaque fill on the site and leaves the
  label/`ink` two-tone relationship intact. No component changed.

  The lesson for this table: a pairing is only certified if the _specific_
  foreground and the _specific_ background were both measured together. Certify
  the roles against the fills as a grid, not as two separate sentences. Icon glyphs (`SimpleIcon`, the footer
  `Badge`s, `TechStack`'s Java glyph) render in plain `ink`, not brand color, so
  they're already AA-safe against every tint with no per-icon hue check needed.

- **Landmarks:** `<header>` (banner), `<nav aria-label="Primary">`, `<main>`,
  `<footer>`. One `<main>` per page.
- **Headings:** single `h1`, ordered levels (see semantics note).
- **Images:** every `<img>` has meaningful `alt` (decorative-only images get
  `alt=""`).
- **State not by color alone:** the active nav link is signalled by the
  **presence** of an underline (a shape difference, not a hue one) plus
  `aria-current="page"`; section identity is also in the title text. Bold weight
  used to be a third signal and no longer is — the label is `semibold` in every
  state so its width cannot shift (Type → Weight rule).

  One bounded exception: while an inactive link is **hovered**, it and the
  active link differ only by underline hue (`on-ink` vs the section colour).
  That is accepted — hover is transient, pointer-only, and applies to exactly
  the one link under the cursor, whose identity the user already knows; at rest
  the distinction is underline presence, and `aria-current` carries it
  programmatically at all times.

- **Images stay crisp:** never render a raster above native size (`max-w` caps
  only; no upscaling).
- **Motion:** CSS animations — `animate-vinyl` (the Spotify record spins while
  a track is playing), `animate-blink` (the Live Reaction REC dot),
  `animate-marquee`, and `animate-eq` — always play, by design; small and
  decorative, this intentionally does not honor `prefers-reduced-motion`, the
  same deliberate choice as the site's small decorative GIF cameos (the Live
  Reaction cam and footer mascot, both Celeste; the AiAi sleeve inside the
  Spotify card; and TechStack's closing Isaac stamp), which are likewise a
  deliberate exception and keep playing; keep any GIFs small and non-essential.

  **This is a stated position, not an oversight.** Home can run roughly ten
  always-playing animations at once, and the aggregate was reviewed as a whole
  rather than one animation at a time. The site exists to emulate the old
  personal web, where that restlessness is the point; the owner has accepted
  that this is not fully compliant, knowingly and for that reason. Do not
  "fix" it by gating the cameos on `prefers-reduced-motion` — reopen the
  decision with him instead.

  The marquee's soft
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
Spotify card over Devlog, both full-width in that column; and finally a
full-width TechStack strip closing the page, ending with a decorative,
`aria-hidden` Isaac GIF stamp (an easter-egg cameo, not an eighth tool). The
AiAi cameo is **inside** the Spotify card, not beside it — it is the record's
sleeve (see Handcrafted layer), which is what frees this column for the card and
is why the record is larger here than when the sleeve sat alongside.
Widget headings
that aren't already on an opaque card float as `LabelTag` strips above their
object (Steam's "What I've been playing" matches Links' "Get in touch",
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

**The process contract lives here too.** An earlier draft deferred it to a
`CLAUDE.md` that has never existed in this repo, which left the rules below
written down nowhere. They are:

- **The floor is 320px.** Nothing may overflow horizontally at that width.
- **Two tiers only** — base (320–767px) and `md:` (768px). No `sm:`, `lg:`,
  or `xl:`. See **Tiers** below for why the boundary is `md`.
- **Verify at 320 / 375 / 768 / 1024** before calling a layout change done, and
  measure rather than eyeball anything that claims to line up — the passport's
  tab widths and Devlog's rule alignment were both settled by reading
  `getBoundingClientRect()` in the browser, and in both cases the arithmetic
  done on paper first had been wrong.

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
- **Tilt no longer changes between the tiers, with one exception.** The
  text-density rule under **Handcrafted layer → Slight rotation** applies at
  every width, so the objects that stay level do so everywhere: Home's Welcome
  letter and Devlog, About's passport, and the Creations book. What changes below
  `md` is only that _more_ objects meet the "wide" half of the rule — at 320px
  every panel is full width — which is why the caps below still matter.

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

  **The Creations book was briefly an exception and no longer is** — worth
  recording, because the reasoning nearly added a permanent margin for nothing.
  Its page block is a real second layer offset 4px down-right, so its overhang
  is that 4px plus the 4px shadow, where a plain card only pays the shadow. At a
  1° tilt the book was tall enough to add ~4px a side on top of that, which
  crossed the 12px gutter and earned it an `mx-1`. Straightening the book (see
  the tilt rule above) removed the tilt's share, and 8px fits the gutter with
  room to spare, so the margin came back out. Measured at 320px: no horizontal
  overflow without it.

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

**The passport tab strip.** Every tab is labelled, including the inactive ones —
they used to render blank, so a visitor could not tell what was on a chapter
without opening it. Labelling them set the heights: `text-sm` needs about 28px,
and the active tab must still stand proud of its neighbours, so the pair is
**28px inactive / 44px active** in an `h-11` strip. The **16px pop is unchanged**
from the original 16/32, so the transition feels identical; the strip simply
costs 12px more vertical space. 44px also lands on the touch-target size above.
The `<button>` is a full-height target at all widths and the tab shape lives on
an inner `<span>`, so the affordance is unchanged and only the hit area grows.
Since each button now has real text content, the `aria-label` that used to name
the blank tabs is gone as redundant, and the active state rests on **height plus
`aria-selected`** — both non-color signals, so the rule under Accessibility
still holds.

At 320px the strip is ~272px, so the four tabs get ~62px each and `Workflow` —
the longest label — needs ~60px. It fits, but only because the strip tightens to
`gap-1 px-2` below `md`. **Verified by measurement, not by eye:** 67px per
button, no overflow and no wrapping. If a longer chapter name is ever added,
that is the constraint it has to clear. Desktop metrics are
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
  (`"label"` default, `"ink"` for an overline that must read as primary text on
  a light fill, `"on-ink"` for a dark fill like Live Reaction's label bar) that
  supplies the one text-color class the element gets. **Never re-type the
  Overline class string inline and never pass a competing text-color through
  `className`** — add a `tone` instead, so an element never carries two color
  utilities whose winner depends on Tailwind's source order. The `ink` tone
  exists because the footer `Badge` needed exactly that and the alternative was
  a second color class.
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
- **`ProjectLinks`** — a project's live/source pair, rendered on both the book's
  cover and its colophon so the two can't drift. On the cover it must stay a
  SIBLING of the overlay open-button, never a child of it.
- **`Chevron`** — the nav arrow shared by About's passport pager and Creations'
  book pager (`dir` / `className` / `strokeWidth` props). It was a local copy in
  each before, which is how the passport's documented `3` nearly became an
  undocumented second one; the stroke is a prop so that exception stays explicit.
- **`Pin`** / **`Tape`** / **`Stamp`** — the handcrafted-layer decorative
  accents (see Handcrafted layer above). All `aria-hidden`.

---

## Assets

Every image is served at or below its native size (see **Accessibility → Images
stay crisp**), and the whole `src/assets/` directory is preloaded on mount by
`App.jsx` — its glob covers `png,jpg,jpeg,gif,webp,svg`, and **anything not on
that list is silently skipped**, so a new format has to be added there or the
preload quietly stops covering it.

Because everything preloads, total weight is a real budget rather than a
per-image concern. It currently sits near **1.1 MB**, of which the two animated
cameos are the bulk.

**`src/assets/books/` is deliberately a subdirectory, and that is load-bearing.**
`App.jsx`'s glob is `./assets/*.{…}` — a single `*`, which does not match across
a `/` — so nothing nested inside `assets/` is preloaded. Creations' book art
therefore costs a visitor who never opens that section nothing, which is the
right trade for art behind a click. The alt-text flash the site-wide preload
exists to prevent is handled instead by `Creations.jsx`, which warms its own glob
once on mount. **Any future art that belongs to one section should go in its own
subdirectory for the same reason** — but it then has to bring its own warming, or
it will flash. Art that belongs to the whole site stays at the top level.

### Do not re-encode the animated GIFs

Both cameos were once "optimized" and came back visibly corrupted. Three
separate causes, all measured, all worth avoiding by name:

1. **`-layers optimize` corrupts frames.** Its transparency pass does not
   round-trip the disposal method — a single frame measured **8,218 differing
   pixels out of 19,026** against its source. Use `-layers optimizeframe` if you
   need frame optimization; it is the safe half.
2. **ImageMagick's WebP writer silently drops frames.** Isaac's 35 frames came
   out as 24 (lossless) and 19 (lossy). The animation itself changes, quite
   apart from any quantization.
3. **Lossy WebP is the wrong codec for this artwork.** Both cameos are flat-
   colour game art; lossy quantization puts visible noise into exactly the areas
   that should be flat.

If a GIF must be re-processed, **`-dither None` is required** — without it,
palette remapping alone introduced ~4,300 differing pixels across 32 frames.
With it, the trim was provably **pixel-identical to the source**, verified frame
by frame with `magick compare -metric AE`. Verify that way rather than trusting
the file to look right at 80px.

### What was already done

- **`monkey-ball-aiai.gif`** — 1.87 MB → **416 KB**. The file stored the same
  2.24-second, 32-frame loop **five times over**; it is trimmed to one cycle and
  is pixel-identical to the original. Detected by comparing frame 0 against every
  other frame: matches recurred exactly every 32 frames, well below the
  adjacent-frame difference. There is nothing left to trim here.
- **`tboi-thumbs-up.gif`** — 1.21 MB → **166 KB**, by downscaling 498px → 128px
  (it renders at ~64px). All 35 frames intact. It has no repeating cycle — it
  opens on a static hold — so frame-trimming would cost real animation.

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
- **Do** give each object a reason to be the thing it is. Every widget on the
  board depicts something — a letter, a polaroid, a facecam, a postcard,
  post-its, a library card, a record, a scroll, rubber stamps, a book. If a new
  object can only be described by its file format, it isn't finished.
- **Do** translate an outside mark into this grammar rather than pasting it in.
  Statmon's favicon arrived as a gradient on a rounded tile and was redrawn as a
  flat ink Poké Ball; a screenshot that does earn a place gets an ink frame, and
  the clash between the dark art and this board is the thing to design with
  rather than sand off. **And check first whether the import would just repeat
  what the page already says** — Statmon's social image lost its place on the
  book cover because it is the same mark, title and tagline the cover itself
  carries.
- **Do** counter-rotate tape against what it tapes, and vary a `LabelTag`'s tilt
  against the card beneath it — two objects at the same angle read as printed
  together, not placed by hand.
- **Don't** hover a card onto a full accent with `ink` text on it; `violet` and
  `orchid` fail AA that way. Lift instead.
- **Don't** re-encode the animated GIFs through `-layers optimize` or
  ImageMagick's WebP writer — both corrupt them in ways that are invisible until
  they aren't. See **Assets**.
- **Don't** let a label and its value disagree. Steam once showed a two-week
  playtime figure under a "This Week" heading, with the correct span only in its
  `aria-label` — sighted users got the wrong reading and screen-reader users got
  the right one.
