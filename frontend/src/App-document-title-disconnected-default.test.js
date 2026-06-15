import { describe, expect, it } from 'vitest'
import { getAppDocumentTitle } from './App'

describe('getAppDocumentTitle', () => {
  it('returns the base title when wallet is disconnected', () => {
    expect(getAppDocumentTitle(false)).toBe('MintForge - NFT Minting on Stacks')
  })
})
