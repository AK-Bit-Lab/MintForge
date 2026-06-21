import { describe, expect, it } from 'vitest'
import {
  RecentMints,
  getRecentMintAddress,
  getRecentMintKey,
  getRecentMintTokenDescriptor,
  getRecentMintTxId,
  normalizeMintTimestamp
} from './RecentMints'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

describe('getRecentMintAddress', () => {
  it('returns Unknown when address fields are empty', () => {
      expect(getRecentMintAddress({ minter: '   ', address: '' })).toBe('Unknown')
    })

  it('prefers minter address over fallback address field', () => {
      expect(getRecentMintAddress({ minter: 'SPMINTER', address: 'SPADDRESS' })).toBe('SPMINTER')
    })
})

describe('RecentMints', () => {
  it('falls back to Unknown when address fields are blank strings', () => {
      const markup = renderToStaticMarkup(
        React.createElement(RecentMints, {
          items: [{ tokenId: 4, timestamp: 1710000000, txId: '0xabc', minter: '   ' }]
        })
      )

      expect(markup).toContain('Unknown')
    })

  it('guides users when no local mint receipts exist', () => {
      const markup = renderToStaticMarkup(React.createElement(RecentMints, { items: [] }))
      expect(markup).toContain('Your next wallet submission will appear here.')
    })

  it('renders empty-state messaging when there are no receipts', () => {
      const markup = renderToStaticMarkup(React.createElement(RecentMints, { items: [] }))
      expect(markup).toContain('No local mint receipts yet.')
      expect(markup).toContain('data-count="0"')
    })

  it('treats blank token id strings as pending submissions', () => {
      const markup = renderToStaticMarkup(
        React.createElement(RecentMints, {
          items: [{ tokenId: '   ', timestamp: 1710000000, address: 'SP123', txId: '0xabc' }]
        })
      )

      expect(markup).toContain('Pending')
      expect(markup).toContain('Submitted ↗')
      expect(markup).not.toContain('#</span>')
    })

  it('uses txHash values when txId is missing', () => {
      const txHash = '0xhash123'
      const markup = renderToStaticMarkup(
        React.createElement(RecentMints, {
          items: [{ tokenId: 4, timestamp: 1710000000, address: 'SP123', txHash }]
        })
      )

      expect(markup).toContain(`/txid/${txHash}`)
    })

  it('falls back to unknown address copy when no address fields exist', () => {
      const markup = renderToStaticMarkup(
        React.createElement(RecentMints, {
          items: [{ tokenId: 4, timestamp: 1710000000, txId: '0xabc' }]
        })
      )

      expect(markup).toContain('Unknown')
    })

  it('renders explorer links for items with transaction ids', () => {
      const txId = '0xabc123'
      const markup = renderToStaticMarkup(
        React.createElement(RecentMints, {
          items: [{ tokenId: 7, timestamp: 1710000000, address: 'SP123', txId }]
        })
      )

      expect(markup).toContain('Minted ↗')
      expect(markup).toContain(`/txid/${txId}`)
      expect(markup).toContain('data-pending="false"')
    })

  it('renders loading skeletons when items is null', () => {
      const markup = renderToStaticMarkup(React.createElement(RecentMints, { items: null }))
      expect(markup).toContain('mint-item--skeleton')
      expect(markup).toContain('Loading recent mint activity')
      expect(markup).toContain('data-count="3"')
    })

  it('shows pending status when an item has no transaction id', () => {
      const markup = renderToStaticMarkup(
        React.createElement(RecentMints, {
          items: [{ tokenId: null, timestamp: 1710000000, address: 'SP123' }]
        })
      )

      expect(markup).toContain('Pending')
      expect(markup).toContain('mint-item__badge--pending')
      expect(markup).toContain('title="Mint submission is pending confirmation"')
    })

  it('shows activity subtitle when at least one mint item exists', () => {
      const markup = renderToStaticMarkup(
        React.createElement(RecentMints, {
          items: [{ tokenId: 9, timestamp: 1710000000, address: 'SP123', txId: '0xabc' }]
        })
      )

      expect(markup).toContain('Fresh activity from this browser appears here as soon as a wallet submission is sent.')
    })

  it('wraps relative time copy in semantic time elements', () => {
      const markup = renderToStaticMarkup(
        React.createElement(RecentMints, {
          items: [{ tokenId: 9, timestamp: 1710000000, address: 'SP123', txId: '0xabc' }]
        })
      )

      expect(markup).toContain('<time')
    })

  it('renders the Recent Mints heading', () => {
      const markup = renderToStaticMarkup(React.createElement(RecentMints, { items: [] }))
      expect(markup).toContain('Recent Mints')
    })

  it('renders token id label prefix for minted items', () => {
      const markup = renderToStaticMarkup(
        React.createElement(RecentMints, {
          items: [{ tokenId: 9, timestamp: 1710000000, address: 'SP123', txId: '0xabc' }]
        })
      )

      expect(markup).toContain('#9')
    })

  it('adds a descriptive aria label to each mint row', () => {
      const markup = renderToStaticMarkup(
        React.createElement(RecentMints, {
          items: [{ tokenId: 19, timestamp: 1710000000, address: 'SP123', txId: '0xabc' }]
        })
      )

      expect(markup).toContain('aria-label="Mint #19 by SP123"')
    })

  it('labels loading, empty, and populated states', () => {
      const loadingMarkup = renderToStaticMarkup(React.createElement(RecentMints, { items: null }))
      const emptyMarkup = renderToStaticMarkup(React.createElement(RecentMints, { items: [] }))
      const populatedMarkup = renderToStaticMarkup(
        React.createElement(RecentMints, {
          items: [{ tokenId: 1, timestamp: 1710000000, address: 'SP123', txId: '0xabc' }]
        })
      )

      expect(loadingMarkup).toContain('aria-label="Recent mints loading"')
      expect(loadingMarkup).toContain('data-state="loading"')
      expect(emptyMarkup).toContain('aria-label="Recent mints empty state"')
      expect(emptyMarkup).toContain('data-state="empty"')
      expect(populatedMarkup).toContain('aria-label="Recent mints"')
      expect(populatedMarkup).toContain('data-state="ready"')
    })

  it('uses submitted label when tx exists but token id is still pending', () => {
      const markup = renderToStaticMarkup(
        React.createElement(RecentMints, {
          items: [{ tokenId: null, timestamp: 1710000000, address: 'SP123', txId: '0xabc' }]
        })
      )

      expect(markup).toContain('Submitted ↗')
    })

  it('keeps whitespace tx ids in the pending state', () => {
      const markup = renderToStaticMarkup(
        React.createElement(RecentMints, {
          items: [{ tokenId: null, timestamp: 1710000000, address: 'SP123', txId: '   ' }]
        })
      )

      expect(markup).toContain('mint-item__badge--pending')
      expect(markup).not.toContain('View submitted transaction on Explorer')
    })
})

describe('normalizeMintTimestamp', () => {
  it('preserves millisecond timestamps without scaling', () => {
      expect(normalizeMintTimestamp(1710000000123)).toBe(1710000000123)
    })

  it('converts unix-second timestamps into milliseconds', () => {
      expect(normalizeMintTimestamp(1710000000)).toBe(1710000000000)
    })
})

describe('getRecentMintKey', () => {
  it('uses tx id as primary list key when available', () => {
      expect(getRecentMintKey({ txId: '0xabc', tokenId: 7, timestamp: 1710000000 })).toBe('0xabc')
    })

  it('falls back to token-and-time composite when tx id is missing', () => {
      expect(getRecentMintKey({ txId: '', tokenId: 9, timestamp: 1710000000 })).toBe('9-1710000000')
    })
})

describe('getRecentMintTokenDescriptor', () => {
  it('returns minted copy for concrete token ids', () => {
      expect(getRecentMintTokenDescriptor(42)).toEqual({
        tokenLabel: '#42',
        receiptLabel: 'Minted ↗',
        explorerLabel: 'View transaction for token #42 on Explorer',
        isPendingToken: false
      })
    })

  it('uses pending copy for blank token ids', () => {
      expect(getRecentMintTokenDescriptor('   ')).toEqual({
        tokenLabel: 'Pending',
        receiptLabel: 'Submitted ↗',
        explorerLabel: 'View submitted transaction on Explorer',
        isPendingToken: true
      })
    })
})

describe('getRecentMintTxId', () => {
  it('falls back to txHash when txId is blank', () => {
      expect(getRecentMintTxId({ txId: '   ', txHash: '0xhash123' })).toBe('0xhash123')
    })

  it('prefers txId over txHash when both are present', () => {
      expect(getRecentMintTxId({ txId: '0xpreferred', txHash: '0xfallback' })).toBe('0xpreferred')
    })
})

