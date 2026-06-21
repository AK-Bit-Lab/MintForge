import { describe, expect, it } from 'vitest'
import { truncateAddress } from './strings'

describe('truncateAddress', () => {
  it('falls back to default suffix length when a decimal is provided', () => {
      const address = 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT'
      expect(truncateAddress(address, 4, 2.5)).toBe('SP5K...9TJT')
    })

  it('falls back to default prefix length when a decimal is provided', () => {
      const address = 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT'
      expect(truncateAddress(address, 2.5, 4)).toBe('SP5K...9TJT')
    })

  it('returns empty output for empty string input', () => {
      expect(truncateAddress('')).toBe('')
    })

  it('returns prefix with ellipsis when suffix length is zero', () => {
      expect(truncateAddress('SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT', 6, 0)).toBe('SP5K2R...')
    })

  it('keeps addresses when length equals start and end segments', () => {
      expect(truncateAddress('SP123456', 4, 4)).toBe('SP123456')
    })

  it('returns the original address when start exceeds length', () => {
      expect(truncateAddress('SP1234', 20, 4)).toBe('SP1234')
    })

  it('falls back to defaults when endChars is negative', () => {
      const address = 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT'
      expect(truncateAddress(address, 6, -3)).toBe('SP5K2R...9TJT')
    })

  it('falls back to defaults when startChars is negative', () => {
      const address = 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT'
      expect(truncateAddress(address, -2, 2)).toBe('SP5K...JT')
    })

  it('trims newline-wrapped addresses before formatting', () => {
      expect(truncateAddress('\nSP1234567890\n', 3, 2)).toBe('SP1...90')
    })

  it('returns empty string for non-string inputs', () => {
      expect(truncateAddress(12345)).toBe('')
    })

  it('returns an empty string for tab-only values after trimming', () => {
      expect(truncateAddress('\t\t')).toBe('')
    })

  it('returns an empty string for whitespace-only addresses', () => {
      expect(truncateAddress('   ')).toBe('')
    })

  it('supports truncation when zero prefix characters are requested', () => {
      expect(truncateAddress('SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT', 0, 4)).toBe('...9TJT')
    })

  it('returns an ellipsis when both prefix and suffix lengths are zero', () => {
      expect(truncateAddress('SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT', 0, 0)).toBe('...')
    })
})
