import { describe, expect, it } from 'vitest'
import { formatMintCount } from './format'

describe('formatMintCount', () => {
  it('uses plural label for multiple mints', () => {
      expect(formatMintCount(3)).toBe('3 mints')
    })

  it('uses singular label for one mint', () => {
      expect(formatMintCount(1)).toBe('1 mint')
    })
})
