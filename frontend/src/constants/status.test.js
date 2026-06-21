import { describe, expect, it } from 'vitest'
import { FAILED_LABEL, PENDING_LABEL, UNKNOWN_ADDRESS } from './index.js'

describe('constants status labels', () => {
  it('keeps default status labels non-empty', () => {
      expect(UNKNOWN_ADDRESS.length).toBeGreaterThan(0)
      expect(PENDING_LABEL.length).toBeGreaterThan(0)
      expect(FAILED_LABEL.length).toBeGreaterThan(0)
    })
})
