import { useEffect, useRef, useState } from "react";

const EDGE_FADE_MASK =
  "linear-gradient(to right, transparent, #000 0.75rem, #000 calc(100% - 0.75rem), transparent)";

function MarqueeText({ text, className = "", style }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [overflowing, setOverflowing] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const textEl = textRef.current;
    if (!container || !textEl) return;

    const check = () =>
      setOverflowing(textEl.scrollWidth > container.clientWidth);
    check();
    const observer = new ResizeObserver(check);
    observer.observe(container);
    return () => observer.disconnect();
  }, [text]);

  const shouldAnimate = overflowing;
  const duration = Math.max(4, text.length * 0.25);
  const maskStyle = shouldAnimate
    ? { WebkitMaskImage: EDGE_FADE_MASK, maskImage: EDGE_FADE_MASK }
    : null;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden whitespace-nowrap ${className}`}
      style={{ ...maskStyle, ...style }}
    >
      <span
        ref={textRef}
        className={`block truncate ${shouldAnimate ? "opacity-0" : ""}`}
      >
        {text}
      </span>
      {shouldAnimate && (
        <div
          className="animate-marquee absolute inset-y-0 left-0 flex w-max items-center"
          style={{ "--marquee-duration": `${duration}s` }}
          aria-hidden="true"
        >
          <span className="flex items-center">
            {text}
            <span className="px-4 text-label">•</span>
          </span>
          <span className="flex items-center">
            {text}
            <span className="px-4 text-label">•</span>
          </span>
        </div>
      )}
    </div>
  );
}

export default MarqueeText;
