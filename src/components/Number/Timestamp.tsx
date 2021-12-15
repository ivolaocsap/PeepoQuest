import fromUnixTime from 'date-fns/fromUnixTime';
import fmt from 'date-fns/format';
import React from 'react';

export type TimestampProps = {
  value: Date | number | string;
  format?: string;
  fallback?: string;
};

const getDate = (value: Date | number | string): Date => {
  if (!value) {
    return null;
  }

  if (value instanceof Date) {
    return value;
  }

  if (typeof value === 'number') {
    return fromUnixTime(value);
  }

  if (typeof value === 'string') {
    return new Date(value);
  }

  throw new Error('Invalid time');
};

export const Timestamp: React.FC<TimestampProps> = ({ value, format, fallback }) => {
  const str = value ? fmt(getDate(value), format || 'dd-MM-y HH:mm:ss') : fallback;
  return <>{str}</>;
};
