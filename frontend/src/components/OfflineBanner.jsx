/**
 * OfflineBanner component for alerting users when connectivity is lost.
 *
 * Renders a dismissible banner at the top of the page when the browser
 * reports no network connection. Hides automatically when connectivity
 * is restored. Uses useNetworkStatus to stay in sync.
 *
 * @module OfflineBanner
 */

import { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useNetworkStatus } from '../hooks'

/**
 * Renders nothing when online; shows a dismissible offline alert otherwise.
 */
export function OfflineBanner({ message = 'No internet connection. Some features may not work.' }) {
  const isOnline = useNetworkStatus()
  const [dismissed, setDismissed] = useState(false)

  const handleDismiss = useCallback(() => setDismissed(true), [])

  // Reset dismissed flag inside an effect so we never call setState during render
  useEffect(() => {
    if (isOnline && dismissed) {
      setDismissed(false)
    }
  }, [isOnline, dismissed])

  if (isOnline || dismissed) return null

  const safeMessage = typeof message === 'string' && message.trim()
    ? message.trim()
    : 'No internet connection.'

  return (
    <div
      className="offline-banner"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      data-online="false"
      title={safeMessage}
    >
      <span className="offline-banner__icon" aria-hidden="true">⚠️</span>
      <span className="offline-banner__message">{safeMessage}</span>
      <button
        type="button"
        className="offline-banner__close"
        onClick={handleDismiss}
        aria-label="Dismiss offline notification"
        title="Dismiss"
      >
        ×
      </button>
    </div>
  )
}

OfflineBanner.propTypes = {
  message: PropTypes.string
}

export default OfflineBanner
