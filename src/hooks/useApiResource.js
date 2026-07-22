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
        setData(null);
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
