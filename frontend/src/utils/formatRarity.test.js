import { describe, expect, it } from 'vitest'
import { formatRarity } from './format'

describe('formatRarity', () => {
  it('trims leading tabs before title casing', () => {
      expect(formatRarity('\trare')).toBe('Rare')
    })

  it('preserves uppercase rarity labels', () => {
      expect(formatRarity('EPIC')).toBe('EPIC')
    })
})
