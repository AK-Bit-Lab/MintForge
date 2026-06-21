import { describe, expect, it } from 'vitest'
import { getCardAccent } from './collection'

describe('getCardAccent', () => {
  it('returns HSL and HSLA formatted color values', () => {
      const accent = getCardAccent('format-check')
      expect(accent.primary.startsWith('hsl(')).toBe(true)
      expect(accent.secondary.startsWith('hsl(')).toBe(true)
      expect(accent.glow.startsWith('hsla(')).toBe(true)
    })

  it('returns stable colors for the same seed', () => {
      const first = getCardAccent('seed-value')
      const second = getCardAccent('seed-value')
      expect(first).toEqual(second)
    })

  it('generates different palettes for different seed values', () => {
      expect(getCardAccent('alpha')).not.toEqual(getCardAccent('beta'))
    })

  it('falls back to the default seed when an empty seed is provided', () => {
      expect(getCardAccent('')).toEqual(getCardAccent('minimint'))
    })

  it('returns glow values in hsla format', () => {
      const accent = getCardAccent('seed-b')
      expect(accent.glow).toContain('hsla(')
    })

  it('accepts numeric seeds by coercing to strings', () => {
      const accent = getCardAccent(42)
      expect(accent.primary).toContain('hsl(')
    })

  it('returns distinct primary and secondary accents', () => {
      const accent = getCardAccent('seed-a')
      expect(accent.primary).not.toBe(accent.secondary)
    })
})
