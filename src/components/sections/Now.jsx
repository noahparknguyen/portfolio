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
// section hue (blue), and it touches four notes, so none of those can be blue.
// The order below is checked for both tiers: no two touching cards share a hue
// in the md 3-column grid OR in the single-column mobile stack.
// Spread: violet x3, rose x3, blue x3, orchid x2.
const NOW_NOTES = [
  {
    prompt: "What am I figuring out?",
    answer: "A sleep schedule",
    explanation:
      "Sleeping has always been a struggle for me. I keep drifting later every week until I’m waking up at noon, and I’m resetting it properly this time.",
    tint: "bg-violet-soft",
    rotate: "-rotate-[1deg]",
  },
  {
    prompt: "What am I watching?",
    answer: "Haikyuu, again",
    explanation:
      "Haikyuu is probably my favourite thing ever made. It’s what got me into volleyball in the first place, and I’ve rewatched it more times than I can count.",
    tint: "bg-rose-soft",
    rotate: "rotate-[1.5deg]",
  },
  {
    prompt: "What am I focused on?",
    answer: "Sharpening my Java",
    explanation:
      "I’m going back through Java from the basics. I want to stay sharp and not lose anything before the new job starts.",
    tint: "bg-orchid-soft",
    rotate: "-rotate-[1.5deg]",
  },
  {
    prompt: "What’s happening with work?",
    answer: "Security clearance",
    explanation:
      "The clearance can take up to a year, so most of this is out of my hands. I check my email more than I should.",
    tint: "bg-rose-soft",
    rotate: "rotate-[1deg]",
  },
  {
    prompt: "What am I maintaining?",
    answer: "Statmon",
    explanation:
      "My Pokémon tools site is finished now, so all that’s left is keeping it running.",
    tint: "bg-blue-soft",
    rotate: "-rotate-[2deg]",
  },
  {
    prompt: "What am I learning?",
    answer: "Python",
    explanation:
      "Python is so common in the industry that picking it up was a no-brainer. Eventually I want to build a full backend with it.",
    tint: "bg-violet-soft",
    rotate: "rotate-[2deg]",
  },
  {
    prompt: "What am I saying no to?",
    answer: "Social media",
    explanation:
      "Social media gives me headaches, and it’s the reason my sleep is bad. I’m trying to filter out the slop and keep YouTube as the only thing I sit down for.",
    tint: "bg-blue-soft",
    rotate: "-rotate-[1deg]",
  },
  {
    prompt: "What’s on my mind?",
    answer: "Being complacent",
    explanation:
      "AI has been in my workflow for a while now, and it’s tempting to let it do everything. But I need to keep making my own decisions. It’s a tool, not a miracle worker.",
    tint: "bg-rose-soft",
    rotate: "rotate-[1.5deg]",
  },
  {
    prompt: "What did I just start?",
    answer: "Back in the gym",
    explanation:
      "I’m back to basic weightlifting, a couple of sessions a week. The goal is a routine I actually stick to, with no missed days.",
    tint: "bg-blue-soft",
    rotate: "-rotate-[2deg]",
  },
  {
    prompt: "What am I playing?",
    answer: "Pikmin & GameCube",
    explanation:
      "I’m pretty addicted to Pikmin right now, enough that I’m thinking about picking speedrunning back up.",
    tint: "bg-orchid-soft",
    rotate: "rotate-[1deg]",
  },
  {
    prompt: "Who am I watching?",
    answer: "Sarah Z & SnapCube",
    explanation:
      "Sarah Z on YouTube and SnapCube on Twitch are pretty much the only creators I keep up with these days.",
    tint: "bg-violet-soft",
    rotate: "-rotate-[1deg]",
  },
];

function Now() {
  return (
    <section aria-labelledby="now-heading">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <PinnedCard
          bg="bg-blue-soft"
          padding="p-4 md:p-6"
          className="relative md:col-span-2 md:row-span-2"
        >
          <Pin className="absolute -top-2 left-1/2 -translate-x-1/2" />
          <SectionTitle accent="blue" id="now-heading">
            Now
          </SectionTitle>
          <p className="mt-2 max-w-prose text-gray-700">
            A{" "}
            <TextLink href="https://nownownow.com" accent="blue" external>
              now page
            </TextLink>{" "}
            is exactly what it sounds like. It&rsquo;s a snapshot of what
            I&rsquo;m up to at the moment, the sort of thing I&rsquo;d tell a
            friend I haven&rsquo;t seen in a while.
          </p>
          <p className="mt-3 max-w-prose text-gray-700">
            Every couple of months I get really into one particular hobby. Right
            now it&rsquo;s old GameCube games, and last month it was Balatro.
            When I burn out on whatever I&rsquo;m fixated on, I always forget
            that I have a whole catalogue of other interests to fall back on.
            This page is how I keep track of all of it.
          </p>
          <div className="mt-4 flex justify-end">
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
