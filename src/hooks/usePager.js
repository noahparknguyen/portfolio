import { useRef, useState } from "react";

const SWIPE_MIN_PX = 50;

// The page state behind the passport's chapters and a book's spreads. `go`
// clamps to the first and last page and returns where it landed. The swipe
// reads only where a touch starts and ends, with no touchmove or
// preventDefault, so a mostly vertical swipe still scrolls the page.
function usePager(count) {
  const [index, setIndex] = useState(0);
  const touchStart = useRef(null);

  const go = (n) => {
    const next = Math.max(0, Math.min(count - 1, n));
    setIndex(next);
    return next;
  };

  const swipe = {
    onTouchStart(e) {
      const t = e.touches[0];
      touchStart.current = { x: t.clientX, y: t.clientY };
    },
    onTouchEnd(e) {
      if (!touchStart.current) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - touchStart.current.x;
      const dy = t.clientY - touchStart.current.y;
      touchStart.current = null;
      if (Math.abs(dx) < SWIPE_MIN_PX || Math.abs(dx) <= Math.abs(dy)) return;
      go(dx < 0 ? index + 1 : index - 1);
    },
  };

  return { index, go, swipe };
}

export default usePager;
