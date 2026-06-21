import { describe, expect, it } from 'vitest'
import { pluralize } from './strings'

describe('pluralize', () => {
  it('uses custom plural forms when provided', () => {
      expect(pluralize(2, 'analysis', 'analyses')).toBe('analyses')
    })

  it('uses provided custom plural form for zero counts', () => {
      expect(pluralize(0, 'analysis', 'analyses')).toBe('analyses')
    })

  it('falls back to appending s when custom plural is omitted', () => {
      expect(pluralize(3, 'token')).toBe('tokens')
    })

  it('returns singular form when count is exactly one', () => {
      expect(pluralize(1, 'wallet')).toBe('wallet')
    })

  it('returns singular label for count one even with custom plural', () => {
      expect(pluralize(1, 'person', 'people')).toBe('person')
    })

  it('uses plural form when count is zero', () => {
      expect(pluralize(0, 'item')).toBe('items')
    })

  it('uses plural form for zero count', () => {
      expect(pluralize(0, 'mint')).toBe('mints')
    })
})
