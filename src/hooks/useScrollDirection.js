import { useEffect, useRef, useState } from "react";

const THRESHOLD_PX = 8;

// Hide-on-scroll-down / reveal-on-scroll-up for Header's sticky (mobile) nav
// bar. Takes a ref to the bar itself so it can stay visible while scrollY is
// within its own height and force back open when focus lands inside it
// (WCAG 2.4.11 Focus Not Obscured — a keyboard user must never be able to tab
// into an off-screen control). `enabled` gates the listeners so the masthead
// Header instance (never hidden, not position:sticky) doesn't pay for them.
//
// `enabled` is per-instance, not per-viewport: the sticky instance stays
// mounted at md+ under `md:hidden`, so its listeners are still attached there.
// The offsetHeight guard in handleScroll is what actually stops the work — a
// display:none element measures 0 — which is cheaper and less brittle than a
// matchMedia subscription duplicating the breakpoint in JS.
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

        // 0 means the bar is display:none (md+, where the sticky instance is
        // hidden). Nothing to show or hide, so skip the state update entirely.
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
