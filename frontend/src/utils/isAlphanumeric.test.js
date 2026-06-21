import { describe, expect, it } from 'vitest'
import { isAlphanumeric } from './strings'

describe('isAlphanumeric', () => {
  it('rejects empty strings', () => {
      expect(isAlphanumeric('')).toBe(false)
    })

  it('rejects values containing hyphens', () => {
      expect(isAlphanumeric('mini-mint')).toBe(false)
      expect(isAlphanumeric('ABC-123')).toBe(false)
    })

  it('accepts mixed-case letters and digits', () => {
      expect(isAlphanumeric('MiniMint9')).toBe(true)
    })

  it('accepts values composed only of digits', () => {
      expect(isAlphanumeric('123456')).toBe(true)
    })

  it('rejects values that include whitespace', () => {
      expect(isAlphanumeric('mini mint')).toBe(false)
    })

  it('accepts valid mixed-case values with surrounding whitespace', () => {
      expect(isAlphanumeric('  MiniMint42  ')).toBe(true)
    })
})
