import { describe, expect, it } from 'vitest'
import { formatMintPrice } from './format'

describe('formatMintPrice', () => {
  it('falls back when value is the NaN string literal', () => {
      expect(formatMintPrice('NaN')).toBe('0 STX')
    })

  it('keeps negative values explicit in output', () => {
      expect(formatMintPrice(-1)).toBe('-1 STX')
    })

  it('formats numeric string values with STX unit suffix', () => {
      expect(formatMintPrice('4.2')).toBe('4.2 STX')
    })
})
