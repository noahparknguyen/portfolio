import useApiResource from "./useApiResource";

function useSpotify() {
  const { data, loading, error } = useApiResource("/api/spotify", {
    key: "track",
  });
  return { track: data, loading, error };
}

export default useSpotify;
