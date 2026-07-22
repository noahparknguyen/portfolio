import PinnedCard from "../ui/PinnedCard";
import SectionTitle from "../ui/SectionTitle";
import Eyebrow from "../ui/Eyebrow";
import Pin from "../ui/Pin";

const LAST_UPDATED = "July 2026";

const NOW_NOTES = [
  {
    prompt: "What am I figuring out?",
    answer: "A sleep schedule",
    explanation: "Still trying to lock in a consistent sleep schedule.",
    tint: "bg-blue-soft",
    rotate: "-rotate-[1deg]",
  },
  {
    prompt: "What am I watching?",
    answer: "Haikyuu, again",
    explanation: "Rewatching Haikyuu. I've seen it like ten times.",
    tint: "bg-violet-soft",
    rotate: "rotate-[1.5deg]",
  },
  {
    prompt: "What am I focused on?",
    answer: "Sharpening my Java",
    explanation:
      "Keeping my skills sharp before the new job starts. I've started Java over from the basics because I want to properly master it.",
    tint: "bg-rose-soft",
    rotate: "-rotate-[1.5deg]",
  },
  {
    prompt: "What's happening with work?",
    answer: "Security clearance",
    explanation:
      "Getting my security clearance sorted out for a role with the government.",
    tint: "bg-orchid-soft",
    rotate: "rotate-[1deg]",
  },
  {
    prompt: "What am I building?",
    answer: "Statmon",
    explanation:
      "A Pokémon stats site that compares two Pokémon head-to-head and shows their type matchups, plus a few extra games and tools.",
    tint: "bg-primary-soft",
    rotate: "-rotate-[2deg]",
  },
  {
    prompt: "What am I learning?",
    answer: "Python",
    explanation:
      "Learning basic Python for now. Eventually I want to build a full API and back-end with it.",
    tint: "bg-blue-soft",
    rotate: "rotate-[2deg]",
  },
  {
    prompt: "What am I saying no to?",
    answer: "Social media",
    explanation:
      "Staying off my phone and social media — being online too much was giving me headaches.",
    tint: "bg-paper",
    rotate: "-rotate-[1deg]",
  },
  {
    prompt: "What's on my mind?",
    answer: "Being complacent",
    explanation:
      "How do I keep from succumbing to the AI boom when it's so tempting to let AI do everything for me?",
    tint: "bg-violet-soft",
    rotate: "rotate-[1.5deg]",
  },
  {
    prompt: "What did I just start?",
    answer: "Back in the gym",
    explanation:
      "I used to be a huge gym rat but fell off when I got too busy. Back to basic weightlifting now, aiming for a routine with no missed days.",
    tint: "bg-orchid-soft",
    rotate: "-rotate-[2deg]",
  },
  {
    prompt: "What am I playing?",
    answer: "Pikmin & GameCube",
    explanation:
      "Replaying the Pikmin games and a bunch of GameCube classics on the Dolphin emulator.",
    tint: "bg-rose-soft",
    rotate: "rotate-[1deg]",
  },
  {
    prompt: "Who am I watching?",
    answer: "Sarah Z & SnapCube",
    explanation:
      "My favourite online creators these days are Sarah Z on YouTube and SnapCube on Twitch.",
    tint: "bg-blue-soft",
    rotate: "-rotate-[1deg]",
  },
];

function Now() {
  return (
    <section aria-labelledby="now-heading">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        <PinnedCard
          bg="bg-primary-soft"
          padding="p-6"
          rotate="-rotate-[1deg]"
          className="relative sm:col-span-2 md:col-span-2 md:row-span-2"
        >
          <Pin className="absolute -top-2 left-1/2 -translate-x-1/2" />
          <SectionTitle accent="blue" id="now-heading">
            Now
          </SectionTitle>
          <p className="mt-2 max-w-prose text-gray-700">
            A now page is pretty much exactly what it sounds like — a snapshot
            of what I'm up to at this very moment, the stuff I'd tell a friend I
            haven't seen in a while. Every couple of months, I get really into
            one particular hobby. Right now it's old GameCube games; last month
            it was Balatro. When I burn out on whatever I'm fixated on, I always
            forget I've got an entire catalogue of other interests I can fall
            back on. This page is a way for me to keep track of everything.
          </p>
          <div className="mt-4 flex justify-end">
            <div className="rotate-2 border-2 border-dashed border-label px-3 py-1.5 text-center text-xs uppercase tracking-wide text-label">
              <p>Last updated</p>
              <p className="font-semibold">{LAST_UPDATED}</p>
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
