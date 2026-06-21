import { describe, expect, it } from 'vitest'
import { isValidTokenIdInSupply } from './validators'

describe('isValidTokenIdInSupply', () => {
  it('rejects token ids above max supply', () => {
      expect(isValidTokenIdInSupply(10001)).toBe(false)
    })

  it('rejects token ids above the supply limit', () => {
      expect(isValidTokenIdInSupply(10001)).toBe(false)
    })

  it('accepts token ids at the configured upper bound', () => {
      expect(isValidTokenIdInSupply(10000)).toBe(true)
    })

  it('accepts token ids at the max supply boundary', () => {
      expect(isValidTokenIdInSupply(10000)).toBe(true)
    })

  it('rejects zero token ids', () => {
      expect(isValidTokenIdInSupply(0)).toBe(false)
    })
})
