/**
 * useScrollLock hook for locking body scroll.
 *
 * Prevents background scrolling when a modal, drawer, or overlay is open.
 * Restores the previous overflow style on cleanup.
 *
 * @module useScrollLock
 */
import { useEffect, useRef } from 'react';

/**
 * Locks body scroll while `isLocked` is true.
 *
 * @param {boolean} isLocked - Whether scroll should be locked.
 */
export function useScrollLock(isLocked) {
  const previousOverflow = useRef('');

  useEffect(() => {
    if (typeof document === 'undefined') return;

    if (isLocked) {
      previousOverflow.current = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = previousOverflow.current;
    }

    return () => {
      document.body.style.overflow = previousOverflow.current;
    };
  }, [isLocked]);
}

/**
 * Default export for useScrollLock hook.
 */
export default useScrollLock;
