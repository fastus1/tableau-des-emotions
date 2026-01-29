import { useState, useEffect } from 'react';

const QUERY = '(prefers-reduced-motion: no-preference)';

/**
 * Hook to detect user's motion preference.
 * Returns true if user prefers reduced motion (accessibility setting).
 * Defaults to true (reduced motion) for SSR safety.
 */
export function usePrefersReducedMotion(): boolean {
  // Default to true (reduced motion) for SSR safety
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia(QUERY);
    // If query matches (no-preference), user does NOT prefer reduced motion
    setPrefersReducedMotion(!mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(!event.matches);
    };

    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  return prefersReducedMotion;
}
