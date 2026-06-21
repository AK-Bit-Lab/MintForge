import { describe, expect, it } from 'vitest'
import { formatExactTime, getExactTimeDescriptor, normalizeExactTimestamp } from './collection'

describe('getExactTimeDescriptor', () => {
  it('returns unknown label for invalid numeric strings', () => {
      expect(getExactTimeDescriptor('not-a-time').label).toBe('Unknown time')
    })

  it('returns an ISO timestamp when input is valid', () => {
      const descriptor = getExactTimeDescriptor('1700000000000')

      expect(descriptor.iso).toBe(new Date(1700000000000).toISOString())
    })

  it('matches formatExactTime label output for the same timestamp', () => {
      const timestamp = 1_700_000_000_000

      expect(getExactTimeDescriptor(timestamp).label).toBe(formatExactTime(timestamp))
    })

  it('returns unknown descriptor when timestamp is null', () => {
      expect(getExactTimeDescriptor(null)).toEqual({ label: 'Unknown time', iso: null, isValid: false })
    })

  it('sets isValid true for finite timestamps', () => {
      expect(getExactTimeDescriptor(1_700_000_000_000).isValid).toBe(true)
    })
})

describe('normalizeExactTimestamp', () => {
  it('normalizes second timestamps into milliseconds', () => {
      expect(normalizeExactTimestamp(1_700_000_000)).toBe(1_700_000_000_000)
    })
})

