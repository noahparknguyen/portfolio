import PinnedCard from "../ui/PinnedCard";
import SectionTitle from "../ui/SectionTitle";
import DateStamp from "../ui/DateStamp";
import TextLink from "../ui/TextLink";
import Pin from "../ui/Pin";

// Update this with NOW_NOTES, as one edit. It can't come from the last commit
// date, which would count a CSS tweak as news.
const LAST_UPDATED = "October 2026";

// The intro sits in the middle of a 4 x 4 grid with twelve notes around it, so
// twelve is the most there can be. Below md the intro comes first and the notes
// follow two across, in this order.
//
// The markup keeps the intro first, so screen readers start on its heading.
// From md four notes sit above it on screen, but they hold no links, so the
// focus order is unaffected.
//
// The notes touching the intro aren't blue, and touching notes never share a
// tint, in either layout. A prompt ending in a short word joins it to the word
// before with \u00a0, so a wrapped question never ends on "on?" alone.
const NOW_NOTES = [
  {
    prompt: "What am I playing?",
    answer: "Slay the Spire",
    tint: "bg-rose-soft",
    rotate: "-rotate-[2deg]",
    place: "md:col-start-2 md:row-start-1",
  },
  {
    prompt: "What am I watching?",
    answer: "Haikyuu!! again",
    tint: "bg-violet-soft",
    rotate: "rotate-[1.5deg]",
    place: "md:col-start-3 md:row-start-1",
  },
  {
    prompt: "What am I reading?",
    answer: "Core Java",
    tint: "bg-orchid-soft",
    rotate: "rotate-[2deg]",
    place: "md:col-start-1 md:row-start-2",
  },
  {
    prompt: "What am I working\u00a0on?",
    answer: "My next project idea",
    tint: "bg-rose-soft",
    rotate: "-rotate-[1.5deg]",
    place: "md:col-start-4 md:row-start-2",
  },
  {
    prompt: "What am I learning?",
    answer: "How to solve coding problems",
    tint: "bg-violet-soft",
    rotate: "-rotate-[1deg]",
    place: "md:col-start-1 md:row-start-3",
  },
  {
    prompt: "What habit am I building?",
    answer: "Moving every day",
    tint: "bg-orchid-soft",
    rotate: "rotate-[2deg]",
    place: "md:col-start-4 md:row-start-3",
  },
  {
    prompt: "What am I saying no\u00a0to?",
    answer: "Social media",
    tint: "bg-rose-soft",
    rotate: "rotate-[1.5deg]",
    place: "md:col-start-2 md:row-start-4",
  },
  {
    prompt: "What am I looking forward\u00a0to?",
    answer: "A new place to live",
    tint: "bg-violet-soft",
    rotate: "-rotate-[2deg]",
    place: "md:col-start-3 md:row-start-4",
  },
  {
    prompt: "What am I listening\u00a0to?",
    answer: "THE ORAL CIGARETTES",
    tint: "bg-blue-soft",
    rotate: "rotate-[1.5deg]",
    place: "md:col-start-1 md:row-start-1",
  },
  {
    // Wanting to, not doing yet: "trying out" would claim contributions a
    // look at GitHub wouldn't find.
    prompt: "What am I itching to\u00a0try?",
    answer: "Contributing to open source",
    tint: "bg-orchid-soft",
    rotate: "-rotate-[1deg]",
    place: "md:col-start-4 md:row-start-1",
  },
  {
    prompt: "What am I training\u00a0for?",
    answer: "A higher vertical jump",
    tint: "bg-orchid-soft",
    rotate: "-rotate-[1.5deg]",
    place: "md:col-start-1 md:row-start-4",
  },
  {
    prompt: "What did I just\u00a0finish?",
    answer: "Metroid Dread, 100%",
    tint: "bg-blue-soft",
    rotate: "rotate-[2deg]",
    place: "md:col-start-4 md:row-start-4",
  },
];

function Now() {
  return (
    <section aria-labelledby="now-heading">
      {/* Stretched both ways, a note keeps its row level when a long answer
          makes it taller than square. Stretched one way, it would widen to
          stay square and overflow. */}
      <div className="grid grid-cols-2 items-stretch justify-items-stretch gap-5 md:grid-cols-4">
        <PinnedCard
          bg="bg-blue-soft"
          padding="p-4 md:p-6"
          className="relative col-span-2 flex aspect-square flex-col md:col-start-2 md:row-span-2 md:row-start-2"
        >
          <Pin className="absolute -top-2 left-1/2 -translate-x-1/2" />
          <SectionTitle accent="blue" id="now-heading">
            Now
          </SectionTitle>
          <p className="mt-2 text-sm text-gray-700">
            A{" "}
            <TextLink href="https://nownownow.com/about" accent="blue" external>
              now page
            </TextLink>{" "}
            is exactly what it sounds like. It&rsquo;s a snapshot of what
            I&rsquo;m up to these days, the sort of thing I&rsquo;d tell a
            friend I haven&rsquo;t seen in a year.
          </p>
          <p className="mt-2 text-sm text-gray-700">
            Every couple of months I get really into one particular hobby.
            Whenever I burn out on whatever I&rsquo;m fixated on, I always
            forget that I have a whole catalogue of other interests to fall back
            on. This page is how I&rsquo;m going to keep track of it all.
          </p>
          <div className="mt-auto flex justify-end pt-4">
            <DateStamp label="Last updated" date={LAST_UPDATED} />
          </div>
        </PinnedCard>

        {/* The question sits at the same spot on every note, so a row reads
            level however many lines each takes. */}
        {NOW_NOTES.map((note) => (
          <PinnedCard
            key={note.prompt}
            bg={note.tint}
            padding="p-4"
            rotate={note.rotate}
            className={`flex aspect-square flex-col items-center text-center ${note.place}`}
          >
            <p className="text-sm text-gray-700">{note.prompt}</p>
            <h3 className="mt-1 flex flex-1 items-center justify-center text-balance font-hand text-2xl leading-tight text-ink">
              {note.answer}
            </h3>
          </PinnedCard>
        ))}
      </div>
    </section>
  );
}

export default Now;
