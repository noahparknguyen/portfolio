import statmonHome from "../assets/books/statmon-home.webp";

// The Creations book stack. One entry per project; each renders as a book lying
// on the board (Book.jsx) that opens into a two-page spread (BookSpread.jsx).
//
// VOICE — match the rest of the site, not a portfolio. Read Home's Welcome
// letter, the passport's Bio/Hobbies chapters and Now's notes before writing
// here: contractions throughout, asides in brackets, the odd exclamation mark,
// and a real willingness to say what went wrong or what he's bad at. Concrete
// beats impressive ("Dragon was too dark to read", not "a rigorous audit").
// Nothing that sounds aimed at a recruiter.
//
// PAGE BUDGET — a book doesn't resize when you turn a page, so the spread is a
// FIXED height at md (BookSpread.jsx). Prose pages hold roughly three short
// paragraphs (~120 words) at the design width. Copy that overruns doesn't break
// the layout — the page scrolls, same as the passport's chapters — but a
// scrolling book page reads as an overflow bug, so trim to fit instead.
//
// Page kinds: "title" | "prose" | "plate" | "stats" | "colophon".

const statmon = {
  id: "statmon",
  title: "Statmon",
  imprint: "Volume One · 2026",
  summary:
    "A little set of Pokémon tools. Compare two of them head to head, or sort the entire dex by whatever stat you care about.",
  liveUrl: "https://statmon.noahparknguyen.workers.dev/",
  repoUrl: "https://github.com/noahparknguyen/statmon",

  // The cover wears violet-soft with a full-violet spine — the soft tint and
  // its own accent read as one bound object, and neither touches the
  // orchid-soft intro panel above (STYLE_GUIDE.md → Shape & surface).
  coverTint: "bg-violet-soft",
  spineTint: "bg-violet",

  spreads: [
    {
      chapter: "Why I made it",
      verso: { kind: "title" },
      recto: {
        kind: "prose",
        paragraphs: [
          "Sometimes I like to go on a nostalgia trip and play a ton of old childhood games. One summer I decided to go through every single mainline Pokémon game, generation 1 straight through to generation 5.",
          "During each playthrough I’d hit a fork in the road where I had to pick between two Pokémon, and what mattered most to me was speed and attack. So I’d go hunting for a site that put two of them side by side. The problem was they either looked a little outdated or were cluttered with features I didn’t need.",
          "That’s the moment I had the idea for Statmon — a personal tool with all the bloat and fluff stripped out, that gave me exactly what I wanted.",
        ],
      },
    },
    {
      chapter: "What it does",
      verso: {
        kind: "plate",
        src: statmonHome,
        alt: "The Statmon home page — the wordmark above a live comparison board, with Volcarona and Chandelure illustrations either side of it",
        width: 720,
        height: 440,
        caption:
          "The home page. That’s Volcarona and Chandelure on either side of a live comparison — my two favourites, and the reason the whole site ended up purple.",
      },
      recto: {
        kind: "prose",
        paragraphs: [
          "The comparison is the main event. You pick two Pokémon and it lays their six base stats out side by side as type-coloured bars, with the gap in the middle and an arrow pointing at whoever takes that row. Then the total, and a straight answer on who moves first — speed and attack were what I cared about mid-playthrough, and speed is the one that decides fights, so it gets its own line.",
          "The dex table came later, for the other half of the question — not “which of these two” but “who’s the fastest thing in the whole game.” It’s all 1,259 of them in one table you can sort and filter however you want.",
          "Both of them keep everything in the URL, so whatever you’re looking at is a link you can send to someone.",
        ],
      },
    },
    {
      chapter: "How it’s built",
      verso: {
        kind: "prose",
        paragraphs: [
          "React, Vite, Tailwind and plain JavaScript, sitting on Cloudflare. Nothing clever — I wanted to spend my time on the actual thing instead of agonizing over the stack.",
          "The part I’m smug about is that Statmon doesn’t call an API at all while you’re using it. Everything comes from PokéAPI, but it gets pulled once at build time into a local file, and every sprite and piece of artwork is downloaded and committed straight into the repo.",
          "So the live site is just static files. It can’t fall over because someone else’s API is having a rough day, and it keeps me well inside PokéAPI’s fair-use rules.",
        ],
      },
      recto: {
        kind: "stats",
        items: [
          { value: "1,259", label: "Pokémon in the dataset" },
          { value: "2,513", label: "images living in the repo" },
          { value: "0", label: "API calls while you use it" },
          { value: "94", label: "tests keeping me honest" },
        ],
        note: "The stat math, the dex sorting and filtering, and a render check on every page all have tests behind them. There’s even a script that checks all eighteen type colours for contrast — that’s how I found out Dragon was too dark to read.",
      },
    },
    {
      chapter: "Notes in the margin",
      verso: {
        kind: "prose",
        paragraphs: [
          "When I finished the site I was happy with how it looked. Right up until I realized it looked exactly like every other site I’d made.",
          "Dark mode, minimalist, gradients everywhere — all the same trends your typical AI-generated site follows.",
        ],
      },
      recto: {
        kind: "prose",
        paragraphs: [
          "The real problem was the gradients — that’s the tell, more than anything else. So I toned them right back and leaned on the colour instead. Chandelure has these really nice purples that don’t need anything done to them; they look good on their own.",
          "There are still a couple of gradients in there, but they get used sparingly now. I think it worked out great — the palette made it look like its own thing, and tying the design to my two favourites gave it some sentimental value too.",
          "From there things sort of snowballed, and I ended up with something well outside my comfort zone.",
        ],
        // The site's handwriting, used the way the footer aside and the tech
        // stamp notes use it — a scribble in the margin, not body copy.
        marginNote: "still the best call I made on this one",
      },
    },
    {
      chapter: "Colophon",
      verso: {
        kind: "colophon",
        stack: [
          "React",
          "Vite",
          "Tailwind",
          "React Router",
          "Vitest",
          "Cloudflare Workers",
        ],
      },
      recto: {
        kind: "prose",
        paragraphs: [
          "The data and the images all come from PokéAPI, whose sprites are CC0. Pokémon belongs to Nintendo, Game Freak and The Pokémon Company — Statmon is an unofficial fan project and it’s staying that way.",
          "My own code is MIT, so help yourself. The working notes are in the repo too: the original brainstorm, the design system, and a dated log of every decision and why I made it. That last one’s probably the most honest thing in there.",
        ],
      },
    },
  ],
};

const PROJECTS = [statmon];

export default PROJECTS;
