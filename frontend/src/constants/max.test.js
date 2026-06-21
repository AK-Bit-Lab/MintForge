import { describe, expect, it } from 'vitest'
import { MAX_RECENT_MINTS, MAX_TOASTS } from './index.js'

describe('constants recent mint settings', () => {
  it('keeps MAX_RECENT_MINTS as a positive integer', () => {
      expect(Number.isInteger(MAX_RECENT_MINTS)).toBe(true)
      expect(MAX_RECENT_MINTS).toBeGreaterThan(0)
    })
})

describe('constants toast queue limits', () => {
  it('keeps MAX_TOASTS as a positive integer', () => {
      expect(Number.isInteger(MAX_TOASTS)).toBe(true)
      expect(MAX_TOASTS).toBeGreaterThan(0)
    })
})

