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
        linkText: "The indie web & Neocities",
        href: "https://indieweb.org",
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
      { plain: "The tech it's built on is badged down in the footer." },
    ],
  },
];

function CreditItem({ item, accent }) {
  if (item.plain) {
    return <li className="text-gray-700">{item.plain}</li>;
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
            key={item.plain ?? item.linkText ?? item.boldText}
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
        padding="p-6"
        rotate="-rotate-[0.6deg]"
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
          The people and work behind this little site.
        </p>

        <div className="mt-4 border-t-2 border-ink" />

        <div className="mt-4 grid gap-x-6 gap-y-4 sm:grid-cols-2">
          {GROUPS.map((group) => (
            <CreditGroup key={group.id} group={group} />
          ))}
        </div>

        <div className="mt-6 border-t-2 border-ink" />

        <div className="mt-4 flex items-end justify-between gap-4">
          <p className="text-sm text-gray-600 w-[60%]">
            Designed &amp; built by Noah in Ottawa, 2026. Thanks for scrolling
            all the way down here.
          </p>
          <span aria-hidden="true" className="font-hand text-2xl text-ink">
            Noah :)
          </span>
        </div>
      </PinnedCard>
    </section>
  );
}

export default Credits;
