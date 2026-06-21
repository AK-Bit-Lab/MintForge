/**
 * LoadingDots component for inline animated loading indicators.
 *
 * Renders three animated dots used to indicate loading inside text
 * labels, buttons, or status messages without requiring a full spinner.
 *
 * @module LoadingDots
 */

import PropTypes from 'prop-types'

/**
 * Three pulsing dots used inline to signal an ongoing async operation.
 *
 * @param {Object} props
 * @param {string} [props.label='Loading'] - Screen reader label for the animation.
 * @param {string} [props.className=''] - Additional CSS classes.
 */
export function LoadingDots({ label = 'Loading', className = '' }) {
  const safeLabel = typeof label === 'string' && label.trim() ? label.trim() : 'Loading'

  return (
    <span
      className={['loading-dots', className].filter(Boolean).join(' ')}
      role="status"
      aria-label={safeLabel}
      aria-live="polite"
      title={safeLabel}
    >
      <span className="loading-dots__dot" aria-hidden="true">.</span>
      <span className="loading-dots__dot" aria-hidden="true">.</span>
      <span className="loading-dots__dot" aria-hidden="true">.</span>
    </span>
  )
}

LoadingDots.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string
}

export default LoadingDots
