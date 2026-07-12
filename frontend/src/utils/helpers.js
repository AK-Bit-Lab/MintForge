/**
 * General-purpose helper utilities for the application.
 *
 * Provides standalone functions for common patterns like debouncing,
 * ID generation, and validation that are used across components.
 *
 * @module helpers
 */
// Helper utilities for the MintForge frontend

/**
 * Creates a debounced version of a function that delays invocation until `delay` milliseconds have passed since the last call.
 *
 * @param {Function} fn - The function to debounce.
 * @param {number} [delay=300] - Debounce delay in milliseconds.
 * @returns {Function} A debounced function with a `cancel` method to abort pending calls.
 */
/**
 * Debounce utility to limit function execution frequency.
 */
/**
 * Debounce utility to limit function execution frequency.
 */
export function debounce(fn, delay = 300) {
  let timerId = null;

  const debounced = (...args) => {
    if (timerId !== null) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn(...args);
      timerId = null;
    }, delay);
  };

  debounced.cancel = () => {
    if (timerId !== null) {
      clearTimeout(timerId);
      timerId = null;
    }
  };

  return debounced;
}

/**
 * Generates a unique identifier string.
 * Uses a combination of timestamp and random characters.
 *
 * @param {string} [prefix=''] - Optional prefix for the ID.
 * @returns {string} A unique identifier string.
 */
/**
 * Generate a unique identifier with optional prefix.
 */
/**
 * Generate a unique identifier with optional prefix.
 */
export function generateId(prefix = '') {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 9);
  const id = `${timestamp}-${randomPart}`;
  return prefix ? `${prefix}-${id}` : id;
}

/**
 * Default export for helpers module.
 * Provides utility functions for external use.
 * @type {{debounce: (fn: Function, delay?: number) => Function, generateId: (prefix?: string) => string}}
 */
export default {
  debounce,
  generateId
};
