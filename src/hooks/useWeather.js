import useApiResource from "./useApiResource";

const REFRESH_MS = 600000;

function useWeather() {
  const { data, loading, error } = useApiResource("/api/weather", {
    key: "weather",
    pollMs: REFRESH_MS,
  });
  return { weather: data, loading, error };
}

export default useWeather;
