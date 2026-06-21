/**
 * useEventListener hook for attaching DOM event listeners declaratively.
 *
 * Attaches an event listener to a target element (defaults to window) and
 * cleans it up automatically when the component unmounts or dependencies change.
 * Supports both Element and Window targets.
 *
 * @module useEventListener
 */
import { useEffect, useRef } from 'react';

/**
 * Attaches a DOM event listener and tears it down on cleanup.
 *
 * @param {string} eventName - The event type to listen for (e.g. 'click', 'keydown').
 * @param {EventListener} handler - Callback invoked when the event fires.
 * @param {EventTarget} [element=window] - Target element. Defaults to window.
 * @param {boolean|AddEventListenerOptions} [options] - Options passed to addEventListener.
 */
export function useEventListener(eventName, handler, element, options) {
  const savedHandler = useRef(handler);

  // Keep the ref in sync with the latest handler without re-subscribing
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const target = element ?? (typeof window !== 'undefined' ? window : null);
    if (!target || typeof target.addEventListener !== 'function') return;
    if (typeof eventName !== 'string' || !eventName) return;

    const listener = (event) => savedHandler.current(event);

    target.addEventListener(eventName, listener, options);
    return () => target.removeEventListener(eventName, listener, options);
  }, [eventName, element, options]);
}

export default useEventListener;
