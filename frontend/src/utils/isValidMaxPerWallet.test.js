import { describe, expect, it } from 'vitest'
import { isValidMaxPerWallet } from './validators'

describe('isValidMaxPerWallet', () => {
  it('accepts the minimum wallet limit of one', () => {
      expect(isValidMaxPerWallet(1)).toBe(true)
    })

  it('accepts trimmed numeric strings', () => {
      expect(isValidMaxPerWallet(' 12 ')).toBe(true)
    })

  it('rejects zero as an invalid wallet limit', () => {
      expect(isValidMaxPerWallet(0)).toBe(false)
    })
})
