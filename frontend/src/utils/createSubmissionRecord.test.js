import { describe, expect, it } from 'vitest'
import { createSubmissionRecord } from './collection'

describe('createSubmissionRecord', () => {
  it('falls back to a local id when txId is only whitespace', () => {
      const record = createSubmissionRecord({
        txId: '   ',
        tokenURI: 'https://example.com/meta.json',
        address: 'SP3TESTADDRESS'
      })

      expect(record.id.startsWith('local-')).toBe(true)
      expect(record.txId).toBe('')
    })

  it('captures createdAt as a numeric timestamp', () => {
      const record = createSubmissionRecord({ txId: '0x2', tokenURI: 'https://example.com', address: 'SP123' })
      expect(typeof record.createdAt).toBe('number')
    })

  it('stores empty metadata kind when token URI is absent', () => {
      const record = createSubmissionRecord({
        txId: '0x1',
        tokenURI: '',
        address: 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT'
      })

      expect(record.metadataKind).toBe('empty')
    })

  it('uses the transaction id directly when provided', () => {
      const record = createSubmissionRecord({
        txId: '0xabc123',
        tokenURI: 'https://example.com/meta.json',
        address: 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT'
      })

      expect(record.id).toBe('0xabc123')
      expect(record.txId).toBe('0xabc123')
    })

  it('includes the wallet address in fallback ids', () => {
      const record = createSubmissionRecord({ tokenURI: 'https://example.com', address: 'SP3TESTADDRESS' })
      expect(record.id).toContain('SP3TESTADDRESS')
    })

  it('uses unknown in fallback ids when address is missing', () => {
      const record = createSubmissionRecord({ tokenURI: 'https://example.com' })
      expect(record.id).toContain('unknown')
    })

  it('generates a local fallback id when txId is missing', () => {
      const record = createSubmissionRecord({ tokenURI: 'ipfs://QmCid', address: 'SP123' })
      expect(record.id.startsWith('local-')).toBe(true)
    })

  it('keeps the original txId value when provided', () => {
      const record = createSubmissionRecord({ txId: '0xabc', tokenURI: 'https://example.com', address: 'SP123' })
      expect(record.txId).toBe('0xabc')
    })

  it('stores unknown metadata kind for unsupported schemes', () => {
      const record = createSubmissionRecord({ txId: '0x1', tokenURI: 'ftp://example.com', address: 'SP123' })
      expect(record.metadataKind).toBe('unknown')
    })

  it('captures metadata kind and label fields from URI', () => {
      const record = createSubmissionRecord({ txId: '0xabc', tokenURI: 'https://example.com/meta.json', address: 'SP123' })
      expect(record.metadataKind).toBe('https')
      expect(record.metadataLabel).toBe('example.com')
    })

  it('stores the trimmed address value in the returned record', () => {
      const record = createSubmissionRecord({
        txId: '0xabc',
        tokenURI: 'ipfs://bafybeihdwdcefgh4dqkjv67uzcmw7ojee6xedzdetojuzjevtenxquvyku/metadata.json',
        address: '  SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT  ',
      })

      expect(record.address).toBe('SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT')
    })

  it('trims wallet addresses before using them in fallback ids', () => {
      const record = createSubmissionRecord({
        tokenURI: 'https://example.com/meta.json',
        address: '  SP3TESTADDRESS  '
      })

      expect(record.id).toContain('SP3TESTADDRESS')
      expect(record.id).not.toContain('  SP3TESTADDRESS  ')
    })
})
