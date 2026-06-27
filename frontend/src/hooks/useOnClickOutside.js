/**
 * useOnClickOutside hook for detecting clicks outside a target element.
 *
 * Listens for pointerdown events on the document and invokes the callback
 * when the event target is not contained within the referenced element.
 * Useful for closing dropdowns, modals, and popovers on outside clicks.
 *
 * @module useOnClickOutside
 */
import { useEffect, useRef } from 'react';

/**
 * Calls `handler` when a pointerdown occurs outside the element attached to `ref`.
 *
 * @param {React.RefObject} ref - The element to watch for outside clicks.
 * @param {Function} handler - Callback invoked on outside click.
 */
export function useOnClickOutside(ref, handler) {
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      savedHandler.current(event);
    };

    document.addEventListener('pointerdown', listener);
    return () => document.removeEventListener('pointerdown', listener);
  }, [ref]);
}

/**
 * Default export for useOnClickOutside hook.
 */
export default useOnClickOutside;
