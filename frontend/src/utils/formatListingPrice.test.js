import { describe, expect, it } from 'vitest'
import { formatListingPrice } from './format'

describe('formatListingPrice', () => {
  it('formats negative listing prices with fixed decimals', () => {
      expect(formatListingPrice(-2)).toBe('-2.00 STX')
    })

  it('rounds listing prices to two decimal places', () => {
      expect(formatListingPrice(1.239)).toBe('1.24 STX')
    })

  it('formats trimmed numeric strings to fixed decimals', () => {
      expect(formatListingPrice(' 2.5 ')).toBe('2.50 STX')
    })
})
