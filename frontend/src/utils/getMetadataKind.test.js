import { describe, expect, it } from 'vitest'
import { getMetadataKind } from './collection'

describe('getMetadataKind', () => {
  it('detects arweave scheme URIs', () => {
      expect(getMetadataKind('ar://abc123')).toBe('arweave')
    })

  it('returns empty for blank string values', () => {
      expect(getMetadataKind('')).toBe('empty')
    })

  it('marks ftp schemes as unknown', () => {
      expect(getMetadataKind('ftp://example.com/meta.json')).toBe('unknown')
    })

  it('detects plain HTTP metadata links', () => {
      expect(getMetadataKind('http://example.com/meta.json')).toBe('http')
    })

  it('detects plain HTTPS metadata links', () => {
      expect(getMetadataKind('https://example.com/meta.json')).toBe('https')
    })

  it('treats non-string values as unknown', () => {
      expect(getMetadataKind(12345)).toBe('unknown')
    })

  it('detects IPFS URIs after trimming surrounding spaces', () => {
      expect(getMetadataKind('  ipfs://QmExample  ')).toBe('ipfs')
    })

  it('normalizes uppercase arweave URI schemes', () => {
      expect(getMetadataKind('AR://abc123')).toBe('arweave')
    })

  it('detects uppercase HTTP schemes', () => {
      expect(getMetadataKind('HTTP://example.com/meta.json')).toBe('http')
    })

  it('normalizes uppercase HTTPS schemes', () => {
      expect(getMetadataKind('HTTPS://example.com')).toBe('https')
    })

  it('detects ipfs URIs regardless of scheme casing', () => {
      expect(getMetadataKind('IPFS://QmExampleCid')).toBe('ipfs')
    })

  it('treats newline-only values as empty metadata', () => {
      expect(getMetadataKind('\n\n')).toBe('empty')
    })
})
