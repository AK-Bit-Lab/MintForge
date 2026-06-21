import { describe, expect, it } from 'vitest'
import { MAINNET_LABEL, NETWORK, TESTNET_LABEL, getNetworkLabel } from './index.js'

describe('constants network labels', () => {
  it('returns a known display label from getNetworkLabel', () => {
      expect([MAINNET_LABEL, TESTNET_LABEL]).toContain(getNetworkLabel())
    })

  it('maps current NETWORK value to the corresponding display label', () => {
      const expectedLabel = NETWORK === 'mainnet' ? MAINNET_LABEL : TESTNET_LABEL
      expect(getNetworkLabel()).toBe(expectedLabel)
    })
})
