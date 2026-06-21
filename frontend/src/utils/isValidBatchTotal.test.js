import { describe, expect, it } from 'vitest'
import { isValidBatchTotal } from './validators'

describe('isValidBatchTotal', () => {
  it('accepts the minimum allowed batch total', () => {
      expect(isValidBatchTotal(1)).toBe(true)
    })

  it('rejects values above the allowed batch-total range', () => {
      expect(isValidBatchTotal(51)).toBe(false)
    })

  it('rejects batch totals above the maximum', () => {
      expect(isValidBatchTotal(51)).toBe(false)
    })

  it('accepts values at the maximum allowed batch total', () => {
      expect(isValidBatchTotal(50)).toBe(true)
    })

  it('accepts the maximum allowed batch total', () => {
      expect(isValidBatchTotal(50)).toBe(true)
    })
})
