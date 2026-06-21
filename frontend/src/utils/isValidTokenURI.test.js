import { describe, expect, it } from 'vitest'
import { isValidTokenURI } from './validators'

describe('isValidTokenURI', () => {
  it('rejects ar:// URIs in strict validator checks', () => {
      expect(isValidTokenURI('ar://some-arweave-id')).toBe(false)
    })

  it('accepts trimmed ipfs urls', () => {
      expect(isValidTokenURI('  ipfs://bafy12345  ')).toBe(true)
    })

  it('accepts uppercase IPFS schemes', () => {
      expect(isValidTokenURI('IPFS://bafybeigdyrzt')).toBe(true)
    })

  it('accepts uppercase scheme prefixes through case-insensitive matching', () => {
      expect(isValidTokenURI('HTTPS://example.com/meta.json')).toBe(true)
    })
})
