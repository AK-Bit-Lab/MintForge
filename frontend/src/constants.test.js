import { describe, expect, it } from 'vitest'
import constants, {
  CLIPBOARD_TIMEOUT_MS,
  MAX_RETRIES,
  MIN_MINT_FEE,
  SCROLL_DEBOUNCE_MS,
  TRANSACTION_TIMEOUT_MS
} from './constants/index.js'

describe('constants default export CLIPBOARD_TIMEOUT_MS alias', () => {
  it('maps CLIPBOARD_TIMEOUT_MS on the default export object', () => {
      expect(constants.CLIPBOARD_TIMEOUT_MS).toBe(CLIPBOARD_TIMEOUT_MS);
    })
})

describe('constants default export MAX_RETRIES alias', () => {
  it('maps MAX_RETRIES on the default export object', () => {
      expect(constants.MAX_RETRIES).toBe(MAX_RETRIES);
    })
})

describe('constants default export MIN_MINT_FEE alias', () => {
  it('maps MIN_MINT_FEE on the default export object', () => {
      expect(constants.MIN_MINT_FEE).toBe(MIN_MINT_FEE);
    })
})

describe('constants default export SCROLL_DEBOUNCE_MS alias', () => {
  it('maps SCROLL_DEBOUNCE_MS on the default export object', () => {
      expect(constants.SCROLL_DEBOUNCE_MS).toBe(SCROLL_DEBOUNCE_MS);
    })
})

describe('constants default export TRANSACTION_TIMEOUT_MS alias', () => {
  it('maps TRANSACTION_TIMEOUT_MS on the default export object', () => {
      expect(constants.TRANSACTION_TIMEOUT_MS).toBe(TRANSACTION_TIMEOUT_MS);
    })
})

