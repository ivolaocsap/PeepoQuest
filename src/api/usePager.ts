import { useEffect, useRef, useState } from 'react';

export type Fetcher<T> = (skip: number, take: number) => Promise<T[] | { items: T[] }>;

export const usePager = <T>(callback: Fetcher<T>, deps: unknown[]) => {
  const [page, setPage] = useState(1);
  const quantity = 10;
  const cbRef = useRef<Fetcher<T>>();
  const [data, setData] = useState<T[]>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    cbRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const skip = (page - 1) * quantity;
    let mounted = true;
    cbRef.current
      .call(null, skip, quantity)
      .then((res) => {
        if (!mounted) {
          return;
        }
        setLoading(false);
        if (Array.isArray(res)) {
          setData(res);
        } else {
          setData(res.items);
        }
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, ...deps]);

  return {
    data,
    loading,
    error,
    page,
    setPage,
    next: () => setPage((x) => x + 1),
    previous: () => setPage((x) => x - 1),
  };
};
