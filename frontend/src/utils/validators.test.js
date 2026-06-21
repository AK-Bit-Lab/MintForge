import { describe, expect, it } from 'vitest'
import {
  isPositiveFinite,
  isValidBatchTotal,
  isValidBidAmount,
  isValidBlockHeight,
  isValidCID,
  isValidCollectionName,
  isValidExplorerUrl,
  isValidListingPrice,
  isValidMaxPerWallet,
  isValidMetadataVersion,
  isValidMintBatch,
  isValidMintCount,
  isValidMintPrice,
  isValidMintPriceMicrostx,
  isValidOwnerAddress,
  isValidProvenanceHash,
  isValidRarityTier,
  isValidRevealDelay,
  isValidRoyaltyBps,
  isValidSupplyLimit,
  isValidTokenId,
  isValidTokenIdInSupply,
  isValidTokenSymbol,
  isValidTokenURI,
  isValidTraitCount,
  isValidTraitName,
  isValidTxId,
  isValidWalletLimit
} from './validators'

describe('validators hardening', () => {
  it('accepts trimmed CID values', () => {
      expect(isValidCID('  bafybeihdwdcefgh4dqkjv67uzcmw7ojee6xedzdetojuzjevtenxquvyku  ')).toBe(true)
    })

  it('requires valid Stacks owner addresses', () => {
      expect(isValidOwnerAddress(' SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT ')).toBe(true)
      expect(isValidOwnerAddress('not-a-wallet')).toBe(false)
    })

  it('requires hex-only provenance hashes', () => {
      expect(isValidProvenanceHash('f'.repeat(64))).toBe(true)
      expect(isValidProvenanceHash('g'.repeat(64))).toBe(false)
    })
})

describe('validator regression coverage', () => {
  it('accepts trimmed numeric token id strings', () => {
      expect(isValidTokenId(' 42 ')).toBe(true)
    })

  it('rejects negative token ids', () => {
      expect(isValidTokenId(-1)).toBe(false)
    })

  it('rejects decimal token ids', () => {
      expect(isValidTokenId('3.14')).toBe(false)
    })

  it('accepts numeric string mint counts', () => {
      expect(isValidMintCount('2')).toBe(true)
    })

  it('rejects zero mint counts', () => {
      expect(isValidMintCount(0)).toBe(false)
    })

  it('rejects decimal mint counts', () => {
      expect(isValidMintCount('2.5')).toBe(false)
    })

  it('accepts trimmed cid values', () => {
      expect(isValidCID('  QmYwAPJzv5CZsnAzt8auVTLnS4H7rZ5xR2QYtS85dFvJ7s  ')).toBe(true)
    })

  it('rejects short cid values', () => {
      expect(isValidCID('short')).toBe(false)
    })

  it('rejects non-string cid inputs', () => {
      expect(isValidCID(1234567890)).toBe(false)
    })

  it('accepts min and max royalty basis points', () => {
      expect(isValidRoyaltyBps(0)).toBe(true)
      expect(isValidRoyaltyBps(10000)).toBe(true)
    })

  it('rejects royalty values above maximum', () => {
      expect(isValidRoyaltyBps(10001)).toBe(false)
    })

  it('rejects non-numeric royalty values', () => {
      expect(isValidRoyaltyBps('not-a-number')).toBe(false)
    })

  it('accepts numeric string metadata versions', () => {
      expect(isValidMetadataVersion('1')).toBe(true)
    })

  it('rejects zero metadata version values', () => {
      expect(isValidMetadataVersion(0)).toBe(false)
    })

  it('rejects decimal metadata versions', () => {
      expect(isValidMetadataVersion('1.5')).toBe(false)
    })

  it('accepts zero block height', () => {
      expect(isValidBlockHeight(0)).toBe(true)
    })

  it('rejects negative block heights', () => {
      expect(isValidBlockHeight(-10)).toBe(false)
    })

  it('rejects decimal block heights', () => {
      expect(isValidBlockHeight('12.2')).toBe(false)
    })

  it('accepts collection names with surrounding spaces', () => {
      expect(isValidCollectionName('  Mini Mint  ')).toBe(true)
    })

  it('rejects whitespace-only collection names', () => {
      expect(isValidCollectionName('   ')).toBe(false)
    })

  it('rejects non-string collection names', () => {
      expect(isValidCollectionName(null)).toBe(false)
    })

  it('accepts uppercase hexadecimal tx ids', () => {
      expect(isValidTxId(`0x${'A'.repeat(64)}`)).toBe(true)
    })

  it('rejects tx ids without the 0x prefix', () => {
      expect(isValidTxId('f'.repeat(64))).toBe(false)
    })

  it('rejects tx ids shorter than 64 hex chars', () => {
      expect(isValidTxId(`0x${'f'.repeat(63)}`)).toBe(false)
    })

  it('accepts trimmed trait names', () => {
      expect(isValidTraitName('  Background  ')).toBe(true)
    })

  it('rejects whitespace-only trait names', () => {
      expect(isValidTraitName('\n\t')).toBe(false)
    })

  it('rejects non-string trait names', () => {
      expect(isValidTraitName(undefined)).toBe(false)
    })

  it('accepts decimal string listing prices', () => {
      expect(isValidListingPrice('0.5')).toBe(true)
    })

  it('rejects zero listing prices', () => {
      expect(isValidListingPrice(0)).toBe(false)
    })

  it('rejects non-numeric listing prices', () => {
      expect(isValidListingPrice('price')).toBe(false)
    })

  it('accepts decimal string bid amounts', () => {
      expect(isValidBidAmount('1.25')).toBe(true)
    })

  it('rejects negative bid amounts', () => {
      expect(isValidBidAmount(-3)).toBe(false)
    })

  it('rejects non-numeric bid amounts', () => {
      expect(isValidBidAmount('bid')).toBe(false)
    })

  it('accepts uppercase owner addresses with surrounding spaces', () => {
      expect(isValidOwnerAddress('  SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT  ')).toBe(true)
    })

  it('rejects lowercase owner addresses', () => {
      expect(isValidOwnerAddress('sp5k2rhmsbh4pap4pgx77mcvnk1zeed07cwx9tjt')).toBe(false)
    })

  it('rejects owner addresses with internal spaces', () => {
      expect(isValidOwnerAddress('SP5K2RHMSBH4PAP4PGX77MCVNK1 ZEED07CWX9TJT')).toBe(false)
    })

  it('accepts numeric string supply limits', () => {
      expect(isValidSupplyLimit('9')).toBe(true)
    })

  it('rejects zero supply limits', () => {
      expect(isValidSupplyLimit(0)).toBe(false)
    })

  it('rejects decimal supply limits', () => {
      expect(isValidSupplyLimit('2.4')).toBe(false)
    })

  it('accepts the maximum mint batch size', () => {
      expect(isValidMintBatch(10)).toBe(true)
    })

  it('rejects mint batch values above ten', () => {
      expect(isValidMintBatch(11)).toBe(false)
    })

  it('rejects zero mint batch values', () => {
      expect(isValidMintBatch(0)).toBe(false)
    })

  it('accepts a known rarity tier', () => {
      expect(isValidRarityTier('common')).toBe(true)
    })

  it('rejects uppercase rarity tiers', () => {
      expect(isValidRarityTier('COMMON')).toBe(false)
    })

  it('rejects unsupported rarity tier values', () => {
      expect(isValidRarityTier('mythic')).toBe(false)
    })

  it('accepts zero reveal delay', () => {
      expect(isValidRevealDelay(0)).toBe(true)
    })

  it('rejects negative reveal delay values', () => {
      expect(isValidRevealDelay(-1)).toBe(false)
    })

  it('rejects decimal reveal delay values', () => {
      expect(isValidRevealDelay('3.3')).toBe(false)
    })

  it('accepts uppercase hexadecimal provenance hashes', () => {
      expect(isValidProvenanceHash('A'.repeat(64))).toBe(true)
    })

  it('rejects provenance hashes with 0x prefix', () => {
      expect(isValidProvenanceHash(`0x${'a'.repeat(64)}`)).toBe(false)
    })

  it('rejects provenance hashes with internal spaces', () => {
      expect(isValidProvenanceHash(`aaaa aaaa${'a'.repeat(56)}`)).toBe(false)
    })

  it('accepts eight-character uppercase token symbols', () => {
      expect(isValidTokenSymbol('ABCDEFGH')).toBe(true)
    })

  it('rejects lowercase token symbols', () => {
      expect(isValidTokenSymbol('mini')).toBe(false)
    })

  it('rejects single-character token symbols', () => {
      expect(isValidTokenSymbol('A')).toBe(false)
    })

  it('accepts zero mint prices', () => {
      expect(isValidMintPrice(0)).toBe(true)
    })

  it('rejects negative mint prices', () => {
      expect(isValidMintPrice(-1)).toBe(false)
    })

  it('rejects non-numeric mint prices', () => {
      expect(isValidMintPrice('mint')).toBe(false)
    })

  it('accepts numeric string wallet limits', () => {
      expect(isValidMaxPerWallet('2')).toBe(true)
    })

  it('rejects zero max per wallet values', () => {
      expect(isValidMaxPerWallet(0)).toBe(false)
    })

  it('rejects decimal max per wallet values', () => {
      expect(isValidMaxPerWallet('1.1')).toBe(false)
    })

  it('accepts token id equal to max supply', () => {
      expect(isValidTokenIdInSupply(10000)).toBe(true)
    })

  it('rejects zero token id values', () => {
      expect(isValidTokenIdInSupply(0)).toBe(false)
    })

  it('rejects token id values above max supply', () => {
      expect(isValidTokenIdInSupply(10001)).toBe(false)
    })

  it('accepts wallet limits at 1000', () => {
      expect(isValidWalletLimit(1000)).toBe(true)
    })

  it('rejects wallet limits above 1000', () => {
      expect(isValidWalletLimit(1001)).toBe(false)
    })

  it('rejects zero wallet limits', () => {
      expect(isValidWalletLimit(0)).toBe(false)
    })

  it('accepts trimmed https token uri values', () => {
      expect(isValidTokenURI('  https://example.com/meta.json  ')).toBe(true)
    })

  it('accepts uppercase ipfs token uri schemes', () => {
      expect(isValidTokenURI('IPFS://bafybeigdyrzt7mtr5n5h2xjv4gxn4q3du')).toBe(true)
    })

  it('rejects ftp token uri schemes', () => {
      expect(isValidTokenURI('ftp://example.com/metadata.json')).toBe(false)
    })

  it('accepts zero microstx mint prices', () => {
      expect(isValidMintPriceMicrostx(0)).toBe(true)
    })

  it('rejects decimal microstx mint prices', () => {
      expect(isValidMintPriceMicrostx('1.2')).toBe(false)
    })

  it('rejects negative microstx mint prices', () => {
      expect(isValidMintPriceMicrostx(-100)).toBe(false)
    })

  it('accepts numeric string positive finite values', () => {
      expect(isPositiveFinite('4.5')).toBe(true)
    })

  it('rejects zero positive finite values', () => {
      expect(isPositiveFinite(0)).toBe(false)
    })

  it('rejects infinity values', () => {
      expect(isPositiveFinite(Infinity)).toBe(false)
    })

  it('accepts batch totals at fifty', () => {
      expect(isValidBatchTotal(50)).toBe(true)
    })

  it('rejects batch totals above fifty', () => {
      expect(isValidBatchTotal(51)).toBe(false)
    })

  it('rejects zero batch totals', () => {
      expect(isValidBatchTotal(0)).toBe(false)
    })

  it('accepts zero trait count values', () => {
      expect(isValidTraitCount(0)).toBe(true)
    })

  it('rejects negative trait count values', () => {
      expect(isValidTraitCount(-1)).toBe(false)
    })

  it('rejects trait count values above sixty-four', () => {
      expect(isValidTraitCount(65)).toBe(false)
    })

  it('accepts trimmed https explorer urls', () => {
      expect(isValidExplorerUrl('  https://explorer.stacks.co/txid/0xabc  ')).toBe(true)
    })

  it('rejects non-https explorer urls', () => {
      expect(isValidExplorerUrl('http://explorer.stacks.co')).toBe(false)
    })
})

