import statmonCompare from "../assets/books/statmon-compare.webp";
import hubspotReport from "../assets/books/hubspot-report.webp";

// The Creations book stack. One entry per project; each renders as a book lying
// on the board (Book.jsx) that opens into a two-page spread (BookSpread.jsx).
//
// VOICE — STYLE_GUIDE.md → Voice is the spec, and it is binding. It was derived
// from a transcript of Noah speaking, so the rules are measured, not taste: no
// em-dashes (he used zero in 4,000 words of speech), no fragment punchlines,
// sentences centred on ~14 words, "So" openers, "I think" hedges, "super" as the
// intensifier, flat self-deprecation, and an "Overall"/"Ultimately" verdict to
// close. Read every line aloud before committing it.
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

const statmon = {
  id: "statmon",
  mark: "pokeball",
  title: "Statmon",
  imprint: "A personal project · 2026",
  summary:
    "A simple set of Pokémon tools. It covers visual stat comparisons, a filterable dex, and a type matchup lookup.",
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
          "I like to go on nostalgia trips and replay the games I grew up with. One summer I decided to play all the mainline Pokémon games, from generation 1 straight through to generation 5.",
          "Partway through I got stuck on FireRed. I had an Eevee I wanted to evolve, and I couldn’t decide between Flareon, Jolteon, and Vaporeon. They all share the exact same base stat total, which meant I needed to see each individual stat to pick one.",
          "I went looking for a site that could put two Pokémon side by side. The ones I found felt outdated, or they were stuffed with features I didn’t need. That’s more or less where Statmon came from.",
        ],
      },
    },
    {
      chapter: "What it does",
      verso: {
        kind: "prose",
        paragraphs: [
          "The compare board is the main event. The two Pokémon I put up on display are Volcarona and Chandelure, probably my two favourite Pokémon ever, with Chandelure being the reason the whole site ended up purple. The numbers along the top re-read everything as of an older generation.",
          "I built the compare tool first and it worked. Then I hit another problem. I wanted Jolteon, and realised Zapdos was sitting right there and was simply better. That is why the dex table came next, sorting a whole generation at once instead of only two.",
        ],
      },
      recto: {
        kind: "prose",
        paragraphs: [
          "I also kept forgetting type matchups mid-playthrough, which is why the type chart came next. And I didn’t want to depend on the site forever, so I built a couple of games that quiz me on the stats and types instead.",
          "What I’m most proud of is that every feature started as a problem I ran into myself. Nothing was added for the sake of it.",
        ],
      },
    },
    {
      chapter: "How it’s built",
      verso: {
        kind: "prose",
        paragraphs: [
          "I built it with React, Vite, Tailwind, and plain JavaScript, and put it on Cloudflare. That’s my standard stack and I reach for it on almost everything, mostly because it’s quick to get moving.",
          "Statmon never calls an API while you’re using it. I pull everything from PokéAPI once at build time into a local file, and I commit every sprite, piece of artwork, and webfont straight into the repo.",
          "The live site is nothing but static files. It can’t fall over because someone else’s API is offline, and it keeps me well inside PokéAPI’s fair use rules.",
        ],
      },
      recto: {
        kind: "stats",
        items: [
          { value: "1,259", label: "Pokémon in the dataset", stamp: "Pokémon" },
          { value: "2,513", label: "images living in the repo" },
          {
            value: "0",
            label: "API calls while you use it",
            stamp: "API calls",
          },
          {
            value: "480",
            label: "tests ensuring consistent behaviour",
            stamp: "tests",
          },
        ],
        note: "I have tests behind the stat math, the dex sorting, the type matchups, and a render check on every page. I also wrote a script that checks all eighteen type colours for contrast, and that’s how I found out Dragon was too dark to read.",
      },
    },
    {
      chapter: "Notes in the margin",
      verso: {
        kind: "prose",
        paragraphs: [
          "Here’s the thing about me. I’m not the best designer in the world. I knew I wanted to avoid that AI generated look, the minimalist dark mode with gradients on everything. But knowing what to avoid and knowing what to build are two very different problems.",
          "That’s why I kept it simple. I stopped worrying about the site and focused on getting the tools working.",
        ],
      },
      recto: {
        kind: "prose",
        paragraphs: [
          "That’s ultimately what inspired the look. Once the tools worked they handed me the style on their own. Chandelure has these really nice purples that sit well against the dark background, so I leaned on the colour and left the gradients alone.",
          "It worked out well in the end. The palette made the site look like its own thing, and tying the design to one of my favourites gave it some sentimental value too.",
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
          "All the data and images come from PokéAPI, and the sprites are CC0. Pokémon belongs to Nintendo, Game Freak, and The Pokémon Company. Statmon is an unofficial fan project and it’s staying that way.",
          "My own code is MIT, so help yourself. I keep my working notes in the repo as well, including the original brainstorm, the design system, and a dated log of every decision and why I made it. That last one is probably the most honest thing in there.",
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
    "A discovery tool for understanding a website’s tech stack. Paste in a URL and get back a clear report of the findings.",
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
          "During my second to last term I was put on a team of five, and assigned a real client our professor had lined up. We had eight months, four to plan and four to build.",
          "Our client was Inbox, an agency that moves companies onto HubSpot, the marketing platform. Someone arrives with an existing website, and Inbox has to work out what it runs and what could move across.",
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
          "The report then lines every technology it found against the product that could replace it. Putting the two side by side is what makes the discovery quick.",
        ],
      },
      recto: {
        kind: "prose",
        paragraphs: [
          "Ten matchers read the page separately, from headers and cookies down to inline scripts and the DOM, and their guesses combine into one confidence score. I had it resolve the relationships between them as well, because knowing a site runs WordPress tells you a lot about the rest.",
          "I put the mapping from a detected tool to a HubSpot product in a JSON file instead of in the code. That was deliberate, because it means Inbox can add or reword a recommendation themselves without needing a developer.",
        ],
      },
    },
    {
      chapter: "How it’s built",
      verso: {
        kind: "prose",
        paragraphs: [
          "I wrote the backend in Node with no framework at all, using nothing but the built-in http module. The frontend is React and Vite, and the whole thing ships as one Docker container.",
          "None of us knew Python, which ruled out something like BeautifulSoup from the start. We found a fork of Wappalyzer’s last open source release instead, still being updated with new patterns. That is about three megabytes of fingerprints, loaded into memory once and kept there.",
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
        note: "It refuses to fetch anything on a private network and re-checks on every redirect hop, caps how much it will download, and rate-limits the whole thing. I was honest in the security doc about the one hole I couldn’t close on my own, because that felt more useful than pretending.",
      },
    },
    {
      chapter: "Working with a client",
      verso: {
        kind: "prose",
        paragraphs: [
          "I’d worked with clients at DND, but our team lead always ran the meetings. This time there was nobody above me, so I took it upon myself to act as our main point of contact. I hosted the calls, demoed every couple of weeks, and asked whether the output was what they actually needed.",
          "I wasn’t especially nervous in the meetings. The most stressful part was the deadline, because I was making revisions right up until the last minute before our final presentation. It gave me a lot more confidence in the end, because it showed I could interact with a client all on my own.",
        ],
      },
      recto: {
        kind: "prose",
        paragraphs: [
          "What I struggled with most was the detection engine. I’d never done pattern matching, and the fingerprint dataset took a long time to get my head around.",
          "Working out what the client wanted was hard as well. They opened by asking for an AI summary of tech stacks, well out of scope for students, so we had to find a compromise.",
          "There’s more AI in this than anything else I’ve made. I had a deadline, so I leaned on it hard at the end. Then I went back through it myself, fixing errors and adding the security and deployment work.",
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
          "There were five of us on the team and I ran the code side, so the whole backend is mine. A teammate with a web design background did the mockups and wireframes and laid the foundations for the frontend, which I updated whenever the client had feedback. The rest handled the progress reports, assignments, and professor meetings.",
          "Inbox has its own copy running now, and the one you can click through to here is mine.",
        ],
      },
    },
  ],
};

const PROJECTS = [statmon, hubspot];

export default PROJECTS;
