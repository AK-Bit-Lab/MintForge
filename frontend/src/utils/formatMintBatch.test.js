import { describe, expect, it } from 'vitest'
import { formatMintBatch } from './format'

describe('formatMintBatch', () => {
  it('prefixes batch output with the batch marker', () => {
      expect(formatMintBatch(4)).toBe('Batch x4')
    })

  it('keeps decimal values after numeric coercion', () => {
      expect(formatMintBatch('2.5')).toBe('Batch x2.5')
    })
})
