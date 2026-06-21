import { describe, expect, it } from 'vitest'
import { formatCollectionTitle } from './format'

describe('formatCollectionTitle', () => {
  it('falls back to untitled collection when name is missing', () => {
      expect(formatCollectionTitle('')).toBe('Untitled Collection')
    })

  it('trims newline-wrapped collection titles', () => {
      expect(formatCollectionTitle('\nMini Mint\n')).toBe('Mini Mint')
    })

  it('falls back when name is whitespace-only', () => {
      expect(formatCollectionTitle('   ')).toBe('Untitled Collection')
    })
})
