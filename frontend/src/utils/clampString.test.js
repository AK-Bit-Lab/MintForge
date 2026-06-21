import { describe, expect, it } from 'vitest'
import { clampString } from './strings'

describe('clampString', () => {
  it('truncates long input using the default max length', () => {
      expect(clampString('x'.repeat(101))).toBe(`${'x'.repeat(100)}…`)
    })

  it('appends an ellipsis when truncating long strings', () => {
      expect(clampString('abcdefghij', 5)).toBe('abcde…')
    })

  it('returns empty output for empty inputs', () => {
      expect(clampString('')).toBe('')
    })

  it('returns the original string when length matches the limit', () => {
      expect(clampString('hello', 5)).toBe('hello')
    })

  it('uses the default cap when maxLength is invalid', () => {
      expect(clampString('x'.repeat(120), -5)).toHaveLength(101)
    })

  it('returns short strings unchanged', () => {
      expect(clampString('mini', 10)).toBe('mini')
    })
})
