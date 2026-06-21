import { describe, expect, it } from 'vitest'
import { getMetadataAccessDescriptor } from './collection'

describe('getMetadataAccessDescriptor', () => {
  it('does not require gateway access for arweave URIs', () => {
      const descriptor = getMetadataAccessDescriptor('ar://abc123')
      expect(descriptor.requiresGateway).toBe(false)
      expect(descriptor.gatewayUrl).toBeNull()
    })

  it('returns empty-kind descriptor for blank metadata values', () => {
      const descriptor = getMetadataAccessDescriptor('   ')

      expect(descriptor.kind).toBe('empty')
      expect(descriptor.isAccessible).toBe(false)
    })

  it('extracts gatewayHost from HTTPS metadata URLs', () => {
      const descriptor = getMetadataAccessDescriptor('https://example.com/meta.json')

      expect(descriptor.gatewayHost).toBe('example.com')
    })

  it('extracts IPFS gateway host from translated IPFS URLs', () => {
      const descriptor = getMetadataAccessDescriptor('ipfs://QmCID/meta.json')

      expect(descriptor.gatewayHost).toBe('ipfs.io')
    })

  it('marks HTTPS metadata as directly accessible without gateway requirement', () => {
      const descriptor = getMetadataAccessDescriptor('https://example.com/meta.json')

      expect(descriptor.kind).toBe('https')
      expect(descriptor.isAccessible).toBe(true)
      expect(descriptor.requiresGateway).toBe(false)
    })

  it('flags ipfs URIs as requiring gateway access', () => {
      const descriptor = getMetadataAccessDescriptor('ipfs://bafy123')
      expect(descriptor.requiresGateway).toBe(true)
      expect(descriptor.isAccessible).toBe(true)
    })

  it('marks IPFS metadata as gateway-accessible and requiring a gateway', () => {
      const descriptor = getMetadataAccessDescriptor('ipfs://QmCID/meta.json')

      expect(descriptor.kind).toBe('ipfs')
      expect(descriptor.isAccessible).toBe(true)
      expect(descriptor.requiresGateway).toBe(true)
      expect(descriptor.gatewayUrl).toContain('ipfs.io/ipfs/')
    })

  it('marks unknown schemes as inaccessible', () => {
      const descriptor = getMetadataAccessDescriptor('ftp://example.com/meta.json')
      expect(descriptor.isAccessible).toBe(false)
      expect(descriptor.gatewayUrl).toBeNull()
    })

  it('marks unsupported schemes as inaccessible metadata', () => {
      const descriptor = getMetadataAccessDescriptor('ftp://example.com/meta.json')

      expect(descriptor.isAccessible).toBe(false)
      expect(descriptor.gatewayUrl).toBeNull()
      expect(descriptor.requiresGateway).toBe(false)
    })
})
