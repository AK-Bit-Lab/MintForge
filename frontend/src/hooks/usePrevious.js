/**
 * usePrevious hook for accessing the previous render value of a variable.
 *
 * Useful for comparing current and past state/prop values inside effects,
 * for example to determine whether a value was just toggled or changed.
 *
 * @module usePrevious
 */
import { useEffect, useRef } from 'react';

/**
 * Returns the value from the previous render cycle.
 * On the very first render the returned value is `undefined`.
 *
 * @template T
 * @param {T} value - The current value to track.
 * @returns {T | undefined} The value from the previous render.
 */
export function usePrevious(value) {
  const ref = useRef(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export default usePrevious;
