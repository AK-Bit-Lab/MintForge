import { describe, expect, it } from 'vitest'
import focusTrapDefault, { createFocusTrap, trapFocusOnce } from './focusTrap'

describe('focusTrap module exports', () => {
  it('keeps default export methods aligned with named exports', () => {
      expect(focusTrapDefault.createFocusTrap).toBe(createFocusTrap)
      expect(focusTrapDefault.trapFocusOnce).toBe(trapFocusOnce)
    })
})

describe('createFocusTrap', () => {
  it('starts in an inactive state before activation', () => {
      const trap = createFocusTrap(null)
      expect(trap.isActive).toBe(false)
    })

  it('returns a focus trap instance with activate and deactivate methods', () => {
      const trap = createFocusTrap(null)
      expect(typeof trap.activate).toBe('function')
      expect(typeof trap.deactivate).toBe('function')
    })
})

