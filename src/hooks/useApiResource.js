import { useEffect, useRef, useState } from "react";

const TIMEOUT_MS = 7000;

// Shared timeout + AbortController + cancel-flag + loading/error body behind
// useSpotify/useSteam/useCommits — they differ only in path, response key, and
// whether they poll.
function useApiResource(path, { key, pollMs } = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const controllerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchResource() {
      controllerRef.current?.abort();
      const controller = new AbortController();
      controllerRef.current = controller;
      let didTimeout = false;
      const timeoutId = setTimeout(() => {
        didTimeout = true;
        controller.abort();
      }, TIMEOUT_MS);

      try {
        const res = await fetch(path, { signal: controller.signal });
        if (!res.ok) throw new Error(`${path} returned ${res.status}`);
        const body = await res.json();
        if (cancelled) return;
        setData(body[key] ?? null);
        setError(false);
      } catch (err) {
        if (cancelled || (err.name === "AbortError" && !didTimeout)) return;
        // Keep the last good value instead of blanking the widget.
        //
        // This used to `setData(null)`, so a single failed POLL flipped a
        // playing track to "Nothing playing" and a live temperature to
        // "couldn't get a reading" until the next success — 45s for Spotify,
        // 10 minutes for Weather. A stale value is the smaller error: the empty
        // state asserts a fact ("nothing is playing") that is probably false,
        // where a slightly old reading is merely slightly old.
        //
        // A SUCCESSFUL response carrying null still clears the data, because
        // that is a real answer. So a finished track never sticks on screen —
        // only an unreachable endpoint preserves what was last true.
        setError(true);
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

  return { data, loading, error };
}

export default useApiResource;
