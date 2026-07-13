import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import {
  MintCard,
  getMintConnectButtonA11y,
  getMintStateDescriptor,
  getMintSubmitLabel,
  normalizeMintLimitValue,
  normalizeMintMetricValue
} from './MintCard'

describe('MintCard', () => {
  it('marks connect action as busy while wallet connection is in progress', () => {
      const markup = renderToStaticMarkup(
        React.createElement(MintCard, {
          contractInfo: { mintFee: 1000, totalSupply: 0, maxSupply: 10, walletMinted: 0, maxPerWallet: 2, isPaused: false },
          onMint: vi.fn(),
          isConnected: false,
          isConnecting: true,
          onConnect: vi.fn()
        })
      )

      expect(markup).toContain('Connecting...')
      expect(markup).toContain('aria-busy="true"')
    })

  it('renders metadata submission form when wallet is connected', () => {
      const markup = renderToStaticMarkup(
        React.createElement(MintCard, {
          contractInfo: { mintFee: 1000, totalSupply: 0, maxSupply: 10, walletMinted: 0, maxPerWallet: 2, isPaused: false },
          onMint: vi.fn(),
          isConnected: true,
          onConnect: vi.fn()
        })
      )

      expect(markup).toContain('for="metadata-name"')
      expect(markup).toContain('Mint for 0.001 STX')
      expect(markup).toContain('data-connect-state="connected"')
      expect(markup).toContain('data-token-uri-valid="false"')
    })

  it('shows wallet connect prompt when user is disconnected', () => {
      const markup = renderToStaticMarkup(
        React.createElement(MintCard, {
          contractInfo: { mintFee: 1000, totalSupply: 0, maxSupply: 10, walletMinted: 0, maxPerWallet: 2, isPaused: false },
          onMint: vi.fn(),
          isConnected: false,
          isConnecting: false,
          onConnect: vi.fn()
        })
      )

      expect(markup).toContain('Connect your Stacks wallet to start minting here.')
      expect(markup).toContain('Connect wallet')
      expect(markup).toContain('title="Connect wallet to enable minting"')
      expect(markup).toContain('data-connected="false"')
      expect(markup).toContain('data-connect-state="disconnected"')
    })

  it('shows token URI guidance when no metadata value has been entered', () => {
      const markup = renderToStaticMarkup(
        React.createElement(MintCard, {
          contractInfo: { mintFee: 1000, totalSupply: 0, maxSupply: 10, walletMinted: 0, maxPerWallet: 2, isPaused: false },
          onMint: vi.fn(),
          isConnected: true,
          onConnect: vi.fn()
        })
      )

      expect(markup).toContain('Use an ipfs:// or https:// metadata URL')
    })

  it('surfaces paused helper copy in mint action message', () => {
      const markup = renderToStaticMarkup(
        React.createElement(MintCard, {
          contractInfo: { mintFee: 1000, totalSupply: 0, maxSupply: 10, walletMinted: 0, maxPerWallet: 2, isPaused: true },
          onMint: vi.fn(),
          isConnected: true,
          onConnect: vi.fn()
        })
      )

      expect(markup).toContain('Minting is paused by the collection owner.')
    })

  it('surfaces sold-out helper copy in mint action message', () => {
      const markup = renderToStaticMarkup(
        React.createElement(MintCard, {
          contractInfo: { mintFee: 1000, totalSupply: 10, maxSupply: 10, walletMinted: 0, maxPerWallet: 2, isPaused: false },
          onMint: vi.fn(),
          isConnected: true,
          onConnect: vi.fn()
        })
      )

      expect(markup).toContain('The collection has sold out.')
    })

  it('surfaces wallet limit helper copy when mint cap is reached', () => {
      const markup = renderToStaticMarkup(
        React.createElement(MintCard, {
          contractInfo: { mintFee: 1000, totalSupply: 5, maxSupply: 10, walletMinted: 2, maxPerWallet: 2, isPaused: false },
          onMint: vi.fn(),
          isConnected: true,
          onConnect: vi.fn()
        })
      )

      expect(markup).toContain('This wallet has reached the configured mint limit.')
      expect(markup).toContain('Wallet Limit Reached')
    })

  it('does not render an alert for whitespace-only contract errors', () => {
      const markup = renderToStaticMarkup(
        React.createElement(MintCard, {
          contractInfo: { mintFee: 1000, totalSupply: 1, maxSupply: 10, walletMinted: 0, maxPerWallet: 2, isPaused: false },
          onMint: vi.fn(),
          isConnected: true,
          onConnect: vi.fn(),
          contractError: '   '
        })
      )

      expect(markup).not.toContain('role="alert"')
    })

  it('disables the mint submit button when the wallet cap has been reached', () => {
      const markup = renderToStaticMarkup(
        React.createElement(MintCard, {
          contractInfo: { mintFee: 1000, totalSupply: 5, maxSupply: 10, walletMinted: 2, maxPerWallet: 2, isPaused: false },
          onMint: vi.fn(),
          isConnected: true,
          onConnect: vi.fn()
        })
      )

      expect(markup).toMatch(/mint-card__btn--primary"[^>]*disabled=""/)
      expect(markup).toContain('Wallet Limit Reached')
    })

  it('documents the metadata URL length constraint in the mint action guidance', () => {
      const markup = renderToStaticMarkup(
        React.createElement(MintCard, {
          contractInfo: { mintFee: 1000, totalSupply: 0, maxSupply: 10, walletMinted: 0, maxPerWallet: 2, isPaused: false },
          onMint: vi.fn(),
          isConnected: true,
          onConnect: vi.fn()
        })
      )

      expect(markup).toContain('up to 256 characters')
    })

  it('formats mint fee values in STX units within summary stats', () => {
      const markup = renderToStaticMarkup(
        React.createElement(MintCard, {
          contractInfo: { mintFee: 2500000, totalSupply: 0, maxSupply: 10, walletMinted: 0, maxPerWallet: 2, isPaused: false },
          onMint: vi.fn(),
          isConnected: true,
          onConnect: vi.fn()
        })
      )

      expect(markup).toContain('2.5 STX')
    })

  it('renders minted and max supply summary values', () => {
      const markup = renderToStaticMarkup(
        React.createElement(MintCard, {
          contractInfo: { mintFee: 1000, totalSupply: 3, maxSupply: 10, walletMinted: 0, maxPerWallet: 2, isPaused: false },
          onMint: vi.fn(),
          isConnected: true,
          onConnect: vi.fn()
        })
      )

      expect(markup).toContain('3 / 10')
    })

  it('renders the metadata form name field for connected users', () => {
      const markup = renderToStaticMarkup(React.createElement(MintCard, {
        contractInfo: { mintFee: 1000, totalSupply: 0, maxSupply: 10 },
        onMint: async () => null,
        isConnected: true,
        isConnecting: false,
        onConnect: () => {},
        contractError: null
      }))

      expect(markup).toContain('for="metadata-name"')
    })

  it('renders wallet mint count and configured wallet cap values', () => {
      const markup = renderToStaticMarkup(
        React.createElement(MintCard, {
          contractInfo: { mintFee: 1000, totalSupply: 3, maxSupply: 10, walletMinted: 1, maxPerWallet: 5, isPaused: false },
          onMint: vi.fn(),
          isConnected: true,
          onConnect: vi.fn()
        })
      )

      expect(markup).toContain('1 / 5')
    })

  it('renders contract error text when an upstream error is provided', () => {
      const markup = renderToStaticMarkup(
        React.createElement(MintCard, {
          contractInfo: { mintFee: 1000, totalSupply: 0, maxSupply: 10, walletMinted: 0, maxPerWallet: 2, isPaused: false },
          onMint: vi.fn(),
          isConnected: true,
          onConnect: vi.fn(),
          contractError: 'Network response failed'
        })
      )

      expect(markup).toContain('Network response failed')
    })

  it('shows infinity symbol when max supply is not configured', () => {
      const markup = renderToStaticMarkup(
        React.createElement(MintCard, {
          contractInfo: { mintFee: 1000, totalSupply: 4, walletMinted: 0, maxPerWallet: 2, isPaused: false },
          onMint: vi.fn(),
          isConnected: true,
          onConnect: vi.fn()
        })
      )

      expect(markup).toContain('4 / ∞')
    })

  it('shows infinity symbol when wallet cap is not configured', () => {
      const markup = renderToStaticMarkup(
        React.createElement(MintCard, {
          contractInfo: { mintFee: 1000, totalSupply: 4, maxSupply: 10, walletMinted: 1, isPaused: false },
          onMint: vi.fn(),
          isConnected: true,
          onConnect: vi.fn()
        })
      )

      expect(markup).toContain('1 / ∞')
    })

  it('shows paused alert when contract pause flag is true', () => {
      const markup = renderToStaticMarkup(
        React.createElement(MintCard, {
          contractInfo: { mintFee: 1000, totalSupply: 0, maxSupply: 10, walletMinted: 0, maxPerWallet: 2, isPaused: true },
          onMint: vi.fn(),
          isConnected: true,
          onConnect: vi.fn()
        })
      )

      expect(markup).toContain('Minting is currently paused')
    })

  it('shows sold-out alert when minted supply reaches max supply', () => {
      const markup = renderToStaticMarkup(
        React.createElement(MintCard, {
          contractInfo: { mintFee: 1000, totalSupply: 10, maxSupply: 10, walletMinted: 0, maxPerWallet: 2, isPaused: false },
          onMint: vi.fn(),
          isConnected: true,
          onConnect: vi.fn()
        })
      )

      expect(markup).toContain('Sold out! All NFTs have been minted')
    })

  it('disables submit action when minting is paused', () => {
      const markup = renderToStaticMarkup(
        React.createElement(MintCard, {
          contractInfo: { mintFee: 1000, totalSupply: 0, maxSupply: 10, walletMinted: 0, maxPerWallet: 2, isPaused: true },
          onMint: vi.fn(),
          isConnected: true,
          onConnect: vi.fn()
        })
      )

      expect(markup).toContain('disabled=""')
    })

  it('disables submit action when collection is sold out', () => {
      const markup = renderToStaticMarkup(
        React.createElement(MintCard, {
          contractInfo: { mintFee: 1000, totalSupply: 10, maxSupply: 10, walletMinted: 0, maxPerWallet: 2, isPaused: false },
          onMint: vi.fn(),
          isConnected: true,
          onConnect: vi.fn()
        })
      )

      expect(markup).toContain('Sold Out')
      expect(markup).toContain('disabled=""')
      expect(markup).toContain('data-mint-state="sold-out"')
      expect(markup).toContain('title="Mint state: sold-out"')
    })

  it('disables submit action when wallet has reached mint cap', () => {
      const markup = renderToStaticMarkup(
        React.createElement(MintCard, {
          contractInfo: { mintFee: 1000, totalSupply: 5, maxSupply: 10, walletMinted: 2, maxPerWallet: 2, isPaused: false },
          onMint: vi.fn(),
          isConnected: true,
          onConnect: vi.fn()
        })
      )

      expect(markup).toContain('Wallet Limit Reached')
      expect(markup).toContain('disabled=""')
    })

  it('includes formatted mint fee in the submit button copy', () => {
      const markup = renderToStaticMarkup(
        React.createElement(MintCard, {
          contractInfo: { mintFee: 2000000, totalSupply: 0, maxSupply: 10, walletMinted: 0, maxPerWallet: 2, isPaused: false },
          onMint: vi.fn(),
          isConnected: true,
          onConnect: vi.fn()
        })
      )

      expect(markup).toContain('Mint for 2 STX')
    })

  it('sets submit button title from the current mint action helper copy', () => {
      const markup = renderToStaticMarkup(
        React.createElement(MintCard, {
          contractInfo: { mintFee: 1000, totalSupply: 10, maxSupply: 10, walletMinted: 0, maxPerWallet: 2, isPaused: false },
          onMint: vi.fn(),
          isConnected: true,
          onConnect: vi.fn()
        })
      )

      expect(markup).toContain('title="The collection has sold out."')
      expect(markup).toContain('data-helper-state="sold-out"')
    })
})

describe('getMintConnectButtonA11y', () => {
  it('returns connecting descriptor copy while wallet auth is pending', () => {
      expect(getMintConnectButtonA11y(true)).toEqual({
        label: 'Connecting wallet',
        title: 'Waiting for wallet connection'
      })
    })

  it('returns idle connect copy when wallet connection is not pending', () => {
      expect(getMintConnectButtonA11y(false)).toEqual({
        label: 'Connect wallet to mint',
        title: 'Connect wallet to enable minting'
      })
    })
})

describe('normalizeMintLimitValue', () => {
  it('returns null for non-numeric limit values', () => {
      expect(normalizeMintLimitValue('not-a-number')).toBeNull()
    })

  it('parses numeric string limits to number values', () => {
      expect(normalizeMintLimitValue('25')).toBe(25)
    })
})

describe('normalizeMintMetricValue', () => {
  it('returns fallback when metric value is not numeric', () => {
      expect(normalizeMintMetricValue('abc', 12)).toBe(12)
    })

  it('parses numeric string values for stat rendering', () => {
      expect(normalizeMintMetricValue('7')).toBe(7)
    })
})

describe('getMintStateDescriptor', () => {
  it('returns invalid-uri state when token URI fails validation', () => {
      expect(getMintStateDescriptor({
        isPaused: false,
        isSoldOut: false,
        walletLimitReached: false,
        isTokenUriValid: false,
        invalidUriHelper: 'Use an ipfs:// or https:// URI'
      })).toEqual({
        state: 'invalid-uri',
        message: 'Use an ipfs:// or https:// URI'
      })
    })

  it('prioritizes paused state over other mint blockers', () => {
      expect(getMintStateDescriptor({
        isPaused: true,
        isSoldOut: true,
        walletLimitReached: true,
        isTokenUriValid: false,
        invalidUriHelper: 'Invalid URI'
      })).toEqual({
        state: 'paused',
        message: 'Minting is paused by the collection owner.'
      })
    })

  it('returns ready state when no blockers are active', () => {
      expect(getMintStateDescriptor({
        isPaused: false,
        isSoldOut: false,
        walletLimitReached: false,
        isTokenUriValid: true,
        invalidUriHelper: 'unused'
      })).toEqual({
        state: 'ready',
        message: 'Ready to mint.'
      })
    })

  it('returns wallet-limit state and message when wallet cap is reached', () => {
      expect(getMintStateDescriptor({
        isPaused: false,
        isSoldOut: false,
        walletLimitReached: true,
        isTokenUriValid: true,
        invalidUriHelper: 'Use an ipfs:// URI'
      })).toEqual({
        state: 'wallet-limit',
        message: 'This wallet has reached the configured mint limit.'
      })
    })
})

describe('getMintSubmitLabel', () => {
  it('returns minting copy while transaction submission is active', () => {
      expect(getMintSubmitLabel({
        isMinting: true,
        isSoldOut: false,
        walletLimitReached: false,
        mintFee: 1000
      })).toBe('Minting...')
    })

  it('returns sold-out copy when supply is exhausted', () => {
      expect(getMintSubmitLabel({
        isMinting: false,
        isSoldOut: true,
        walletLimitReached: false,
        mintFee: 1000
      })).toBe('Sold Out')
    })

  it('prioritizes sold-out copy when sold-out and wallet-limit are both true', () => {
      expect(getMintSubmitLabel({
        isMinting: false,
        isSoldOut: true,
        walletLimitReached: true,
        mintFee: 1000
      })).toBe('Sold Out')
    })

  it('returns wallet-limit button copy when wallet mint cap is reached', () => {
      expect(getMintSubmitLabel({
        isMinting: false,
        isSoldOut: false,
        walletLimitReached: true,
        mintFee: 1000
      })).toBe('Wallet Limit Reached')
    })
})

