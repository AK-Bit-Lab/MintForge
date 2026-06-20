# Changelog

All notable changes to this project are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [Semantic Versioning](https://semver.org/).

---

## [Unreleased]

### Added
- `CONTRIBUTING.md` — development workflow, commit conventions, and PR process.
- `CHANGELOG.md` — this file.
- `SECURITY.md` — responsible disclosure policy.
- GitHub PR and issue templates.
- `TOKEN_CONTRACT_NAME` / `TOKEN_CONTRACT_ADDRESS` constants for hub reward token.
- `DEVNET_LABEL` and additional constants exposed via the default export.
- `useScrollPosition` hook for scroll-aware components.
- `useAsync` `lastArgsRef` moved before `execute` for correct code ordering.
- `Modal` now includes `'full'` in `MODAL_SIZES` to match PropTypes definition.
- `Badge` children marked as optional when `dot` prop is `true`.
- Realistic full-length CIDv0 values in Gallery mock data.
- `data-network` attribute on Header chain indicator.
- `data-count` attribute on RecentMints section root.
- `data-message` attribute on Toast for extended selector surface.
- `ProgressBar` SUPPORTED_COLORS hoisted to module scope.
- `Spinner` `muted` tone option.
- `CopyButton` `onCopied` callback prop.

### Changed
- Contract references updated from `v-i27` to `v-i28` across README and frontend
  constants default values.
- `useTransaction` poll interval extracted as named constant.
- Gallery mock data expanded from 3 to 6 NFTs.

### Fixed
- `useAsync`: `lastArgsRef` declared after first use — moved to correct position.
- `useStorage`: `QuotaExceededError` detection added to `setValue`.

---

## [0.1.0] — 2026-06-20

### Added
- Initial public release of MintForge on Stacks mainnet.
- `minimint-core-v-i28` — SIP-009 NFT contract, free mint, MAX-SUPPLY 10 000.
- `minimint-hub-v-i28` — Staking + marketplace hub, 1 000 000 μMMT reward per block.
- `minimint-token-v-i28` — SIP-010 MMT reward token, mint restricted to hub.
- React frontend with Vite, Vitest, and `@stacks/connect` wallet integration.
- Wallet-first minting flow with post-condition enforcement.
- `distribute-funds.js` — rate-limit-proof top-up distribution script.
- `interact.js` — organic 6-phase interaction script across all three contracts.
- GPG-signed commits, AK-Bit-Lab identity.

[Unreleased]: https://github.com/AK-Bit-Lab/MintForge/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/AK-Bit-Lab/MintForge/releases/tag/v0.1.0
