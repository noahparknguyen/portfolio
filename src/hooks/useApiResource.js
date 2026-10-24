import { useEffect, useRef, useState } from "react";

const TIMEOUT_MS = 7000;

// Fetches one of the Worker's /api endpoints for a live widget: the response's
// `key` field, a timeout, and an optional poll. The four widgets differ only in
// path, key, and whether they poll.
function useApiResource(path, { key, pollMs } = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const controllerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchResource() {
      controllerRef.current?.abort();
      const controller = new AbortController();
      controllerRef.current = controller;
      const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

      try {
        const res = await fetch(path, { signal: controller.signal });
        if (!res.ok) {
          // Drain the body before bailing out. Throwing on a non-OK response
          // without reading it leaves the stream unconsumed, and Chrome holds
          // the connection open, so the page never reaches network idle.
          await res.body?.cancel().catch(() => {});
          throw new Error(`${path} returned ${res.status}`);
        }
        const body = await res.json();
        if (cancelled) return;
        setData(body[key] ?? null);
      } catch {
        // Keep the last good value: a slightly old reading is a smaller error
        // than an empty state. A successful null still clears it, since that's
        // a real answer.
      } finally {
        clearTimeout(timeoutId);
        if (!cancelled) setLoading(false);
      }
    }

    fetchResource();
    const intervalId = pollMs ? setInterval(fetchResource, pollMs) : null;

    return () => {
      cancelled = true;
      if (intervalId) clearInterval(intervalId);
      controllerRef.current?.abort();
    };
  }, [path, key, pollMs]);

  return { data, loading };
}

export default useApiResource;
