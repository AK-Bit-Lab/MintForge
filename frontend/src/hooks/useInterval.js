/**
 * useInterval hook for declarative setInterval management.
 *
 * Calls a callback function at a specified interval. Handles cleanup
 * on unmount and when dependencies change. Supports pausing by setting
 * delay to null.
 *
 * @module useInterval
 */
import { useEffect, useRef } from 'react';

/**
 * Invokes `callback` every `delay` milliseconds.
 * Pass `delay` as null to pause the interval.
 *
 * @param {Function} callback - Function to call on each interval tick.
 * @param {number|null} delay - Interval in ms, or null to pause.
 */
export function useInterval(callback, delay) {
  const savedCallback = useRef(callback);

  // Keep the latest callback without re-subscribing
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null || delay === undefined) return;

    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

/**
 * Default export for useInterval hook.
 */
export default useInterval;
