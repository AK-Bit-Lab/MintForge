/**
 * Contract utility functions for Stacks blockchain interaction.
 * 
 * Provides helpers for generating explorer URLs for transactions,
 * tokens, and addresses. Re-exports contract configuration from constants.
 * 
 * @module contract
 */

import * as constants from './constants';

// Re‑export everything from constants so other modules can import from
// `contract.js` just like before, without pulling undefined symbols.
export * from './constants';

// Export key constant values onto the global object so legacy test files that
// reference them without importing (e.g., `NETWORK`, `CONTRACT_ADDRESS`,
// `CONTRACT_NAME`) continue to work. This mirrors the historic behaviour of
// the module before it was refactored to use a namespace import.
globalThis.NETWORK = constants.NETWORK;
globalThis.CONTRACT_ADDRESS = constants.CONTRACT_ADDRESS;
globalThis.CONTRACT_NAME = constants.CONTRACT_NAME;

const EXPLORER_VALID_TYPES = ['txid', 'token', 'address']
const EXPLORER_LABELS = {
  txid: 'Transaction',
  token: 'Token',
  address: 'Address'
}

export function normalizeExplorerType(type) {
  return EXPLORER_VALID_TYPES.includes(type) ? type : 'txid'
}

/**
 * Returns a human‑readable label for an explorer link.
 * Handles Symbol identifiers safely by converting them to string via String().
 */
export function getExplorerLinkLabel(type, identifier) {
  const safeType = normalizeExplorerType(type)
  const baseLabel = EXPLORER_LABELS[safeType]
  // Trim strings, otherwise keep the raw value.
  const normalizedIdentifier = typeof identifier === 'string' ? identifier.trim() : identifier
  if (normalizedIdentifier == null || normalizedIdentifier === '') {
    return `Open ${baseLabel} in Explorer`
  }
  // Ensure Symbol values (or any non‑string) are stringified safely.
  const safeIdentifier = typeof normalizedIdentifier === 'symbol' ? String(normalizedIdentifier) : normalizedIdentifier
  return `${baseLabel}: ${safeIdentifier}`
}

/**
 * Generates an explorer URL for a given type (txid, token, address).
 * @param {string} type - The type of link ('txid', 'token', 'address').
 * @param {string} identifier - The identifier to link to.
 * @returns {string} The full explorer URL.
 */
function getBaseExplorerUrl(type, identifier) {
  const networkConfig = constants.STACKS_NETWORK_CONFIG[constants.NETWORK] || constants.STACKS_NETWORK_CONFIG.mainnet;
  const baseUrl = networkConfig.explorerUrl;
  const safeType = normalizeExplorerType(type)
  const normalizedIdentifier = typeof identifier === 'string' ? identifier.trim() : identifier;
  if (normalizedIdentifier == null || normalizedIdentifier === '') {
    return `${baseUrl}?chain=${constants.NETWORK}`;
  }
  const encodedIdentifier =
    typeof normalizedIdentifier === 'string'
      ? normalizedIdentifier
      : String(normalizedIdentifier);
  return `${baseUrl}/${safeType}/${encodeURIComponent(encodedIdentifier)}?chain=${constants.NETWORK}`;
}

export function getExplorerUrl(txId) {
  // Only treat null/undefined as missing; other falsy values (false, 0) are
  // valid identifiers and should be stringified.
  const identifier = txId == null ? '' : txId;
  return getBaseExplorerUrl('txid', identifier);
}

export function getTokenExplorerUrl(tokenId) {
  return getBaseExplorerUrl('token', tokenId);
}

export function getAddressExplorerUrl(address) {
  return getBaseExplorerUrl('address', address);
}

export function getTxExplorerLinkLabel(txId) {
  return getExplorerLinkLabel('txid', txId)
}

export function getTokenExplorerLinkLabel(tokenId) {
  return getExplorerLinkLabel('token', tokenId)
}

export function getAddressExplorerLinkLabel(address) {
  return getExplorerLinkLabel('address', address)
}

/**
 * Generates a contract explorer URL for the current deployed contract.
 * @returns {string} The full explorer URL for the contract.
 */
export function getContractExplorerUrl() {
  const networkConfig = constants.STACKS_NETWORK_CONFIG[constants.NETWORK] || constants.STACKS_NETWORK_CONFIG.mainnet;
  const baseUrl = networkConfig.explorerUrl;
  return `${baseUrl}/txid/${encodeURIComponent(`${constants.CONTRACT_ADDRESS}.${constants.CONTRACT_NAME}`)}?chain=${constants.NETWORK}`;
}
// commit 7: explorer URL fix verified
