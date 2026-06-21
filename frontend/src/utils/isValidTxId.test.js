import { describe, expect, it } from 'vitest'
import { isValidTxId } from './validators'

describe('isValidTxId', () => {
  it('rejects tx ids containing non-hex characters', () => {
      expect(isValidTxId(`0x${'f'.repeat(63)}z`)).toBe(false)
    })

  it('rejects tx ids with surrounding whitespace', () => {
      expect(isValidTxId(` 0x${'a'.repeat(64)} `)).toBe(false)
    })
})
