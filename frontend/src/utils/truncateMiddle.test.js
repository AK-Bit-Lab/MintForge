import { describe, expect, it } from 'vitest'
import { truncateMiddle } from './strings'

describe('truncateMiddle', () => {
  it('keeps configured prefix and suffix segments', () => {
      expect(truncateMiddle('SP1234567890', 3, 2)).toBe('SP1…90')
    })

  it('falls back to default window sizes for invalid segment counts', () => {
      expect(truncateMiddle('SP1234567890XYZ', -2, null)).toBe('SP1234…0XYZ')
    })

  it('returns empty string for non-string values', () => {
      expect(truncateMiddle(100)).toBe('')
    })

  it('returns short values without truncation', () => {
      expect(truncateMiddle('short', 4, 2)).toBe('short')
    })

  it('trims surrounding whitespace before truncating', () => {
      expect(truncateMiddle('  SP1234567890  ', 3, 2)).toBe('SP1…90')
    })

  it('omits trailing segment when end window is zero', () => {
      expect(truncateMiddle('abcdefghijklmnopqrstuvwxyz', 6, 0)).toBe('abcdef…')
    })
})
