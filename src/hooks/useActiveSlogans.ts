import { useMemo, useRef } from 'react';
import { slogans, Slogan } from '@/content/slogans';
import { Order } from '@/store/settings';

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function useActiveSlogans(order: Order): Slogan[] {
  // Keep a stable shuffled order for the lifetime of the component tree.
  // Only re-shuffle when `order` changes to 'random'.
  const shuffledRef = useRef<Slogan[]>(shuffle(slogans));

  return useMemo(() => {
    if (order === 'random') {
      shuffledRef.current = shuffle(slogans);
      return shuffledRef.current;
    }
    return slogans;
  }, [order]);
}
