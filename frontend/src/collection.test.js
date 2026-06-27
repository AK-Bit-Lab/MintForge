/**
 * @module collection.test
 *
 * Unit tests for collection utility functions.
 */
import { describe, expect, it } from 'vitest'
import {
  createSubmissionRecord,
  createSubmissionSummary,
  describeLimit,
  extractGatewayHost,
  formatAddress,
  formatLimit,
  formatRelativeTime,
  formatSTX,
  formatSTXCompact,
  getCardAccent,
  getExactTimeDescriptor,
  getMetadataAccessDescriptor,
  getMetadataGatewayUrl,
  getMetadataKind,
  getMetadataLabel,
  getRelativeTimeDescriptor,
  getSTXFormatDescriptor,
  isLimitFallback,
  isValidTokenId,
  normalizeExactTimestamp,
  normalizeMicrostxInput,
  normalizeRelativeTimestamp,
  normalizeSubmissionAddress,
  normalizeSubmissionTokenURI,
  validateTokenURI
} from './utils/collection.js'

describe('getCardAccent deterministic output', () => {
  it('returns the same accent for the same seed', () => {
      expect(getCardAccent('seed')).toStrictEqual(getCardAccent('seed'));
    })
})

describe('describeLimit array input', () => {
  it('reports array value types', () => {
      expect(describeLimit([1]).valueType).toBe('array');
    })
})

describe('getExactTimeDescriptor invalid input', () => {
  it('marks invalid timestamps', () => {
      expect(getExactTimeDescriptor(undefined).isValid).toBe(false);
    })
})

describe('normalizeExactTimestamp null input', () => {
  it('returns null for missing timestamps', () => {
      expect(normalizeExactTimestamp(null)).toBeNull();
    })
})

describe('formatAddress custom lengths', () => {
  it('uses custom start and end lengths', () => {
      expect(formatAddress('SP1234567890', 2, 2)).toBe('SP...90');
    })
})

describe('formatAddress empty input', () => {
  it('returns an empty label', () => {
      expect(formatAddress('')).toBe('');
    })
})

describe('formatLimit custom fallback', () => {
  it('uses custom fallback labels', () => {
      expect(formatLimit('', 'Any')).toBe('Any');
    })
})

describe('formatSTXCompact invalid input', () => {
  it('falls back to zero STX', () => {
      expect(formatSTXCompact(undefined)).toBe('0 STX');
    })
})

describe('formatSTXCompact thousand input', () => {
  it('uses the K suffix for thousands of STX', () => {
      expect(formatSTXCompact(1_000_000_000)).toBe('1.0K STX');
    })
})

describe('formatSTX invalid input', () => {
  it('falls back to zero', () => {
      expect(formatSTX('abc')).toBe('0');
    })
})

describe('formatSTX one STX', () => {
  it('formats one million microSTX as one STX', () => {
      expect(formatSTX(1_000_000)).toBe('1');
    })
})

describe('extractGatewayHost invalid input', () => {
  it('returns an empty host for invalid URLs', () => {
      expect(extractGatewayHost('not a url')).toBeNull();
    })
})

describe('getMetadataGatewayUrl ipfs input', () => {
  it('rewrites IPFS URIs through a gateway', () => {
      expect(getMetadataGatewayUrl('ipfs://abc')).toContain('/ipfs/abc');
    })
})

describe('isLimitFallback null input', () => {
  it('treats null as fallback', () => {
      expect(isLimitFallback(null)).toBe(true);
    })
})

describe('isLimitFallback zero input', () => {
  it('does not treat zero as fallback', () => {
      expect(isLimitFallback(0)).toBe(false);
    })
})

describe('getMetadataAccessDescriptor ipfs input', () => {
  it('marks IPFS metadata as accessible', () => {
      expect(getMetadataAccessDescriptor('ipfs://abc').kind).toBe('ipfs');
    })
})

describe('getMetadataKind https input', () => {
  it('detects HTTPS metadata', () => {
      expect(getMetadataKind('https://example.com/meta.json')).toBe('https');
    })
})

describe('getMetadataKind ipfs input', () => {
  it('detects IPFS metadata', () => {
      expect(getMetadataKind('ipfs://abc')).toBe('ipfs');
    })
})

describe('getMetadataLabel empty input', () => {
  it('uses the missing metadata label', () => {
      expect(getMetadataLabel('')).toBe('Metadata URI');
    })
})

describe('normalizeMicrostxInput null input', () => {
  it('returns null for null values', () => {
      expect(normalizeMicrostxInput(null)).toBeNull();
    })
})

describe('normalizeMicrostxInput string input', () => {
  it('parses trimmed numeric strings', () => {
      expect(normalizeMicrostxInput(' 1000000 ')).toBe(1000000);
    })
})

describe('getRelativeTimeDescriptor minute age', () => {
  it('formats minute-level age labels', () => {
      expect(getRelativeTimeDescriptor(940, 1_000_000).label).toBe('1m ago');
    })
})

describe('getRelativeTimeDescriptor current time', () => {
  it('labels current timestamps as just now', () => {
      expect(getRelativeTimeDescriptor(1_000_000, 1_000_000).label).toBe('Just now');
    })
})

describe('formatRelativeTime missing input', () => {
  it('falls back to just now', () => {
      expect(formatRelativeTime(null)).toBe('Just now');
    })
})

describe('normalizeRelativeTimestamp null input', () => {
  it('returns null for missing timestamps', () => {
      expect(normalizeRelativeTimestamp(null)).toBeNull();
    })
})

describe('normalizeRelativeTimestamp seconds input', () => {
  it('converts unix seconds to milliseconds', () => {
      expect(normalizeRelativeTimestamp(1000)).toBe(1_000_000);
    })
})

describe('getSTXFormatDescriptor invalid input', () => {
  it('marks invalid values', () => {
      expect(getSTXFormatDescriptor('nope').isValid).toBe(false);
    })
})

describe('normalizeSubmissionAddress trimming', () => {
  it('trims surrounding whitespace', () => {
      expect(normalizeSubmissionAddress('  SP123  ')).toBe('SP123');
    })
})

describe('createSubmissionRecord shape', () => {
  it('stores the transaction id', () => {
      expect(createSubmissionRecord({ txId: 'tx', tokenURI: 'ipfs://abc', address: 'SP1' }).txId).toBe('tx');
    })
})

describe('createSubmissionSummary label', () => {
  it('keeps the submission id from the record', () => {
      const record = createSubmissionRecord({ txId: 'tx', tokenURI: 'ipfs://abc', address: 'SP1' });
      expect(createSubmissionSummary(record).id).toBe('tx');
    })
})

describe('normalizeSubmissionTokenURI trimming', () => {
  it('trims surrounding whitespace', () => {
      expect(normalizeSubmissionTokenURI('  ipfs://abc  ')).toBe('ipfs://abc');
    })
})

describe('collection isValidTokenId minimum', () => {
  it('accepts token id one', () => {
      expect(isValidTokenId(1)).toBe(true);
    })
})

describe('collection isValidTokenId zero input', () => {
  it('rejects token id zero', () => {
      expect(isValidTokenId(0)).toBe(false);
    })
})

describe('validateTokenURI empty input', () => {
  it('rejects empty token URIs', () => {
      expect(validateTokenURI('').isValid).toBe(false);
    })
})

describe('validateTokenURI ipfs input', () => {
  it('accepts IPFS token URIs', () => {
      expect(validateTokenURI('ipfs://abcdef1234').isValid).toBe(true);
    })
})

