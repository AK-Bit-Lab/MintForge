import { describe, expect, it } from 'vitest'
import { calculateTotalMintCost } from './format'

describe('calculateTotalMintCost', () => {
  it('returns zero when quantity is decimal-like', () => {
      expect(calculateTotalMintCost('2.5', 10)).toBe('0 STX')
    })

  it('uses the default NFT price when price is omitted', () => {
      expect(calculateTotalMintCost(2)).toBe('20 STX')
    })

  it('falls back to default price when price input is invalid', () => {
      expect(calculateTotalMintCost(2, 'bad')).toBe('20 STX')
    })

  it('returns zero cost when quantity is not a positive integer', () => {
      expect(calculateTotalMintCost('0', 3)).toBe('0 STX')
    })

  it('coerces numeric string prices when computing totals', () => {
      expect(calculateTotalMintCost(2, '3.5')).toBe('7 STX')
    })

  it('accepts trimmed quantity strings', () => {
      expect(calculateTotalMintCost(' 3 ', 5)).toBe('15 STX')
    })
})
