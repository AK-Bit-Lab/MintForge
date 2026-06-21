import { describe, expect, it } from 'vitest'
import { formatPercentFromBps } from './format'

describe('formatPercentFromBps', () => {
  it('formats negative basis points with sign preserved', () => {
      expect(formatPercentFromBps(-50)).toBe('-0.50%')
    })

  it('renders percentages with two decimal places', () => {
      expect(formatPercentFromBps(255)).toBe('2.55%')
    })

  it('coerces numeric strings before percentage formatting', () => {
      expect(formatPercentFromBps('300')).toBe('3.00%')
    })
})
