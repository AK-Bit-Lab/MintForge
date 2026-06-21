import { describe, expect, it } from 'vitest'
import { isPositiveFinite } from './validators'

describe('isPositiveFinite', () => {
  it('rejects Infinity values', () => {
      expect(isPositiveFinite(Infinity)).toBe(false)
    })

  it('accepts positive numeric strings', () => {
      expect(isPositiveFinite('0.01')).toBe(true)
    })

  it('accepts trimmed numeric string values above zero', () => {
      expect(isPositiveFinite(' 2.75 ')).toBe(true)
    })

  it('rejects zero values', () => {
      expect(isPositiveFinite(0)).toBe(false)
    })
})
