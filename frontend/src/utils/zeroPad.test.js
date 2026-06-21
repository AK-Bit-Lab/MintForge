import { describe, expect, it } from 'vitest'
import { zeroPad } from './strings'

describe('zeroPad', () => {
  it('pads numeric values to the default width', () => {
      expect(zeroPad(7)).toBe('07')
    })

  it('falls back to zero when number coercion fails', () => {
      expect(zeroPad('not-a-number', 3)).toBe('000')
    })

  it('falls back to the default width for invalid length values', () => {
      expect(zeroPad(9, 0)).toBe('09')
    })

  it('truncates and pads negative decimal numbers using absolute value', () => {
      expect(zeroPad(-12.9, 4)).toBe('0012')
    })

  it('normalizes negative decimal strings before padding', () => {
      expect(zeroPad('-7.9', 4)).toBe('0007')
    })

  it('accepts numeric strings and pads them', () => {
      expect(zeroPad('12', 4)).toBe('0012')
    })

  it('truncates decimal values before padding', () => {
      expect(zeroPad(4.9, 3)).toBe('004')
    })

  it('normalizes negative values to an absolute padded string', () => {
      expect(zeroPad(-42, 4)).toBe('0042')
    })
})
