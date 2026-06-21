import React from 'react'
import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { Spinner } from './Spinner'

describe('Spinner', () => {
  it('applies size, tone, and custom class names', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Spinner, { size: 'small', tone: 'success', className: 'u-test' })
      )

      expect(markup).toContain('spinner--small')
      expect(markup).toContain('spinner--success')
      expect(markup).toContain('u-test')
    })

  it('uses medium size class by default', () => {
      const markup = renderToStaticMarkup(React.createElement(Spinner))
      expect(markup).toContain('spinner--medium')
    })

  it('uses primary tone class by default', () => {
      const markup = renderToStaticMarkup(React.createElement(Spinner))
      expect(markup).toContain('spinner--primary')
    })

  it('emits live-region and ring metadata for UI targeting', () => {
      const markup = renderToStaticMarkup(React.createElement(Spinner))

      expect(markup).toContain('data-live="polite"')
      expect(markup).toContain('data-part="ring"')
    })

  it('emits configured size and tone as data attributes', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Spinner, { size: 'large', tone: 'success', label: 'Loading mint' })
      )

      expect(markup).toContain('data-size="large"')
      expect(markup).toContain('data-tone="success"')
      expect(markup).toContain('data-label-length="12"')
    })

  it('renders the internal spinner ring element', () => {
      const markup = renderToStaticMarkup(React.createElement(Spinner))
      expect(markup).toContain('spinner__ring')
    })

  it('renders with a status role for assistive technologies', () => {
      const markup = renderToStaticMarkup(React.createElement(Spinner))
      expect(markup).toContain('role="status"')
      expect(markup).toContain('aria-busy="true"')
      expect(markup).toContain('aria-label="Loading content"')
    })

  it('mirrors the loading label to the title attribute', () => {
      const markup = renderToStaticMarkup(React.createElement(Spinner, { label: 'Processing mint request' }))

      expect(markup).toContain('title="Processing mint request"')
    })
})
