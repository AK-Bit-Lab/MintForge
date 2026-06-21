import { describe, expect, it } from 'vitest'
import { isValidMintPrice } from './validators'

describe('isValidMintPrice', () => {
  it('rejects negative mint prices', () => {
      expect(isValidMintPrice(-0.01)).toBe(false)
    })

  it('accepts trimmed numeric price strings', () => {
      expect(isValidMintPrice(' 1.5 ')).toBe(true)
    })

  it('accepts zero as a valid mint price', () => {
      expect(isValidMintPrice(0)).toBe(true)
    })

  it('accepts zero as a valid mint price', () => {
      expect(isValidMintPrice(0)).toBe(true)
    })
})
