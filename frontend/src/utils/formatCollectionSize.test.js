import { describe, expect, it } from 'vitest'
import { formatCollectionSize } from './format'

describe('formatCollectionSize', () => {
  it('formats negative values without crashing', () => {
      expect(formatCollectionSize(-50)).toBe('-50 items')
    })

  it('keeps string counts readable when formatting item totals', () => {
      expect(formatCollectionSize('1200')).toBe('1,200 items')
    })

  it('coerces numeric strings before appending item labels', () => {
      expect(formatCollectionSize('2500')).toBe('2,500 items')
    })

  it('formats zero as a valid item count', () => {
      expect(formatCollectionSize(0)).toBe('0 items')
    })
})
