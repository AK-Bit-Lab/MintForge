import React from 'react'
import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { CopyButton } from './CopyButton'

describe('CopyButton', () => {
  it('marks label updates as polite announcements for assistive tech', () => {
      const markup = renderToStaticMarkup(
        React.createElement(CopyButton, {
          text: 'SP123',
          label: 'Copy address'
        })
      )

      expect(markup).toContain('aria-live="polite"')
      expect(markup).toContain('aria-atomic="true"')
    })

  it('applies custom class names to the root button element', () => {
      const markup = renderToStaticMarkup(
        React.createElement(CopyButton, { text: 'SP123', className: 'u-inline' })
      )

      expect(markup).toContain('u-inline')
    })

  it('renders the default Copy label when no custom label is passed', () => {
      const markup = renderToStaticMarkup(React.createElement(CopyButton, { text: 'SP123' }))
      expect(markup).toContain('Copy')
    })

  it('uses a descriptive disabled title when there is nothing to copy', () => {
      const markup = renderToStaticMarkup(
        React.createElement(CopyButton, {
          text: '   '
        })
      )

      expect(markup).toContain('title="Nothing to copy yet"')
    })

  it('stays disabled when the copy value is only whitespace', () => {
      const markup = renderToStaticMarkup(
        React.createElement(CopyButton, { text: '   ' })
      )

      expect(markup).toContain('disabled=""')
    })

  it('renders as disabled when no text value is provided', () => {
      const markup = renderToStaticMarkup(React.createElement(CopyButton))
      expect(markup).toContain('disabled=""')
    })

  it('remains enabled when a copy target is provided', () => {
      const markup = renderToStaticMarkup(React.createElement(CopyButton, { text: 'SP123' }))
      expect(markup).not.toContain('disabled=""')
    })

  it('exposes idle data-state when no copy has occurred', () => {
      const markup = renderToStaticMarkup(
        React.createElement(CopyButton, {
          text: 'SP123',
          label: 'Copy address'
        })
      )

      expect(markup).toContain('data-state="idle"')
      expect(markup).toContain('data-has-text="true"')
      expect(markup).toContain('data-disabled="false"')
    })

  it('renders custom button label text when supplied', () => {
      const markup = renderToStaticMarkup(
        React.createElement(CopyButton, { text: 'SP123', label: 'Copy Address' })
      )

      expect(markup).toContain('Copy Address')
    })

  it('renders an icon container inside the button', () => {
      const markup = renderToStaticMarkup(React.createElement(CopyButton, { text: 'SP123' }))
      expect(markup).toContain('copy-btn__icon')
    })

  it('uses the visible label as the aria-label when idle', () => {
      const markup = renderToStaticMarkup(
        React.createElement(CopyButton, { text: 'SP123', label: 'Copy address' })
      )

      expect(markup).toContain('aria-label="Copy address"')
    })
})
