import { describe, expect, it } from 'vitest'
import { createSubmissionSummary, normalizeSubmissionAddress, normalizeSubmissionTokenURI } from './collection'

describe('createSubmissionSummary', () => {
  it('marks summary as local-only when tx id is blank', () => {
      const summary = createSubmissionSummary({
        id: 'local-2',
        txId: '   ',
        tokenURI: 'ipfs://bafy-test/metadata.json'
      })

      expect(summary.txId).toBe('')
      expect(summary.hasTxId).toBe(false)
      expect(summary.isLocalOnly).toBe(true)
    })

  it('exposes metadata kind and label from the token URI', () => {
      const summary = createSubmissionSummary({
        id: 'tx-1',
        txId: '0x123',
        tokenURI: 'ipfs://bafybeigdyrzt5u2'
      })

      expect(summary.metadataKind).toBe('ipfs')
      expect(summary.metadataLabel).toBe('IPFS metadata')
    })

  it('trims transaction ids before exposing summary fields', () => {
      const summary = createSubmissionSummary({
        id: 'local-1',
        txId: '  0xabc123  ',
        tokenURI: 'https://example.com/metadata.json'
      })

      expect(summary.txId).toBe('0xabc123')
      expect(summary.hasTxId).toBe(true)
    })
})

describe('normalizeSubmissionAddress', () => {
  it('keeps non-string address values unchanged', () => {
      expect(normalizeSubmissionAddress(null)).toBeNull()
    })

  it('trims address strings for consistent display', () => {
      expect(normalizeSubmissionAddress('  SP123  ')).toBe('SP123')
    })
})

describe('normalizeSubmissionTokenURI', () => {
  it('trims token URI values before storing submission metadata', () => {
      expect(normalizeSubmissionTokenURI('  ipfs://bafy-test/metadata.json  ')).toBe('ipfs://bafy-test/metadata.json')
    })
})

