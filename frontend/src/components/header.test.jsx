import { describe, expect, it, vi } from 'vitest'
import {
  Header,
  getHeaderAccountLength,
  getHeaderConnectButtonA11y,
  getHeaderConnectionState,
  getHeaderWalletStatus,
  normalizeHeaderAccount
} from './Header'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

describe('getHeaderAccountLength', () => {
  it('returns zero for non-string account values', () => {
      expect(getHeaderAccountLength({ value: 'SP123' }, true)).toBe(0)
    })

  it('returns the account string length when account is present', () => {
      expect(getHeaderAccountLength('SP12345', true)).toBe(7)
    })
})

describe('Header', () => {
  it('labels wallet address wrapper as copy action', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Header, {
          account: 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT',
          isConnecting: false,
          onConnect: vi.fn(),
          onDisconnect: vi.fn()
        })
      )

      expect(markup).toContain('aria-label="Copy wallet address to clipboard"')
      expect(markup).toContain('data-copy-state="idle"')
      expect(markup).toContain('data-copy-available="true"')
    })

  it('uses connecting aria label while connect flow is pending', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Header, {
          account: null,
          isConnecting: true,
          onConnect: vi.fn(),
          onDisconnect: vi.fn()
        })
      )

      expect(markup).toContain('aria-label="Connecting wallet"')
    })

  it('uses connect wallet aria label when idle', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Header, {
          account: null,
          isConnecting: false,
          onConnect: vi.fn(),
          onDisconnect: vi.fn()
        })
      )

      expect(markup).toContain('aria-label="Connect wallet"')
    })

  it('shows connect wallet text when idle and disconnected', () => {
      const markup = renderToStaticMarkup(React.createElement(Header, {
        account: null,
        onConnect: () => {},
        onDisconnect: () => {},
        isConnecting: false
      }))

      expect(markup).toContain('Connect wallet')
    })

  it('exposes a disconnect aria label for connected state button', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Header, {
          account: 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT',
          isConnecting: false,
          onConnect: vi.fn(),
          onDisconnect: vi.fn()
        })
      )

      expect(markup).toContain('aria-label="Disconnect wallet"')
    })

  it('shows disconnect text when an account is connected', () => {
      const markup = renderToStaticMarkup(React.createElement(Header, {
        account: 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT',
        onConnect: () => {},
        onDisconnect: () => {},
        isConnecting: false
      }))

      expect(markup).toContain('Disconnect')
    })

  it('emits connected and disconnected metadata states on the root header', () => {
      const connectedMarkup = renderToStaticMarkup(
        React.createElement(Header, {
          account: 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT',
          isConnecting: false,
          onConnect: vi.fn(),
          onDisconnect: vi.fn()
        })
      )
      const disconnectedMarkup = renderToStaticMarkup(
        React.createElement(Header, {
          account: null,
          isConnecting: true,
          onConnect: vi.fn(),
          onDisconnect: vi.fn()
        })
      )

      expect(connectedMarkup).toContain('data-connected="true"')
      expect(connectedMarkup).toContain('data-connecting="false"')
      expect(disconnectedMarkup).toContain('data-connected="false"')
      expect(disconnectedMarkup).toContain('data-connecting="true"')
    })

  it('renders the MintForge brand title', () => {
      const markup = renderToStaticMarkup(React.createElement(Header, {
        account: null,
        onConnect: () => {},
        onDisconnect: () => {},
        isConnecting: false
      }))

      expect(markup).toContain('MintForge')
    })

  it('renders project logo with descriptive alt text', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Header, {
          account: null,
          isConnecting: false,
          onConnect: vi.fn(),
          onDisconnect: vi.fn()
        })
      )

      expect(markup).toContain('alt="MintForge Logo"')
    })

  it('renders the configured network label when connected', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Header, {
          account: 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT',
          isConnecting: false,
          onConnect: vi.fn(),
          onDisconnect: vi.fn()
        })
      )

      expect(markup).toContain('Stacks Mainnet')
    })

  it('shows the connect wallet action when no account is connected', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Header, {
          account: null,
          isConnecting: false,
          onConnect: vi.fn(),
          onDisconnect: vi.fn()
        })
      )

      expect(markup).toContain('Connect wallet')
      expect(markup).not.toContain('Disconnect')
    })

  it('shows connecting copy while wallet connection is pending', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Header, {
          account: null,
          isConnecting: true,
          onConnect: vi.fn(),
          onDisconnect: vi.fn()
        })
      )

      expect(markup).toContain('Connecting...')
      expect(markup).toContain('aria-busy="true"')
    })

  it('shows disconnect controls when an account is connected', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Header, {
          account: 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT',
          isConnecting: false,
          onConnect: vi.fn(),
          onDisconnect: vi.fn()
        })
      )

      expect(markup).toContain('Disconnect')
      expect(markup).toContain('Wallet')
    })

  it('uses a trimmed account value for wallet title text', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Header, {
          account: '  SP3FBR2AGK4B2Y6A4J91G4FJ3P1N5X4K8TB8Z3YQH  ',
          isConnecting: false,
          onConnect: vi.fn(),
          onDisconnect: vi.fn()
        })
      )

      expect(markup).toContain('title="Copy wallet address: SP3FBR2AGK4B2Y6A4J91G4FJ3P1N5X4K8TB8Z3YQH"')
      expect(markup).toContain('data-account-length="41"')
    })

  it('renders a shortened wallet address label for connected accounts', () => {
      const account = 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT'
      const markup = renderToStaticMarkup(
        React.createElement(Header, {
          account,
          isConnecting: false,
          onConnect: vi.fn(),
          onDisconnect: vi.fn()
        })
      )

      expect(markup).toContain('...')
      expect(markup).toContain('title="Copy wallet address: SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT"')
    })

  it('renders wallet connection status text in live region', () => {
      const connectedMarkup = renderToStaticMarkup(
        React.createElement(Header, {
          account: 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7',
          isConnecting: false,
          onConnect: vi.fn(),
          onDisconnect: vi.fn()
        })
      )
      const disconnectedMarkup = renderToStaticMarkup(
        React.createElement(Header, {
          account: null,
          isConnecting: false,
          onConnect: vi.fn(),
          onDisconnect: vi.fn()
        })
      )

      expect(connectedMarkup).toContain('Wallet ready')
      expect(disconnectedMarkup).toContain('Wallet disconnected')
    })

  it('keeps the connect action visible when account only contains spaces', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Header, {
          account: '   ',
          isConnecting: false,
          onConnect: vi.fn(),
          onDisconnect: vi.fn()
        })
      )

      expect(markup).toContain('Connect wallet')
      expect(markup).not.toContain('Disconnect')
    })
})

describe('getHeaderConnectButtonA11y', () => {
  it('returns connecting label and title while wallet auth is pending', () => {
      expect(getHeaderConnectButtonA11y(true)).toEqual({
        label: 'Connecting wallet',
        title: 'Connecting wallet'
      })
    })

  it('returns idle connect labels when wallet is not connecting', () => {
      expect(getHeaderConnectButtonA11y(false)).toEqual({
        label: 'Connect wallet',
        title: 'Connect wallet'
      })
    })
})

describe('getHeaderConnectionState', () => {
  it('returns connected when account exists even if connecting flag is true', () => {
      expect(getHeaderConnectionState({ hasAccount: true, isConnecting: true })).toBe('connected')
    })

  it('returns connecting when wallet is not yet connected but connect flow is active', () => {
      expect(getHeaderConnectionState({ hasAccount: false, isConnecting: true })).toBe('connecting')
    })
})

describe('normalizeHeaderAccount', () => {
  it('returns non-string account values unchanged', () => {
      expect(normalizeHeaderAccount(null)).toBeNull()
    })

  it('trims surrounding spaces from wallet account values', () => {
      expect(normalizeHeaderAccount('  SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7  ')).toBe('SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7')
    })
})

describe('getHeaderWalletStatus', () => {
  it('returns connected status copy when account is present', () => {
      expect(getHeaderWalletStatus(true)).toEqual({
        text: 'Wallet ready',
        title: 'Wallet is connected and ready'
      })
    })

  it('returns disconnected status copy when no account is connected', () => {
      expect(getHeaderWalletStatus(false)).toEqual({
        text: 'Wallet disconnected',
        title: 'Wallet is disconnected'
      })
    })
})

