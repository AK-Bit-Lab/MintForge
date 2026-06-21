/**
 * Application constants and configuration.
 * 
 * Defines contract addresses, network settings, mint fees, and
 * function names used throughout the MintForge frontend.
 * 
 * @module constants
 */
import {
  DEFAULT_NETWORK,
  FUNCTIONS as SDK_FUNCTIONS,
  MINT_FEE as SDK_MINT_FEE,
  STACKS_NETWORK_CONFIG as SDK_STACKS_NETWORK_CONFIG,
} from 'stacksminimint-sdk';

const MAINNET_DEPLOYER = 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT';

const envNetwork = import.meta.env?.VITE_STX_NETWORK;
const envMintFee = Number.parseInt(import.meta.env?.VITE_MINT_FEE ?? '', 10);

export const NETWORK = envNetwork === 'mainnet' || envNetwork === 'testnet'
  ? envNetwork
  : DEFAULT_NETWORK; // 'mainnet' or 'testnet'

// Default to the tracked v-i27 contracts and allow env overrides.
export const CONTRACT_ADDRESS = import.meta.env?.VITE_CONTRACT_ADDRESS || MAINNET_DEPLOYER;
export const CONTRACT_NAME = import.meta.env?.VITE_CONTRACT_NAME || 'minimint-core-v-i28';
export const HUB_CONTRACT_ADDRESS = import.meta.env?.VITE_HUB_CONTRACT_ADDRESS || MAINNET_DEPLOYER;
export const HUB_CONTRACT_NAME = import.meta.env?.VITE_HUB_CONTRACT_NAME || 'minimint-hub-v-i28';

/** Reward token contract address — same deployer as core and hub. */
export const TOKEN_CONTRACT_ADDRESS = import.meta.env?.VITE_TOKEN_CONTRACT_ADDRESS || MAINNET_DEPLOYER;
/** Reward token contract name for the SIP-010 MMT token. */
export const TOKEN_CONTRACT_NAME = import.meta.env?.VITE_TOKEN_CONTRACT_NAME || 'minimint-token-v-i28';

export const MINT_FEE = Number.isInteger(envMintFee) && envMintFee >= 0 ? envMintFee : SDK_MINT_FEE; // micro-STX

export const FUNCTIONS = SDK_FUNCTIONS;
export const STACKS_NETWORK_CONFIG = SDK_STACKS_NETWORK_CONFIG;
export const MAX_SUPPLY = 10000;

// --- UI Constants ---
// Values used for consistent UI behavior across components.

/** Base document title shown at all times including when wallet is disconnected. */
export const APP_BASE_TITLE = 'MintForge - NFT Minting on Stacks';

/** Document title prefix shown when a wallet is connected. */
export const APP_CONNECTED_TITLE_PREFIX = 'Connected';

/** Toast message shown when a mint transaction is successfully submitted. */
export const MINT_SUCCESS_TOAST_MESSAGE = 'Transaction sent to Stacks.';

/** Maximum number of recent mints to display in the activity feed */
export const MAX_RECENT_MINTS = 6;

/** Scroll threshold (in pixels) to show the back-to-top button */
export const SCROLL_THRESHOLD = 400;

/** Debounce delay in ms for scroll event handlers */
export const SCROLL_DEBOUNCE_MS = 100;

/** Minimum allowed custom mint fee in micro-STX (0 means default applies) */
export const MIN_MINT_FEE = 0;

/** Toast notification auto-dismiss duration in milliseconds */
export const TOAST_DURATION = 4500;

/** Maximum time in milliseconds to wait for a wallet transaction to confirm */
export const TRANSACTION_TIMEOUT_MS = 120_000;

/** Timeout in milliseconds before the clipboard copy status resets */
export const CLIPBOARD_TIMEOUT_MS = 2000;

/** Duration in milliseconds the clipboard success state is displayed */
export const CLIPBOARD_SUCCESS_DURATION_MS = 1500;

/** Maximum number of toasts to display simultaneously */
export const MAX_TOASTS = 4;

/** Maximum number of times to retry a failed network request before giving up */
export const MAX_RETRIES = 3;

/** Maximum number of transaction submission attempts before surfacing an error */
export const TX_RETRY_LIMIT = 2;

/** Number of items to display per page in paginated lists */
export const DEFAULT_PAGINATION_SIZE = 12;

/** Number of NFTs to show per page in the gallery view */
export const GALLERY_PAGE_SIZE = 20;

/** NFT token ID range boundaries */
export const NFT_ID_MIN = 1;
export const NFT_ID_MAX = MAX_SUPPLY;

/** Transaction lifecycle status codes */
export const TX_STATUS = Object.freeze({
  PENDING: 'pending',
  SUCCESS: 'success',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
});

/** Minimum number of characters required for a Stacks address to display truncated */
export const MIN_DISPLAY_ADDRESS_LENGTH = 10;

/** Minimum character length of a valid Stacks mainnet or testnet address */
export const MIN_STACKS_ADDRESS_LENGTH = 40;

/** Polling interval in ms for watching mint activity from the API */
export const MINT_ACTIVITY_POLL_INTERVAL_MS = 30_000;

/** Delay in ms before showing a loading spinner to avoid flash for fast responses */
export const LOADING_DEBOUNCE_MS = 200;

// --- Local Storage Keys ---
// Keys used for persisting user preferences and session state.

/** Local storage key for persisting the wallet address */
export const WALLET_ADDRESS_STORAGE_KEY = 'mintforge:wallet-address';

/** Local storage key for persisting the gallery view mode (grid or list) */
export const GALLERY_VIEW_STORAGE_KEY = 'gallery-view-mode';

/** Local storage key for persisting the selected UI theme (light or dark) */
export const THEME_STORAGE_KEY = 'theme';

// --- Network Labels ---
// Human-readable labels for network display.

/** Display name for mainnet network */
export const MAINNET_LABEL = 'Stacks Mainnet';

/** Display name for testnet network */
export const TESTNET_LABEL = 'Stacks Testnet';

/** Display name for local devnet */
export const DEVNET_LABEL = 'Devnet';

// --- External Links ---

export const URL_STACKS_CO = 'https://www.stacks.co/';
export const URL_IPFS_DOCS = 'https://docs.ipfs.tech/';
export const URL_STACKS_DISCORD = 'https://discord.gg/stacks';
export const URL_STACKS_X = 'https://x.com/Stacks';
export const URL_LEATHER_WALLET = 'https://leather.io/';
export const URL_STACKS_DOCS = 'https://docs.stacks.co/';
export const URL_GITHUB_REPO = 'https://github.com/AK-Bit-Lab/MintForge';
export const URL_SIP009 = 'https://docs.stacks.co/reference/sips/sip009';

// --- Error Messages ---

/** General error when a wallet request times out */
export const ERR_WALLET_REQUEST_TIMEOUT = 'Wallet request timed out. Please try again.';

/** Error when the initial wallet connection prompt times out */
export const ERR_WALLET_CONNECT_TIMEOUT = 'Wallet connection timed out. Reopen your wallet extension, approve the request, then try again.';

/** Error when the wallet returns a successful connection but no valid Stacks address */
export const ERR_WALLET_NO_ADDRESS = 'Wallet connected but did not return a Stacks address. Confirm the wallet is unlocked on Stacks mainnet and try again.';

/** Generic fallback error for wallet connection failures */
export const ERR_WALLET_CONNECT_FAILED = 'Failed to connect Stacks wallet.';

// --- Success Messages ---

export const SUCCESS_COPIED = 'Copied to clipboard';
export const SUCCESS_DISCONNECT = 'Wallet disconnected securely.';

// --- Formatting Options ---

export const FORMAT_DATE_STYLE = 'medium';
export const FORMAT_TIME_STYLE = 'short';

// --- Pagination & UI Limits ---

export const SKELETON_MAX_COUNT = 40;
export const GALLERY_SKELETON_COUNT = 4;
export const RECENT_MINTS_SKELETON_COUNT = 3;
export const STATS_SKELETON_COUNT = 4;

// --- Breakpoints ---

export const BREAKPOINT_MOBILE_SM = 480;
export const BREAKPOINT_MOBILE = 640;
export const BREAKPOINT_TABLET = 720;
export const BREAKPOINT_TABLET_LG = 900;
export const BREAKPOINT_DESKTOP = 1024;

// --- Z-Index Layers ---

export const Z_INDEX_BACKGROUND = -1;
export const Z_INDEX_BASE = 0;
export const Z_INDEX_ELEVATED = 1;
export const Z_INDEX_FLOATING = 99;
export const Z_INDEX_HEADER = 100;
export const Z_INDEX_OVERLAY = 120;
export const Z_INDEX_MODAL = 1000;
export const Z_INDEX_TOAST = 9999;

// --- Explorer URLs ---
// Base URLs for Stacks explorers.

/** Hiro Explorer base URL */
export const HIRO_EXPLORER_URL = 'https://explorer.stacks.co';

/** Duration in milliseconds for standard UI transition animations */
export const ANIMATION_DURATION_MS = 200;

/** NFT metadata schema version used when building token metadata objects */
export const NFT_METADATA_VERSION = 1;

// --- Contract Function Names ---
// Standardized function names for contract calls.

/** Mint function name in core contract */
export const MINT_FUNCTION = 'mint';

/** Transfer function name in core contract */
export const TRANSFER_FUNCTION = 'transfer';

/** Get total supply function name */
export const GET_TOTAL_SUPPLY = 'get-last-token-id';

// --- Default Values ---
// Fallback values for empty or undefined states.

/** Default display text for unknown addresses */
export const UNKNOWN_ADDRESS = 'Unknown';

/** Default display text for pending transactions */
export const PENDING_LABEL = 'Pending';

/** Default display text for failed transactions */
export const FAILED_LABEL = 'Failed';

/**
 * Get network display label based on current network.
 * @returns {string} The human-readable network name.
 */
export function getNetworkLabel() {
  return NETWORK === 'mainnet' ? MAINNET_LABEL : TESTNET_LABEL;
}

/**
 * Default export for constants module.
 */
export default {
  NETWORK,
  CONTRACT_ADDRESS,
  CONTRACT_NAME,
  HUB_CONTRACT_ADDRESS,
  HUB_CONTRACT_NAME,
  TOKEN_CONTRACT_ADDRESS,
  TOKEN_CONTRACT_NAME,
  MINT_FEE,
  FUNCTIONS,
  STACKS_NETWORK_CONFIG,
  MAX_SUPPLY,
  MAX_RECENT_MINTS,
  SCROLL_THRESHOLD,
  SCROLL_DEBOUNCE_MS,
  MIN_MINT_FEE,
  TOAST_DURATION,
  TRANSACTION_TIMEOUT_MS,
  CLIPBOARD_TIMEOUT_MS,
  CLIPBOARD_SUCCESS_DURATION_MS,
  MAX_TOASTS,
  MAX_RETRIES,
  TX_RETRY_LIMIT,
  MAINNET_LABEL,
  TESTNET_LABEL,
  DEVNET_LABEL,
  HIRO_EXPLORER_URL,
  ANIMATION_DURATION_MS,
  NFT_METADATA_VERSION,
  MINT_FUNCTION,
  TRANSFER_FUNCTION,
  GET_TOTAL_SUPPLY,
  UNKNOWN_ADDRESS,
  PENDING_LABEL,
  FAILED_LABEL,
  DEFAULT_PAGINATION_SIZE,
  GALLERY_PAGE_SIZE,
  NFT_ID_MIN,
  NFT_ID_MAX,
  TX_STATUS,
  MIN_DISPLAY_ADDRESS_LENGTH,
  MINT_ACTIVITY_POLL_INTERVAL_MS,
  LOADING_DEBOUNCE_MS,
  getNetworkLabel
}
