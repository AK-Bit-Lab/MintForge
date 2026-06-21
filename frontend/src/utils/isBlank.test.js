import { describe, expect, it } from 'vitest'
import { isBlank } from './strings'

describe('isBlank', () => {
  it('treats empty strings as blank values', () => {
      expect(isBlank('')).toBe(true)
    })

  it('does not treat non-string primitives as blank', () => {
      expect(isBlank(0)).toBe(false)
    })

  it('treats null values as blank', () => {
      expect(isBlank(null)).toBe(true)
    })

  it('returns false for strings containing non-whitespace text', () => {
      expect(isBlank('\t mint \n')).toBe(false)
    })

  it('treats undefined values as blank', () => {
      expect(isBlank(undefined)).toBe(true)
    })

  it('treats whitespace-only strings as blank', () => {
      expect(isBlank('   ')).toBe(true)
    })
})
