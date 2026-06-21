/**
 * Spinner component for indicating loading or processing states.
 * 
 * Provides an animated loading indicator with customizable size and color.
 * Includes proper ARIA attributes for screen reader accessibility.
 * 
 * @module Spinner
 */
import PropTypes from 'prop-types'
import './Spinner.css'

/** Accepted size variants for the Spinner component. */
const VALID_SIZES = ['small', 'medium', 'large']

/** Accepted color tone variants for the Spinner component. */
const VALID_TONES = ['primary', 'white', 'success', 'muted']

/**
 * Accessible inline loading indicator with normalized size, tone, and label.
 */
export function Spinner({ size = 'medium', tone = 'primary', className = '', label = 'Loading content' }) {
  const safeLabel = typeof label === 'string' && label.trim() ? label.trim() : 'Loading content'
  const safeSize = VALID_SIZES.includes(size) ? size : 'medium'
  const safeTone = VALID_TONES.includes(tone) ? tone : 'primary'
  const composedClass = ['spinner', `spinner--${safeSize}`, `spinner--${safeTone}`, className].filter(Boolean).join(' ')
  return (
    <span
      className={composedClass}
      data-size={safeSize}
      data-tone={safeTone}
      data-label={safeLabel}
      data-label-length={String(safeLabel.length)}
      role="status"
      aria-busy="true"
      aria-live="polite"
      aria-atomic="true"
      aria-label={safeLabel}
      title={safeLabel}
    >
      <span className="spinner__ring" data-part="ring" aria-hidden="true"></span>
    </span>
  )
}

Spinner.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  tone: PropTypes.oneOf(['primary', 'white', 'success', 'muted']),
  className: PropTypes.string,
  label: PropTypes.string
}

/**
 * Default export for Spinner component.
 * @type {React.FC<SpinnerProps>}
 */
export default Spinner
