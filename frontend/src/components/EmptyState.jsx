/**
 * EmptyState component for zero-data placeholder sections.
 *
 * Renders a centred illustration area, heading, description, and
 * an optional call-to-action button. Replaces ad-hoc empty state
 * markup scattered across Gallery, RecentMints, and similar views.
 *
 * @module EmptyState
 */

import PropTypes from 'prop-types'

/**
 * Generic empty state placeholder with optional CTA.
 *
 * @param {Object} props
 * @param {string} [props.icon] - Emoji or short text shown as an illustration.
 * @param {string} props.title - Short heading describing the empty state.
 * @param {string} [props.description] - Longer explanatory copy.
 * @param {string} [props.actionLabel] - Text for the optional action button.
 * @param {Function} [props.onAction] - Handler for the action button click.
 * @param {string} [props.className=''] - Additional CSS classes.
 */
export function EmptyState({ icon, title, description, actionLabel, onAction, className = '' }) {
  const safeTitle = typeof title === 'string' && title.trim() ? title.trim() : 'Nothing here yet'
  const safeDesc  = typeof description === 'string' ? description.trim() : ''
  const safeIcon  = typeof icon === 'string' && icon.trim() ? icon.trim() : ''
  const hasAction = typeof onAction === 'function' && typeof actionLabel === 'string' && actionLabel.trim()

  return (
    <div
      className={['empty-state', className].filter(Boolean).join(' ')}
      role="region"
      aria-label={safeTitle}
      data-has-action={hasAction ? 'true' : 'false'}
    >
      {safeIcon && (
        <span className="empty-state__icon" aria-hidden="true">{safeIcon}</span>
      )}
      <h3 className="empty-state__title">{safeTitle}</h3>
      {safeDesc && (
        <p className="empty-state__description">{safeDesc}</p>
      )}
      {hasAction && (
        <button
          type="button"
          className="empty-state__action"
          onClick={onAction}
          aria-label={actionLabel.trim()}
        >
          {actionLabel.trim()}
        </button>
      )}
    </div>
  )
}

EmptyState.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  actionLabel: PropTypes.string,
  onAction: PropTypes.func,
  className: PropTypes.string
}

export default EmptyState
