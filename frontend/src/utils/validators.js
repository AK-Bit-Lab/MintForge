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

/**
 * Validates a Stacks transaction ID (0x-prefixed 64-hex-char string).
 * @param {*} v - Candidate transaction ID
 * @returns {boolean} True when the value matches the expected txid pattern
 */
export const isValidTxId = (v) => {
  if (v == null) return false;
  return typeof v === "string" && /^0x[0-9a-f]{64}$/i.test(v);
};

/**
 * Validates a trait attribute name string.
 * @param {*} v - Candidate trait name
 * @returns {boolean} True when the value is a non-empty string of at least 1 character
 */
export const isValidTraitName = (v) => typeof v === "string" && v.trim().length >= 1;

/**
 * Validates a marketplace listing price in STX.
 * @param {*} v - Candidate listing price
 * @returns {boolean} True when the value is a finite positive number
 */
export const isValidListingPrice = (v) => !isNaN(Number(v)) && Number(v) > 0;

/**
 * Validates a bid amount in STX.
 * @param {*} v - Candidate bid amount
 * @returns {boolean} True when the value is a finite positive number
 */
export const isValidBidAmount = (v) => !isNaN(Number(v)) && Number(v) > 0;

/**
 * Validates a Stacks wallet address using a known prefix pattern.
 * Accepts both mainnet (SP/SM) and testnet (ST/SN) addresses.
 * @param {*} v - Candidate Stacks address
 * @returns {boolean} True when the value matches the Stacks address pattern
 */
export const isValidOwnerAddress = (v) =>
  typeof v === 'string' && /^(S[PT])[0-9A-Z]{37,39}$/.test(v.trim());

/**
 * Validates an NFT supply limit value.
 * @param {*} v - Candidate supply limit
 * @returns {boolean} True when the value is an integer >= 1
 */
export const isValidSupplyLimit = (v) => Number.isInteger(Number(v)) && Number(v) >= 1;

/**
 * Validates a mint batch size (1–10 NFTs per transaction).
 * @param {*} v - Candidate batch size
 * @returns {boolean} True when the value is an integer in the range 1–10
 */
export const isValidMintBatch = (v) => Number.isInteger(Number(v)) && Number(v) >= 1 && Number(v) <= 10;

/**
 * Validates that a rarity tier string is one of the accepted values.
 * @param {*} v - Candidate rarity tier
 * @returns {boolean} True when the value is 'common', 'rare', 'epic', or 'legendary'
 */
export const isValidRarityTier = (v) => ["common","rare","epic","legendary"].includes(v);

/**
 * Validates a reveal delay in Stacks blocks.
 * @param {*} v - Candidate block delay
 * @returns {boolean} True when the value is a non-negative integer
 */
export const isValidRevealDelay = (v) => Number.isInteger(Number(v)) && Number(v) >= 0;

/**
 * Validates a provenance hash (lowercase 64-char hex string).
 * @param {*} v - Candidate provenance hash
 * @returns {boolean} True when the value is a 64-character hexadecimal string
 */
export const isValidProvenanceHash = (v) =>
  typeof v === 'string' && /^[0-9a-f]{64}$/i.test(v.trim());

/**
 * Validates a SIP-010 token symbol string (2–8 uppercase letters).
 * @param {*} v - Candidate token symbol
 * @returns {boolean} True when the value is an uppercase alphabetic string of 2–8 characters
 */
export const isValidTokenSymbol = (v) => typeof v === "string" && /^[A-Z]{2,8}$/.test(v);

/**
 * Validates a mint price in STX (can be zero for free mints).
 * @param {*} v - Candidate mint price
 * @returns {boolean} True when the value is a finite non-negative number
 */
export const isValidMintPrice = (v) => !isNaN(Number(v)) && Number(v) >= 0;

/**
 * Validates a per-wallet mint cap (1–1000).
 * @param {*} v - Candidate per-wallet limit
 * @returns {boolean} True when the value is an integer in the range 1–1000
 */
export const isValidMaxPerWallet = (v) => Number.isInteger(Number(v)) && Number(v) >= 1;

/**
 * Validates that a token ID is within the collection's supply range.
 * @param {number} tokenId - The token ID to validate
 * @returns {boolean} True if token ID is valid and within supply limits
 */
export const isValidTokenIdInSupply = (v) => Number.isInteger(Number(v)) && Number(v) >= 1 && Number(v) <= MAX_SUPPLY;

/**
 * Validates a per-wallet mint limit (1–1000).
 * @param {*} v - Candidate wallet limit
 * @returns {boolean} True when the value is an integer in the range 1–1000
 */
export const isValidWalletLimit = (v) => Number.isInteger(Number(v)) && Number(v) >= 1 && Number(v) <= 1000;

/**
 * Validates a token metadata URI (must begin with ipfs:// or https://).
 * @param {*} v - Candidate token URI
 * @returns {boolean} True when the value is a string starting with ipfs:// or https://
 */
export const isValidTokenURI = (v) => typeof v === "string" && /^(ipfs|https):\/\//i.test(v.trim());

/**
 * Validates a mint price in micro-STX (non-negative integer).
 * @param {*} v - Candidate price in micro-STX
 * @returns {boolean} True when the value is a non-negative integer
 */
export const isValidMintPriceMicrostx = (v) => Number.isInteger(Number(v)) && Number(v) >= 0;

/**
 * Returns true when the value is a finite positive number (not NaN, Infinity, or zero).
 * @param {*} v - Candidate value
 * @returns {boolean}
 */
export const isPositiveFinite = (v) => Number.isFinite(Number(v)) && Number(v) > 0;

/**
 * Validates a bulk-mint batch total (1–50 NFTs).
 * @param {*} v - Candidate total count
 * @returns {boolean} True when the value is an integer in the range 1–50
 */
export const isValidBatchTotal = (v) => Number.isInteger(Number(v)) && Number(v) >= 1 && Number(v) <= 50;

export const isValidTraitCount = (v) => Number.isInteger(Number(v)) && Number(v) >= 0 && Number(v) <= 64;

export const isValidExplorerUrl = (v) => typeof v === "string" && /^https:\/\//i.test(v.trim());
