import { describe, expect, it } from 'vitest'
import { isNumericString } from './strings'

describe('isNumericString', () => {
  it('accepts signed decimal strings', () => {
      expect(isNumericString('-10.25')).toBe(true)
    })

  it('rejects empty string values', () => {
      expect(isNumericString('')).toBe(false)
    })

  it('accepts integer numeric strings', () => {
      expect(isNumericString('42')).toBe(true)
    })

  it('rejects decimals without a leading digit', () => {
      expect(isNumericString('.5')).toBe(false)
    })

  it('rejects plus-prefixed numeric strings', () => {
      expect(isNumericString('+42')).toBe(false)
    })

  it('rejects exponent notation strings', () => {
      expect(isNumericString('1e6')).toBe(false)
    })

  it('rejects values with trailing decimal points', () => {
      expect(isNumericString('42.')).toBe(false)
    })

  it('accepts numeric strings after trimming surrounding whitespace', () => {
      expect(isNumericString('  42.5  ')).toBe(true)
    })
})
