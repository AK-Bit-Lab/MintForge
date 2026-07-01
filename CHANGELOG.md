# Changelog

All notable changes to this project are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [Semantic Versioning](https://semver.org/).

---

## [Unreleased]

### Fixed
- `Tooltip` — moved `useCallback` and `useEffect` calls above the early return to fix a React rules-of-hooks violation.
- `OfflineBanner` — moved `dismissed` state reset from render body into `useEffect` to prevent setState during render.
- `Modal` — guard focus restoration to skip `document.body` as restore target.
- `EmptyState` — corrected `role` from `status` to `region` for non-live placeholder sections.
- `StatusDot` — changed `role` from `img` to `status` for dynamic state indicators.
- `MintCard` — trim token URI before passing to `validateTokenURI` so pasted URIs with whitespace validate correctly.
- `ExplorerLink` — guard against undefined `identifier` prop.
- `Spinner` — removed redundant `data-live` attribute that shadowed `aria-live`.
- Contract name defaults in `constants/index.js` updated from v-i27 to v-i28 to match deployed contracts.
- Stale v-i27 inline comment in `constants/index.js` corrected.
- Default values in the README environment variables table updated to v-i28.

### Added
- StacksMinimint packages added as root dependencies: `stacksminimint-sdk`, `stacksminimint-protocol`, `stacksminimint-utils`, `stacksminimint-types`.
- `data-complete` attribute on `ProgressBar` when value reaches max.
- `aria-label` attribute on `SkipLink` component.
- `title` attribute on labelled `Divider` variants.
- `aria-hidden` for dot-only decorative `Badge` instances.
- `aria-busy` attribute to `LoadingDots` component.
- `data-intent` attributes on `ConfirmDialog` action buttons.
- `data-address-length` attribute on `TruncatedAddress` wrapper.
- `MIN_STACKS_ADDRESS_LENGTH` constant.
- `DEFAULT_ERROR_MESSAGE` constant.
- JSDoc added to all undocumented validators in `validators.js`.
- `@module` tag and improved docs in `format.js`.

### Changed
- `handleMint` in `App` wrapped in `useCallback` for stable reference.
- `GALLERY_MOCK_NFTS` lifted to module scope in `Gallery` to avoid array recreation per effect.
- `LoadingSkeleton` style computation inlined, removing `getStyle` wrapper function.
- `VALID_TYPES` in `Toast` derived from `TOAST_ICONS` keys to remove duplication.
- `VALID_SIZES` / `VALID_TONES` extracted to module constants in `Spinner`.
- `VALID_VARIANTS` / `VALID_PADDING_SIZES` extracted to module constants in `Card`.
- All string concatenation in `format.js` formatters replaced with template literals.

---
### Added
- `CONTRIBUTING.md` — development workflow, commit conventions, and PR process.
- `CHANGELOG.md` — this file.
- `SECURITY.md` — responsible disclosure policy.
- GitHub PR and issue templates.
- `TOKEN_CONTRACT_NAME` / `TOKEN_CONTRACT_ADDRESS` constants for hub reward token.
- `DEVNET_LABEL` and additional constants exposed via the default export.
- `useScrollPosition` hook for scroll-aware components.
- `usePrevious` hook — previous render value tracking.
- `useDebounce` hook — deferred value updates with configurable delay.
- `useEventListener` hook — declarative DOM event subscriptions.
- `useIsVisible` hook — IntersectionObserver-based element visibility.
- `useFocusTrap` hook — focus confinement for modal overlays.
- `useNetworkStatus` hook — browser online/offline state.
- `useConfirm` hook — programmatic confirm dialog open/close control.
- `useIsTouchDevice` hook — detects touch-primary pointer devices.
- `OfflineBanner` component — dismissible offline alert.
- `SkipLink` component — keyboard-accessible skip-to-content anchor.
- `Divider` component — section separator with optional label and orientation.
- `EmptyState` component — reusable zero-data placeholder with optional CTA.
- `StatusDot` component — inline status indicator with pulse animation.
- `LoadingDots` component — inline pulsing dots for lightweight loading states.
- `TruncatedAddress` component — address display with integrated copy button.
- `ExplorerLink` component — typed anchor for txid, token, and address links.
- `ConfirmDialog` component — confirmation dialog built on Modal.
- `formatFileSize` utility in `strings.js`.
- `formatDuration` utility in `collection.js`.
- `formatPercent` utility in `collection.js`.
- `isPositiveInteger` guard utility in `strings.js`.
- `isStale` flag added to `useAsync` return object.
- `isSupported` flag added to `useClipboard` return object.
- `dismissAll` alias added to `useToast` return object.
- `data-network` attribute on Header chain indicator.
- `data-message` attribute on Toast for selector surface.
- `data-state` attribute on MintCard form element.
- `data-result-count` and `data-view` attributes on Gallery grid.
- `dismissAll` alias for `clearAll` in `useToast`.
- `Stats` last-updated timestamp display.
- `Gallery` search extended to match `tokenURI` field.
- `.env.example` updated for v-i28 contracts and token variables.

### Changed
- Contract references updated from `v-i27` to `v-i28` across README and frontend constants.
- `useTransaction` poll interval and error messages extracted as named constants.
- `useStacksContract` stacksNetwork wrapped in `useMemo`.
- Gallery mock data expanded from 3 to 6 NFTs with full CIDv0 URIs.
- `RecentMints` empty state replaced with `EmptyState` component.
- `SUPPORTED_COLORS` in `ProgressBar` and `SUPPORTED_VARIANTS` in `LoadingSkeleton` hoisted to module scope.
- `ThemeContext` uses `THEME_STORAGE_KEY` constant and `THEME_VALID_VALUES` array.
- `Tooltip` show/hide handlers memoized with `useCallback`.

### Fixed
- `useAsync`: `lastArgsRef` declared after first use — moved to correct position.
- `useStorage`: `QuotaExceededError` detection added to `setValue`.
- `Badge` children marked as optional for dot-only rendering.
- `Modal` `MODAL_SIZES` now includes `'full'` to match PropTypes.

---

## [0.1.0] — 2026-06-20

### Added
- Initial public release of MintForge on Stacks mainnet.
- `minimint-core-v-i28` — SIP-009 NFT contract, free mint, MAX-SUPPLY 10 000.
- `minimint-hub-v-i28` — Staking + marketplace hub, 1 000 000 μMMT reward per block.
- `minimint-token-v-i28` — SIP-010 MMT reward token, mint restricted to hub.
- React frontend with Vite, Vitest, and `@stacks/connect` wallet integration.
- Wallet-first minting flow with post-condition enforcement.
- GPG-signed commits, AK-Bit-Lab identity.

[Unreleased]: https://github.com/AK-Bit-Lab/MintForge/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/AK-Bit-Lab/MintForge/releases/tag/v0.1.0
