import { describe, expect, it } from 'vitest'
import { isValidExplorerUrl } from './validators'

describe('isValidExplorerUrl', () => {
  it('rejects non-https explorer links', () => {
      expect(isValidExplorerUrl('http://explorer.stacks.co/txid/abc')).toBe(false)
    })

  it('rejects non-https explorer URLs', () => {
      expect(isValidExplorerUrl('http://explorer.stacks.co/txid/123')).toBe(false)
    })

  it('accepts uppercase HTTPS scheme values', () => {
      expect(isValidExplorerUrl('HTTPS://explorer.stacks.co/txid/abc')).toBe(true)
    })

  it('accepts uppercase HTTPS schemes', () => {
      expect(isValidExplorerUrl('HTTPS://explorer.stacks.co/txid/123')).toBe(true)
    })
})

describe('isValidExplorerUrl whitespace values', () => {
  it('rejects whitespace-only explorer urls', () => {
      expect(isValidExplorerUrl('   ')).toBe(false)
    })
})

