import { MIN_ROYALTY_BASIS_POINTS, MAX_ROYALTY_BASIS_POINTS, MAX_SUPPLY } from './constants.js';

/**
 * Validates token IDs accepted by local UI helpers.
 * @param {*} v - Candidate token ID
 * @returns {boolean} True when the value is an integer >= 0
 */
export const isValidTokenId = (v) => {
  if (v == null) return false;
  return Number.isInteger(Number(v)) && Number(v) >= 0;
};

/**
 * Validates a mint count for batch operations.
 * @param {*} v - Candidate mint count
 * @returns {boolean} True when the value is an integer >= 1
 */
export const isValidMintCount = (v) => {
  if (v == null) return false;
  return Number.isInteger(Number(v)) && Number(v) >= 1;
};

/**
 * Validates an IPFS CID string for length and type.
 * @param {*} v - Candidate CID value
 * @returns {boolean} True when the value is a non-empty string of 10-128 characters
 */
export const isValidCID = (v) => typeof v === "string" && v.trim().length >= 10 && v.trim().length <= 128;

/**
 * Validates a royalty basis-points value within the allowed range.
 * @param {*} v - Candidate royalty bps (0–10000)
 * @returns {boolean} True when the value is a finite number within the accepted range
 */
export const isValidRoyaltyBps = (v) => {
  if (v == null) return false;
  return !isNaN(Number(v)) && Number(v) >= MIN_ROYALTY_BASIS_POINTS && Number(v) <= MAX_ROYALTY_BASIS_POINTS;
};

/**
 * Validates a metadata schema version integer.
 * @param {*} v - Candidate version number
 * @returns {boolean} True when the value is an integer >= 1
 */
export const isValidMetadataVersion = (v) => Number.isInteger(Number(v)) && Number(v) >= 1;

/**
 * Validates a Stacks block height value.
 * @param {*} v - Candidate block height
 * @returns {boolean} True when the value is a non-negative integer
 */
export const isValidBlockHeight = (v) => {
  if (v == null) return false;
  return Number.isInteger(Number(v)) && Number(v) >= 0;
};

/**
 * Validates a collection name string for the allowed character count.
 * @param {*} v - Candidate collection name
 * @returns {boolean} True when the value is a non-empty string of 1–64 characters
 */
export const isValidCollectionName = (v) => typeof v === "string" && v.trim().length >= 1 && v.trim().length <= 64;

export const isValidTxId = (v) => {
  if (v == null) return false;
  return typeof v === "string" && /^0x[0-9a-f]{64}$/i.test(v);
};

export const isValidTraitName = (v) => typeof v === "string" && v.trim().length >= 1;

export const isValidListingPrice = (v) => !isNaN(Number(v)) && Number(v) > 0;

export const isValidBidAmount = (v) => !isNaN(Number(v)) && Number(v) > 0;

export const isValidOwnerAddress = (v) =>
  typeof v === 'string' && /^(S[PT])[0-9A-Z]{37,39}$/.test(v.trim());

export const isValidSupplyLimit = (v) => Number.isInteger(Number(v)) && Number(v) >= 1;

export const isValidMintBatch = (v) => Number.isInteger(Number(v)) && Number(v) >= 1 && Number(v) <= 10;

export const isValidRarityTier = (v) => ["common","rare","epic","legendary"].includes(v);

export const isValidRevealDelay = (v) => Number.isInteger(Number(v)) && Number(v) >= 0;

export const isValidProvenanceHash = (v) =>
  typeof v === 'string' && /^[0-9a-f]{64}$/i.test(v.trim());

export const isValidTokenSymbol = (v) => typeof v === "string" && /^[A-Z]{2,8}$/.test(v);

export const isValidMintPrice = (v) => !isNaN(Number(v)) && Number(v) >= 0;

export const isValidMaxPerWallet = (v) => Number.isInteger(Number(v)) && Number(v) >= 1;

/**
 * Validates that a token ID is within the collection's supply range.
 * @param {number} tokenId - The token ID to validate
 * @returns {boolean} True if token ID is valid and within supply limits
 */
export const isValidTokenIdInSupply = (v) => Number.isInteger(Number(v)) && Number(v) >= 1 && Number(v) <= MAX_SUPPLY;

export const isValidWalletLimit = (v) => Number.isInteger(Number(v)) && Number(v) >= 1 && Number(v) <= 1000;

export const isValidTokenURI = (v) => typeof v === "string" && /^(ipfs|https):\/\//i.test(v.trim());

export const isValidMintPriceMicrostx = (v) => Number.isInteger(Number(v)) && Number(v) >= 0;

export const isPositiveFinite = (v) => Number.isFinite(Number(v)) && Number(v) > 0;

export const isValidBatchTotal = (v) => Number.isInteger(Number(v)) && Number(v) >= 1 && Number(v) <= 50;

export const isValidTraitCount = (v) => Number.isInteger(Number(v)) && Number(v) >= 0 && Number(v) <= 64;

export const isValidExplorerUrl = (v) => typeof v === "string" && /^https:\/\//i.test(v.trim());
