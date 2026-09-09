import { useCallback, useEffect, useRef, useState } from "react";
import { idForPath, pathForId, routeFor, SITE } from "../lib/routes";

// Keeps the active section and the URL in step, so every page has a real
// address: it can be linked, bookmarked, opened in a new tab, and walked with
// the browser's Back button. Before this the section lived in a bare useState,
// which meant one URL for the whole site and no history at all.
//
// Deliberately hand-rolled rather than pulling in a router: there are five
// static routes, no params, no nested layouts and no data loading, so a
// dependency would cost more than it saves.

function setMeta(selector, attr, value) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

// The head tags in index.html are the ones social crawlers read, since Twitter,
// Facebook and LinkedIn don't execute JS — those stay the site-wide fallback.
// Updating them here is for the visitor's tab title and for crawlers that DO
// render (Google), which is also what makes each route indexable on its own.
function applyRouteMeta(id) {
  const route = routeFor(id);
  document.title = route.title;
  setMeta('link[rel="canonical"]', "href", `${SITE}${route.path}`);
  setMeta('meta[name="description"]', "content", route.description);
  setMeta('meta[property="og:url"]', "content", `${SITE}${route.path}`);
  setMeta('meta[property="og:title"]', "content", route.title);
  setMeta('meta[property="og:description"]', "content", route.description);
  setMeta('meta[name="twitter:title"]', "content", route.title);
  setMeta('meta[name="twitter:description"]', "content", route.description);
}

function useRoute() {
  const [active, setActive] = useState(() =>
    idForPath(window.location.pathname),
  );
  // Distinguishes a real navigation from the first render, so the initial load
  // neither scrolls nor steals focus from where the browser put it.
  const navigated = useRef(false);

  useEffect(() => {
    // Back/forward: the browser owns the URL here, so only mirror it into state.
    // Scroll position is left to the browser's own restoration, which is why
    // this path never calls scrollTo.
    const onPopState = () => setActive(idForPath(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    applyRouteMeta(active);
  }, [active]);

  const navigate = useCallback((id) => {
    const path = pathForId(id);
    // A 404 keeps whatever URL the visitor actually typed; pushing "/404" over
    // it would rewrite their address bar and break the Back button's meaning.
    if (id !== "notfound" && path !== window.location.pathname) {
      window.history.pushState({ id }, "", path);
    }
    navigated.current = true;
    setActive(id);
  }, []);

  return { active, navigate, navigated };
}

export default useRoute;
