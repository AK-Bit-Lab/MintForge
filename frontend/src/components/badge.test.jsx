import React from 'react'
import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { Badge } from './Badge'

describe('Badge', () => {
  it('includes custom class names in markup', () => {
      const markup = renderToStaticMarkup(React.createElement(Badge, { className: 'is-custom' }, 'Ready'))
      expect(markup).toContain('is-custom')
    })

  it('applies variant and size classes to badge output', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Badge, { variant: 'success', size: 'large', className: 'u-pill' }, 'Ready')
      )

      expect(markup).toContain('badge--success')
      expect(markup).toContain('badge--large')
      expect(markup).toContain('u-pill')
    })

  it('emits variant and size data attributes', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Badge, { variant: 'warning', size: 'small', dot: true }, 'Queued')
      )

      expect(markup).toContain('data-variant="warning"')
      expect(markup).toContain('data-tone="warning"')
      expect(markup).toContain('data-size="small"')
      expect(markup).toContain('data-dot="true"')
    })

  it('uses text content as fallback title metadata when title prop is omitted', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Badge, null, 'Pending approval')
      )

      expect(markup).toContain('title="Pending approval"')
      expect(markup).toContain('aria-label="Pending approval"')
      expect(markup).toContain('data-has-title="true"')
      expect(markup).toContain('data-label-length="16"')
    })

  it('does not render dot marker when dot mode is not enabled', () => {
      const markup = renderToStaticMarkup(React.createElement(Badge, null, 'Live'))
      expect(markup).toContain('data-dot="false"')
      expect(markup).not.toContain('badge__dot')
    })

  it('applies the primary-solid variant class', () => {
      const markup = renderToStaticMarkup(React.createElement(Badge, { variant: 'primary-solid' }, 'Mint'))
      expect(markup).toContain('badge--primary-solid')
    })

  it('renders child text content', () => {
      const markup = renderToStaticMarkup(React.createElement(Badge, null, 'Ready'))
      expect(markup).toContain('Ready')
    })

  it('renders default variant and size modifiers', () => {
      const markup = renderToStaticMarkup(React.createElement(Badge, null, 'Ready'))
      expect(markup).toContain('badge--default')
      expect(markup).toContain('badge--medium')
    })

  it('renders a dot marker when dot mode is enabled', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Badge, { dot: true }, 'Live')
      )

      expect(markup).toContain('badge__dot')
      expect(markup).toContain('Live')
    })
})
