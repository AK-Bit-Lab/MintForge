/**
 * Divider component for separating sections of content.
 *
 * Renders a semantic <hr> with optional label text for labelled section breaks.
 * Supports horizontal and vertical orientations.
 *
 * @module Divider
 */

import PropTypes from 'prop-types'
import './Divider.css'

/**
 * Accessible section separator with optional inline label.
 *
 * @param {Object} props
 * @param {string} [props.label] - Optional text rendered in the centre of the divider.
 * @param {'horizontal'|'vertical'} [props.orientation='horizontal'] - Layout axis.
 * @param {string} [props.className=''] - Additional CSS classes.
 */
export function Divider({ label, orientation = 'horizontal', className = '' }) {
  const safeOrientation = orientation === 'vertical' ? 'vertical' : 'horizontal'
  const safeLabel = typeof label === 'string' ? label.trim() : ''
  const hasLabel = Boolean(safeLabel)

  return (
    <div
      className={['divider', `divider--${safeOrientation}`, hasLabel ? 'divider--labelled' : '', className].filter(Boolean).join(' ')}
      role="separator"
      aria-orientation={safeOrientation}
      aria-label={hasLabel ? safeLabel : undefined}
      data-has-label={hasLabel ? 'true' : 'false'}
      data-orientation={safeOrientation}
    >
      {hasLabel && (
        <span className="divider__label" aria-hidden="true">{safeLabel}</span>
      )}
    </div>
  )
}

Divider.propTypes = {
  label: PropTypes.string,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  className: PropTypes.string
}

export default Divider
