/**
 * useDebounce hook for delaying state updates.
 *
 * Returns a debounced version of the given value that only changes
 * after `delay` ms have passed without the original value changing.
 * Common use-case: debouncing search input before issuing a request.
 *
 * @module useDebounce
 */
import { useEffect, useState } from 'react';

/**
 * Returns a debounced copy of `value` that trails by `delay` ms.
 *
 * @template T
 * @param {T} value - The value to debounce.
 * @param {number} [delay=300] - Debounce delay in milliseconds.
 * @returns {T} The debounced value, updated only after `delay` ms of inactivity.
 */
export function useDebounce(value, delay = 300) {
  const safeDelay = typeof delay === 'number' && delay >= 0 ? delay : 300;
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, safeDelay);

    return () => clearTimeout(timer);
  }, [value, safeDelay]);

  return debouncedValue;
}

export default useDebounce;
