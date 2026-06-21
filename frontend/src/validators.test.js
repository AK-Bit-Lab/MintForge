import { describe, expect, it } from 'vitest'
import {
  isValidBidAmount,
  isValidBlockHeight,
  isValidCID,
  isValidCollectionName,
  isValidListingPrice,
  isValidMetadataVersion,
  isValidMintBatch,
  isValidMintCount,
  isValidProvenanceHash,
  isValidRarityTier,
  isValidRevealDelay,
  isValidRoyaltyBps,
  isValidSupplyLimit,
  isValidTokenId,
  isValidTraitName,
  isValidTxId
} from './utils/validators.js'

describe('isValidBidAmount string input', () => {
  it('accepts positive numeric strings', () => {
      expect(isValidBidAmount('1')).toBe(true);
    })
})

describe('isValidBlockHeight negative input', () => {
  it('rejects negative heights', () => {
      expect(isValidBlockHeight(-1)).toBe(false);
    })
})

describe('isValidBlockHeight zero input', () => {
  it('accepts block zero', () => {
      expect(isValidBlockHeight(0)).toBe(true);
    })
})

describe('isValidCID short input', () => {
  it('rejects short CIDs', () => {
      expect(isValidCID('abc')).toBe(false);
    })
})

describe('isValidCID trimmed input', () => {
  it('accepts values with enough trimmed content', () => {
      expect(isValidCID('  abcdefghij  ')).toBe(true);
    })
})

describe('isValidCollectionName blank input', () => {
  it('rejects blank names', () => {
      expect(isValidCollectionName('   ')).toBe(false);
    })
})

describe('isValidCollectionName max length', () => {
  it('accepts sixty-four characters', () => {
      expect(isValidCollectionName('a'.repeat(64))).toBe(true);
    })
})

describe('isValidListingPrice zero input', () => {
  it('rejects zero prices', () => {
      expect(isValidListingPrice(0)).toBe(false);
    })
})

describe('isValidMetadataVersion minimum', () => {
  it('accepts version one', () => {
      expect(isValidMetadataVersion(1)).toBe(true);
    })
})

describe('isValidMetadataVersion zero input', () => {
  it('rejects zero versions', () => {
      expect(isValidMetadataVersion(0)).toBe(false);
    })
})

describe('isValidMintBatch upper guard', () => {
  it('rejects batches above ten', () => {
      expect(isValidMintBatch(11)).toBe(false);
    })
})

describe('isValidMintBatch upper bound', () => {
  it('accepts a batch of ten', () => {
      expect(isValidMintBatch(10)).toBe(true);
    })
})

describe('isValidMintCount minimum', () => {
  it('accepts a single mint', () => {
      expect(isValidMintCount(1)).toBe(true);
    })
})

describe('isValidMintCount zero input', () => {
  it('rejects zero mints', () => {
      expect(isValidMintCount(0)).toBe(false);
    })
})

describe('isValidProvenanceHash short input', () => {
  it('rejects short hashes', () => {
      expect(isValidProvenanceHash('a'.repeat(63))).toBe(false);
    })
})

describe('isValidProvenanceHash valid input', () => {
  it('accepts sixty-four hex characters', () => {
      expect(isValidProvenanceHash('a'.repeat(64))).toBe(true);
    })
})

describe('isValidRarityTier legendary input', () => {
  it('accepts legendary rarity', () => {
      expect(isValidRarityTier('legendary')).toBe(true);
    })
})

describe('isValidRarityTier uppercase input', () => {
  it('rejects uppercase rarity labels', () => {
      expect(isValidRarityTier('LEGENDARY')).toBe(false);
    })
})

describe('isValidRevealDelay negative input', () => {
  it('rejects negative delays', () => {
      expect(isValidRevealDelay(-1)).toBe(false);
    })
})

describe('isValidRevealDelay zero input', () => {
  it('accepts zero delay', () => {
      expect(isValidRevealDelay(0)).toBe(true);
    })
})

describe('isValidRoyaltyBps minimum', () => {
  it('accepts zero royalties', () => {
      expect(isValidRoyaltyBps(0)).toBe(true);
    })
})

describe('isValidRoyaltyBps upper guard', () => {
  it('rejects values above 10000', () => {
      expect(isValidRoyaltyBps(10001)).toBe(false);
    })
})

describe('isValidSupplyLimit minimum', () => {
  it('accepts one as the minimum supply', () => {
      expect(isValidSupplyLimit(1)).toBe(true);
    })
})

describe('isValidSupplyLimit zero input', () => {
  it('rejects zero supply', () => {
      expect(isValidSupplyLimit(0)).toBe(false);
    })
})

describe('isValidTokenId decimal input', () => {
  it('rejects fractional token ids', () => {
      expect(isValidTokenId(1.5)).toBe(false);
    })
})

describe('isValidTokenId null input', () => {
  it('rejects null token ids', () => {
      expect(isValidTokenId(null)).toBe(false);
    })
})

describe('isValidTokenId zero input', () => {
  it('accepts zero token ids', () => {
      expect(isValidTokenId(0)).toBe(true);
    })
})

describe('isValidTraitName blank input', () => {
  it('rejects blank trait names', () => {
      expect(isValidTraitName('   ')).toBe(false);
    })
})

describe('isValidTxId bare input', () => {
  it('rejects txids without a prefix', () => {
      expect(isValidTxId('a'.repeat(64))).toBe(false);
    })
})

describe('isValidTxId valid input', () => {
  it('accepts prefixed hex txids', () => {
      expect(isValidTxId(`0x${'a'.repeat(64)}`)).toBe(true);
    })
})

