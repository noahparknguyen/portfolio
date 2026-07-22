import useApiResource from "./useApiResource";

const REFRESH_MS = 45000;

function useSpotify() {
  const { data, loading, error } = useApiResource("/api/spotify", {
    key: "track",
    pollMs: REFRESH_MS,
  });
  return { track: data, loading, error };
}

export default useSpotify;
