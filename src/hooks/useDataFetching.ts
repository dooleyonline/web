"use client";

import { useState, useEffect, useCallback } from "react";

interface FetchResult<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

function useDataFetching<T>(
  fetchFunction: () => Promise<T>,
  initialData: T | null = null
): FetchResult<T> {
  const [data, setData] = useState<T | null>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchFunction();
      setData(result);
    } catch (e) {
      console.error("Error in useDataFetching:", e);
      setError(e instanceof Error ? e.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [fetchFunction]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error };
}

export default useDataFetching;
