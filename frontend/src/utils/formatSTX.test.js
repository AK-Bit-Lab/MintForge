import { describe, expect, it } from 'vitest'
import { formatSTX } from './collection'

describe('formatSTX', () => {
  it('coerces boolean false into zero microstx', () => {
      expect(formatSTX(false)).toBe('0')
    })

  it('coerces boolean true into a microstx amount', () => {
      expect(formatSTX(true)).toBe('0.000001')
    })

  it('falls back to zero for comma-formatted strings', () => {
      expect(formatSTX('1,000')).toBe('0')
    })

  it('formats decimal micro-STX values without crashing', () => {
      expect(formatSTX(1500000.5)).toBe('1.500001')
    })

  it('treats empty strings as zero microstx', () => {
      expect(formatSTX('')).toBe('0')
    })

  it('accepts exponent notation in string input', () => {
      expect(formatSTX('1e6')).toBe('1')
    })

  it('returns zero for Infinity provided as a string', () => {
      expect(formatSTX('Infinity')).toBe('0')
    })

  it('formats larger micro-STX amounts with grouped output', () => {
      expect(formatSTX(123456789)).toBe('123.456789')
    })

  it('preserves up to six decimals for large microstx inputs', () => {
      expect(formatSTX(123456789)).toBe('123.456789')
    })

  it('normalizes numeric strings with leading zeros', () => {
      expect(formatSTX('000001000000')).toBe('1')
    })

  it('formats one microstx with six decimal places', () => {
      expect(formatSTX(1)).toBe('0.000001')
    })

  it('returns zero when NaN is provided as a string', () => {
      expect(formatSTX('NaN')).toBe('0')
    })

  it('formats negative single-micro values', () => {
      expect(formatSTX(-1)).toBe('-0.000001')
    })

  it('formats negative numeric strings', () => {
      expect(formatSTX('-500000')).toBe('-0.5')
    })

  it('preserves sign when formatting negative values', () => {
      expect(formatSTX(-1000000)).toBe('-1')
    })

  it('returns zero when value is null', () => {
      expect(formatSTX(null)).toBe('0')
    })

  it('formats numeric strings as micro-STX values', () => {
      expect(formatSTX('1000000')).toBe('1')
    })

  it('trims decimal strings before formatting', () => {
      expect(formatSTX(' 2500000.5 ')).toBe('2.500001')
    })

  it('returns zero when value is undefined', () => {
      expect(formatSTX(undefined)).toBe('0')
    })

  it('parses numeric strings with surrounding whitespace', () => {
      expect(formatSTX('   2000000   ')).toBe('2')
    })
})
