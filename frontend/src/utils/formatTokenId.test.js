import { describe, expect, it } from 'vitest'
import { formatTokenId } from './format'

describe('formatTokenId', () => {
  it('stringifies boolean token ids with hash prefix', () => {
      expect(formatTokenId(false)).toBe('#false')
    })

  it('stringifies null token ids with prefix', () => {
      expect(formatTokenId(null)).toBe('#null')
    })

  it('keeps string identifiers when prefixing', () => {
      expect(formatTokenId('009')).toBe('#009')
    })

  it('preserves string token identifiers when prefixing', () => {
      expect(formatTokenId('0042')).toBe('#0042')
    })

  it('formats zero token ids with the hash prefix', () => {
      expect(formatTokenId(0)).toBe('#0')
    })
})
