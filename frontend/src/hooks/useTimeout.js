/**
 * useTimeout hook for declarative setTimeout management.
 *
 * Calls a callback function after a specified delay. Handles cleanup
 * on unmount and when dependencies change. Supports pausing by setting
 * delay to null.
 *
 * @module useTimeout
 */
import { useEffect, useRef } from 'react';

/**
 * Invokes `callback` after `delay` milliseconds.
 * Pass `delay` as null to pause the timer.
 *
 * @param {Function} callback - Function to call after the delay.
 * @param {number|null} delay - Delay in ms, or null to pause.
 */
export function useTimeout(callback, delay) {
  const savedCallback = useRef(callback);

  // Keep the latest callback without re-subscribing
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null || delay === undefined) return;

    const id = setTimeout(() => savedCallback.current(), delay);
    return () => clearTimeout(id);
  }, [delay]);
}

/**
 * Default export for useTimeout hook.
 */
export default useTimeout;
