import { describe, expect, it } from 'vitest'
import { formatOwnerCount } from './format'

describe('formatOwnerCount', () => {
  it('supports string owner totals in formatted labels', () => {
      expect(formatOwnerCount('12')).toBe('12 owners')
    })

  it('formats zero owner totals', () => {
      expect(formatOwnerCount(0)).toBe('0 owners')
    })

  it('renders zero owner values explicitly', () => {
      expect(formatOwnerCount(0)).toBe('0 owners')
    })
})
