import { describe, expect, it } from 'vitest'
import {
  useAsyncDefault,
  useClipboardDefault,
  useContractDefault,
  useMediaQueryDefault,
  useStorageDefault,
  useToastDefault,
  useTransactionDefault,
  useWallet,
  useWalletDefault
} from './index'
import useStacksWallet, { useStacksWallet } from './useStacksWallet'
import useStacksContract from './useStacksContract'
import useToast from './useToast'
import useStorage from './useStorage'
import useMediaQuery from './useMediaQuery'
import useTransaction from './useTransaction'
import useClipboard from './useClipboard'
import useAsync from './useAsync'

describe('hooks barrel default exports', () => {
  it('maps hook default exports to their source modules', () => {
      expect(useWalletDefault).toBe(useStacksWallet)
      expect(useContractDefault).toBe(useStacksContract)
      expect(useToastDefault).toBe(useToast)
      expect(useStorageDefault).toBe(useStorage)
      expect(useMediaQueryDefault).toBe(useMediaQuery)
      expect(useTransactionDefault).toBe(useTransaction)
      expect(useClipboardDefault).toBe(useClipboard)
      expect(useAsyncDefault).toBe(useAsync)
    })
})

describe('hooks barrel exports', () => {
  it('re-exports useStacksWallet as useWallet alias', () => {
      expect(useWallet).toBe(useStacksWallet)
    })
})

