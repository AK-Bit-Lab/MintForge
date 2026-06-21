import { describe, expect, it } from 'vitest'
import { formatSTX, getSTXFormatDescriptor, normalizeMicrostxInput } from './collection'

describe('getSTXFormatDescriptor', () => {
  it('marks invalid descriptor when input cannot be parsed', () => {
      const descriptor = getSTXFormatDescriptor(undefined)

      expect(descriptor.isValid).toBe(false)
      expect(descriptor.formatted).toBe('0')
    })

  it('keeps descriptor formatted value aligned with formatSTX output', () => {
      const value = '1000000'
      expect(getSTXFormatDescriptor(value).formatted).toBe(formatSTX(value))
    })

  it('returns converted STX numeric value from microstx input', () => {
      expect(getSTXFormatDescriptor(2500000).stxValue).toBe(2.5)
    })

  it('marks finite values as valid descriptors', () => {
      const descriptor = getSTXFormatDescriptor(1500000)

      expect(descriptor.isValid).toBe(true)
      expect(descriptor.microstx).toBe(1500000)
    })
})

describe('normalizeMicrostxInput', () => {
  it('returns null for invalid input values', () => {
      expect(normalizeMicrostxInput(null)).toBeNull()
      expect(normalizeMicrostxInput('not-a-number')).toBeNull()
    })

  it('trims and parses numeric string values', () => {
      expect(normalizeMicrostxInput(' 1000 ')).toBe(1000)
    })
})

