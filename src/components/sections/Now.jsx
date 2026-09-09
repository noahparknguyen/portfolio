import PinnedCard from "../ui/PinnedCard";
import SectionTitle from "../ui/SectionTitle";
import Eyebrow from "../ui/Eyebrow";
import TextLink from "../ui/TextLink";
import Pin from "../ui/Pin";

// Keep this next to NOW_NOTES and move it whenever the notes move — the two are
// one edit, not two. It can't be derived: the last commit date would report a
// CSS tweak as a content update, which is worse than being stale.
const LAST_UPDATED = "September 2026";

// Tints are a solved layout, not a free choice. The intro card carries Now's own
// section hue (blue), and it touches the first four notes, so none of those can
// be blue. Beyond that, two notes touch whenever they sit 1 or 3 apart in this
// array: 1 apart in the single-column mobile stack, 3 apart in the md
// three-column grid once the intro's 2x2 span is accounted for. The order below
// is one of 42 arrangements satisfying both tiers with an even 2-2-2-2 spread.
//
// Rotations are all within 1.5 degrees. Three notes used to sit at 2, which
// breaks the guide's cap for anything wider than a compact card, and at 320px
// every note is full width, so the cap applies to all of them.
//
// EIGHT cards, not eleven. The questions are the general ones real now pages
// actually cover (work, reading, learning, health, saying no) rather than the
// oddly specific ones this page opened with; "What am I reading?" is the
// second most common topic in the directory and was missing entirely.
//
// A now page is "what you'd tell a friend you hadn't
// seen in a year" (nownownow.com/about): focus and priorities, not an
// inventory. Real now pages run 0-4 broad buckets, and eleven discrete ones
// read as a list. Three pairs were merged rather than cut, so nothing true was
// lost: the two "watching" cards, which were one letter apart and collided on
// the board; Java and Python into one languages card; and the thin Statmon
// card, whose only content the Creations page already carries.
//
// The prompts are specific to their own answer. Interchangeable ones like
// "What am I focused on?" restate the premise of the whole page, and two of
// them had ended up reading as the same question.
const NOW_NOTES = [
  {
    prompt: "What am I playing?",
    answer: "Pikmin",
    explanation:
      "I’ve been addicted to Pikmin lately, the original GameCube games plus the many ROM hacks the community has made.",
    tint: "bg-orchid-soft",
    rotate: "-rotate-[1deg]",
  },
  {
    prompt: "What am I watching?",
    answer: "Haikyuu!! again",
    explanation:
      "I’m rewatching it again. It’s honestly one of my favourite pieces of media ever, both the show and the manga.",
    tint: "bg-rose-soft",
    rotate: "rotate-[1.5deg]",
  },
  {
    prompt: "What am I reading?",
    answer: "Core Java",
    explanation:
      "I’m partway through Core Java, starting from the beginning again so I really know the ins and outs of the language.",
    tint: "bg-orchid-soft",
    rotate: "-rotate-[1.5deg]",
  },
  {
    prompt: "What am I working on?",
    answer: "The next project",
    explanation:
      "With the portfolio and Statmon basically finished, I’m brainstorming what to build next. The urge to create needs somewhere to go.",
    tint: "bg-violet-soft",
    rotate: "rotate-[1deg]",
  },
  {
    prompt: "What am I learning?",
    answer: "How emulation works",
    explanation:
      "I’ve always played old games on emulators. What pulls me in now is the people decompiling them to build ROM hacks and fan games.",
    tint: "bg-blue-soft",
    rotate: "-rotate-[1deg]",
  },
  {
    prompt: "What habit am I building?",
    answer: "Moving every day",
    explanation:
      "I’m trying to be more active every day, whether that’s the gym or just a walk after a long day of sitting.",
    tint: "bg-rose-soft",
    rotate: "rotate-[1.5deg]",
  },
  {
    prompt: "What am I saying no to?",
    answer: "Social media",
    explanation:
      "I almost never get anything from it, and I usually come away feeling worse. I’ve cut myself back to YouTube and nothing else.",
    tint: "bg-blue-soft",
    rotate: "-rotate-[1.5deg]",
  },
  {
    prompt: "What’s on my mind?",
    answer: "AI",
    explanation:
      "Its rise has been hard to ignore. I’d need more than a sticky note to get my thoughts down, so maybe that’s a blog post.",
    tint: "bg-violet-soft",
    rotate: "rotate-[1deg]",
  },
];

function Now() {
  return (
    <section aria-labelledby="now-heading">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <PinnedCard
          bg="bg-blue-soft"
          padding="p-4 md:p-6"
          className="relative flex flex-col md:col-span-2 md:row-span-2"
        >
          <Pin className="absolute -top-2 left-1/2 -translate-x-1/2" />
          <SectionTitle accent="blue" id="now-heading">
            Now
          </SectionTitle>
          <p className="mt-2 max-w-prose text-gray-700">
            A{" "}
            <TextLink href="https://nownownow.com/about" accent="blue" external>
              now page
            </TextLink>{" "}
            is exactly what it sounds like. It&rsquo;s a snapshot of what
            I&rsquo;m up to these days, the sort of thing I&rsquo;d tell a
            friend I haven&rsquo;t seen in a year.
          </p>
          <p className="mt-2 max-w-prose text-gray-700">
            Every couple of months I get really into one particular hobby. Right
            now it&rsquo;s old GameCube games, and last month it was Balatro.
            Whenever I burn out on whatever I&rsquo;m fixated on, I always
            forget that I have a whole catalogue of other interests to fall back
            on. This page is how I&rsquo;m going to keep track of it all.
          </p>
          {/* Pushed to the foot at md, where the card's `row-span-2` makes it
              taller than its own content: the stamp used to sit right under the
              prose and leave 110px of dead paper below it, 23% of the card.
              `mt-auto` reads as a date stamped at the bottom of a document,
              which is the same move the Achievements cards make with their
              "Unlocked" line. Stays `mt-4` below md, where the card is its
              natural height and there is no slack to distribute. */}
          <div className="mt-4 flex justify-end md:mt-auto">
            <div className="rotate-2 border-2 border-dashed border-label px-3 py-1 text-center">
              <Eyebrow as="p">Last updated</Eyebrow>
              <Eyebrow as="p" tone="ink">
                {LAST_UPDATED}
              </Eyebrow>
            </div>
          </div>
        </PinnedCard>

        {NOW_NOTES.map((note) => (
          <PinnedCard
            key={note.answer}
            bg={note.tint}
            padding="p-4"
            rotate={note.rotate}
          >
            <Eyebrow as="p">{note.prompt}</Eyebrow>
            <h3 className="mt-2 text-lg font-display font-semibold text-ink">
              {note.answer}
            </h3>
            <p className="mt-2 text-sm text-gray-700">{note.explanation}</p>
          </PinnedCard>
        ))}
      </div>
    </section>
  );
}

export default Now;
