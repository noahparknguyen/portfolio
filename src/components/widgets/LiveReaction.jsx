import celeste from "../../assets/celeste-madeline-portrait.gif";
import Eyebrow from "../ui/Eyebrow";

function LiveReaction() {
  return (
    <div className="flex h-full flex-col justify-around">
      <Eyebrow
        as="p"
        tone="on-ink"
        className="bg-ink py-1 text-center font-bold tracking-widest"
      >
        Live 🍓 Reaction
      </Eyebrow>
      <div className="relative">
        <img
          src={celeste}
          alt="Madeline from Celeste, mid-reaction"
          width="300"
          height="300"
          decoding="async"
          className="block h-auto w-full border-2 border-ink"
        />

        {/* camera-frame corner markers */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1 top-1 h-3 w-3 border-l-2 border-t-2 border-on-ink"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-1 top-1 h-3 w-3 border-r-2 border-t-2 border-on-ink"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-1 left-1 h-3 w-3 border-b-2 border-l-2 border-on-ink"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-1 right-1 h-3 w-3 border-b-2 border-r-2 border-on-ink"
        />

        {/* recording indicator */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-2 top-2 flex items-center gap-1"
        >
          <span className="animate-blink h-2 w-2 -translate-y-px rounded-full bg-live" />
          <span className="font-mono text-xs font-bold leading-none text-on-ink">
            REC
          </span>
        </span>
      </div>
    </div>
  );
}

export default LiveReaction;
