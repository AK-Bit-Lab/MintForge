import { describe, expect, it } from 'vitest'
import { formatBlockTime } from './format'

describe('formatBlockTime', () => {
  it('treats null as zero milliseconds', () => {
      expect(formatBlockTime(null)).toBe('0 min')
    })

  it('renders zero milliseconds as zero minutes', () => {
      expect(formatBlockTime(0)).toBe('0 min')
    })
})

describe('formatBlockTime midpoint rounding', () => {
  it('rounds 90 seconds to two minutes', () => {
      expect(formatBlockTime(90000)).toBe('2 min')
    })
})

