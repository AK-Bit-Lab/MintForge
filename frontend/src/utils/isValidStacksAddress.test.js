import { describe, expect, it } from 'vitest'
import { isValidStacksAddress } from './strings'

describe('isValidStacksAddress', () => {
  it('accepts valid addresses surrounded by carriage returns', () => {
      const value = '\rSP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT\r'
      expect(isValidStacksAddress(value)).toBe(true)
    })

  it('rejects addresses containing internal spaces', () => {
      expect(isValidStacksAddress('SP5K2R HMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT')).toBe(false)
    })

  it('rejects addresses containing unsupported characters', () => {
      expect(isValidStacksAddress('SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJ*')).toBe(false)
    })

  it('rejects addresses that exceed the max supported length', () => {
      const tooLongAddress = 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJTAA'
      expect(isValidStacksAddress(tooLongAddress)).toBe(false)
    })

  it('rejects addresses below the minimum supported length', () => {
      expect(isValidStacksAddress('SP123456789012345678901234567890123456')).toBe(false)
    })

  it('accepts mixed-case addresses from pasted user input', () => {
      expect(isValidStacksAddress('Sp5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT')).toBe(true)
    })

  it('accepts valid addresses wrapped in newline whitespace', () => {
      const wrapped = '\nsp5k2rhmsbh4pap4pgx77mcvnk1zeed07cwx9tjt\n'
      expect(isValidStacksAddress(wrapped)).toBe(true)
    })

  it('returns false for non-string values', () => {
      expect(isValidStacksAddress(12345)).toBe(false)
      expect(isValidStacksAddress({})).toBe(false)
    })

  it('accepts valid addresses wrapped with tab characters', () => {
      const value = '\tSP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT\t'
      expect(isValidStacksAddress(value)).toBe(true)
    })

  it('accepts lowercase testnet addresses after normalization', () => {
      expect(isValidStacksAddress('st5k2rhmsbh4pap4pgx77mcvnk1zeed07cwx9tjt')).toBe(true)
    })

  it('rejects addresses with trailing punctuation', () => {
      expect(isValidStacksAddress('SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT.')).toBe(false)
    })

  it('rejects values that do not start with SP or ST', () => {
      expect(isValidStacksAddress('SX5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT')).toBe(false)
    })
})
