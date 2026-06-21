import { describe, expect, it } from 'vitest'
import { formatRevealDelay } from './format'

describe('formatRevealDelay', () => {
  it('formats decimal string block delays', () => {
      expect(formatRevealDelay('2.5')).toBe('2.5 blocks to reveal')
    })

  it('coerces numeric string block values', () => {
      expect(formatRevealDelay('6')).toBe('6 blocks to reveal')
    })
})
