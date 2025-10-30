import { useEffect, useState } from "react";
import client from "./client";

export function useApi<T>(url: string, params?: Record<string, unknown>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    client
      .get<T>(url, { params })
      .then((response) => {
        if (!mounted) return;
        setData(response.data);
        setError(null);
      })
      .catch((err: unknown) => {
        if (!mounted) return;
        setError(err instanceof Error ? err.message : "Неизвестная ошибка");
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [url, JSON.stringify(params ?? {})]);

  return { data, loading, error };
}
