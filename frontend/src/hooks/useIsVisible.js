/**
 * useIsVisible hook for detecting when an element enters the viewport.
 *
 * Uses IntersectionObserver to track whether a referenced element is
 * currently visible within the viewport or a specified root container.
 * Falls back to true in environments without IntersectionObserver (SSR).
 *
 * @module useIsVisible
 */
import { useEffect, useRef, useState } from 'react';

/**
 * Returns a ref and a boolean indicating whether the ref target is visible.
 *
 * @param {IntersectionObserverInit} [options] - Options forwarded to IntersectionObserver.
 * @returns {{ ref: React.RefObject, isVisible: boolean }}
 */
export function useIsVisible(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      // SSR or unsupported browser — treat element as visible
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    observer.observe(element);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, isVisible };
}

export default useIsVisible;
