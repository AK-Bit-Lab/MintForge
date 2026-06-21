import { describe, expect, it } from 'vitest'
import { formatAddressShort } from './format'

describe('formatAddressShort', () => {
  it('truncates long addresses to leading and trailing slices', () => {
      expect(formatAddressShort('SP1234567890ABCDEFG')).toBe('SP1234...DEFG')
    })

  it('returns short addresses without truncation', () => {
      expect(formatAddressShort('SP123')).toBe('SP123')
    })

  it('keeps values unchanged at the truncation threshold', () => {
      expect(formatAddressShort('ABCDEFGHIJ')).toBe('ABCDEFGHIJ')
    })

  it('trims surrounding whitespace before truncation logic', () => {
      expect(formatAddressShort('   SP1234567   ')).toBe('SP1234567')
    })
})
