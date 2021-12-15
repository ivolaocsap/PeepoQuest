import formatDuration from 'date-fns/formatDuration';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseDuration = (secs: number): any => {
  let minutes = Math.floor(secs / 60);
  const seconds = secs % 60;
  const hours = Math.floor(minutes / 60);
  minutes = minutes % 60;
  return {
    seconds,
    minutes,
    hours,
  };
};

export type DurationProps = {
  value: number;
  fallback?: string;
};

export const Duration: React.FC<DurationProps> = (
  { value, fallback } = { value: null, fallback: '' },
) => {
  return <>{value ? formatDuration(parseDuration(value)) : fallback}</>;
};
