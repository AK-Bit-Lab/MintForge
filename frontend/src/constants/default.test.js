import { describe, expect, it } from 'vitest'
import constants, { CONTRACT_NAME, NETWORK, TOAST_DURATION, getNetworkLabel } from './index.js'

describe('constants default export', () => {
  it('keeps CONTRACT_NAME aligned on default export object', () => {
      expect(constants.CONTRACT_NAME).toBe(CONTRACT_NAME)
    })

  it('keeps getNetworkLabel function aligned on default export object', () => {
      expect(constants.getNetworkLabel).toBe(getNetworkLabel)
    })

  it('keeps NETWORK value aligned on default export object', () => {
      expect(constants.NETWORK).toBe(NETWORK)
    })

  it('keeps TOAST_DURATION aligned on default export object', () => {
      expect(constants.TOAST_DURATION).toBe(TOAST_DURATION)
    })
})
