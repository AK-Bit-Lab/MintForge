import { describe, expect, it } from 'vitest'
import { extractGatewayHost } from './collection'

describe('extractGatewayHost', () => {
  it('returns null for empty string input', () => {
      expect(extractGatewayHost('')).toBeNull()
    })

  it('extracts hostnames from non-http URLs when parseable', () => {
      expect(extractGatewayHost('ftp://mirror.example.net/resource')).toBe('mirror.example.net')
    })

  it('returns the hostname for a valid https URL', () => {
      expect(extractGatewayHost('https://ipfs.io/ipfs/bafy')).toBe('ipfs.io')
    })

  it('returns null for malformed URL values', () => {
      expect(extractGatewayHost('not a valid url')).toBeNull()
    })

  it('supports IPv6 hosts in bracket notation', () => {
      expect(extractGatewayHost('https://[2001:db8::1]/ipfs/data')).toBe('[2001:db8::1]')
    })

  it('returns an empty host for hostless URL schemes', () => {
      expect(extractGatewayHost('mailto:hello@example.com')).toBe('')
    })

  it('returns the hostname without port details', () => {
      expect(extractGatewayHost('https://gateway.example.com:8443/ipfs/data')).toBe('gateway.example.com')
    })

  it('normalizes hostnames when URL scheme casing varies', () => {
      expect(extractGatewayHost('HTTPS://IPFS.IO/ipfs/bafy')).toBe('ipfs.io')
    })

  it('extracts hostnames from URLs that include userinfo', () => {
      expect(extractGatewayHost('https://user:pass@assets.example.org/path')).toBe('assets.example.org')
    })

  it('handles surrounding whitespace in URL input', () => {
      expect(extractGatewayHost('  https://ipfs.io/ipfs/bafy  ')).toBe('ipfs.io')
    })
})
