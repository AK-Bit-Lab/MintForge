/**
 * TruncatedAddress component for displaying shortened Stacks addresses.
 *
 * Combines formatAddress truncation with a copy button and a full-address
 * title tooltip so the complete address is accessible on hover.
 *
 * @module TruncatedAddress
 */

import PropTypes from 'prop-types'
import { CopyButton } from './CopyButton'
import { formatAddress } from '../utils/collection'

/**
 * Renders a truncated Stacks address with an inline copy button.
 *
 * @param {Object} props
 * @param {string} props.address - The full Stacks address to display.
 * @param {boolean} [props.showCopy=true] - Whether to render the copy button.
 * @param {string} [props.className=''] - Additional CSS classes on the wrapper.
 */
export function TruncatedAddress({ address, showCopy = true, className = '' }) {
  const safeAddress = typeof address === 'string' ? address.trim() : ''
  const displayAddress = safeAddress ? formatAddress(safeAddress) : '—'
  const hasAddress = Boolean(safeAddress)

  return (
    <span
      className={['truncated-address', className].filter(Boolean).join(' ')}
      data-has-address={hasAddress ? 'true' : 'false'}
      data-address-length={String(safeAddress.length)}
      title={safeAddress || 'No address'}
    >
      <span className="truncated-address__value" aria-label={safeAddress || 'No address'}>
        {displayAddress}
      </span>
      {showCopy && hasAddress && (
        <CopyButton
          text={safeAddress}
          label="Copy address"
          successLabel="Copied"
          className="truncated-address__copy"
        />
      )}
    </span>
  )
}

TruncatedAddress.propTypes = {
  address: PropTypes.string.isRequired,
  showCopy: PropTypes.bool,
  className: PropTypes.string
}

export default TruncatedAddress
