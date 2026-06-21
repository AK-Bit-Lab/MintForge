import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { Card } from './Card'

describe('Card', () => {
  it('adds clickable class when click handlers are supplied', () => {
      const markup = renderToStaticMarkup(React.createElement(Card, { onClick: vi.fn() }, 'Body'))
      expect(markup).toContain('card--clickable')
    })

  it('forwards custom class names to the root card element', () => {
      const markup = renderToStaticMarkup(React.createElement(Card, { className: 'u-shadow' }, 'Body'))
      expect(markup).toContain('u-shadow')
    })

  it('forwards aria-describedby ids for assistive descriptions', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Card, { ariaDescriptionId: 'card-copy' }, 'Body')
      )

      expect(markup).toContain('aria-describedby="card-copy"')
    })

  it('adds hover styling class when hover is enabled', () => {
      const markup = renderToStaticMarkup(React.createElement(Card, { hover: true }, 'Body'))
      expect(markup).toContain('card--hover')
      expect(markup).toContain('data-hover="true"')
    })

  it('applies requested padding modifier classes', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Card, { padding: 'large' }, 'Body')
      )

      expect(markup).toContain('card--padding-large')
    })

  it('includes Enter and Space keyboard shortcut metadata when clickable', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Card, { onClick: () => {} }, 'Clickable')
      )

      expect(markup).toContain('aria-keyshortcuts="Enter Space"')
    })

  it('sets keyboard tab index when card is interactive', () => {
      const markup = renderToStaticMarkup(React.createElement(Card, { onClick: vi.fn() }, 'Body'))
      expect(markup).toContain('tabindex="0"')
    })

  it('emits data-clickable true or false based on click handler presence', () => {
      const clickableMarkup = renderToStaticMarkup(
        React.createElement(Card, { onClick: () => {} }, 'Clickable')
      )
      const staticMarkup = renderToStaticMarkup(
        React.createElement(Card, null, 'Static')
      )

      expect(clickableMarkup).toContain('data-clickable="true"')
      expect(clickableMarkup).toContain('data-role="button"')
      expect(staticMarkup).toContain('data-clickable="false"')
      expect(staticMarkup).toContain('data-role="region"')
    })

  it('does not set tab index when card is not interactive', () => {
      const markup = renderToStaticMarkup(React.createElement(Card, null, 'Body'))
      expect(markup).not.toContain('tabindex="0"')
    })

  it('omits button semantics when no click handler is provided', () => {
      const markup = renderToStaticMarkup(React.createElement(Card, null, 'Body'))
      expect(markup).not.toContain('role="button"')
    })

  it('forwards aria-label when the card is clickable', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Card, { onClick: vi.fn(), ariaLabel: 'Open mint details' }, 'Body')
      )

      expect(markup).toContain('aria-label="Open mint details"')
    })

  it('renders button semantics when click handlers are supplied', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Card, { onClick: vi.fn(), ariaLabel: 'Open card' }, 'Body')
      )

      expect(markup).toContain('role="button"')
      expect(markup).toContain('tabindex="0"')
    })

  it('renders default variant and padding classes', () => {
      const markup = renderToStaticMarkup(React.createElement(Card, null, 'Body'))
      expect(markup).toContain('card--default')
      expect(markup).toContain('card--padding-medium')
      expect(markup).toContain('data-variant="default"')
      expect(markup).toContain('data-padding="medium"')
    })

  it('applies selected variant class modifiers', () => {
      const markup = renderToStaticMarkup(React.createElement(Card, { variant: 'elevated' }, 'Body'))
      expect(markup).toContain('card--elevated')
    })
})
