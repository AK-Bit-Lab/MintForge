import { describe, expect, it, vi } from 'vitest'
import App, {
  appendRecentMintResult,
  getAppConnectionState,
  getAppDocumentTitle,
  getBackToTopControlState,
  getToastStackMetadata
} from './App'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

describe('appendRecentMintResult', () => {
  it('returns a new array without mutating previous entries', () => {
      const previousItems = [{ txId: '0x1' }, { txId: '0x2' }]
      const snapshot = [...previousItems]

      const nextItems = appendRecentMintResult(previousItems, { txId: '0x3' })

      expect(nextItems).not.toBe(previousItems)
      expect(previousItems).toEqual(snapshot)
      expect(nextItems[0]).toEqual({ txId: '0x3' })
    })

  it('prepends the newest mint and keeps only the configured recent limit', () => {
      const previousItems = [
        { txId: '0x1' },
        { txId: '0x2' },
        { txId: '0x3' },
        { txId: '0x4' },
        { txId: '0x5' },
        { txId: '0x6' }
      ]

      const nextItems = appendRecentMintResult(previousItems, { txId: '0x7' })

      expect(nextItems).toHaveLength(6)
      expect(nextItems[0]).toEqual({ txId: '0x7' })
      expect(nextItems.at(-1)).toEqual({ txId: '0x5' })
    })
})

describe('getBackToTopControlState', () => {
  it('marks control as hidden and unfocusable before scroll threshold', () => {
      expect(getBackToTopControlState(false)).toEqual({
        isVisible: false,
        dataVisible: 'false',
        ariaHidden: true,
        tabIndex: -1
      })
    })

  it('marks control as visible and focusable after scroll threshold', () => {
      expect(getBackToTopControlState(true)).toEqual({
        isVisible: true,
        dataVisible: 'true',
        ariaHidden: false,
        tabIndex: 0
      })
    })
})

describe('getAppConnectionState', () => {
  it('returns connected when account is connected even if connect flag is true', () => {
      expect(getAppConnectionState({ isConnected: true, isConnecting: true })).toBe('connected')
    })

  it('returns connecting when wallet handshake is in progress', () => {
      expect(getAppConnectionState({ isConnected: false, isConnecting: true })).toBe('connecting')
    })
})

describe('getAppDocumentTitle', () => {
  it('returns connected title prefix when wallet is connected', () => {
      expect(getAppDocumentTitle(true)).toContain('Connected - MintForge')
    })

  it('returns the base title when wallet is disconnected', () => {
      expect(getAppDocumentTitle(false)).toBe('MintForge - NFT Minting on Stacks')
    })
})

describe('App shell metadata', () => {
  it('exposes connected and contract-ready metadata when wallet and contract are available', () => {
      mockWallet.address = 'SP123'
      mockWallet.isConnected = true
      mockWallet.isConnecting = false
      mockContract.contractInfo = { maxSupply: 100 }
      mockToast.toasts = []

      const markup = renderToStaticMarkup(React.createElement(App))

      expect(markup).toContain('data-connection-state="connected"')
      expect(markup).toContain('data-has-contract-info="true"')
    })

  it('marks the back-to-top control as hidden before scroll interactions', () => {
      mockWallet.address = null
      mockWallet.isConnected = false
      mockWallet.isConnecting = false
      mockContract.contractInfo = null
      mockToast.toasts = []

      const markup = renderToStaticMarkup(React.createElement(App))

      expect(markup).toContain('data-visible="false"')
      expect(markup).toContain('title="Back to top"')
    })

  it('exposes toast stack count metadata for active notifications', () => {
      mockWallet.address = null
      mockWallet.isConnected = false
      mockWallet.isConnecting = false
      mockContract.contractInfo = null
      mockToast.toasts = [
        { id: '1', message: 'Mint sent', type: 'success' },
        { id: '2', message: 'Mint pending', type: 'info' }
      ]

      const markup = renderToStaticMarkup(React.createElement(App))

      expect(markup).toContain('data-toast-count="2"')
      expect(markup).toContain('Mint sent')
      expect(markup).toContain('Mint pending')
    })
})

describe('getToastStackMetadata', () => {
  it('returns the exact count when a toast array is provided', () => {
      expect(getToastStackMetadata([{ id: 1 }, { id: 2 }, { id: 3 }])).toEqual({
        count: 3,
        countLabel: '3'
      })
    })

  it('returns zero-count metadata when toast list is not provided', () => {
      expect(getToastStackMetadata(null)).toEqual({
        count: 0,
        countLabel: '0'
      })
    })
})

