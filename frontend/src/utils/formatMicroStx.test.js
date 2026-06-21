import { describe, expect, it } from 'vitest'
import { formatMicroStx } from './format'

describe('formatMicroStx', () => {
  it('formats negative values with fixed precision', () => {
      expect(formatMicroStx(-500000)).toBe('-0.500000 STX')
    })

  it('formats negative microstx values with fixed precision', () => {
      expect(formatMicroStx(-1000000)).toBe('-1.000000 STX')
    })

  it('formats zero microstx with fixed precision', () => {
      expect(formatMicroStx(0)).toBe('0.000000 STX')
    })
})
