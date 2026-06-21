import { describe, expect, it } from 'vitest'
import { isValidRarityTier } from './validators'

describe('isValidRarityTier', () => {
  it('accepts legendary as a supported rarity tier', () => {
      expect(isValidRarityTier('legendary')).toBe(true)
    })

  it('rejects rarity tiers with trailing spaces', () => {
      expect(isValidRarityTier('rare ')).toBe(false)
    })

  it('rejects uppercase rarity labels', () => {
      expect(isValidRarityTier('RARE')).toBe(false)
    })
})
