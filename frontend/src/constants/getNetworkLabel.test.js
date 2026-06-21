import { describe, expect, it } from 'vitest'
import { MAINNET_LABEL, TESTNET_LABEL, getNetworkLabel } from './index.js'

describe('getNetworkLabel', () => {
  it('returns one of the supported network labels', () => {
      expect([MAINNET_LABEL, TESTNET_LABEL]).toContain(getNetworkLabel())
    })
})
