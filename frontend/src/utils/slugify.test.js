import { describe, expect, it } from 'vitest'
import { slugify } from './strings'

describe('slugify', () => {
  it('removes accented characters not matched by the word class', () => {
      expect(slugify('Café launch')).toBe('caf-launch')
    })

  it('collapses mixed spaces and underscores into single dashes', () => {
      expect(slugify('mini___mint   launch')).toBe('mini-mint-launch')
    })

  it('returns empty string for empty input', () => {
      expect(slugify('')).toBe('')
    })

  it('collapses newlines into single dashes', () => {
      expect(slugify('Mini\nMint\nLaunch')).toBe('mini-mint-launch')
    })

  it('returns empty string for non-string inputs', () => {
      expect(slugify(42)).toBe('')
    })

  it('strips punctuation and normalizes separators', () => {
      expect(slugify('Mini Mint! v2')).toBe('mini-mint-v2')
    })

  it('removes leading and trailing hyphens from output', () => {
      expect(slugify('---Mini Mint---')).toBe('mini-mint')
    })

  it('normalizes uppercase titles to lowercase slugs', () => {
      expect(slugify('MINI MINT DROP')).toBe('mini-mint-drop')
    })
})
