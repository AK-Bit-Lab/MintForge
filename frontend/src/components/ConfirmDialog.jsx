/**
 * ConfirmDialog component for prompting users before destructive actions.
 *
 * A lightweight confirmation modal that composes the existing Modal component.
 * Renders confirm/cancel buttons and calls onConfirm or onCancel accordingly.
 *
 * @module ConfirmDialog
 */

import PropTypes from 'prop-types'
import { Modal } from './Modal'

/**
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the dialog is visible.
 * @param {Function} props.onConfirm - Called when the user confirms.
 * @param {Function} props.onCancel - Called when the user cancels or closes.
 * @param {string} [props.title='Are you sure?'] - Dialog heading.
 * @param {string} [props.message] - Explanatory text shown in the dialog body.
 * @param {string} [props.confirmLabel='Confirm'] - Confirm button label.
 * @param {string} [props.cancelLabel='Cancel'] - Cancel button label.
 * @param {'small'|'medium'} [props.size='small'] - Modal size variant.
 */
export function ConfirmDialog({
  isOpen,
  onConfirm,
  onCancel,
  title = 'Are you sure?',
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  size = 'small'
}) {
  const safeTitle   = typeof title === 'string' && title.trim() ? title.trim() : 'Are you sure?'
  const safeMessage = typeof message === 'string' ? message.trim() : ''
  const safeConfirm = typeof confirmLabel === 'string' && confirmLabel.trim() ? confirmLabel.trim() : 'Confirm'
  const safeCancel  = typeof cancelLabel  === 'string' && cancelLabel.trim()  ? cancelLabel.trim()  : 'Cancel'

  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={safeTitle} size={size}>
      {safeMessage && (
        <p className="confirm-dialog__message">{safeMessage}</p>
      )}
      <div className="confirm-dialog__actions">
        <button
          type="button"
          className="confirm-dialog__cancel"
          onClick={onCancel}
          aria-label={safeCancel}
          data-intent="cancel"
        >
          {safeCancel}
        </button>
        <button
          type="button"
          className="confirm-dialog__confirm"
          onClick={onConfirm}
          aria-label={safeConfirm}
          data-intent="confirm"
        >
          {safeConfirm}
        </button>
      </div>
    </Modal>
  )
}

ConfirmDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  confirmLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium'])
}

export default ConfirmDialog
