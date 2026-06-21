import { describe, expect, it } from 'vitest'
import { formatExactTime } from './collection'

describe('formatExactTime', () => {
  it('returns Unknown time for infinite values', () => {
      expect(formatExactTime(Number.POSITIVE_INFINITY)).toBe('Unknown time')
    })

  it('returns Unknown time for NaN values', () => {
      expect(formatExactTime(Number.NaN)).toBe('Unknown time')
    })

  it('returns Unknown time for null values', () => {
      expect(formatExactTime(null)).toBe('Unknown time')
    })

  it('accepts millisecond timestamps provided as strings', () => {
      expect(formatExactTime('1710000000000')).not.toBe('Unknown time')
    })

  it('formats second strings and second numbers equivalently', () => {
      expect(formatExactTime('1710000000')).toBe(formatExactTime(1710000000))
    })

  it('accepts unix time provided as a numeric string in seconds', () => {
      expect(formatExactTime('1710000000')).not.toBe('Unknown time')
    })

  it('returns Unknown time for undefined values', () => {
      expect(formatExactTime(undefined)).toBe('Unknown time')
    })

  it('formats epoch timestamps when provided as a string', () => {
      expect(formatExactTime('0')).not.toBe('Unknown time')
    })
})
