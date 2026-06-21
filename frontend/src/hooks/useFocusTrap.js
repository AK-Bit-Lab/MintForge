/**
 * useFocusTrap hook for confining keyboard focus within a container.
 *
 * When active, Tab and Shift+Tab cycle focus only among focusable
 * descendants of the referenced container. Used by modals, drawers,
 * and other overlay patterns to prevent focus from escaping.
 *
 * @module useFocusTrap
 */
import { useCallback, useEffect, useRef } from 'react';

/** CSS selector matching all natively focusable element types. */
const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]',
].join(', ');

/**
 * Returns a ref to attach to the trap container and an `activate`/`deactivate` pair.
 *
 * @param {boolean} [isActive=false] - Whether the trap is currently active.
 * @returns {{ ref: React.RefObject, activate: Function, deactivate: Function }}
 */
export function useFocusTrap(isActive = false) {
  const ref = useRef(null);
  const previousFocusRef = useRef(null);

  const getFocusable = useCallback(() => {
    if (!ref.current) return [];
    return Array.from(ref.current.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
      (el) => !el.closest('[hidden]') && !el.closest('[aria-hidden="true"]')
    );
  }, []);

  useEffect(() => {
    if (!isActive) return;

    previousFocusRef.current = document.activeElement;

    const handleKeyDown = (event) => {
      if (event.key !== 'Tab') return;
      const focusable = getFocusable();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last  = focusable[focusable.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    // Move focus into the container on activation
    const focusable = getFocusable();
    if (focusable.length > 0) focusable[0].focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Restore focus when the trap is deactivated
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        previousFocusRef.current.focus();
      }
    };
  }, [isActive, getFocusable]);

  return { ref };
}

export default useFocusTrap;
