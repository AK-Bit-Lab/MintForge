import { describe, expect, it } from 'vitest'
import { formatCID } from './format'

describe('formatCID', () => {
  it('returns empty output for null values', () => {
      expect(formatCID(null)).toBe('')
    })

  it('appends ellipsis even when cid is shorter than ten characters', () => {
      expect(formatCID('abc')).toBe('abc...')
    })
})

describe('formatCID undefined input', () => {
  it('returns an empty string for undefined CID values', () => {
      expect(formatCID(undefined)).toBe('')
    })
})

