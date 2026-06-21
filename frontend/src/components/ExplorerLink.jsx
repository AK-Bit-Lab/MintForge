/**
 * ExplorerLink component for linking to Stacks explorer pages.
 *
 * Wraps the getExplorerUrl / getTokenExplorerUrl / getAddressExplorerUrl
 * helpers into a single component that opens in a new tab with correct
 * security attributes and an accessible label.
 *
 * @module ExplorerLink
 */

import PropTypes from 'prop-types'
import { getExplorerUrl, getTokenExplorerUrl, getAddressExplorerUrl, getExplorerLinkLabel } from '../contract'

/**
 * @param {Object} props
 * @param {'txid'|'token'|'address'} [props.type='txid'] - The explorer link type.
 * @param {string|number} props.identifier - The txid, token ID, or address to link to.
 * @param {string} [props.children] - Custom link text. Falls back to generated label.
 * @param {string} [props.className=''] - Additional CSS classes.
 */
export function ExplorerLink({ type = 'txid', identifier, children, className = '' }) {
  const safeType = ['txid', 'token', 'address'].includes(type) ? type : 'txid'

  const href = safeType === 'token'
    ? getTokenExplorerUrl(identifier)
    : safeType === 'address'
      ? getAddressExplorerUrl(identifier)
      : getExplorerUrl(identifier)

  const label = typeof children === 'string' && children.trim()
    ? children.trim()
    : getExplorerLinkLabel(safeType, identifier)

  return (
    <a
      href={href}
      className={['explorer-link', className].filter(Boolean).join(' ')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} (opens in a new tab)`}
      title={`${label} (opens in a new tab)`}
      data-type={safeType}
    >
      {label}
    </a>
  )
}

ExplorerLink.propTypes = {
  type: PropTypes.oneOf(['txid', 'token', 'address']),
  identifier: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  children: PropTypes.string,
  className: PropTypes.string
}

export default ExplorerLink
