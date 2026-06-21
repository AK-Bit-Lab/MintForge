import { describe, expect, it } from 'vitest'
import { formatMintDate } from './format'

describe('formatMintDate', () => {
  it('returns a non-empty date label for epoch timestamps', () => {
      expect(formatMintDate(0).length).toBeGreaterThan(0)
    })

  it('formats epoch timestamps using locale date output', () => {
      expect(formatMintDate(0)).toBe(new Date(0).toLocaleDateString())
    })

  it('returns Invalid Date for unparsable timestamps', () => {
      expect(formatMintDate('not-a-date')).toBe('Invalid Date')
    })
})
