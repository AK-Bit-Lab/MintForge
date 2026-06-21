/**
 * SkipLink component for keyboard-only navigation shortcuts.
 *
 * Renders a visually hidden anchor that becomes visible on focus,
 * allowing keyboard users to jump directly to main content or any
 * target section, bypassing repeated navigation elements.
 *
 * @module SkipLink
 */

import PropTypes from 'prop-types'

/**
 * An accessible skip-to-content anchor shown only on keyboard focus.
 *
 * @param {Object} props
 * @param {string} props.targetId - The id of the element to scroll to.
 * @param {string} [props.label] - Link text. Defaults to 'Skip to main content'.
 */
export function SkipLink({ targetId, label = 'Skip to main content' }) {
  const safeTarget = typeof targetId === 'string' && targetId.trim()
    ? targetId.trim()
    : 'main-content'
  const safeLabel = typeof label === 'string' && label.trim()
    ? label.trim()
    : 'Skip to main content'

  return (
    <a
      href={`#${safeTarget}`}
      className="skip-link"
      data-target={safeTarget}
    >
      {safeLabel}
    </a>
  )
}

SkipLink.propTypes = {
  targetId: PropTypes.string.isRequired,
  label: PropTypes.string
}

export default SkipLink
