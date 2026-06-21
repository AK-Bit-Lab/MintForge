import { describe, expect, it } from 'vitest'
import { MAX_TOKEN_URI_LENGTH, validateTokenURI } from './collection'

describe('validateTokenURI', () => {
  it('returns credential removal guidance for URLs with auth fields', () => {
      const result = validateTokenURI('https://user:pass@example.com/meta.json')
      expect(result.isValid).toBe(false)
      expect(result.helper).toContain('without embedded username or password')
    })

  it('returns metadata required state for empty input', () => {
      const result = validateTokenURI('')
      expect(result.isValid).toBe(false)
      expect(result.label).toBe('Metadata required')
    })

  it('reports full character budget for empty metadata input', () => {
      const result = validateTokenURI('')

      expect(result.remainingCharacters).toBe(256)
    })

  it('guides users to upgrade insecure HTTP metadata links', () => {
      const result = validateTokenURI('http://example.com/meta.json')
      expect(result.helper).toContain('https://')
    })

  it('rejects insecure http metadata URLs', () => {
      const result = validateTokenURI('http://example.com/meta.json')
      expect(result.isValid).toBe(false)
      expect(result.label).toBe('Upgrade to HTTPS')
    })

  it('accepts HTTPS metadata URLs with hash fragments', () => {
      expect(validateTokenURI('https://example.com/meta.json#nft').isValid).toBe(true)
    })

  it('accepts HTTPS metadata URLs with query parameters', () => {
      expect(validateTokenURI('https://example.com/meta.json?v=1').isValid).toBe(true)
    })

  it('rejects invalid HTTPS hosts', () => {
      const result = validateTokenURI('https://')
      expect(result.isValid).toBe(false)
      expect(result.label).toBe('Invalid metadata URL')
    })

  it('rejects ipfs://ipfs/ values that omit a CID path', () => {
      const result = validateTokenURI('ipfs://ipfs/')
      expect(result.isValid).toBe(false)
      expect(result.label).toBe('Invalid IPFS URI')
    })

  it('rejects ipfs URIs with spaces in the CID path', () => {
      const result = validateTokenURI('ipfs://QmExample path')
      expect(result.isValid).toBe(false)
      expect(result.label).toBe('Invalid IPFS URI')
    })

  it('rejects javascript schemes as unsupported', () => {
      const result = validateTokenURI('javascript:alert(1)')
      expect(result.isValid).toBe(false)
      expect(result.label).toBe('Unsupported scheme')
    })

  it('rejects URIs that exceed the contract length limit', () => {
      const overLimitUri = `https://example.com/${'a'.repeat(MAX_TOKEN_URI_LENGTH)}`
      const result = validateTokenURI(overLimitUri)
      expect(result.isValid).toBe(false)
      expect(result.label).toBe('URI too long')
    })

  it('accepts URIs exactly at the configured max length', () => {
      const prefix = 'https://e.co/'
      const value = `${prefix}${'a'.repeat(MAX_TOKEN_URI_LENGTH - prefix.length)}`
      const result = validateTokenURI(value)

      expect(value.length).toBe(MAX_TOKEN_URI_LENGTH)
      expect(result.isValid).toBe(true)
      expect(result.remainingCharacters).toBe(0)
      expect(result.isNearLimit).toBe(true)
    })

  it('keeps near-limit state false for short URIs', () => {
      const result = validateTokenURI('https://a.com/meta.json')

      expect(result.isNearLimit).toBe(false)
    })

  it('marks near-limit state when URI length reaches ninety percent of max', () => {
      const longPath = 'a'.repeat(231)
      const result = validateTokenURI(`https://${longPath}`)

      expect(result.isNearLimit).toBe(true)
    })

  it('rejects non-ASCII characters in URI input', () => {
      const result = validateTokenURI('https://example.com/meta-🔥.json')
      expect(result.isValid).toBe(false)
      expect(result.label).toBe('Unsupported characters')
    })

  it('returns the trimmed URI as normalized metadata value', () => {
      const result = validateTokenURI('  https://example.com/meta.json  ')

      expect(result.normalizedValue).toBe('https://example.com/meta.json')
    })

  it('reports secureScheme for secure and insecure protocols', () => {
      const secureResult = validateTokenURI('https://example.com/meta.json')
      const insecureResult = validateTokenURI('http://example.com/meta.json')

      expect(secureResult.secureScheme).toBe(true)
      expect(insecureResult.secureScheme).toBe(false)
    })

  it('returns the IPFS success label for valid IPFS URIs', () => {
      expect(validateTokenURI('ipfs://QmValidCid').label).toBe('IPFS metadata ready')
    })

  it('returns success tone for valid HTTPS metadata', () => {
      expect(validateTokenURI('https://example.com/metadata.json').tone).toBe('success')
    })

  it('accepts secure HTTPS URIs with surrounding whitespace', () => {
      const result = validateTokenURI('  https://example.com/meta.json  ')
      expect(result.isValid).toBe(true)
      expect(result.label).toBe('HTTPS metadata ready')
    })

  it('flags unsupported URI schemes', () => {
      const result = validateTokenURI('ftp://example.com/meta.json')
      expect(result.isValid).toBe(false)
      expect(result.label).toBe('Unsupported scheme')
    })

  it('rejects insecure HTTP schemes even when uppercased', () => {
      const result = validateTokenURI('HTTP://example.com/meta.json')
      expect(result.isValid).toBe(false)
      expect(result.label).toBe('Upgrade to HTTPS')
    })

  it('accepts valid ipfs CIDs with nested metadata paths', () => {
      const result = validateTokenURI('ipfs://QmExampleCID/metadata/nft.json')
      expect(result.isValid).toBe(true)
      expect(result.label).toBe('IPFS metadata ready')
    })

  it('accepts IPFS URIs with nested JSON paths', () => {
      expect(validateTokenURI('ipfs://QmValidCid/metadata/1.json').isValid).toBe(true)
    })

  it('treats whitespace-only input as missing metadata', () => {
      const result = validateTokenURI('   ')
      expect(result.isValid).toBe(false)
      expect(result.label).toBe('Metadata required')
    })
})
