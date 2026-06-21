import { describe, expect, it } from 'vitest'
import { formatAddress } from './collection'

describe('formatAddress', () => {
  it('falls back to default suffix length when end is bigint', () => {
      expect(formatAddress('SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT', 4, 1n)).toBe('SP5K...X9TJT')
    })

  it('keeps addresses unchanged at the truncation threshold', () => {
      expect(formatAddress('SP1234567890')).toBe('SP1234567890')
    })

  it('falls back to default end length when a decimal is provided', () => {
      const address = 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT'
      expect(formatAddress(address, 4, 2.5)).toBe('SP5K...X9TJT')
    })

  it('returns an empty string for blank values', () => {
      expect(formatAddress('')).toBe('')
    })

  it('returns an empty string for non-string input', () => {
      expect(formatAddress(12345)).toBe('')
    })

  it('falls back to default leading length for invalid start values', () => {
      const address = 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT'
      expect(formatAddress(address, -1, 2)).toBe('SP5K2...JT')
    })

  it('falls back to default end length when end is null', () => {
      expect(formatAddress('SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT', 4, null)).toBe('SP5K...X9TJT')
    })

  it('falls back to default start length when start is null', () => {
      expect(formatAddress('SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT', null, 4)).toBe('SP5K2...9TJT')
    })

  it('returns short addresses unchanged', () => {
      expect(formatAddress('SP12', 5, 5)).toBe('SP12')
    })

  it('falls back to default suffix length when end is a string', () => {
      expect(formatAddress('SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT', 4, '4')).toBe('SP5K...X9TJT')
    })

  it('falls back to default start length when a string is provided', () => {
      const address = 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT'
      expect(formatAddress(address, '4', 4)).toBe('SP5K2...9TJT')
    })

  it('trims before evaluating truncation thresholds', () => {
      expect(formatAddress('  SP1234567890  ')).toBe('SP1234567890')
    })

  it('supports truncation with a zero-length suffix', () => {
      expect(formatAddress('SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT', 4, 0)).toBe('SP5K...')
    })

  it('returns an empty string for whitespace-only input', () => {
      expect(formatAddress('    ')).toBe('')
    })

  it('supports formatting when zero prefix characters are requested', () => {
      expect(formatAddress('SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT', 0, 4)).toBe('...9TJT')
    })

  it('shows only ellipsis when both start and end lengths are zero', () => {
      expect(formatAddress('SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT', 0, 0)).toBe('...')
    })
})
