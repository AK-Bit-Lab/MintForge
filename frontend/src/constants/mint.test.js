import { describe, expect, it } from 'vitest'
import { MINT_ACTIVITY_POLL_INTERVAL_MS, MINT_FEE } from './index.js'

describe('constants mint activity polling', () => {
  it('keeps poll interval as a positive integer duration', () => {
      expect(Number.isInteger(MINT_ACTIVITY_POLL_INTERVAL_MS)).toBe(true)
      expect(MINT_ACTIVITY_POLL_INTERVAL_MS).toBeGreaterThan(0)
    })
})

describe('constants mint fee', () => {
  it('keeps MINT_FEE as a non-negative integer micro-STX value', () => {
      expect(Number.isInteger(MINT_FEE)).toBe(true)
      expect(MINT_FEE).toBeGreaterThanOrEqual(0)
    })
})

