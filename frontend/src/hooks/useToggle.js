/**
 * useToggle hook for boolean state management.
 *
 * Provides a simple boolean state with a toggle function and
 * setters for both true and false values. Useful for modals,
 * dropdowns, and other show/hide patterns.
 *
 * @module useToggle
 */
import { useCallback, useState } from 'react';

/**
 * Manages a boolean state with convenient toggle controls.
 *
 * @param {boolean} [initialValue=false] - Starting state.
 * @returns {{ value: boolean, toggle: Function, setTrue: Function, setFalse: Function }}
 */
export function useToggle(initialValue = false) {
  const [value, setValue] = useState(Boolean(initialValue));

  const toggle = useCallback(() => setValue((prev) => !prev), []);

  const setTrue = useCallback(() => setValue(true), []);

  const setFalse = useCallback(() => setValue(false), []);

  return { value, toggle, setTrue, setFalse };
}

/**
 * Default export for useToggle hook.
 */
export default useToggle;
