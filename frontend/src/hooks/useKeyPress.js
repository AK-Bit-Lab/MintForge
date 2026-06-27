/**
 * useKeyPress hook for tracking keyboard key state.
 *
 * Tracks whether a specific key is currently pressed based on
 * keydown and keyup events. Useful for keyboard shortcuts and
 * accessibility enhancements.
 *
 * @module useKeyPress
 */
import { useEffect, useState } from 'react';

/**
 * Returns true while the specified key is held down.
 *
 * @param {string} targetKey - The key to track (e.g. 'Enter', 'Escape', 'ArrowUp').
 * @returns {boolean} True while the key is pressed.
 */
export function useKeyPress(targetKey) {
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const safeKey = String(targetKey || '').toLowerCase();

    const down = (event) => {
      if (event.key.toLowerCase() === safeKey) {
        setIsPressed(true);
      }
    };

    const up = (event) => {
      if (event.key.toLowerCase() === safeKey) {
        setIsPressed(false);
      }
    };

    // Handle window blur to reset state in case keyup is missed
    const blur = () => setIsPressed(false);

    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    window.addEventListener('blur', blur);

    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
      window.removeEventListener('blur', blur);
    };
  }, [targetKey]);

  return isPressed;
}

/**
 * Default export for useKeyPress hook.
 */
export default useKeyPress;
