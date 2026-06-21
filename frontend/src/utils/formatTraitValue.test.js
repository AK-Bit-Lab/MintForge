import { describe, expect, it } from 'vitest'
import { formatTraitValue } from './format'

describe('formatTraitValue', () => {
  it('stringifies null trait values for display', () => {
      expect(formatTraitValue(null)).toBe('null')
    })

  it('stringifies null values for display safety', () => {
      expect(formatTraitValue(null)).toBe('null')
    })

  it('stringifies object trait values using default conversion', () => {
      expect(formatTraitValue({ rank: 1 })).toBe('[object Object]')
    })
})
