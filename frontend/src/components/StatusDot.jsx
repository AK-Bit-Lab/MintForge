/**
 * StatusDot component for inline state indicators.
 *
 * A small coloured dot used to represent connection, transaction,
 * or collection state at a glance. Supports pulse animation for
 * active/live states.
 *
 * @module StatusDot
 */

import PropTypes from 'prop-types'

/** Valid status tones and their accessible labels. */
const STATUS_LABELS = {
  online:    'Online',
  offline:   'Offline',
  pending:   'Pending',
  success:   'Success',
  error:     'Error',
  warning:   'Warning',
  idle:      'Idle',
}

/**
 * @param {Object} props
 * @param {'online'|'offline'|'pending'|'success'|'error'|'warning'|'idle'} [props.status='idle']
 * @param {boolean} [props.pulse=false] - Animate with a pulsing ring for live states.
 * @param {string} [props.label] - Override the default accessible label.
 * @param {string} [props.className=''] - Additional CSS classes.
 */
export function StatusDot({ status = 'idle', pulse = false, label, className = '' }) {
  const safeStatus = STATUS_LABELS[status] ? status : 'idle'
  const safeLabel  = typeof label === 'string' && label.trim()
    ? label.trim()
    : STATUS_LABELS[safeStatus]

  return (
    <span
      className={['status-dot', `status-dot--${safeStatus}`, pulse ? 'status-dot--pulse' : '', className].filter(Boolean).join(' ')}
      role="img"
      aria-label={safeLabel}
      title={safeLabel}
      data-status={safeStatus}
      data-pulse={pulse ? 'true' : 'false'}
    />
  )
}

StatusDot.propTypes = {
  status: PropTypes.oneOf(Object.keys(STATUS_LABELS)),
  pulse: PropTypes.bool,
  label: PropTypes.string,
  className: PropTypes.string
}

export default StatusDot
