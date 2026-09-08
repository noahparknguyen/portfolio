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
// Page kinds: "title" | "prose" | "plate" | "stats" | "colophon".

const statmon = {
  id: "statmon",
  mark: "pokeball",
  title: "Statmon",
  imprint: "A personal project · 2026",
  summary:
    "A set of Pokémon tools I built for myself. Compare two of them head to head, sort the whole dex by any stat, read the type chart, or let it quiz you on all of it.",
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
          "Every so often I go on a nostalgia trip and replay the games I grew up with. One summer that turned into every mainline Pokémon game, generation 1 straight through to generation 5.",
          "I got stuck partway through FireRed. I had an Eevee and couldn’t decide between Flareon, Jolteon and Vaporeon. They all share the exact same base stat total, which meant I needed to see each individual stat to pick one.",
          "I went looking for a site that could put two Pokémon side by side. The ones I found felt outdated, or they were stuffed with features I didn’t need. That’s more or less where Statmon came from.",
        ],
      },
    },
    {
      chapter: "What it does",
      verso: {
        kind: "plate",
        src: statmonCompare,
        alt: "The Statmon compare board, with Volcarona and Chandelure side by side and their six base stats lined up between them",
        width: 720,
        height: 405,
        caption:
          "The compare board, which is the main event. That’s Volcarona and Chandelure, my two favourites, and pretty much the reason the whole site ended up purple. The numbers up top re-read the whole thing as of an older generation.",
      },
      recto: {
        kind: "prose",
        paragraphs: [
          "I built the compare tool first and it worked well. But then I hit another problem. I wanted Jolteon, and then realised Zapdos was sitting right there and was simply better. That’s why I built the dex table, which sorts a whole generation at once instead of only ever comparing two.",
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
          "I built it with React, Vite, Tailwind and plain JavaScript, and put it on Cloudflare. That’s my standard stack and I reach for it on almost everything, mostly because it’s quick to get moving.",
          "Statmon never calls an API while you’re using it. I pull everything from PokéAPI once at build time into a local file, and I commit every sprite, piece of artwork and webfont straight into the repo. I’m probably too smug about that one.",
          "The live site is nothing but static files. It can’t fall over because someone else’s API is having a rough day, and it keeps me well inside PokéAPI’s fair use rules.",
        ],
      },
      recto: {
        kind: "stats",
        items: [
          { value: "1,259", label: "Pokémon in the dataset" },
          { value: "2,513", label: "images living in the repo" },
          { value: "0", label: "API calls while you use it" },
          { value: "480", label: "tests keeping me honest" },
        ],
        note: "I have tests behind the stat math, the dex sorting, the type matchups and a render check on every page. I also wrote a script that checks all eighteen type colours for contrast, and that’s how I found out Dragon was too dark to read.",
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
          "That’s what saved it. Once the tools worked they handed me the style on their own. Chandelure has these really nice purples that don’t need anything done to them, so I leaned on the colour and left the gradients alone.",
          "It worked out well in the end. The palette made the site look like its own thing, and tying the design to my two favourites gave it some sentimental value too.",
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
          "All the data and images come from PokéAPI, and the sprites are CC0. Pokémon belongs to Nintendo, Game Freak and The Pokémon Company. Statmon is an unofficial fan project and it’s staying that way.",
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
    "A discovery tool I built for an agency that moves companies onto HubSpot. You paste in a website, it works out what that site is running, and it lines each tool up against the HubSpot product that could replace it.",
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
          "During my second to last term I was put on a team of five with a real client, an actual company my professor had lined up. Eight months with them, four to plan and four to build.",
          "Our client was Inbox, an agency that moves companies onto HubSpot, which is a large marketing and sales platform. A client comes to Inbox with an existing website, and they have to work out what it is running and what could move over to HubSpot instead.",
          "They were doing all of that by hand, so we built them a shortcut. It doesn’t do the thinking for them, it gets them to the interesting part faster.",
        ],
      },
    },
    {
      chapter: "What it does",
      verso: {
        kind: "plate",
        src: hubspotReport,
        alt: "A row of the generated report, showing a detected technology and its category, a description, and the HubSpot product that could replace it",
        width: 760,
        height: 322,
        caption:
          "Every detected technology, lined up against the HubSpot product that could replace it.",
      },
      recto: {
        kind: "prose",
        paragraphs: [
          "You paste in a URL and it fetches the page, fingerprints everything it can find, and matches each detection against a HubSpot product.",
          "Ten separate matchers read the page, looking at headers, cookies, script sources, meta tags, inline scripts, CSS and the DOM. Their guesses combine into one confidence score, and it then resolves the relationships between technologies, because knowing a site runs WordPress tells you a lot about what else is probably on it.",
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
          "None of us had any experience with Python, which ruled out something like BeautifulSoup from the start. Instead we found a repository that forked Wappalyzer’s last open source release, and it was still being updated with new patterns, which made it ideal. That comes to about three megabytes of fingerprints, loaded into memory once and kept there.",
          "I spent longest on making it safe to point at a stranger’s URL, and that was after it already worked.",
        ],
      },
      recto: {
        kind: "stats",
        items: [
          { value: "10", label: "matchers read every page" },
          { value: "5", label: "phases in the pipeline" },
          { value: "110", label: "tests behind it" },
          { value: "0", label: "backend frameworks" },
        ],
        note: "It refuses to fetch anything on a private network and re-checks on every redirect hop, caps how much it will download, and rate-limits the whole thing. I was honest in the security doc about the one hole I couldn’t close on my own, because that felt more useful than pretending.",
      },
    },
    {
      chapter: "Working with a client",
      verso: {
        kind: "prose",
        paragraphs: [
          "I’d worked with clients before at DND, but our team lead always ran the meetings there. This time there was nobody above me to do it, so I took it on myself. I hosted the calls, demoed every couple of weeks, and asked whether the design was right and whether the output was what they needed.",
          "I wasn’t especially nervous in the meetings. The most stressful part was the deadline, because I was making revisions right up until the last minute before our final presentation. It gave me a lot more confidence in the end, because it showed I could run a client on my own.",
        ],
      },
      recto: {
        kind: "prose",
        paragraphs: [
          "What I struggled with most was the detection engine. I’d never done pattern matching before, and the fingerprint dataset took me a long time to wrap my head around.",
          "Working out what the client wanted was difficult as well. They started off asking for an AI summary of tech stacks, which was well out of scope for students, and we had to find a compromise between that and what we could actually build.",
          "There’s more AI in this than anything else I’ve made. I had a deadline, so I leaned on it hard for the last few weeks. Then I went back through it all myself, fixing errors and adding the security and deployment work.",
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
          "The detection data comes from WebAppAnalyzer, an open dataset of technology fingerprints. It’s GPL-3.0, so this project is too, and that’s the one licensing decision that got made for me.",
          "Five of us worked on it and I ran the code side, so the whole backend is mine. One teammate had a web design background and built a really nice frontend, and I updated it whenever our client had feedback. My other teammates handled most of the school side, the progress reports and the professor meetings, which is why I was happy doing all the code.",
          "Inbox has its own copy running now, and the one you can click through to here is mine.",
        ],
      },
    },
  ],
};

const PROJECTS = [statmon, hubspot];

export default PROJECTS;
