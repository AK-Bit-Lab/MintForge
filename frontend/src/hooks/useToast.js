/**
 * useToast hook for managing toast notifications.
 *
 * Provides a flexible toast system with auto-dismiss, multiple types
 * (success, error, warning, info), and manual control methods.
 * Handles timer cleanup and prevents memory leaks.
 *
 * @module useToast
 */
/**
 * @typedef {Object} Toast
 * @property {number} id - Unique identifier for the toast.
 * @property {string} message - Message displayed in the toast.
 * @property {string} type - Type of toast ('success'|'error'|'warning'|'info').
 */
/**
 * @typedef {Object} UseToastReturn
 * @property {Toast[]} toasts - Current list of toasts.
 * @property {(message:string, type?:string, duration?:number)=>number|null} addToast - Add a toast.
 * @property {(message:string, type?:string, duration?:number)=>number|null} showToast - Alias for addToast.
 * @property {(id:number)=>void} removeToast - Remove a toast by id.
 * @property {(message:string, duration?:number)=>number|null} success - Add success toast.
 * @property {(message:string, duration?:number)=>number|null} error - Add error toast.
 * @property {(message:string, duration?:number)=>number|null} warning - Add warning toast.
 * @property {(message:string, duration?:number)=>number|null} info - Add info toast.
 * @property {(message:string, type?:string)=>number|null} persistent - Add persistent toast.
 * @property {()=>void} clearAll - Clear all toasts.
 * @property {()=>void} dismissAll - Alias for clearAll.
 * @property {()=>number} count - Number of toasts.
 * @property {()=>boolean} hasToasts - Whether any toasts exist.
 * @property {()=>Toast|null} latestToast - Most recent toast.
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { MAX_TOASTS, TOAST_DURATION } from '../constants'
/**
 * @typedef {Object} UseToastReturn
 * @property {Array<Toast>} toasts - Current list of toasts.
 * @property {(message:string, type?:string, duration?:number)=>number|null} addToast - Add a toast.
 * @property {(message:string, type?:string, duration?:number)=>number|null} showToast - Alias for addToast.
 * @property {(id:number)=>void} removeToast - Remove a toast by id.
 * @property {(message:string, duration?:number)=>number|null} success - Add success toast.
 * @property {(message:string, duration?:number)=>number|null} error - Add error toast.
 * @property {(message:string, duration?:number)=>number|null} warning - Add warning toast.
 * @property {(message:string, duration?:number)=>number|null} info - Add info toast.
 * @property {(message:string, type?:string)=>number|null} persistent - Add persistent toast.
 * @property {()=>void} clearAll - Clear all toasts.
 * @property {()=>void} dismissAll - Alias for clearAll.
 */

/** Valid toast notification types accepted by addToast. */
const TOAST_VALID_TYPES = ['success', 'error', 'warning', 'info'];

/**
 * Normalize a toast message to a trimmed string.
 * @param {any} message - The message to normalize.
 * @returns {string} Normalized message or empty string if invalid.
 */
export function normalizeToastMessage(message) {
  if (message == null) return '';
  try {
    return typeof message === 'string' ? message.trim() : String(message).trim();
  } catch {
    return '';
  }
}

/**
 * Normalize toast type to a supported value.
 * @param {string} type - Desired toast type.
 * @returns {string} Valid toast type ('success'|'error'|'warning'|'info').
 */
export function normalizeToastType(type) {
  // Unknown toast types fall back to info so callers do not render unsupported variants.
  return TOAST_VALID_TYPES.includes(type) ? type : 'info'
}

/**
 * Normalize toast duration to a finite positive number.
 * @param {number} duration - Desired duration in ms.
 * @param {number} [fallback=TOAST_DURATION] - Fallback duration if invalid.
 * @returns {number} Valid duration.
 */
export function normalizeToastDuration(duration, fallback = TOAST_DURATION) {
  return Number.isFinite(duration) ? Math.max(duration, 0) : fallback
}

/**
 * Trim toast queue to respect maximum toast count.
 * @param {Array} nextToasts - Array of toast objects.
 * @param {number} [maxToasts=MAX_TOASTS] - Maximum allowed toasts.
 * @returns {{trimmedToasts:Array, removedToasts:Array}} Resulting queues.
 */
export function trimToastQueue(nextToasts, maxToasts = MAX_TOASTS) {
  if (maxToasts <= 0) {
    return { trimmedToasts: [], removedToasts: nextToasts }
  }

  if (nextToasts.length <= maxToasts) {
    return { trimmedToasts: nextToasts, removedToasts: [] }
  }

  return {
    trimmedToasts: nextToasts.slice(-maxToasts),
    removedToasts: nextToasts.slice(0, nextToasts.length - maxToasts)
  }
}

/**
 * Custom hook providing toast management utilities.
 * @returns {object} Toast API including addToast, removeToast, etc.
 */
/**
 * Custom hook providing toast management utilities.
 * @returns {UseToastReturn} API for toast operations.
 */
export function useToast() {
  const [toasts, setToasts] = useState([])
  const toastIdRef = useRef(0)

  const timersRef = useRef(new Map())

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
    const timer = timersRef.current.get(id)
    if (timer) {
      clearTimeout(timer)
      timersRef.current.delete(id)
    }
  }, [])

  const addToast = useCallback((message, type = 'info', duration = TOAST_DURATION) => {
    const normalizedMessage = normalizeToastMessage(message)
    const safeType = normalizeToastType(type)

    if (!normalizedMessage) {
      return null
    }

    toastIdRef.current += 1
    const id = toastIdRef.current
    const toast = { id, message: normalizedMessage, type: safeType }
    
    setToasts(prev => {
      const nextToasts = [...prev, toast]
      const { trimmedToasts, removedToasts } = trimToastQueue(nextToasts, MAX_TOASTS)

      removedToasts.forEach((removedToast) => {
        const staleTimer = timersRef.current.get(removedToast.id)
        if (staleTimer) {
          clearTimeout(staleTimer)
          timersRef.current.delete(removedToast.id)
        }
      })

      return trimmedToasts
    })

    const safeDuration = normalizeToastDuration(duration, TOAST_DURATION)

    if (safeDuration > 0) {
      const timer = setTimeout(() => {
        removeToast(id)
      }, safeDuration)
      timersRef.current.set(id, timer)
    }

    return id
  }, [removeToast])

  const success = useCallback((message, duration) => {
    return addToast(message, 'success', duration)
  }, [addToast])

  const error = useCallback((message, duration) => {
    return addToast(message, 'error', duration)
  }, [addToast])

  const warning = useCallback((message, duration) => {
    return addToast(message, 'warning', duration)
  }, [addToast])

  const info = useCallback((message, duration) => {
    return addToast(message, 'info', duration)
  }, [addToast])

  const clearAll = useCallback(() => {
    setToasts([])
    timersRef.current.forEach((timer) => clearTimeout(timer))
    timersRef.current.clear()
  }, [])

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer))
      timersRef.current.clear()
    }
  }, [])

  const persistent = useCallback((message, type = 'info') => {
    return addToast(message, type, 0);
  }, [addToast])

  return {
    toasts,
    addToast,
    showToast: addToast,
    removeToast,
    success,
    error,
    warning,
    info,
    persistent,
    clearAll,
    dismissAll: clearAll,
    count: toasts.length,
    hasToasts: toasts.length > 0,
    latestToast: toasts.length > 0 ? toasts[toasts.length - 1] : null,
  }
}

/**
 * Default export for useToast hook.
 * @type {() => UseToastReturn}
 */
export default useToast
