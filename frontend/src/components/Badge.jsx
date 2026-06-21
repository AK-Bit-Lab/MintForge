/**
 * Badge component for displaying status indicators and labels.
 * 
 * Supports multiple variants (default, primary, success, warning, danger, info)
 * and sizes (small, medium, large). Can optionally display a dot indicator.
 * 
 * @module Badge
 */

import PropTypes from 'prop-types'
import './Badge.css'

/**
 * Compact label for status, category, and metadata chips.
 * 
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - Badge content.
 * @param {string} [props.variant='default'] - Visual style variant.
 * @param {string} [props.size='medium'] - Size multiplier ('small', 'medium', 'large').
 * @param {boolean} [props.dot=false] - Whether to render a leading status dot indicator.
 * @param {string} [props.className=''] - Additional CSS classes.
 * @param {string} [props.title] - Optional tooltip text.
 * @returns {JSX.Element|null} The badge span element.
 */
export function Badge({
  children,
  variant = 'default',
  size = 'medium',
  dot = false,
  className = '',
  title
}) {
  const tone = typeof variant === 'string' ? variant.split('-')[0] : 'default'
  if (children == null && !dot) return null
  const fallbackTitle = typeof children === 'string' || typeof children === 'number'
    ? String(children).trim()
    : undefined
  const safeTitle = typeof title === 'string' && title.trim() ? title.trim() : fallbackTitle
  const labelLength = safeTitle ? safeTitle.length : 0
  const isDotOnly = dot && (children == null)
  return (
    <span
      className={['badge', `badge--${variant}`, `badge--${size}`, className].filter(Boolean).join(' ')}
      data-variant={variant}
      data-tone={tone}
      data-size={size}
      data-dot={dot ? 'true' : 'false'}
      data-label-length={String(labelLength)}
      data-has-title={safeTitle ? 'true' : 'false'}
      title={safeTitle}
      aria-label={safeTitle}
      aria-hidden={isDotOnly ? 'true' : undefined}
    >
      {dot && <span className="badge__dot" aria-hidden="true" />}
      {children}
    </span>
  )
}

Badge.propTypes = {
  /** Badge label text or content. Optional when dot-only mode is used. */
  children: PropTypes.node,
  variant: PropTypes.oneOf([
    'default',
    'primary',
    'success',
    'warning',
    'danger',
    'info',
    'primary-solid',
    'success-solid',
    'danger-solid'
  ]),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  dot: PropTypes.bool,
  className: PropTypes.string,
  title: PropTypes.string
}

/**
 * Default export for Badge component.
 * @type {React.FC<BadgeProps>}
 */
export default Badge
