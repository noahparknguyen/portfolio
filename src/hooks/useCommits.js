import useApiResource from "./useApiResource";

function useCommits() {
  const { data, loading, error } = useApiResource("/api/commits", {
    key: "commits",
  });
  return { commits: data ?? [], loading, error };
}

export default useCommits;
