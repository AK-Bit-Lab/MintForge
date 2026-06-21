import { describe, expect, it } from 'vitest'
import { getMetadataLabel } from './collection'

describe('getMetadataLabel', () => {
  it('returns Arweave metadata label for ar:// URIs', () => {
      expect(getMetadataLabel('ar://abc123')).toBe('Arweave metadata')
    })

  it('returns a generic label for empty values', () => {
      expect(getMetadataLabel('')).toBe('Metadata URI')
    })

  it('derives labels from standard HTTP hosts', () => {
      expect(getMetadataLabel('http://www.example.org/meta.json')).toBe('example.org')
    })

  it('removes www from HTTP host labels', () => {
      expect(getMetadataLabel('http://www.example.com/meta.json')).toBe('example.com')
    })

  it('falls back to web metadata label for malformed web URLs', () => {
      expect(getMetadataLabel('https://exa mple.com/meta.json')).toBe('Web metadata')
    })

  it('returns ip address hosts unchanged', () => {
      expect(getMetadataLabel('https://127.0.0.1/metadata.json')).toBe('127.0.0.1')
    })

  it('returns IPFS metadata label for ipfs URIs', () => {
      expect(getMetadataLabel('ipfs://QmExample')).toBe('IPFS metadata')
    })

  it('preserves meaningful subdomains while removing www prefix', () => {
      expect(getMetadataLabel('https://www.meta.example.org/data.json')).toBe('meta.example.org')
    })

  it('extracts host names from trimmed HTTP input', () => {
      expect(getMetadataLabel('  http://example.com/meta.json  ')).toBe('example.com')
    })
})
