import { useState, useEffect, useCallback } from 'react';

export interface CountdownTime {
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
  expired: boolean;
}

export function useCountdown(endTime: number): CountdownTime {
  const calc = useCallback((): CountdownTime => {
    const diff = endTime - Date.now();
    if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0, total: 0, expired: true };
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return { hours, minutes, seconds, total: diff, expired: false };
  }, [endTime]);

  const [time, setTime] = useState<CountdownTime>(calc);

  useEffect(() => {
    setTime(calc());
    const interval = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(interval);
  }, [calc]);

  return time;
}
