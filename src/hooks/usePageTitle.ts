import { useLayoutEffect } from 'react';

export const usePageTitle = (title: string) => {
  useLayoutEffect(() => {
    document.title = title;

    return () => {
      document.title = 'iron Finance';
    };
  }, [title]);
};
