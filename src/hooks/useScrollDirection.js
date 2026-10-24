import { useEffect, useRef, useState } from "react";

const THRESHOLD_PX = 8;

// Hides the sticky phone nav on scroll down and shows it on scroll up. It stays
// open near the top, and opens when focus lands inside it (WCAG 2.4.11).
// `enabled` spares the masthead's copy of the nav. The sticky copy stays
// mounted at md under `md:hidden`, where it measures 0 and the scroll handler
// skips the work, rather than duplicating the breakpoint in JS.
function useScrollDirection(barRef, enabled = true) {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    if (!enabled) return;
    lastScrollY.current = Math.max(window.scrollY, 0);

    function handleScroll() {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        ticking.current = false;
        const scrollY = Math.max(window.scrollY, 0);
        const barHeight = barRef.current?.offsetHeight ?? 0;

        // 0 means the bar is display:none, at md and up.
        if (barHeight === 0) {
          lastScrollY.current = scrollY;
          return;
        }

        const delta = scrollY - lastScrollY.current;

        if (scrollY <= barHeight) {
          setHidden(false);
        } else if (Math.abs(delta) > THRESHOLD_PX) {
          setHidden(delta > 0);
        }
        lastScrollY.current = scrollY;
      });
    }

    function handleFocusIn(event) {
      if (barRef.current?.contains(event.target)) setHidden(false);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("focusin", handleFocusIn);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("focusin", handleFocusIn);
    };
  }, [barRef, enabled]);

  return hidden;
}

export default useScrollDirection;
