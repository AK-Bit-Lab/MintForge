import { describe, expect, it } from 'vitest'
import { isValidCID } from './validators'

describe('isValidCID minimum boundary', () => {
  it('accepts CIDs at the documented minimum length', () => {
      expect(isValidCID('abcdefghij')).toBe(true)
    })
})

describe('isValidCID', () => {
  it('rejects whitespace-only CID values', () => {
      expect(isValidCID('           ')).toBe(false)
    })
})

