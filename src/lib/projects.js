import elbaiteBr8kout from "../assets/books/elbaite-br8kout.webp";
import statmonCompare from "../assets/books/statmon-compare.webp";
import hubspotReport from "../assets/books/hubspot-report.webp";

// The Creations book stack. One entry per project; each renders as a book lying
// on the board (Book.jsx) that opens into a two-page spread (BookSpread.jsx).
//
// VOICE — the books are the one place on the site written in Noah's
// professional register, the same one his project READMEs use: plain, exact,
// first person, short declarative sentences. They stay personal where the
// content is personal (why a project exists, what went wrong, what he is proud
// of), and a technical fact earns its place by being attached to a decision
// (STYLE_GUIDE.md → The Creations book). The mechanics come from
// STYLE_GUIDE.md → Voice and are binding: no em-dashes, semicolons, or
// parentheses in body copy, the serial comma, complete sentences, and Canadian
// spelling. None of the spoken tics belong here either: no "So" openers, no
// "I think", no "super" or "just". Read every line aloud before committing it.
//
// PAGE BUDGET — a book doesn't resize when you turn a page, so the spread is a
// FIXED height at md (BookSpread.jsx). Prose pages hold roughly three short
// paragraphs (~120 words) at the design width. Copy that overruns doesn't break
// the layout — the page scrolls, same as the passport's chapters — but a
// scrolling book page reads as an overflow bug, so trim to fit instead.
//
// Page kinds: "title" | "prose" | "stats" | "colophon".
//
// There is no "plate" kind any more. Each project screenshot moved OUT of the
// book and onto the board beside its closed cover (`board` below), where it
// answers "what does this look like" without anyone opening anything. The freed
// page took the plate caption as prose plus the facing page opening paragraph,
// so both pages are redistributed copy rather than new writing.

// ELBAITE AND ATTRIBUTION. Achroite 1.0 is Noah's own code; the menus, the
// packages and the release pipeline in 1.1 were built at his direction. So
// this book says "I" about 1.0 and about decisions, says nothing about how the
// rest was made either way, and never claims he wrote every line.
const elbaite = {
  id: "elbaite",
  mark: "crystal",
  title: "Elbaite",
  imprint: "A personal project · 2026",
  summary:
    "Emulators written in Java. The first, Achroite, runs CHIP-8 games on Windows and Linux with nothing else to install.",
  // An app you install, not a site you visit, so the first link is the latest
  // release rather than a live URL.
  liveUrl: "https://github.com/noahparknguyen/elbaite/releases/latest",
  liveLabel: "Download",
  repoUrl: "https://github.com/noahparknguyen/elbaite",

  // Rose-soft against the orchid-soft intro panel above it and Statmon's
  // violet-soft below: adjacent objects must not share a tint.
  coverTint: "bg-rose-soft",
  spineTint: "bg-rose",

  board: {
    src: elbaiteBr8kout,
    alt: "Achroite running Br8kout, a brick-breaking game, with the debug view beside the screen showing the registers, timers, stack, and memory",
    width: 760,
    height: 265,
    caption: "Br8kout, with the debug view open.",
  },

  spreads: [
    {
      chapter: "Why I made it",
      verso: { kind: "title" },
      recto: {
        kind: "prose",
        paragraphs: [
          "I was replaying a lot of old Game Boy games, mostly the Pokémon ones, and I was itching for a new project when it hit me: why not build an emulator myself? I’d used plenty of them over the years, but I’d never stopped to ask how they actually work.",
          "I started reading, and realized pretty quickly that a Game Boy emulator was out of reach for my current skills. More reading led me to CHIP-8, a small virtual machine from 1977 that ran simple games on hobby computers.",
          "That made it the perfect warm-up: a whole machine small enough to finish, and a way to build the skills the Game Boy is going to need.",
        ],
      },
    },
    {
      chapter: "What it does",
      verso: {
        kind: "prose",
        paragraphs: [
          "Achroite runs every instruction of the original COSMAC VIP interpreter but one, at sixty frames a second, with the keyboard mapped onto the VIP’s hex keypad.",
          "CHIP-8 interpreters disagree about a handful of small behaviours, and games quietly depend on whichever one they were written for. I made each of those six quirks a setting, with presets for the original VIP, SUPER-CHIP, and Octo.",
        ],
      },
      recto: {
        kind: "prose",
        paragraphs: [
          "The one instruction I left out is 0NNN. It called a routine in the host computer’s own machine code, which means nothing outside that computer, so a ROM that reaches it stops with an error instead of guessing.",
          "To check my work, I used Timendus’s CHIP-8 test suite. Achroite passes the IBM logo, opcode, flags, and keypad tests, and the quirks test on its CHIP-8 settings. It also plays the beep test’s SOS in Morse code.",
        ],
      },
    },
    {
      chapter: "How it’s built",
      verso: {
        kind: "prose",
        paragraphs: [
          "It’s plain Java 25, with Swing for the window and Maven for the build. Its only library is JUnit, and only the tests use it.",
          "It has a debugger built in. I can pause, step one instruction at a time, and watch the registers, timers, stack, and memory change beside the screen.",
          "I wanted it to install like any other app, so every package carries its own Java runtime. On Windows and Linux there’s nothing else to install.",
        ],
      },
      recto: {
        kind: "stats",
        items: [
          { value: "34", label: "of CHIP-8’s 35 instructions" },
          { value: "176", label: "unit tests behind it", stamp: "tests" },
          {
            value: "6",
            label: "quirks, each its own setting",
            stamp: "quirks",
          },
          {
            value: "4",
            label: "packages, each with its own Java runtime",
            stamp: "packages",
          },
        ],
        note: "I wanted the downloads to be trustworthy too. Every release lists a checksum for each file and a signed record of the build that made it, and once it’s published, nothing in it can be changed.",
      },
    },
    {
      chapter: "The name, and what’s next",
      verso: {
        kind: "prose",
        paragraphs: [
          "Elbaite is a kind of tourmaline, and each emulator in the project is named for one of its varieties. Achroite is the colourless one, which suits CHIP-8’s one-bit screen.",
          "Verdelite, the green variety, will be the Game Boy emulator, and Paraíba will be the Game Boy Color. Both are planned, and neither has started yet.",
        ],
      },
      recto: {
        kind: "prose",
        paragraphs: [
          "The Game Boy is the reason this project exists. What I really want is to play the Pokémon games I grew up with on my own emulator, and those cartridges will decide what Verdelite has to support first.",
          "CHIP-8 was the warm-up. It covered the parts every emulator shares: reading and running instructions, keeping time, taking input, and drawing a screen sixty times a second.",
        ],
        marginNote: "a whole machine, small enough to finish",
      },
    },
    {
      chapter: "Colophon",
      verso: {
        kind: "colophon",
        stack: [
          "Java 25",
          "Swing",
          "Maven",
          "JUnit",
          "jpackage",
          "GitHub Actions",
        ],
      },
      recto: {
        kind: "prose",
        paragraphs: [
          "No ROMs are included. I tested against Timendus’s CHIP-8 test suite, which is GPLv3, and John Earnest’s CHIP-8 archive. The game in the screenshot is Br8kout by SharpenedSpoon, released under CC0.",
          "The two references I leaned on most were Tobias V. Langhoff’s guide to writing a CHIP-8 emulator and Laurence Scotford’s disassembly of the original interpreter.",
          "My code is MIT, so anyone is free to use it.",
        ],
      },
    },
  ],
};

const statmon = {
  id: "statmon",
  mark: "pokeball",
  title: "Statmon",
  imprint: "A personal project · 2026",
  summary:
    "A set of Pokémon tools: a stat comparison, the whole dex in one table, and a type chart, plus two games. Each one can be read as of any generation.",
  liveUrl: "https://statmon.noahpn.dev/",
  repoUrl: "https://github.com/noahparknguyen/statmon",

  // The cover wears violet-soft with a full-violet spine — the soft tint and
  // its own accent read as one bound object, and neither touches the
  // orchid-soft intro panel above (STYLE_GUIDE.md → Shape & surface).
  coverTint: "bg-violet-soft",
  spineTint: "bg-violet",

  // Pinned on the board beside the closed cover. It answers the one thing a
  // cover structurally cannot — what the thing actually looks like — without
  // making anyone open the book first. This used to be a `plate` page INSIDE
  // the book; it lives in exactly one place now, so no image appears twice.
  board: {
    src: statmonCompare,
    alt: "The Statmon compare board, with Volcarona and Chandelure side by side and their six base stats lined up between them",
    width: 720,
    height: 405,
    caption: "The compare board.",
  },

  spreads: [
    {
      chapter: "Why I made it",
      verso: { kind: "title" },
      recto: {
        kind: "prose",
        paragraphs: [
          "I like to go on nostalgia trips and replay the games I grew up with. One summer that meant every mainline Pokémon game, from Generation 1 through 5.",
          "Partway through FireRed, I had an Eevee to evolve and couldn’t decide between Flareon, Jolteon, and Vaporeon. All three share the same base stat total, so I needed to see each stat on its own to pick one.",
          "The sites I found for comparing two Pokémon felt outdated, or they were stuffed with features I didn’t need. I wanted something I’d actually use mid-playthrough, and that was the start of Statmon.",
        ],
      },
    },
    {
      chapter: "What it does",
      verso: {
        kind: "prose",
        paragraphs: [
          "I started with the compare board: two Pokémon side by side, with their stats, abilities, and type matchup, and a straight answer about who moves first. The strip along the top re-reads all of it as of an older generation.",
          "Then I hit another problem. I wanted Jolteon, and realized Zapdos was right there and was simply better. That’s why the dex came next: all 1,259 entries in one table, sortable by any stat.",
        ],
      },
      recto: {
        kind: "prose",
        paragraphs: [
          "I kept forgetting type matchups mid-playthrough, so the type chart came next. I also didn’t want to depend on the site forever, so I built two games that quiz me on stats and types instead.",
          "What I’m most proud of is that every feature started as a problem I ran into myself. Nothing was added for the sake of it.",
        ],
      },
    },
    {
      chapter: "How it’s built",
      verso: {
        kind: "prose",
        paragraphs: [
          "It’s React, Vite, Tailwind, and plain JavaScript, served from Cloudflare. That’s my standard stack, and I reach for it on almost everything because it’s quick to get moving.",
          "Statmon never calls an API while you use it. I pull everything from PokéAPI once at build time into a local file, and commit every sprite, piece of artwork, and webfont to the repo.",
          "The live site is nothing but static files. It can’t fall over because someone else’s API is down, and it keeps me well inside PokéAPI’s fair-use rules.",
        ],
      },
      recto: {
        kind: "stats",
        items: [
          { value: "1,259", label: "Pokémon in the dataset", stamp: "Pokémon" },
          { value: "2,513", label: "sprites and artwork in the repo" },
          {
            value: "0",
            label: "API calls while you use it",
            stamp: "API calls",
          },
          {
            value: "501",
            label: "tests ensuring consistent behaviour",
            stamp: "tests",
          },
        ],
        note: "I have tests behind the stat math, the dex sorting, the type matchups, and a render check on every page. I also wrote a script that checks all eighteen type colours for contrast, which is how I found out Dragon was too dark to read.",
      },
    },
    {
      chapter: "Notes in the margin",
      verso: {
        kind: "prose",
        paragraphs: [
          "I’m not the best designer in the world. I knew I wanted to avoid the AI-generated look, the minimalist dark mode with gradients on everything. But knowing what to avoid and knowing what to build are two very different problems.",
          "I kept it simple instead, and put my effort into getting the tools working.",
        ],
      },
      recto: {
        kind: "prose",
        paragraphs: [
          "That’s what ended up shaping the look. Once the tools worked, they handed me the style on their own. Chandelure, one of my two favourite Pokémon, has some really nice purples that sit well on a dark background, so I leaned on colour and left the gradients alone.",
          "It worked out well in the end. The palette makes the site look like its own thing, and tying the design to a favourite gives it some sentimental value too.",
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
          "All the data and images come from PokéAPI, and the sprites are CC0. Pokémon is © Nintendo, Game Freak, and The Pokémon Company, and Statmon is an unofficial fan project.",
          "My own code is MIT, so help yourself. I keep my working notes in the repo too, including the original brainstorm, the design system, and a dated log of every decision and why I made it. That last one is probably the most honest thing in there.",
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
    "A discovery tool built for Inbox, a HubSpot partner. Paste in a website’s URL to see what it’s built with, and which HubSpot product could replace each piece.",
  liveUrl: "https://hubspot-recommendation-tool.onrender.com/",
  repoUrl: "https://github.com/noahparknguyen/hubspot-recommendation-tool",

  // Render's free tier stops the container after ~15 minutes idle and cold
  // starts take the better part of a minute. Without this note the most
  // important click on the page looks broken to anyone who lands on it cold.
  // Rendered by ProjectLinks, so it appears on the cover AND in the colophon,
  // which is wherever the link itself appears.
  liveNote: "The demo sleeps when it is idle, so give it a minute to wake up.",

  // Blue-soft against Statmon's violet-soft: adjacent covers must not share a
  // tint (STYLE_GUIDE.md → Shape & surface).
  coverTint: "bg-blue-soft",
  spineTint: "bg-blue",

  // Pinned on the board beside the closed cover. It answers the one thing a
  // cover structurally cannot — what the thing actually looks like — without
  // making anyone open the book first. This used to be a `plate` page INSIDE
  // the book; it lives in exactly one place now, so no image appears twice.
  board: {
    src: hubspotReport,
    alt: "A row of the generated report, showing a detected technology and its category, a description, and the HubSpot product that could replace it",
    width: 760,
    height: 322,
    caption: "The generated report.",
  },

  spreads: [
    {
      chapter: "Why it exists",
      verso: { kind: "title" },
      recto: {
        kind: "prose",
        paragraphs: [
          "In my second-to-last term, I was put on a team of five and assigned a real client our professor had lined up. We had eight months, four to plan and four to build.",
          "The client was Inbox, an agency that moves companies onto HubSpot, the marketing platform. When someone arrives with an existing website, Inbox has to work out what it runs and what could move across.",
          "They were doing all of that by hand, so we built them a shortcut. It doesn’t do the thinking for them, it gets them to the interesting part faster.",
        ],
      },
    },
    {
      chapter: "What it does",
      verso: {
        kind: "prose",
        paragraphs: [
          "You paste in a URL, and it fetches the page, fingerprints everything it can find, and matches each detection against a HubSpot product.",
          "The report lines up every technology it found against the product that could replace it. Seeing the two side by side is what makes the discovery quick.",
        ],
      },
      recto: {
        kind: "prose",
        paragraphs: [
          "Ten matchers read the page separately, from headers and cookies down to inline scripts and the DOM, and their guesses combine into one confidence score. I had it resolve the relationships between technologies too, because knowing a site runs WordPress tells you a lot about the rest.",
          "I put the mapping from a detected tool to a HubSpot product in a JSON file instead of in the code. That was deliberate, because it means Inbox can add or reword a recommendation themselves without needing a developer.",
        ],
      },
    },
    {
      chapter: "How it’s built",
      verso: {
        kind: "prose",
        paragraphs: [
          "I wrote the backend in Node with no framework, using only the built-in http module. The frontend is React and Vite, and the whole thing ships as one Docker container.",
          "None of us knew Python, which ruled out something like BeautifulSoup from the start. Instead, we found a fork of Wappalyzer’s last open-source release that was still getting new patterns. That’s about three megabytes of fingerprints, loaded into memory once and kept there.",
          "I spent the longest on safety, making sure a user couldn\u{2019}t break anything at any point.",
        ],
      },
      recto: {
        kind: "stats",
        items: [
          { value: "10", label: "matchers read every page", stamp: "matchers" },
          { value: "5", label: "phases in the pipeline" },
          { value: "122", label: "tests behind it", stamp: "tests" },
          { value: "0", label: "backend frameworks", stamp: "frameworks" },
        ],
        note: "It refuses to fetch anything on a private network, re-checks every redirect, caps downloads, limits how many analyses run at once, and rate-limits failed logins. I was honest in the security doc about the one hole I couldn’t close on my own, because that felt more useful than pretending.",
      },
    },
    {
      chapter: "Working with a client",
      verso: {
        kind: "prose",
        paragraphs: [
          "I’d worked with clients at DND, but our team lead always ran the meetings. This time there was nobody above me, so I took on the role of main point of contact. I hosted the calls, demoed every couple of weeks, and asked whether the output was what they actually needed.",
          "I wasn’t nervous in the meetings. The most stressful part was the deadline, because I was making revisions right up until our final presentation. It gave me a lot more confidence in the end, because it showed I could work with a client on my own.",
        ],
      },
      recto: {
        kind: "prose",
        paragraphs: [
          "What I struggled with most was the detection engine. I’d never done pattern matching, and the fingerprint dataset took a long time to get my head around.",
          "Working out what the client wanted was hard as well. They opened by asking for an AI summary of tech stacks, which was well out of scope for students, so we had to find a compromise.",
          "I had a deadline, so I leaned on AI hard in the last few weeks. Then I went back through it myself, fixing errors and adding the security and deployment work.",
        ],
        marginNote: "no team lead this time",
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
          {
            parts: [
              { text: "The detection data comes from " },
              {
                linkText: "WebAppAnalyzer",
                href: "https://github.com/enthec/webappanalyzer",
              },
              {
                text: ", an open dataset of technology fingerprints. It’s GPL-3.0, so this project is too.",
              },
            ],
          },
          "There were five of us on the team and I ran the code side, so the whole backend is mine. A teammate with a web design background did the mockups and wireframes and laid the foundations for the frontend, which I updated whenever the client had feedback. The rest of the team handled the progress reports, assignments, and professor meetings.",
          "Inbox has its own copy running now. The demo linked here is my copy.",
        ],
      },
    },
  ],
};

const PROJECTS = [elbaite, statmon, hubspot];

export default PROJECTS;
