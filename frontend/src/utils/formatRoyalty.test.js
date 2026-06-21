import { describe, expect, it } from 'vitest'
import { formatRoyalty } from './format'

describe('formatRoyalty', () => {
  it('rounds fractional percent output to one decimal place', () => {
      expect(formatRoyalty(15)).toBe('0.1%')
    })

  it('formats max royalty basis points as full percent', () => {
      expect(formatRoyalty(10000)).toBe('100.0%')
    })

  it('accepts numeric strings when formatting royalty percentages', () => {
      expect(formatRoyalty('250')).toBe('2.5%')
    })

  it('shows zero basis points as zero percent', () => {
      expect(formatRoyalty(0)).toBe('0.0%')
    })
})
