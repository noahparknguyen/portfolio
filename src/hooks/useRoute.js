import { useCallback, useEffect, useState } from "react";
import { idForPath, pathForId, routeFor, SITE } from "../lib/routes";

// Keeps the active section and the URL in step, so every page can be linked,
// bookmarked, and walked with Back. Hand-rolled rather than a router: five
// static routes, with no params, nesting, or data loading.

function setMeta(selector, attr, value) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

// Social crawlers read index.html's tags without running JS, so those stay the
// site-wide fallback. These updates serve the tab title and the crawlers that
// render, like Google's.
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
  useEffect(() => {
    // Back and forward: the browser owns the URL, so only mirror it.
    const onPopState = () => setActive(idForPath(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    applyRouteMeta(active);
  }, [active]);

  const navigate = useCallback((id) => {
    const path = pathForId(id);
    // A 404 keeps the URL the visitor typed.
    if (id !== "notfound" && path !== window.location.pathname) {
      window.history.pushState({ id }, "", path);
    }
    setActive(id);
  }, []);

  return { active, navigate };
}

export default useRoute;
