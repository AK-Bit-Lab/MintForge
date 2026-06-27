/**
 * useIdle hook for detecting user inactivity.
 *
 * Tracks whether the user has been idle for a specified duration based on
 * mouse, keyboard, touch, and scroll events. Useful for auto-logout,
 * screensaver effects, or pausing polling when the tab is inactive.
 *
 * @module useIdle
 */
import { useEffect, useRef, useState } from 'react';

/**
 * Events that indicate user activity.
 * @type {string[]}
 */
const IDLE_EVENTS = [
  'mousemove',
  'mousedown',
  'keydown',
  'touchstart',
  'touchmove',
  'wheel',
  'scroll'
];

/**
 * Returns true when the user has been idle for `timeoutMs` milliseconds.
 * Resets the idle timer on any user interaction event.
 *
 * @param {number} [timeoutMs=30000] - Idle threshold in milliseconds.
 * @returns {{ isIdle: boolean, lastActive: number }}
 */
export function useIdle(timeoutMs = 30000) {
  const [isIdle, setIsIdle] = useState(false);
  const [lastActive, setLastActive] = useState(Date.now());
  const timerRef = useRef(null);

  const safeTimeout = Number.isFinite(timeoutMs) && timeoutMs > 0 ? timeoutMs : 30000;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const resetIdle = () => {
      setLastActive(Date.now());
      setIsIdle(false);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        setIsIdle(true);
      }, safeTimeout);
    };

    // Initial timer start
    resetIdle();

    IDLE_EVENTS.forEach((event) => {
      window.addEventListener(event, resetIdle, { passive: true });
    });

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      IDLE_EVENTS.forEach((event) => {
        window.removeEventListener(event, resetIdle);
      });
    };
  }, [safeTimeout]);

  return { isIdle, lastActive };
}

/**
 * Default export for useIdle hook.
 */
export default useIdle;
