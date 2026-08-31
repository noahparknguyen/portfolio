import celeste from "../../assets/celeste-madeline-portrait.gif";
import Eyebrow from "../ui/Eyebrow";

function LiveReaction() {
  return (
    <div>
      {/* `tracking-widest` overrides the Overline role's `tracking-wide` on
          purpose: wide-letterspaced uppercase micro-type is the broadcast-chyron
          convention this widget imitates (STYLE_GUIDE.md → Type). The weight
          stays the role's `semibold`. */}
      <Eyebrow
        as="p"
        tone="on-ink"
        className="bg-ink py-1 text-center tracking-widest"
      >
        {/* The strawberry is a Celeste reference and purely decorative, so it's
            aria-hidden — the label announces "Live Reaction", not "Live
            strawberry Reaction". */}
        Live <span aria-hidden="true">🍓</span> Reaction
      </Eyebrow>
      <div className="relative">
        {/* No border here: this sits in a `bg-ink` card, so an ink border on an
            ink fill is invisible — the frame you see is the card's own fill. */}
        <img
          src={celeste}
          alt="Madeline from Celeste, mid-reaction"
          width="300"
          height="300"
          decoding="async"
          className="block h-auto w-full"
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
