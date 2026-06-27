/**
 * useCounter hook for animated number transitions.
 *
 * Animates from a start value to an end value over a specified duration,
 * useful for count-up effects in stats displays and progress indicators.
 *
 * @module useCounter
 */
import { useEffect, useRef, useState } from 'react';

/**
 * Animates from 0 to `end` over `duration` milliseconds.
 *
 * @param {number} end - The target value to count up to.
 * @param {number} [duration=1000] - Animation duration in milliseconds.
 * @param {boolean} [startOnMount=true] - Whether to start animating on mount.
 * @returns {{ count: number, isAnimating: boolean, reset: Function }}
 */
export function useCounter(end, duration = 1000, startOnMount = true) {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const rafRef = useRef(null);
  const startTimeRef = useRef(null);

  const safeEnd = Number.isFinite(end) ? Math.max(0, end) : 0;
  const safeDuration = Number.isFinite(duration) && duration > 0 ? duration : 1000;

  const animate = () => {
    setIsAnimating(true);
    startTimeRef.current = null;

    const step = (timestamp) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / safeDuration, 1);
      // Ease-out quadratic for a smooth deceleration
      const eased = 1 - (1 - progress) * (1 - progress);
      const current = Math.round(eased * safeEnd);

      setCount(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setCount(safeEnd);
        setIsAnimating(false);
      }
    };

    rafRef.current = requestAnimationFrame(step);
  };

  const reset = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    setCount(0);
    setIsAnimating(false);
  };

  useEffect(() => {
    if (startOnMount && safeEnd > 0) {
      animate();
    }
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeEnd, safeDuration, startOnMount]);

  return { count, isAnimating, reset };
}

/**
 * Default export for useCounter hook.
 */
export default useCounter;
