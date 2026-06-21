import { describe, expect, it } from 'vitest'
import { getMetadataGatewayUrl } from './collection'

describe('getMetadataGatewayUrl', () => {
  it('returns null for ipfs URIs that do not include a CID path', () => {
      expect(getMetadataGatewayUrl('ipfs://')).toBeNull()
      expect(getMetadataGatewayUrl('ipfs://ipfs/')).toBeNull()
    })

  it('returns null for empty values', () => {
      expect(getMetadataGatewayUrl('')).toBeNull()
    })

  it('returns http URLs unchanged', () => {
      const url = 'http://example.com/meta.json'
      expect(getMetadataGatewayUrl(url)).toBe(url)
    })

  it('preserves nested IPFS paths in gateway output', () => {
      expect(getMetadataGatewayUrl('ipfs://QmCid/metadata/1.json')).toBe('https://ipfs.io/ipfs/QmCid/metadata/1.json')
    })

  it('removes duplicate ipfs prefix segments after the scheme', () => {
      expect(getMetadataGatewayUrl('ipfs://ipfs/bafyabc')).toBe('https://ipfs.io/ipfs/bafyabc')
    })

  it('trims surrounding whitespace around ipfs URIs', () => {
      expect(getMetadataGatewayUrl('  ipfs://bafy123  ')).toBe('https://ipfs.io/ipfs/bafy123')
    })

  it('returns null for IPFS paths with spaces', () => {
      expect(getMetadataGatewayUrl('ipfs://QmCid with-space')).toBeNull()
    })

  it('returns trimmed HTTPS URLs as-is', () => {
      expect(getMetadataGatewayUrl('  https://example.com/meta.json  ')).toBe('https://example.com/meta.json')
    })

  it('returns null for unsupported URI schemes', () => {
      expect(getMetadataGatewayUrl('ftp://example.com/meta.json')).toBeNull()
    })

  it('converts uppercase IPFS schemes to gateway URLs', () => {
      expect(getMetadataGatewayUrl('IPFS://QmExampleCid')).toBe('https://ipfs.io/ipfs/QmExampleCid')
    })
})
