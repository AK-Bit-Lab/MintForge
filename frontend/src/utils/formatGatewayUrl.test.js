import { describe, expect, it } from 'vitest'
import { formatGatewayUrl } from './format'

describe('formatGatewayUrl', () => {
  it('returns gateway root when CID is empty', () => {
      expect(formatGatewayUrl('')).toBe('https://ipfs.io/ipfs/')
    })

  it('normalizes leading slashes in CID values', () => {
      expect(formatGatewayUrl('/bafy123')).toBe('https://ipfs.io/ipfs/bafy123')
    })

  it('preserves space characters inside provided cid values', () => {
      expect(formatGatewayUrl('cid with space')).toBe('https://ipfs.io/ipfs/cid with space')
    })
})
