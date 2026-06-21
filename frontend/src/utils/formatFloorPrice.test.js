import { describe, expect, it } from 'vitest'
import { formatFloorPrice } from './format'

describe('formatFloorPrice', () => {
  it('formats floor price with two decimals', () => {
      expect(formatFloorPrice(1)).toBe('Floor 1.00 STX')
    })

  it('falls back to zero when the value is not numeric', () => {
      expect(formatFloorPrice('invalid')).toBe('Floor 0.00 STX')
    })

  it('formats numeric strings as fixed-decimal floor price output', () => {
      expect(formatFloorPrice('2.5')).toBe('Floor 2.50 STX')
    })
})
