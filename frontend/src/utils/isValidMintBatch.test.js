import { describe, expect, it } from 'vitest'
import { isValidMintBatch } from './validators'

describe('isValidMintBatch', () => {
  it('rejects mint batch sizes above the maximum', () => {
      expect(isValidMintBatch(11)).toBe(false)
    })

  it('accepts max batch value when provided as a string', () => {
      expect(isValidMintBatch('10')).toBe(true)
    })

  it('accepts the maximum allowed mint batch size', () => {
      expect(isValidMintBatch(10)).toBe(true)
    })
})
