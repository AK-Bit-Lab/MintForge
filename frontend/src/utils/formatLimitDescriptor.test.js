import { describe, expect, it } from 'vitest'
import { describeLimit, getLimitText, isLimitFallback } from './collection'

describe('describeLimit', () => {
  it('labels array limits with array valueType and stringified text', () => {
      expect(describeLimit([1, 2])).toEqual({ text: '1,2', isFallback: false, valueType: 'array' })
    })

  it('marks null and undefined values with empty valueType', () => {
      expect(describeLimit(null).valueType).toBe('empty')
      expect(describeLimit(undefined).valueType).toBe('empty')
    })

  it('returns normalized descriptor for numeric limits', () => {
      expect(describeLimit(12)).toEqual({ text: '12', isFallback: false, valueType: 'number' })
    })
})

describe('isLimitFallback', () => {
  it('treats blank string values as fallback states', () => {
      expect(isLimitFallback('   ')).toBe(true)
    })
})

describe('getLimitText', () => {
  it('returns fallback label when value is null', () => {
      expect(getLimitText(null)).toBe('Not set')
    })

  it('preserves numeric zero instead of falling back', () => {
      expect(getLimitText(0)).toBe('0')
    })
})

