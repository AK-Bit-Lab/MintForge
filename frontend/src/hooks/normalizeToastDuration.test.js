import { describe, expect, it } from 'vitest'
import { normalizeToastDuration } from './useToast'

describe('normalizeToastDuration', () => {
  it('uses fallback for numeric strings that are not finite numbers', () => {
      expect(normalizeToastDuration('1200', 900)).toBe(900)
    })

  it('keeps zero duration as a valid persistent value', () => {
      expect(normalizeToastDuration(0)).toBe(0)
    })
})

