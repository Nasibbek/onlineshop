import { useState, useEffect, useCallback } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const refetch = useCallback(() => setReloadKey((k) => k + 1), []);

  useEffect(() => {
    let cancelled = false;

    // url berilmagan bo'lsa (masalan, ma'lumot allaqachon lokal manbadan
    // olingan bo'lsa) — fetch qilishning hojati yo'q
    if (!url) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    async function fetchData() {
      try {
        // url o'zgarganda (yoki qayta urinishda) eski ma'lumot bilan
        // "flicker" bo'lmasligi uchun state'ni darhol tozalaymiz
        setData(null);
        setLoading(true);
        setError(null);

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Xatolik yuz berdi (${response.status})`);
        }

        const result = await response.json();
        if (!cancelled) setData(result);
      } catch (err) {
        if (!cancelled) {
          setError(
            err.name === "TypeError"
              ? "Internet aloqasini tekshiring"
              : err.message
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [url, reloadKey]);

  return { data, loading, error, refetch };
}

export default useFetch;
