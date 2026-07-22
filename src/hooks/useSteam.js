import useApiResource from "./useApiResource";

function useSteam() {
  const { data, loading, error } = useApiResource("/api/steam", {
    key: "game",
  });
  return { game: data, loading, error };
}

export default useSteam;
