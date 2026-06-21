import { describe, expect, it } from 'vitest'
import { isValidTokenSymbol } from './validators'

describe('isValidTokenSymbol digit handling', () => {
  it('rejects symbols that include numeric characters', () => {
      expect(isValidTokenSymbol('STX2')).toBe(false)
    })
})

describe('isValidTokenSymbol', () => {
  it('rejects lowercase token symbols', () => {
      expect(isValidTokenSymbol('mini')).toBe(false)
    })

  it('accepts uppercase symbols at max supported length', () => {
      expect(isValidTokenSymbol('ABCDEFGH')).toBe(true)
    })

  it('accepts two-character uppercase symbols', () => {
      expect(isValidTokenSymbol('AB')).toBe(true)
    })

  it('rejects symbols longer than eight characters', () => {
      expect(isValidTokenSymbol('TOOLONGSY')).toBe(false)
    })

  it('rejects symbols with surrounding whitespace', () => {
      expect(isValidTokenSymbol(' MINI ')).toBe(false)
    })
})

