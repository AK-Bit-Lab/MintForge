/**
 * useHover hook for tracking mouse hover state on an element.
 *
 * Attaches mouseenter and mouseleave listeners to a ref target
 * and returns the current hover state.
 *
 * @module useHover
 */
import { useState, useRef, useEffect } from 'react';

/**
 * Returns a ref and a boolean indicating whether the ref target is hovered.
 *
 * @returns {{ ref: React.RefObject, isHovered: boolean }}
 */
export function useHover() {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return { ref, isHovered };
}

/**
 * Default export for useHover hook.
 */
export default useHover;
