/**
 * Gallery component for displaying and browsing the NFT collection.
 * 
 * Features include grid/list view modes, search functionality, and a detail modal.
 * Uses mock data for demonstration and integrates with the Stacks explorer.
 * 
 * @module Gallery
 */

/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import './Gallery.css'
import { getTokenExplorerUrl } from '../contract'
import { formatAddress } from '../utils/collection'
import { useLocalStorage } from '../hooks'
import { GALLERY_VIEW_STORAGE_KEY, GALLERY_SKELETON_COUNT } from '../constants'

/** Delay in ms before mock NFT data is shown, simulating a network load. */
const GALLERY_MOCK_LOAD_DELAY_MS = 400;

/**
 * Static mock NFT dataset used for gallery demonstration.
 * Declared at module scope so the array reference stays stable across renders.
 */
const GALLERY_MOCK_NFTS = [
  {
    id: 1,
    name: 'Genesis #1',
    image: 'https://picsum.photos/seed/nft1/400/400',
    owner: 'SP3HE2Y4S6K8N4D0X8M6G4Q2Y9B7P5R3T1V0WXYZ',
    tokenURI: 'ipfs://QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG'
  },
  {
    id: 2,
    name: 'Genesis #2',
    image: 'https://picsum.photos/seed/nft2/400/400',
    owner: 'SP2JA9Q8R7T6Y5U4I3O2P1A0S9D8F7G6H5J4K3L2',
    tokenURI: 'ipfs://QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o'
  },
  {
    id: 3,
    name: 'Genesis #3',
    image: 'https://picsum.photos/seed/nft3/400/400',
    owner: 'SP1P7Q9W8E7R6T5Y4U3I2O1P0A9S8D7F6G5H4J3K',
    tokenURI: 'ipfs://QmPChd2hVbrJ6bfo3WBcTW4iZnpHm8TEzWkLHmLpXhF68A'
  },
  {
    id: 4,
    name: 'Genesis #4',
    image: 'https://picsum.photos/seed/nft4/400/400',
    owner: 'SP4KR9NMHBF3JZPXKQV7D2Y1W8E6T5R4V3U2I1O0P',
    tokenURI: 'ipfs://QmNqL9VuHpLTHeP8PNnCrNXYgV4JzRmQFt3PkhXmN5JEK6'
  },
  {
    id: 5,
    name: 'Genesis #5',
    image: 'https://picsum.photos/seed/nft5/400/400',
    owner: 'SP5XY4WQRE2K9P8N7M6V5B4C3D2F1G8H7J6K5L4M3',
    tokenURI: 'ipfs://QmW2WQi7j6c7UgJTarActp7tDNikE4B2qXtFCfLPdsgaTQ'
  },
  {
    id: 6,
    name: 'Genesis #6',
    image: 'https://picsum.photos/seed/nft6/400/400',
    owner: 'SP6A3B2C1D0E9F8G7H6I5J4K3L2M1N0O9P8Q7R6S5',
    tokenURI: 'ipfs://QmSgvgwxZGaBLqkGyWemEDqikCqU52XxsYLKtdy3wGLFmU'
  }
]

/**
 * Interactive gallery grid/list for browsing the NFT collection.
 * Includes search, view mode toggling, and a detail modal for tokens.
 * 
 * @returns {JSX.Element} The rendered gallery section.
 */
export function Gallery() {
  const [nfts, setNfts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedNft, setSelectedNft] = useState(null)
  const [viewMode, setViewMode] = useLocalStorage(GALLERY_VIEW_STORAGE_KEY, 'grid')
  const [searchTerm, setSearchTerm] = useState('')
  const closeButtonRef = useRef(null)
  const gridId = useId()
  const searchHintId = `${gridId}-search-hint`
  const normalizedSearchTerm = searchTerm.toLowerCase().trim()
  const safeViewMode = viewMode === 'list' ? 'list' : 'grid'

  // Load mock NFT data with a simulated network delay for gallery demonstration
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setNfts(GALLERY_MOCK_NFTS)
      setIsLoading(false)
    }, GALLERY_MOCK_LOAD_DELAY_MS)

    return () => clearTimeout(timeoutId)
  }, [])

  /**
   * handleNftClick - Open the detail modal for the clicked NFT.
   * @param {Object} nft - The NFT object that was clicked
   */
  const handleNftClick = useCallback((nft) => {
    setSelectedNft(nft)
  }, [])

  /**
   * handleSearchKeyDown - Clear the search field when the user presses Escape.
   * @param {React.KeyboardEvent} event - Keyboard event from the search input
   */
  const handleSearchKeyDown = useCallback((event) => {
    if (event.key === 'Escape' && searchTerm) {
      event.preventDefault()
      setSearchTerm('')
    }
  }, [searchTerm])

  /**
   * closeModal - Dismiss the NFT detail modal and clear the selected token.
   * @returns {void}
   */
  const closeModal = useCallback(() => {
    setSelectedNft(null)
  }, [])

  // Trap focus and scroll in the detail modal; restore focus and scroll on close
  useEffect(() => {
    if (!selectedNft) return undefined

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeModal()
      }
    }

    const previousActiveElement = document.activeElement
    window.addEventListener('keydown', handleEscape)
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', handleEscape)
      if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
        previousActiveElement.focus()
      }
    }
  }, [closeModal, selectedNft])

  /**
   * filteredNfts - Filter the loaded NFTs by name, owner, token ID, or tokenURI.
   * Searching by '#<id>' matches the numeric token ID exactly.
   * @type {Array<Object>}
   */
  const filteredNfts = useMemo(() => nfts.filter(nft => {
    const idSearch = normalizedSearchTerm.startsWith('#')
      ? normalizedSearchTerm.slice(1)
      : normalizedSearchTerm
    const nftName     = String(nft?.name     || '').toLowerCase()
    const nftOwner    = String(nft?.owner    || '').toLowerCase()
    const nftTokenURI = String(nft?.tokenURI || '').toLowerCase()
    if (/^\d+$/.test(idSearch)) {
      return nft.id.toString() === idSearch
    }
    return nftName.includes(normalizedSearchTerm) ||
      nftOwner.includes(normalizedSearchTerm) ||
      nftTokenURI.includes(normalizedSearchTerm)
  }), [nfts, normalizedSearchTerm])
  const hasSearch = searchTerm.trim().length > 0
  const filteredLabel = filteredNfts.length === 1 ? 'item' : 'items'
  const totalLabel = nfts.length === 1 ? 'item' : 'items'

  /**
   * handleCardKeyDown - Trigger NFT click when Enter or Space is pressed on a card.
   * @param {React.KeyboardEvent} event - Keyboard event
   * @param {Object} nft - The NFT object for the focused card
   */
  const handleCardKeyDown = useCallback((event, nft) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleNftClick(nft)
    }
  }, [handleNftClick])

  if (isLoading) {
    const loadingCopy = 'Loading collection preview cards...'
    return (
      <section className="gallery" data-state="loading" data-count={String(GALLERY_SKELETON_COUNT)} aria-label="NFT Collection Gallery" aria-busy="true" aria-live="polite">
        <div className="gallery__header">
          <h2 className="gallery__title">Collection Gallery</h2>
        </div>
        <p className="gallery__loading-copy" data-copy-length={String(loadingCopy.length)}>{loadingCopy}</p>
        <div className={`gallery__grid gallery__grid--${safeViewMode}`} data-view-mode={safeViewMode} data-grid-id={gridId} role="list" aria-label="Loading gallery items">
          {Array.from({ length: GALLERY_SKELETON_COUNT }, (_, i) => i).map((i) => (
            <div key={i} className="nft-card nft-card--skeleton" role="listitem">
              <div className="skeleton skeleton--image"></div>
              <div className="nft-card__info">
                <div className="skeleton skeleton--title"></div>
                <div className="skeleton skeleton--owner"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (nfts.length === 0) {
    return (
      <section className="gallery" aria-label="NFT Collection Gallery">
        <div className="gallery__header">
          <h2 className="gallery__title">Collection Gallery</h2>
        </div>
        <div className="gallery__empty" role="status" aria-live="polite">
          <span className="gallery__empty-icon" aria-hidden="true">🖼️</span>
          <h3>No NFTs Yet</h3>
          <p>Be the first to mint an NFT from this collection!</p>
        </div>
      </section>
    )
  }

  if (filteredNfts.length === 0 && hasSearch) {
    return (
      <section className="gallery" aria-label="NFT Collection Gallery">
        <div className="gallery__header">
          <h2 className="gallery__title">Collection Gallery</h2>
          <div className="gallery__search">
            <input
              type="search"
              placeholder="Search by name, owner, or #123..."
              value={searchTerm}
              inputMode="search"
              enterKeyHint="search"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              aria-label="Search collection items"
              aria-describedby={searchHintId}
              title="Search NFTs by name, owner, or token id"
              className="search-input"
            />
          </div>
          <div className="gallery__controls">
            <button
              type="button"
              className={`view-btn ${safeViewMode === 'grid' ? 'view-btn--active' : ''}`}
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
              title="Grid view"
              aria-pressed={safeViewMode === 'grid'}
              aria-controls={gridId}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true" focusable="false">
                <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z" />
              </svg>
            </button>
            <button
              type="button"
              className={`view-btn ${safeViewMode === 'list' ? 'view-btn--active' : ''}`}
              onClick={() => setViewMode('list')}
              aria-label="List view"
              title="List view"
              aria-pressed={safeViewMode === 'list'}
              aria-controls={gridId}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true" focusable="false">
                <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" />
              </svg>
            </button>
          </div>
        </div>
        <p className="gallery__search-hint" id={searchHintId}>
          Search by name, owner, or <span>#token</span>. Press Escape to clear.
        </p>
        <div className="gallery__empty gallery__empty--search" role="status" aria-live="polite">
          <div className="gallery__empty-icon" aria-hidden="true">🔍</div>
          <h3>No matching NFTs</h3>
          <p>We couldn&#39;t find anything matching &quot;{searchTerm}&quot;</p>
          <button
            type="button"
            className="gallery__clear-btn"
            onClick={() => setSearchTerm('')}
            aria-label="Clear search query"
            title="Clear search query"
          >
            Clear Search
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="gallery" aria-label="NFT Collection Gallery">
      <div className="gallery__header">
        <h2 className="gallery__title">Collection Gallery</h2>
        <div className="gallery__search">
          <input
            type="search"
            placeholder="Search by name, owner, or #123..."
            value={searchTerm}
            inputMode="search"
            enterKeyHint="search"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            aria-label="Search collection items"
            aria-describedby={searchHintId}
            title="Search NFTs by name, owner, or token id"
            className="search-input"
          />
          {hasSearch && (
            <button
              type="button"
              className="gallery__clear-search"
              onClick={() => setSearchTerm('')}
              title="Clear search query"
              aria-label="Clear search query"
            >
              Clear
            </button>
          )}
        </div>
        <div className="gallery__controls">
          <button
            type="button"
            className={`view-btn ${safeViewMode === 'grid' ? 'view-btn--active' : ''}`}
            onClick={() => setViewMode('grid')}
            aria-label="Grid view"
            title="Grid view"
            aria-pressed={safeViewMode === 'grid'}
            aria-controls={gridId}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true" focusable="false">
              <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z" />
            </svg>
          </button>
          <button
            type="button"
            className={`view-btn ${safeViewMode === 'list' ? 'view-btn--active' : ''}`}
            onClick={() => setViewMode('list')}
            aria-label="List view"
            title="List view"
            aria-pressed={safeViewMode === 'list'}
            aria-controls={gridId}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true" focusable="false">
              <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" />
            </svg>
          </button>
        </div>
      </div>

      <p className="gallery__search-hint" id={searchHintId}>
        Search by name, owner, or <span>#token</span>. Press Escape to clear.
      </p>

      <p className="gallery__results" aria-live="polite" title="Current gallery result count">
        Showing {filteredNfts.length} {filteredLabel}
        {hasSearch ? ` matching "${searchTerm}"` : ''} out of {nfts.length} {totalLabel}.
      </p>

      <div id={gridId} className={`gallery__grid gallery__grid--${safeViewMode}`} data-result-count={filteredNfts.length} data-view={safeViewMode}>
        {filteredNfts.map((nft, index) => (
          <article
            key={nft.id}
            className="nft-card"
            style={{ '--index': index }}
            onClick={() => handleNftClick(nft)}
            role="button"
            tabIndex={0}
            aria-haspopup="dialog"
            aria-keyshortcuts="Enter Space"
            aria-label={`View details for ${nft.name}`}
            title={`View details for ${nft.name}`}
            onKeyDown={(event) => handleCardKeyDown(event, nft)}
          >
            <div className="nft-card__image-wrapper">
              <img
                src={nft.image}
                alt={nft.name}
                className="nft-card__image"
                loading="lazy"
                decoding="async"
                crossOrigin="anonymous"
              />
              <div className="nft-card__overlay" aria-hidden="true">
                <span>View Details</span>
              </div>
            </div>
            <div className="nft-card__info">
              <h3 className="nft-card__name" title={nft.name}>{nft.name}</h3>
              <p className="nft-card__owner">
                <span className="label">Owner:</span>
                <span className="value" title={nft.owner}>{formatAddress(nft.owner)}</span>
              </p>
            </div>
          </article>
        ))}
      </div>

      {selectedNft && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-modal-title"
            aria-describedby="gallery-modal-details"
          >
            <button
              ref={closeButtonRef}
              type="button"
              className="modal__close"
              onClick={closeModal}
              aria-label="Close NFT details"
              title="Close NFT details"
            >
              ×
            </button>
            <div className="modal__image">
              <img src={selectedNft.image} alt={selectedNft.name} title={selectedNft.name} decoding="async" fetchPriority="high" />
            </div>
            <div className="modal__content">
              <h2 id="gallery-modal-title" className="modal__title" title={selectedNft.name}>{selectedNft.name}</h2>
              <div className="modal__details" id="gallery-modal-details">
                <div className="detail-row">
                  <span className="detail-label">Token ID</span>
                  <span className="detail-pill detail-pill--id" title={`Token #${selectedNft.id}`}>#{selectedNft.id}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Owner</span>
                  <span className="detail-pill detail-pill--owner" title={selectedNft.owner}>{formatAddress(selectedNft.owner)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Token URI</span>
                  <span className="detail-value detail-value--mono" title={selectedNft.tokenURI}>
                    {selectedNft.tokenURI}
                  </span>
                </div>
              </div>
              <div className="modal__actions">
                <a
                  href={getTokenExplorerUrl(selectedNft.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal__btn"
                  aria-label={`View token #${selectedNft.id} on the explorer`}
                  title={`Open token #${selectedNft.id} on the explorer`}
                >
                  View on Explorer
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

/**
 * Default export for Gallery component.
 * @type {React.FC<GalleryProps>}
 */
export default Gallery
