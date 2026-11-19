# To do

## Core

- [x] Dark mode: script-driven toggle in the footer, with `assets/js/theme.js` to remember the choice
- [x] Dark mode: decide what visitors without JavaScript see (they follow their system theme, and `noscript:hidden` hides the toggle)
- [x] Footer: the links run together below about 370px wide, because the list is capped at 50% of the footer
- [x] Blog layout: load `assets/js/theme.js` in the head so a saved theme carries across pages
- [x] Colophon: credits and notes, styled later
    - [x] Credit Derek Sivers for inspiration: the now page and the text styling
    - [x] Credit Steph Ango for inspiration: Flexoki
    - [x] Credit the font: iA Writer Duo by iA
    - [x] Credit the Kirby GIF: Kirby 64 by Nintendo
    - [x] Credit the Madeline GIF on the now page: Celeste by Maddy Makes Games
    - [x] Credit the Isaac image on the colophon: The Binding of Isaac by Edmund McMillen
    - [x] Credit the sun and moon icons: Solar Icon Set by 480 Design, CC BY 4.0. Required by the licence: name 480 Design, link the licence and say they were recoloured
- [x] Blog format: the list page with its Hornet hero, and the post layout
- [x] Header and footer on the blog layout, with `noscript:hidden` on the toggle
- [x] Kirby page: a hidden line for screen readers describing the tiled Kirby (a heading and a link home aren't required at AA)
- [x] Link styles, the same everywhere
- [x] List markers and text styles: bold, italics, muted dates
- [x] Now page: add an `h1` and its own `<title>`, and make the nownownow URL a link
- [x] Now and home pages, in this order:
    - [x] Now page headings: building, learning, consuming, living
    - [x] Write the now page under the new headings
    - [x] Check that no fun fact overlaps the now page, including shared themes like roguelites
    - [x] Rewrite the tl;dr as a quick summary and bio of the whole site, not in page order
    - [x] Structure and semantics pass on both pages: the now page's `<title>`, and "updated" as a date line, not a heading
    - [x] Style pass on both pages, then commit
- [x] Normal case: rewrite the pages' text in normal case and show it lowercase with CSS `text-transform`
    - [x] Add the CSS rule, with an exception for anything that must keep its case (like code)
    - [x] Convert the home, now, colophon and kirby pages, and the blog layout
    - [x] Test with a screen reader in Edge (standing in for Chrome) and Firefox, since Chromium may pass the lowercase text through anyway
- [x] Colour palette: our own OKLCH colours in `@theme`, starting from the background and text
- [x] Home page: rewrite projects, work and education as casual one-line descriptions instead of comma lists
- [x] Home page: add a short section on interests and hobbies, the lasting ones (what's current stays on the now page)
- [x] Home page: add a short section on my tech stack
- [x] Home page: rewrite the tl;dr so it sums up the sections below it
- [x] Home page: link the references I make, like schools and speedrun.com

## Next phase

Additions now that the site is live.

- [x] www: redirect `www.noahpn.dev` to `noahpn.dev` with a Single Redirect rule, plus a proxied `www` DNS record; decide whether the record lives in `wrangler.jsonc` or the dashboard (the dashboard, as `AAAA 100::`, since the rule can't live in the file)
- [x] 404 page: write `src/404.html` from the home page shell and set `"not_found_handling": "404-page"` in `wrangler.jsonc`
- [x] SEO: a few nice-to-haves, kept simple. Skipping meta keywords, a sitemap, canonical links and a web app manifest
    - [x] Favicon: pick an icon and add it to every page and the blog layout, so tabs show it and `/favicon.ico` stops returning 404. Three files: a 32×32 `favicon.ico` at the root, an `icon.svg`, and a 180×180 `apple-touch-icon.png`
    - [x] Meta description: a `<meta name="description">` in my words on each page, so search results show my summary instead of picking their own snippet. Blog posts get theirs from a `description:` line in front matter, and the blog list gets its own in `build-blog.mjs`. The 404 page doesn't need one
    - [x] OG image: a 1200×630 image for link previews, with `og:title`, `og:type`, `og:url`, `og:image`, `og:image:alt` and `og:description` on each page and in the blog layout. These need full `https://` URLs, not `/` paths
    - [x] X previews: check whether `twitter:card` is needed for the large image, since X falls back to the `og:` tags for the rest (it is: `summary_large_image`, plus `twitter:image:alt`)
- [x] Now page: reword the walking item under Living, where "try" comes up three times in a row ("trying", "try", "try and")
- [x] Repeated words: a pass over every page for words repeated close together. Fixed "play/played", "helps/helps", "think/thinking" and the two fun facts starting "I love"; the rest are deliberate
- [ ] Colophon: a section on the build process, which its meta description already mentions
- [x] GitHub repo: make it reflect me and my style
    - [x] README: I write it, short and personal like the site. What it is with a link to the site, a plain note on reuse (there's no licence), and a pointer to the colophon for credits. No setup instructions
    - [x] About: a description, topics and the website link, and untick Releases, Packages and Deployments
    - [x] Settings, Features: turn off what a solo repo doesn't need: pull requests, issues, wikis and projects
    - [x] Licence: decide whether to add one. Without one, nobody may reuse the code, though GitHub still lets people view and fork it. A licence would cover only my own work, not the font or the game images (decided: no licence, with a plain-words note in the README instead)
- [ ] New pages: link each one from the page text, like the Kirby link, instead of adding it to the nav or footer
    - [ ] /uses: everything I use day to day, linked from the Toolkit section
    - [ ] /ai: how I use AI, linked from the Toolkit section
    - [ ] /style: my style guide, linked from the colophon's Flexoki line
    - [ ] Colophon: credit slashpages.net by Robb Knight, where the idea for these pages came from
- [ ] External links: mark them so they stand apart from links to my own pages, and tell screen readers they open in a new tab
- [ ] Style redo: bold, italics, colours and fonts in place of most links, each used sparingly
    - [ ] Links: keep only the ones that give the reader something (credits, my profiles, my own pages)
    - [ ] Bold and italics: `<b>` for key words, `<strong>` for important things, `<cite>` for titles
    - [ ] Word colours: my own palette colours for words with a theme (an orange for Ubuntu, a red for Canada), each a light and dark pair that passes 4.5:1
    - [ ] Tone fonts: `<i>` with a class for each tone (fancy, sarcastic), self-hosted fonts credited in the colophon
