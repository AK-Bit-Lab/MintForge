import React from 'react'
import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { Stats } from './Stats'

describe('Stats', () => {
  it('shows zero recent receipts when a negative count slips through', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Stats, {
          isLoading: false,
          isConnected: true,
          recentActivityCount: -2,
          contractInfo: { totalSupply: 1, maxSupply: 10, mintFee: 1000, maxPerWallet: 2, isPaused: false }
        })
      )

      expect(markup).toContain('0 local receipts')
    })

  it('emits connection metadata for connected and disconnected states', () => {
      const connectedMarkup = renderToStaticMarkup(
        React.createElement(Stats, {
          isLoading: false,
          isConnected: true,
          recentActivityCount: 5,
          contractInfo: { totalSupply: 1, maxSupply: 10, mintFee: 1000, maxPerWallet: 2, isPaused: false }
        })
      )
      const disconnectedMarkup = renderToStaticMarkup(
        React.createElement(Stats, {
          isLoading: false,
          isConnected: false,
          contractInfo: { totalSupply: 1, maxSupply: 10, mintFee: 1000, maxPerWallet: 2, isPaused: false }
        })
      )

      expect(connectedMarkup).toContain('data-connection="connected"')
      expect(connectedMarkup).toContain('data-recent-activity-count="5"')
      expect(disconnectedMarkup).toContain('data-connection="disconnected"')
    })

  it('emits collection state tone metadata on the stats section', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Stats, {
          isLoading: false,
          isConnected: true,
          contractInfo: { totalSupply: 10, maxSupply: 10, mintFee: 1000, maxPerWallet: 2, isPaused: false }
        })
      )

      expect(markup).toContain('data-state-tone="critical"')
    })

  it('renders four skeleton cards during loading states', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Stats, { contractInfo: null, isLoading: true })
      )

      expect(markup.match(/stat-card--skeleton/g)?.length).toBe(4)
      expect(markup).toContain('data-loading="true"')
    })

  it('parses numeric string receipt counts before rendering the session summary', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Stats, {
          isLoading: false,
          isConnected: true,
          recentActivityCount: '2',
          contractInfo: { totalSupply: 1, maxSupply: 10, mintFee: 1000, maxPerWallet: 2, isPaused: false }
        })
      )

      expect(markup).toContain('2 local receipts')
    })

  it('shows remaining item count in progress summary for finite supply', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Stats, {
          isLoading: false,
          isConnected: true,
          contractInfo: { totalSupply: 3, maxSupply: 10, mintFee: 1000, maxPerWallet: 2, isPaused: false }
        })
      )

      expect(markup).toContain('7 items remaining')
      expect(markup).toContain('data-progress="30"')
    })

  it('renders the collection stats section title', () => {
      const markup = renderToStaticMarkup(React.createElement(Stats, {
        contractInfo: { totalSupply: 0, maxSupply: 100, mintFee: 1000 },
        isLoading: false,
        isConnected: false,
        recentActivityCount: 0
      }))

      expect(markup).toContain('Collection Stats')
    })

  it('renders the explanatory subtitle copy', () => {
      const markup = renderToStaticMarkup(React.createElement(Stats, {
        contractInfo: { totalSupply: 2, maxSupply: 10, mintFee: 1000 },
        isLoading: false,
        isConnected: true,
        recentActivityCount: 1
      }))

      expect(markup).toContain('Supply, pricing, and wallet limits stay visible while you prepare each mint.')
    })

  it('keeps a descriptive title attribute on the stats section container', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Stats, {
          isLoading: false,
          isConnected: true,
          contractInfo: { totalSupply: 2, maxSupply: 10, mintFee: 1000, maxPerWallet: 2, isPaused: false }
        })
      )

      expect(markup).toContain('title="Collection statistics and mint readiness"')
    })

  it('uses plural receipt label for multiple recent activity items', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Stats, {
          isLoading: false,
          isConnected: true,
          recentActivityCount: 2,
          contractInfo: { totalSupply: 1, maxSupply: 10, mintFee: 1000, maxPerWallet: 2, isPaused: false }
        })
      )

      expect(markup).toContain('2 local receipts')
    })

  it('uses singular receipt label for one recent activity item', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Stats, {
          isLoading: false,
          isConnected: true,
          recentActivityCount: 1,
          contractInfo: { totalSupply: 1, maxSupply: 10, mintFee: 1000, maxPerWallet: 2, isPaused: false }
        })
      )

      expect(markup).toContain('1 local receipt')
    })

  it('shows connected guidance copy when wallet is connected', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Stats, {
          isLoading: false,
          contractInfo: { totalSupply: 1, maxSupply: 10, mintFee: 1000, maxPerWallet: 2, isPaused: false },
          isConnected: true
        })
      )

      expect(markup).toContain('Wallet-specific caps and pause state appear when available from the connected contract context.')
    })

  it('shows connect guidance copy when wallet is not connected', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Stats, {
          isLoading: false,
          contractInfo: { totalSupply: 1, maxSupply: 10, mintFee: 1000, maxPerWallet: 2, isPaused: false },
          isConnected: false
        })
      )

      expect(markup).toContain('Connect a wallet to load address-specific mint caps and account context.')
    })

  it('shows open remaining label when max supply is undefined', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Stats, {
          isLoading: false,
          isConnected: true,
          contractInfo: { totalSupply: 1, mintFee: 1000, maxPerWallet: 2, isPaused: false }
        })
      )

      expect(markup).toContain('Open')
    })

  it('marks the collection status as paused when contract pause flag is set', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Stats, {
          isLoading: false,
          contractInfo: { totalSupply: 1, maxSupply: 10, mintFee: 1000, maxPerWallet: 2, isPaused: true },
          isConnected: true
        })
      )

      expect(markup).toContain('Paused')
      expect(markup).toContain('stats__state--warning')
    }, 15_000)

  it('shows ready state when collection is active and not sold out', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Stats, {
          isLoading: false,
          isConnected: true,
          contractInfo: { totalSupply: 1, maxSupply: 10, mintFee: 1000, maxPerWallet: 2, isPaused: false }
        })
      )

      expect(markup).toContain('Ready')
    })

  it('marks the collection as sold out when remaining supply reaches zero', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Stats, {
          isLoading: false,
          contractInfo: { totalSupply: 10, maxSupply: 10, mintFee: 1000, maxPerWallet: 2, isPaused: false },
          isConnected: true
        })
      )

      expect(markup).toContain('Sold out')
      expect(markup).toContain('stats__state--critical')
    })

  it('adds a descriptive title to the collection state badge', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Stats, {
          isLoading: false,
          isConnected: true,
          contractInfo: { totalSupply: 1, maxSupply: 10, mintFee: 1000, maxPerWallet: 2, isPaused: false }
        })
      )

      expect(markup).toContain('title="Collection status: Ready"')
    })

  it('uses fallback wallet cap text when maxPerWallet is not provided', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Stats, {
          isLoading: false,
          contractInfo: { totalSupply: 1, maxSupply: 10, mintFee: 1000, isPaused: false },
          isConnected: true
        })
      )

      expect(markup).toContain('Not set')
    })
})
