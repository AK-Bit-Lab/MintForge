import { describe, expect, it } from 'vitest'
import { isValidTraitCount } from './validators'

describe('isValidTraitCount', () => {
  it('rejects trait counts above the supported maximum', () => {
      expect(isValidTraitCount(65)).toBe(false)
    })

  it('accepts trait counts at the supported maximum', () => {
      expect(isValidTraitCount(64)).toBe(true)
    })

  it('accepts zero trait counts', () => {
      expect(isValidTraitCount(0)).toBe(true)
    })
})
