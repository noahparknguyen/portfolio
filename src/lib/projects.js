import statmonHome from "../assets/books/statmon-home.webp";
import hubspotReport from "../assets/books/hubspot-report.webp";

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
  mark: "pokeball",
  title: "Statmon",
  imprint: "A personal project · 2026",
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

const hubspot = {
  id: "hubspot",
  mark: "inbox",
  title: "HubSpot Recommendation Tool",
  imprint: "Capstone for Inbox · 2026",
  summary:
    "A discovery tool for a HubSpot partner. Paste in a website and it works out what that site runs, then lines each tool up against the HubSpot product that could replace it.",
  liveUrl: "https://hubspot-recommendation-tool.onrender.com/",
  repoUrl: "https://github.com/noahparknguyen/hubspot-recommendation-tool",

  // Blue-soft against Statmon's violet-soft: adjacent covers must not share a
  // tint (STYLE_GUIDE.md → Shape & surface).
  coverTint: "bg-blue-soft",
  spineTint: "bg-blue",

  spreads: [
    {
      chapter: "Why it exists",
      verso: { kind: "title" },
      recto: {
        kind: "prose",
        paragraphs: [
          "In my second-to-last term at college I got put on a team of five and handed a real client — an actual company my professor had lined up. Eight months with them: four to plan, four to build.",
          "Inbox is a HubSpot partner. It took us a while to pin down what they actually wanted, but it came down to this: a client comes to them with an existing site, and Inbox has to figure out what it’s running and what could be consolidated into HubSpot instead.",
          "That part was all manual. So we built them a shortcut. It doesn’t do the discovery for them — it just gets them to the interesting part faster.",
        ],
      },
    },
    {
      chapter: "What it does",
      verso: {
        kind: "plate",
        src: hubspotReport,
        alt: "A row of the generated report: a detected technology and its category, a description, and the HubSpot product that could replace it",
        width: 760,
        height: 322,
        caption:
          "Every detected technology, lined up against the HubSpot product that could replace it.",
      },
      recto: {
        kind: "prose",
        paragraphs: [
          "Paste in a URL and it fetches the page, fingerprints everything it can find, and matches each detection against a HubSpot product.",
          "Ten separate matchers read the page — headers, cookies, script sources, meta tags, inline scripts, CSS, the DOM — and their guesses get combined into one confidence score. Then it resolves the relationships between technologies, because knowing a site runs WordPress tells you a lot about what else is probably on it.",
          "The mapping from a detected tool to a HubSpot product is a JSON file rather than code. That was deliberate: Inbox can add or reword a recommendation themselves, without needing a developer.",
        ],
      },
    },
    {
      chapter: "How it’s built",
      verso: {
        kind: "prose",
        paragraphs: [
          "Node on the back-end with no framework at all — just the built-in http module. React and Vite on the front. The whole thing ships as one Docker container.",
          "Everything the detector knows comes from an open dataset of technology fingerprints: about three megabytes of patterns, loaded into memory once and kept there. The site being analyzed is fetched live, but the knowledge is all local.",
          "The part I spent longest on after it already worked was making it safe to point at a stranger’s URL.",
        ],
      },
      recto: {
        kind: "stats",
        items: [
          { value: "10", label: "matchers read every page" },
          { value: "5", label: "phases in the pipeline" },
          { value: "110", label: "tests behind it" },
          { value: "0", label: "back-end frameworks" },
        ],
        note: "It refuses to fetch anything on a private network and re-checks on every redirect hop, caps how much it will download, and rate-limits the whole thing. The security doc is honest about the one hole I couldn’t close on my own, which felt more useful than pretending.",
      },
    },
    {
      chapter: "Working with a client",
      verso: {
        kind: "prose",
        paragraphs: [
          "I’d worked with clients before at my DND co-op, but there our team lead always ran the meetings. This time there was nobody above me to do it, so I took it on — ran the calls, demoed every couple of weeks, asked whether the design was right and whether the output was what they needed.",
          "Honestly it was a personal test. I wanted to know if I could do the thing I’d only ever watched someone else do, so I copied my team lead’s approach as closely as I could.",
          "Every week: great work, no complaints. That did a lot for my confidence.",
        ],
      },
      recto: {
        kind: "prose",
        paragraphs: [
          "The detection engine was the hard part. I’d never done pattern matching before, and the fingerprint dataset took a long time to wrap my head around.",
          "There’s more AI in this than anything else I’ve made — most of the documentation and comments started that way, and I leaned on it hard to get detection working at all.",
          "So I went back through it all myself: polishing, fixing errors, adding the security and deployment work. It’s the first time I’ve led development instead of picking up tickets, and the closest thing I can compare it to is moving out — suddenly it’s all yours, and nobody’s coming to remind you.",
        ],
        marginNote: "first time it was all mine",
      },
    },
    {
      chapter: "Colophon",
      verso: {
        kind: "colophon",
        stack: ["React", "Vite", "Node", "Cheerio", "Jest", "Docker"],
      },
      recto: {
        kind: "prose",
        paragraphs: [
          "The detection data comes from WebAppAnalyzer, an open dataset of technology fingerprints. It’s GPL-3.0, so this project is too — the one licensing decision that got made for me.",
          "Five of us worked on it, and I ran the code side: the whole back-end is mine, and a teammate designed and built the first frontend that I revised heavily from there.",
          "Inbox has its own copy running now. The one you can click through to is mine.",
        ],
      },
    },
  ],
};

const PROJECTS = [statmon, hubspot];

export default PROJECTS;
