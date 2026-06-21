import { describe, expect, it } from 'vitest'
import { formatTxStatus } from './format'

describe('formatTxStatus', () => {
  it('trims leading tabs before status capitalization', () => {
      expect(formatTxStatus('\tpending')).toBe('Pending')
    })

  it('preserves uppercase status words', () => {
      expect(formatTxStatus('SUCCESS')).toBe('SUCCESS')
    })
})
