/**
 * useConfirm hook for programmatic confirmation dialog control.
 *
 * Returns open/close handlers and dialog state so a component can
 * render ConfirmDialog declaratively without manual boolean state.
 *
 * @module useConfirm
 */
import { useCallback, useState } from 'react';

/**
 * @typedef {Object} ConfirmState
 * @property {boolean} isOpen - Whether the dialog is currently open.
 * @property {Function} open - Call this to show the dialog.
 * @property {Function} close - Call this to hide the dialog.
 * @property {Function} confirm - Call this when the user confirms; closes the dialog and runs onConfirm.
 */

/**
 * Returns state and handlers for a confirm dialog.
 *
 * @param {Function} [onConfirm] - Optional callback invoked when the user confirms.
 * @returns {ConfirmState}
 */
export function useConfirm(onConfirm) {
  const [isOpen, setIsOpen] = useState(false);

  const open    = useCallback(() => setIsOpen(true),  []);
  const close   = useCallback(() => setIsOpen(false), []);
  const confirm = useCallback(() => {
    setIsOpen(false);
    if (typeof onConfirm === 'function') {
      onConfirm();
    }
  }, [onConfirm]);

  return { isOpen, open, close, confirm };
}

export default useConfirm;
