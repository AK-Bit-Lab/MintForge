import React from 'react'
import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { Gallery } from './Gallery'

describe('Gallery', () => {
  it('renders loading placeholders on initial server render', () => {
      const markup = renderToStaticMarkup(React.createElement(Gallery))
      expect(markup).toContain('Collection Gallery')
      expect(markup).toContain('Loading collection preview cards...')
      expect(markup).toContain('aria-live="polite"')
      expect(markup).toContain('nft-card--skeleton')
    })

  it('emits loading grid metadata and list semantics for skeleton cards', () => {
      const markup = renderToStaticMarkup(React.createElement(Gallery))

      expect(markup).toContain('data-state="loading"')
      expect(markup).toContain('data-view-mode="grid"')
      expect(markup).toContain('data-count="4"')
      expect(markup).toContain('aria-label="Loading gallery items"')
      expect(markup).toContain('role="listitem"')
    })

  it('does not render search input while loading placeholders are visible', () => {
      const markup = renderToStaticMarkup(React.createElement(Gallery))
      expect(markup).not.toContain('type="search"')
    })

  it('renders four loading cards before gallery data is hydrated', () => {
      const markup = renderToStaticMarkup(React.createElement(Gallery))
      expect(markup.match(/nft-card--skeleton/g)?.length).toBe(4)
      expect(markup).toContain('data-copy-length="35"')
    })

  it('uses grid view modifier class in initial loading render', () => {
      const markup = renderToStaticMarkup(React.createElement(Gallery))
      expect(markup).toContain('gallery__grid--grid')
      expect(markup).toContain('data-grid-id="')
    })
})
