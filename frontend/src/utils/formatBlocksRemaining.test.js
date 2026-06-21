import { describe, expect, it } from 'vitest'
import { formatBlocksRemaining } from './format'

describe('formatBlocksRemaining', () => {
  it('formats string block counts without coercion artifacts', () => {
      expect(formatBlocksRemaining('8')).toBe('8 blocks')
    })

  it('formats zero as a valid remaining block count', () => {
      expect(formatBlocksRemaining(0)).toBe('0 blocks')
    })
})
