import { describe, expect, it } from 'vitest'
import { isValidWalletLimit } from './validators'

describe('isValidWalletLimit', () => {
  it('accepts minimum wallet limit boundary', () => {
      expect(isValidWalletLimit(1)).toBe(true)
    })

  it('rejects values above the upper bound', () => {
      expect(isValidWalletLimit(1001)).toBe(false)
    })

  it('rejects wallet limits above the supported maximum', () => {
      expect(isValidWalletLimit(1001)).toBe(false)
    })

  it('accepts the maximum wallet limit value', () => {
      expect(isValidWalletLimit(1000)).toBe(true)
    })

  it('accepts the documented upper bound value', () => {
      expect(isValidWalletLimit(1000)).toBe(true)
    })
})
