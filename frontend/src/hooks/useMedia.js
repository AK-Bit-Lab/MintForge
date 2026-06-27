/**
 * useMedia hook for matching CSS media queries.
 *
 * A simpler alternative to useMediaQuery that accepts multiple queries
 * and returns an object with boolean matches for each query.
 *
 * @module useMedia
 */
import { useEffect, useState } from 'react';

/**
 * Matches one or more media query strings and returns their current match state.
 *
 * @param {string|string[]} queries - A single media query or array of queries.
 * @returns {{ matches: boolean }} for single query, or {{ [query: string]: boolean }} for multiple.
 */
export function useMedia(queries) {
  const queryArray = Array.isArray(queries) ? queries : [queries];

  const getMatches = () => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return queryArray.reduce((acc, q) => ({ ...acc, [q]: false }), {});
    }
    return queryArray.reduce((acc, q) => ({ ...acc, [q]: window.matchMedia(q).matches }), {});
  };

  const [matches, setMatches] = useState(getMatches);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;

    const mediaQueryLists = queryArray.map((q) => window.matchMedia(q));

    const handler = () => {
      setMatches(getMatches());
    };

    mediaQueryLists.forEach((mql) => {
      if (typeof mql.addEventListener === 'function') {
        mql.addEventListener('change', handler);
      }
    });

    return () => {
      mediaQueryLists.forEach((mql) => {
        if (typeof mql.removeEventListener === 'function') {
          mql.removeEventListener('change', handler);
        }
      });
    };
  }, [queryArray]);

  if (queryArray.length === 1) {
    return { matches: matches[queryArray[0]] ?? false };
  }

  return matches;
}

/**
 * Default export for useMedia hook.
 */
export default useMedia;
