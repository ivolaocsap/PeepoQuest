import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const useQuery = (): URLSearchParams => {
  return new URLSearchParams(useLocation().search);
};

export const useQueryParams = (key: string): string => {
  const query = useQuery();
  return useMemo(() => query.get(key), [query, key]);
};

export default useQuery;
