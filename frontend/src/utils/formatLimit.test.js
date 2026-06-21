import { describe, expect, it } from 'vitest'
import { formatLimit } from './collection'

describe('formatLimit', () => {
  it('stringifies arrays into comma-separated output', () => {
      expect(formatLimit([1, 2, 3])).toBe('1,2,3')
    })

  it('formats boolean values as strings instead of using the fallback', () => {
      expect(formatLimit(false)).toBe('false')
    })

  it('uses a custom fallback for empty strings', () => {
      expect(formatLimit('   ', 'Unlimited')).toBe('Unlimited')
    })

  it('returns fallback text for blank string values', () => {
      expect(formatLimit('   ', 'Unset')).toBe('Unset')
    })

  it('keeps explicit false-like strings', () => {
      expect(formatLimit('false')).toBe('false')
    })

  it('returns fallback text when value is null', () => {
      expect(formatLimit(null, 'Unset')).toBe('Unset')
    })

  it('stringifies numeric values', () => {
      expect(formatLimit(12)).toBe('12')
    })

  it('stringifies object values for display', () => {
      expect(formatLimit({ cap: 2 })).toBe('[object Object]')
    })

  it('returns non-empty strings unchanged', () => {
      expect(formatLimit('No cap')).toBe('No cap')
    })

  it('uses a custom fallback when the value is undefined', () => {
      expect(formatLimit(undefined, 'Unlimited')).toBe('Unlimited')
    })

  it('uses the default fallback for whitespace-only values', () => {
      expect(formatLimit('  ')).toBe('Not set')
    })

  it('returns zero values as explicit strings', () => {
      expect(formatLimit(0)).toBe('0')
    })
})
