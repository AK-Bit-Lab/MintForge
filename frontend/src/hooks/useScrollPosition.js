/**
 * useScrollPosition hook for tracking window scroll coordinates.
 *
 * Returns the current scroll position (x, y) and updates on scroll.
 * Uses a passive event listener and debounces updates to avoid
 * excessive re-renders on fast scrolling.
 *
 * @module useScrollPosition
 */
import { useEffect, useState } from 'react';
import { SCROLL_DEBOUNCE_MS } from '../constants';

/**
 * @typedef {Object} ScrollPosition
 * @property {number} x - Horizontal scroll offset in pixels.
 * @property {number} y - Vertical scroll offset in pixels.
 */

/**
 * Returns the live scroll position of the window, debounced to
 * avoid triggering too many renders during fast scroll events.
 *
 * @param {number} [debounceMs] - Debounce delay in ms. Defaults to SCROLL_DEBOUNCE_MS.
 * @returns {ScrollPosition}
 */
export function useScrollPosition(debounceMs = SCROLL_DEBOUNCE_MS) {
  const safeDebounce = typeof debounceMs === 'number' && debounceMs >= 0 ? debounceMs : SCROLL_DEBOUNCE_MS;

  const [position, setPosition] = useState(() => ({
    x: typeof window !== 'undefined' ? window.scrollX : 0,
    y: typeof window !== 'undefined' ? window.scrollY : 0,
  }));

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let timeoutId = null;

    const handleScroll = () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        setPosition({ x: window.scrollX, y: window.scrollY });
      }, safeDebounce);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId !== null) clearTimeout(timeoutId);
    };
  }, [safeDebounce]);

  return position;
}

export default useScrollPosition;
