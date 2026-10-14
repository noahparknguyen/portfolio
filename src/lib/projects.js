import elbaiteBr8kout from "../assets/books/elbaite-br8kout.webp";
import statmonCompare from "../assets/books/statmon-compare.webp";
import hubspotReport from "../assets/books/hubspot-report.webp";
import liteTypeCode from "../assets/books/lite-type-code.webp";

// The Creations book stack. One entry per project, and each renders as a book
// lying on the board (Book.jsx) that opens into a two-page spread
// (BookSpread.jsx).
//
// Page budget: a book doesn't resize when you turn a page, so the spread is a
// fixed height at md (BookSpread.jsx). A prose page holds about three short
// paragraphs, around 120 words, at the design width. Copy that overruns
// doesn't break the layout (the page scrolls, like the passport's chapters),
// but a scrolling book page reads as an overflow bug, so trim it to fit.
//
// Page kinds: "title" | "prose" | "stats" | "colophon".
//
// Each project's screenshot sits on the board beside its closed cover
// (`board` below), where it answers "what does this look like" without anyone
// opening anything.

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

  // A violet-soft cover with a full-violet spine, so the tint and its own
  // accent read as one bound object. Neither matches the orchid-soft intro
  // panel above it.
  coverTint: "bg-violet-soft",
  spineTint: "bg-violet",

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
          "Statmon never calls an API while you use it. I pull everything from PokéAPI once, with a script, into a local file, and commit every sprite, piece of artwork, and webfont to the repo.",
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
            value: "506",
            label: "tests ensuring consistent behaviour",
            stamp: "tests",
          },
        ],
        note: "I have tests behind the stat math, the dex sorting, the type matchups, and a render check on every page. I also have a script that checks all eighteen type colours for contrast, which is how I found out Dragon was too dark to read.",
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
        // stamp notes use it: a scribble in the margin, not body copy.
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
          "My own code is MIT, so help yourself.",
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

  // Render's free tier stops the container after 15 minutes without traffic,
  // and Render puts waking it at about a minute (11.4 s in one test). Without
  // this note the most important click on the page looks broken to anyone who
  // lands on it cold. ProjectLinks renders it wherever the link appears: on the
  // cover and in the colophon.
  liveNote: "The demo sleeps when it is idle, so give it a minute to wake up.",

  // Blue-soft against Statmon's violet-soft: adjacent covers must not share a
  // tint.
  coverTint: "bg-blue-soft",
  spineTint: "bg-blue",

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
          "The backend is Node with no framework, using only the built-in http module. The frontend is React and Vite, and the whole thing ships as one Docker container.",
          "None of us knew Python, which ruled out something like BeautifulSoup from the start. Instead, we found a fork of Wappalyzer’s last open-source release that was still getting new patterns. That’s about three megabytes of fingerprints, loaded into memory once and kept there.",
          "I spent the longest on safety, making sure a user couldn\u{2019}t break anything at any point.",
        ],
      },
      recto: {
        kind: "stats",
        items: [
          { value: "10", label: "matchers read every page", stamp: "matchers" },
          { value: "5", label: "phases in the pipeline" },
          { value: "151", label: "tests behind it", stamp: "tests" },
          { value: "0", label: "backend frameworks", stamp: "frameworks" },
        ],
        note: "It refuses to fetch anything on a private network, re-checks every redirect, caps downloads, limits how many analyses run at once, and rate-limits failed logins.",
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
          "There were five of us on the team, and I ran the code side, detection engine included. A teammate with a web design background did the mockups and wireframes and laid the foundations for the frontend, which I updated whenever the client had feedback. The rest of the team handled the progress reports, assignments, and professor meetings.",
          "Inbox has its own copy running now. The demo linked here is my copy.",
        ],
      },
    },
  ],
};

const liteType = {
  id: "lite-type",
  mark: "lt",
  title: "lite-type",
  imprint: "A personal project · 2026",
  summary:
    "A typing test for the desktop, with real code to practise on as well as words. It runs on Windows and Linux with nothing else to install.",
  // An app you install, like Elbaite, so the first link is the latest release.
  liveUrl: "https://github.com/noahparknguyen/lite-type/releases/latest",
  liveLabel: "Download",
  repoUrl: "https://github.com/noahparknguyen/lite-type",

  // Orchid-soft against HubSpot's blue-soft above it: adjacent covers must not
  // share a tint.
  coverTint: "bg-orchid-soft",
  spineTint: "bg-orchid",

  board: {
    src: liteTypeCode,
    alt: "lite-type in its Ink theme, partway through typing a Java enum, with two wrong letters in red",
    width: 760,
    height: 336,
    caption: "A Java snippet, partway through.",
  },

  spreads: [
    {
      chapter: "Why I made it",
      verso: { kind: "title" },
      recto: {
        kind: "prose",
        paragraphs: [
          "I’d wanted to try JavaFX for a long time, but never had a good excuse to. I’d also been working on my typing on Monkeytype and TypeRacer, to make my everyday work faster.",
          "A typing test, built as a desktop app in JavaFX, was the perfect way to do both.",
          "When I practised, I only ever typed lowercase words with no punctuation. Real code is full of capitals, brackets, and symbols, so I wanted a mode for that too. It ended up improving my typing and my coding at the same time.",
        ],
      },
    },
    {
      chapter: "What it does",
      verso: {
        kind: "prose",
        paragraphs: [
          "You can practise on random words, drawn from 200 common English ones, or on 12 Java snippets, short, medium, or long, typed line by line.",
          "There’s no input box. Each letter fills in when you type it right and turns red when you don’t, and nothing ever stops you.",
          "Timed mode keeps the text coming for 15 to 120 seconds, and Length mode ends after a set number of words or one whole snippet.",
        ],
      },
      recto: {
        kind: "prose",
        paragraphs: [
          "Words move a word at a time, the way they do on Monkeytype, so one slip stays one mistake. Code moves a character at a time, so a line never changes shape.",
          "At the end you get three scores: WPM, accuracy, and text accuracy. Escape gives you new text, and Shift+Escape gives you the same text again.",
          "It has three themes, Ink, Night, and Mono, and it remembers your choices and where you left the window.",
        ],
      },
    },
    {
      chapter: "How it’s built",
      verso: {
        kind: "prose",
        paragraphs: [
          "My first time building a GUI in Java was a school project in Swing. It felt tedious and confusing at first, and I assumed JavaFX would be Swing in a different format. To my surprise, it felt a bit more intuitive and easier to use.",
          "What I’m most proud of is that the app’s logic works on its own. The text, the keystrokes, the timer, and the scoring live in a module with no JavaFX in it, and the window only draws what that logic decides.",
          "It’s Java 25 and JavaFX 27, built with Maven. Every package carries its own Java runtime, so on Windows and Linux there’s nothing else to install.",
        ],
      },
      recto: {
        kind: "stats",
        items: [
          {
            value: "12",
            label: "Java snippets, short, medium, and long",
            stamp: "snippets",
          },
          { value: "138", label: "unit tests behind it", stamp: "tests" },
          {
            value: "101",
            label: "of them test the logic with no JavaFX",
          },
          {
            value: "3",
            label: "themes, Ink, Night, and Mono",
            stamp: "themes",
          },
        ],
        note: "I wanted it to feel light too. The app’s own work for each key takes 0.035 to 0.061 ms at the median, measured on Windows and on Linux, and nothing is read from disk while you type.",
      },
    },
    {
      chapter: "The name, and what’s next",
      verso: {
        kind: "prose",
        paragraphs: [
          "The name is the brief, in two senses. It’s lite as in minimal, in features, dependencies, and look, and light as in never heavy or slow.",
          "I’m also proud of the overall design. I kept it minimal on purpose: the text sits in the middle of the window, and the bar of choices fades while you type.",
        ],
      },
      recto: {
        kind: "prose",
        paragraphs: [
          "It’s finished for now. Later on, I want to add new themes, new settings so you can customize more of it, and more code snippets.",
          "My own typing speed has improved a little too, since it’s easy to open the app and do a few rounds.",
        ],
        marginNote: "a few rounds at a time",
      },
    },
    {
      chapter: "Colophon",
      verso: {
        kind: "colophon",
        stack: [
          "Java 25",
          "JavaFX 27",
          "Maven",
          "JUnit",
          "jpackage",
          "GitHub Actions",
        ],
      },
      recto: {
        kind: "prose",
        paragraphs: [
          "The font is JetBrains Mono, under the SIL Open Font License. Every package carries OpenJFX and Eclipse Temurin, both under the GPL v2 with the Classpath Exception.",
          "The word list and the snippets were written for lite-type, so nothing comes from Monkeytype but the idea of moving word by word.",
          "The code is MIT, so anyone is free to use it.",
        ],
      },
    },
  ],
};

const PROJECTS = [elbaite, statmon, hubspot, liteType];

export default PROJECTS;
