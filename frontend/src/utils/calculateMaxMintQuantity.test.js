import { describe, expect, it } from 'vitest'
import { calculateMaxMintQuantity } from './format'

describe('calculateMaxMintQuantity', () => {
  it('returns the floor of budget divided by price', () => {
    expect(calculateMaxMintQuantity(25, 10)).toBe(2)
  })

  it('returns zero when budget is less than a single mint', () => {
    expect(calculateMaxMintQuantity(5, 10)).toBe(0)
  })

  it('returns zero when budget equals zero', () => {
    expect(calculateMaxMintQuantity(0, 10)).toBe(0)
  })

  it('returns zero when budget is negative', () => {
    expect(calculateMaxMintQuantity(-50, 10)).toBe(0)
  })

  it('returns zero when budget is null', () => {
    expect(calculateMaxMintQuantity(null, 10)).toBe(0)
  })

  it('returns zero when budget is undefined', () => {
    expect(calculateMaxMintQuantity(undefined, 10)).toBe(0)
  })

  it('returns zero when budget is NaN', () => {
    expect(calculateMaxMintQuantity(NaN, 10)).toBe(0)
  })

  it('returns zero when budget is Infinity', () => {
    expect(calculateMaxMintQuantity(Infinity, 10)).toBe(0)
  })

  it('accepts numeric strings as budget input', () => {
    expect(calculateMaxMintQuantity('30', 10)).toBe(3)
  })

  it('uses default price of 10 STX when price is omitted', () => {
    expect(calculateMaxMintQuantity(35)).toBe(3)
  })

  it('falls back to default price when price is zero', () => {
    expect(calculateMaxMintQuantity(100, 0)).toBe(10)
  })

  it('falls back to default price when price is negative', () => {
    expect(calculateMaxMintQuantity(100, -5)).toBe(10)
  })

  it('falls back to default price when price is NaN', () => {
    expect(calculateMaxMintQuantity(100, NaN)).toBe(10)
  })

  it('handles fractional budgets by flooring the result', () => {
    expect(calculateMaxMintQuantity(25.9, 10)).toBe(2)
  })

  it('handles fractional prices by flooring the result', () => {
    expect(calculateMaxMintQuantity(10, 3.5)).toBe(2)
  })

  it('returns exactly one when budget equals the price', () => {
    expect(calculateMaxMintQuantity(10, 10)).toBe(1)
  })

  it('handles large budgets correctly', () => {
    expect(calculateMaxMintQuantity(10000, 10)).toBe(1000)
  })
})
