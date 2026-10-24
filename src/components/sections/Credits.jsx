import PinnedCard from "../ui/PinnedCard";
import Eyebrow from "../ui/Eyebrow";
import TextLink from "../ui/TextLink";
import Tape from "../ui/Tape";
import { borderAccent } from "../../lib/accents";

// Four groups, one hue each, which is what lets this section go without a
// SectionTitle. Fold a new entry into an existing group rather than adding a
// fifth.
const GROUPS = [
  {
    id: "art",
    title: "Art & Illustrations",
    accent: "rose",
    items: [
      {
        text: "Ottawa skyline\u00a0— ",
        linkText: "Meli Julianti",
        href: "https://www.kindpng.com/imgv/ixTTbww_ottawa-city-landscape-city-landscape-png-transparent-png/",
      },
      {
        text: "Pink-sky backdrop\u00a0— royalty-free, found via ",
        linkText: "PixelStalk",
        href: "https://www.pixelstalk.net/desktop-sky-backgrounds/",
      },
      {
        text: "Photos\u00a0— ",
        linkText: "Sweet Dreams Photo Studio",
        href: "https://www.sweetdreamsphotostudio.com/",
      },
      {
        text: "Map & flag SVGs (public domain)\u00a0— ",
        linkText: "Wikimedia Commons",
        href: "https://commons.wikimedia.org/",
      },
    ],
  },
  {
    id: "games",
    title: "Game Assets",
    accent: "violet",
    // Each rights holder links to its official site. Edmund McMillen's is his
    // personal one, since bindingofisaac.com is a merch store.
    items: [
      {
        text: "Celeste\u00a0— ",
        linkText: "Extremely OK Games",
        href: "https://exok.com",
      },
      {
        text: "Hollow Knight\u00a0— ",
        linkText: "Team Cherry",
        href: "https://www.teamcherry.com.au",
      },
      {
        text: "Super Monkey Ball\u00a0— ",
        linkText: "SEGA",
        href: "https://www.sega.com",
      },
      {
        text: "The Binding of Isaac\u00a0— ",
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
        text: "“The Rise of the Indie Web Movement”\u00a0— ",
        linkText: "Marighoul",
        href: "https://www.youtube.com/watch?v=Tv223kX0SRg",
      },
      {
        text: "“the weird world of ‘indie social media’”\u00a0— ",
        // The channel styles itself "Diggon", with a capital D.
        linkText: "Diggon",
        href: "https://www.youtube.com/watch?v=Htccpx-zAy8",
      },
      {
        // Links the playlist, the actual source, rather than the channel.
        text: "“PORTFOLIO ROASTS”\u00a0— ",
        linkText: "Anthony Sistilli",
        href: "https://www.youtube.com/playlist?list=PLQg6GaokU5CwD4sIzFuSJlJLJUqXXo1MK",
      },
    ],
  },
  {
    id: "odds",
    title: "Everything Else",
    accent: "orchid",
    // Three of these are licence obligations. Open-Meteo's data and Font
    // Awesome are CC BY 4.0, which asks for a name and a link to the licence,
    // and Spotify's Developer Policy requires attribution.
    items: [
      {
        parts: [
          { text: "Weather data\u00a0— " },
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
          { text: "Live widgets\u00a0— " },
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
        text: "Typefaces\u00a0— ",
        linkText: "Google Fonts",
        href: "https://fonts.google.com",
      },
      {
        // Simple Icons is CC0 and needs no attribution, so the licence link
        // sits with Font Awesome alone.
        parts: [
          { text: "Icon glyphs\u00a0— " },
          { linkText: "Simple Icons", href: "https://simpleicons.org" },
          { text: ", and " },
          { linkText: "Font Awesome", href: "https://fontawesome.com" },
          { text: " under " },
          {
            linkText: "CC BY 4.0",
            href: "https://creativecommons.org/licenses/by/4.0/",
          },
        ],
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
          // Index key: the list never reorders, and a key from the item's
          // shape is `undefined` for a `parts` entry that starts with text.
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
    <section aria-labelledby="credits-heading" className="flex justify-center">
      {/* Paper rather than a section hue: Credits owns none, and its group
          headers carry all four. */}
      <PinnedCard
        bg="bg-paper"
        padding="p-4 md:p-6"
        className="relative max-w-xl"
      >
        <Tape className="absolute -top-3 left-1/2 -translate-x-1/2 rotate-3" />

        {/* "Colophon" here and "Credits" in the footer on purpose: not
            everyone knows the word, so the link uses the plain one. */}
        <h2
          id="credits-heading"
          className="text-center text-3xl font-bold text-ink"
        >
          Colophon
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          The people who helped make this possible.
        </p>

        <div className="mt-4 border-t-2 border-ink" />

        <div className="mt-4 grid gap-x-6 gap-y-4 md:grid-cols-2">
          {GROUPS.map((group) => (
            <CreditGroup key={group.id} group={group} />
          ))}
        </div>

        <div className="mt-6 border-t-2 border-ink" />

        {/* Stacks below md, where the 60% split would leave the sentence
            about 19 characters a line. */}
        <div className="mt-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between md:gap-4">
          {/* The emoji is a gesture, not a word, so screen readers skip it. */}
          <p className="text-sm text-gray-600 md:w-[60%]">
            And thank you <span aria-hidden="true">🫵</span> for checking out my
            site! Really appreciate it.
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
