import { describe, expect, it } from 'vitest'
import { formatWhitelistWindow } from './format'

describe('formatWhitelistWindow', () => {
  it('formats negative boundaries after numeric coercion', () => {
      expect(formatWhitelistWindow('-2', '-1')).toBe('WL -2--1')
    })

  it('coerces numeric string boundaries before formatting', () => {
      expect(formatWhitelistWindow('10', '25')).toBe('WL 10-25')
    })
})
