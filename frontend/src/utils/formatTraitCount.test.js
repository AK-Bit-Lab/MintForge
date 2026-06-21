import { describe, expect, it } from 'vitest'
import { formatTraitCount } from './format'

describe('formatTraitCount', () => {
  it('coerces numeric-string values before labeling', () => {
      expect(formatTraitCount('11')).toBe('11 traits')
    })

  it('supports string trait counts in labels', () => {
      expect(formatTraitCount('4')).toBe('4 traits')
    })

  it('formats zero trait counts', () => {
      expect(formatTraitCount(0)).toBe('0 traits')
    })
})
