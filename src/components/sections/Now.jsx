import PinnedCard from "../ui/PinnedCard";
import SectionTitle from "../ui/SectionTitle";
import DateStamp from "../ui/DateStamp";
import TextLink from "../ui/TextLink";
import Pin from "../ui/Pin";

// Keep this next to NOW_NOTES and update it whenever the notes change: the two
// are one edit, not two. It can't be derived, because the last commit date
// would report a CSS tweak as a content update, which is worse than stale.
const LAST_UPDATED = "October 2026";

// The intro is a big square sticky note in the middle of a 4 x 4 grid, with
// twelve small square notes in a ring around it. Below md the intro comes first
// and the notes follow two across, in the order below.
//
// The markup keeps the intro first, so screen readers start on its "Now"
// heading. From md four notes sit above it on screen, which is a different
// order from the markup, but the notes hold no links, so keyboard focus never
// jumps: the intro's "now page" link is the only stop in the section.
//
// Tints are solved, not chosen. The eight notes along the intro's sides touch
// it, so none of them is blue; the corners don't, so they can be. Touching
// notes differ in both layouts: around the ring from md, and the rows and
// columns of the two-across grid below it.
//
// Each card is a question you'd ask a friend in passing, answered in a few
// words, so a monthly update is one edit per card plus LAST_UPDATED. Twelve is
// the ceiling: a now page is "what you'd tell a friend you hadn't seen in a
// year" (nownownow.com/about), focus and priorities rather than an inventory.
//
// Each prompt is specific to its own answer. Interchangeable ones like "What
// am I focused on?" restate the premise of the whole page. A prompt ending in a
// short word keeps it with the word before (\u00a0), so a wrapped question
// never ends on "on?" or "to?" alone.
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
      {/* Stretching on both axes keeps a row level when a long answer makes one
          note taller than square, which only happens at the narrowest phones.
          Stretched both ways, a box ignores its aspect ratio and takes its
          cell; stretched on one, it would widen to stay square and overflow. */}
      <div className="grid grid-cols-2 items-stretch justify-items-stretch gap-5 md:grid-cols-4">
        {/* The intro's body is the small size so it fits a square; it's a
            sticky note like the others now. */}
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
          {/* At the foot of the note, the way a date is stamped at the bottom
              of a document. */}
          <div className="mt-auto flex justify-end pt-4">
            <DateStamp label="Last updated" date={LAST_UPDATED} />
          </div>
        </PinnedCard>

        {/* The question sits at the same spot on every note, so a row reads
            level however many lines each takes. The answer is handwritten,
            the way a sticky note gets filled in, and centred in the space
            below; print against handwriting is the hierarchy, so nothing
            needs to be bold. */}
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
