import PinnedCard from "../ui/PinnedCard";
import Eyebrow from "../ui/Eyebrow";
import TextLink from "../ui/TextLink";
import Tape from "../ui/Tape";
import { borderAccent } from "../../lib/accents";

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
    ],
  },
];

function CreditItem({ item, accent }) {
  if (item.plain) {
    return <li className="text-gray-700">{item.plain}</li>;
  }

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
            key={
              item.plain ??
              item.linkText ??
              item.boldText ??
              item.parts?.[0]?.linkText
            }
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
      <PinnedCard
        bg="bg-paper"
        padding="p-4 md:p-6"
        className="relative max-w-xl"
      >
        <Tape className="absolute -top-3 left-1/2 -translate-x-1/2" />

        {/* Credits has no single owned hue (STYLE_GUIDE.md → Color → Sky
            accents), so unlike every other section this deliberately skips
            SectionTitle's single-accent underline — the four hues live on
            the group headers below instead. */}
        <h2
          id="credits-heading"
          className="text-center text-3xl font-bold text-ink"
        >
          Colophon
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          A heartfelt thank-you to everyone who inspired this little site.
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
            Planned, designed, and built by Noah. Thanks for scrolling all the
            way down here.
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
