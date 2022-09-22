import { useLayoutEffect, useState } from "react";

export default function useHashKeys(): string[] {
  const [, update] = useState(0);

  useLayoutEffect(() => {
    const hashchangeEv = () => {
      update(performance.now());
    };
    window.addEventListener('hashchange', hashchangeEv);
    return () => {
      window.removeEventListener('hashchange', hashchangeEv);
    };
  });

  const hash = location.hash.replace('#/', '');
  return hash.split('/');
}
