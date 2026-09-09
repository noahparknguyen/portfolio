import PinnedCard from "../ui/PinnedCard";
import Eyebrow from "../ui/Eyebrow";
import TextLink from "../ui/TextLink";
import Tape from "../ui/Tape";
import { borderAccent } from "../../lib/accents";

// Four groups, one owned hue each — that one-to-one mapping is what lets this
// section work without a SectionTitle (see the note by the <h2> below), so don't
// add a fifth group; fold new entries into an existing one instead.
const GROUPS = [
  {
    id: "art",
    title: "Art & Illustrations",
    accent: "rose",
    items: [
      {
        text: "Ottawa skyline — ",
        linkText: "Meli Julianti",
        href: "https://www.kindpng.com/imgv/ixTTbww_ottawa-city-landscape-city-landscape-png-transparent-png/",
      },
      {
        text: "Pink-sky backdrop — royalty-free, found via ",
        linkText: "PixelStalk",
        href: "https://www.pixelstalk.net/desktop-sky-backgrounds/",
      },
      {
        text: "Home photo — ",
        linkText: "Sweet Dreams Photo Studio",
        href: "https://www.sweetdreamsphotostudio.com/",
      },
      {
        text: "Map & flag SVGs (public domain) — ",
        linkText: "Wikimedia Commons",
        href: "https://commons.wikimedia.org/",
      },
    ],
  },
  {
    id: "games",
    title: "Game Assets",
    accent: "violet",
    // Each rights holder links to its own official site, so this group carries
    // the same accent underline as the other three. It used to render bold,
    // unlinked names, which made it the one group whose items looked different
    // for a reason no reader could see. Edmund McMillen links to his personal
    // site, not bindingofisaac.com — that domain is a merch store.
    items: [
      {
        text: "Celeste — ",
        linkText: "Extremely OK Games",
        href: "https://exok.com",
      },
      {
        text: "Hollow Knight — ",
        linkText: "Team Cherry",
        href: "https://www.teamcherry.com.au",
      },
      {
        text: "Super Monkey Ball — ",
        linkText: "SEGA",
        href: "https://www.sega.com",
      },
      {
        text: "The Binding of Isaac — ",
        linkText: "Edmund McMillen",
        href: "https://edmundmcmillen.tumblr.com",
      },
    ],
  },
  {
    id: "inspiration",
    title: "Inspirations",
    accent: "blue",
    items: [
      {
        linkText: "Derek Sivers’ /now movement",
        href: "https://nownownow.com",
      },
      {
        parts: [
          { linkText: "The indie web", href: "https://indieweb.org" },
          { text: " & " },
          { linkText: "Neocities", href: "https://neocities.org" },
        ],
      },
      {
        text: "“The Rise of the Indie Web Movement” — ",
        linkText: "Marighoul",
        href: "https://www.youtube.com/watch?v=Tv223kX0SRg",
      },
      {
        text: "“the weird world of ‘indie social media’” — ",
        // The channel styles itself "Diggon" with a capital D (confirmed in the
        // video's channelName, ownerChannelName and itemprop metadata). It was
        // credited lowercase, which is a factual error in an attribution.
        linkText: "Diggon",
        href: "https://www.youtube.com/watch?v=Htccpx-zAy8",
      },
      {
        // Was the odd one out: a descriptive phrase where its two siblings
        // above carry a quoted title. Now the same shape, pointing at the
        // playlist itself rather than the channel, which is the actual source.
        text: "“PORTFOLIO ROASTS” — ",
        linkText: "Anthony Sistilli",
        href: "https://www.youtube.com/playlist?list=PLQg6GaokU5CwD4sIzFuSJlJLJUqXXo1MK",
      },
    ],
  },
  {
    id: "odds",
    title: "Everything Else",
    accent: "orchid",
    // Three of these are licence obligations rather than courtesies, and they
    // live on the site rather than only in licenses/NOTICE.md for that reason:
    // Font Awesome is CC BY 4.0, Open-Meteo's data is CC BY 4.0, and Spotify's
    // Developer Policy requires attribution for any content it supplies (that
    // one is also satisfied by the mark inside the widget itself).
    //
    // Folded into this group rather than given a fifth: the four-groups /
    // four-hues mapping is what lets this section work without a SectionTitle.
    items: [
      {
        parts: [
          { text: "Weather data — " },
          { linkText: "Open-Meteo", href: "https://open-meteo.com" },
          { text: ", " },
          {
            linkText: "CC BY 4.0",
            href: "https://creativecommons.org/licenses/by/4.0/",
          },
        ],
      },
      {
        parts: [
          { text: "Live widgets — " },
          { linkText: "Spotify", href: "https://www.spotify.com" },
          { text: " & " },
          { linkText: "Steam", href: "https://store.steampowered.com" },
        ],
      },
      {
        text: "Algonquin College logo, used per their ",
        linkText: "brand guidelines",
        href: "https://www.algonquincollege.com/acmarketing/brand-guidelines/",
      },
      {
        text: "Typefaces — ",
        linkText: "Google Fonts",
        href: "https://fonts.google.com",
      },
      {
        parts: [
          { text: "Icon glyphs — " },
          { linkText: "Simple Icons", href: "https://simpleicons.org" },
          { text: " & " },
          { linkText: "Font Awesome", href: "https://fontawesome.com" },
        ],
      },
      {
        text: "Every third-party notice — ",
        linkText: "licenses/NOTICE.md",
        href: "https://github.com/noahparknguyen/portfolio/blob/main/licenses/NOTICE.md",
      },
      {
        text: "This site’s source — ",
        linkText: "GitHub",
        href: "https://github.com/noahparknguyen/portfolio",
      },
    ],
  },
];

function CreditItem({ item, accent }) {
  if (item.parts) {
    return (
      <li className="text-gray-700">
        {item.parts.map((part, i) =>
          part.href ? (
            <TextLink key={i} href={part.href} accent={accent} external>
              {part.linkText}
            </TextLink>
          ) : (
            <span key={i}>{part.text}</span>
          ),
        )}
      </li>
    );
  }

  return (
    <li className="text-gray-700">
      {item.text}
      <TextLink href={item.href} accent={accent} external>
        {item.linkText}
      </TextLink>
    </li>
  );
}

function CreditGroup({ group }) {
  return (
    <div>
      <Eyebrow
        as="h3"
        className={`inline-block border-b-2 pb-0.5 ${borderAccent[group.accent]}`}
      >
        {group.title}
      </Eyebrow>
      <ul className="mt-2 flex flex-col gap-1">
        {group.items.map((item, i) => (
          // Index key: this list is static and never reorders. The previous key
          // was derived from the item's shape and came out `undefined` for any
          // `parts` entry beginning with plain text.
          <CreditItem
            key={`${group.id}-${i}`}
            item={item}
            accent={group.accent}
          />
        ))}
      </ul>
    </div>
  );
}

function Credits() {
  return (
    <section
      aria-labelledby="credits-heading"
      className="flex justify-center py-8"
    >
      {/* Keeps bg-paper rather than taking a section hue like Now and Creations
          do: Credits is the one section with NO owned hue (its four group
          headers carry all four instead), and it's taped up rather than pinned,
          so warm stationery is the right fill here. */}
      <PinnedCard
        bg="bg-paper"
        padding="p-4 md:p-6"
        className="relative max-w-xl"
      >
        <Tape className="absolute -top-3 left-1/2 -translate-x-1/2 rotate-3" />

        {/* Credits has no single owned hue (STYLE_GUIDE.md → Color → Sky
            accents), so unlike every other section this deliberately skips
            SectionTitle's single-accent underline — the four hues live on
            the group headers below instead.

            The heading says "Colophon" while the footer link says "Credits" on
            purpose: "Credits" is the plain-language door, since not everyone
            knows the word, and "Colophon" is the reveal behind it. */}
        <h2
          id="credits-heading"
          className="text-center text-3xl font-bold text-ink"
        >
          Colophon
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Thank you to everyone who inspired me to make something unique.
        </p>

        <div className="mt-4 border-t-2 border-ink" />

        <div className="mt-4 grid gap-x-6 gap-y-4 md:grid-cols-2">
          {GROUPS.map((group) => (
            <CreditGroup key={group.id} group={group} />
          ))}
        </div>

        <div className="mt-6 border-t-2 border-ink" />

        {/* The `w-[60%]` sign-off split is a desktop layout width. Below md it
            would leave the sentence ~19 characters a line beside the ~85px
            signature, so the row stacks instead and the paragraph takes the
            full column. */}
        <div className="mt-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between md:gap-4">
          <p className="text-sm text-gray-600 md:w-[60%]">
            I planned, designed, and built all of this myself. Thanks for
            scrolling all the way down here.
          </p>
          <span
            aria-hidden="true"
            className="self-end font-hand text-2xl text-ink md:self-auto"
          >
            Noah :)
          </span>
        </div>
      </PinnedCard>
    </section>
  );
}

export default Credits;
