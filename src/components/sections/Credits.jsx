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
    items: [
      { text: "Celeste — ", boldText: "Extremely OK Games" },
      { text: "Hollow Knight — ", boldText: "Team Cherry" },
      { text: "Super Monkey Ball — ", boldText: "SEGA" },
      { text: "The Binding of Isaac — ", boldText: "Edmund McMillen" },
    ],
  },
  {
    id: "inspiration",
    title: "Inspirations",
    accent: "blue",
    items: [
      {
        linkText: "Derek Sivers' /now movement",
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
        text: '"The Rise of the Indie Web Movement" — ',
        linkText: "Marighoul",
        href: "https://www.youtube.com/watch?v=Tv223kX0SRg",
      },
      {
        text: "\"the weird world of 'indie social media'\" — ",
        linkText: "diggon",
        href: "https://www.youtube.com/watch?v=Htccpx-zAy8",
      },
      {
        text: "The portfolio roasting videos that started all this — ",
        linkText: "Anthony Sistilli",
        href: "https://www.youtube.com/@AnthonySistilli",
      },
    ],
  },
  {
    id: "odds",
    title: "Everything Else",
    accent: "orchid",
    items: [
      {
        text: "Weather by ",
        linkText: "Open-Meteo",
        href: "https://open-meteo.com",
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
        text: "Brand glyphs — ",
        linkText: "Simple Icons",
        href: "https://simpleicons.org",
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

  if (item.href) {
    return (
      <li className="text-gray-700">
        {item.text}
        <TextLink href={item.href} accent={accent} external>
          {item.linkText}
        </TextLink>
      </li>
    );
  }

  return (
    <li className="text-gray-700">
      {item.text}
      <span className="font-semibold text-ink">{item.boldText}</span>
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
        {group.items.map((item) => (
          <CreditItem
            key={item.linkText ?? item.boldText ?? item.parts?.[0]?.linkText}
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
            I planned, designed and built all of this myself. Thanks for
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
