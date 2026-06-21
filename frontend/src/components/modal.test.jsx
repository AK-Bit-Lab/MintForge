import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { Modal } from './Modal'

describe('Modal', () => {
  it('applies custom modal size classes when provided', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Modal, {
          isOpen: true,
          size: 'large',
          onClose: vi.fn(),
          children: React.createElement('p', null, 'Body')
        })
      )

      expect(markup).toContain('modal--large')
    })

  it('adds aria-keyshortcuts metadata on the close control', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Modal, {
          isOpen: true,
          onClose: () => {},
          title: 'Settings',
          children: React.createElement('p', null, 'Body content')
        })
      )

      expect(markup).toContain('aria-keyshortcuts="Escape"')
    })

  it('renders no markup when closed', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Modal, {
          isOpen: false,
          onClose: vi.fn(),
          title: 'Mint details',
          children: React.createElement('p', null, 'Body')
        })
      )

      expect(markup).toBe('')
    })

  it('renders dialog role attributes when open', () => {
      const markup = renderToStaticMarkup(React.createElement(Modal, {
        isOpen: true,
        onClose: () => {},
        title: 'Details'
      }, 'Body'))

      expect(markup).toContain('role="dialog"')
      expect(markup).toContain('data-size="medium"')
      expect(markup).toContain('data-state="open"')
    })

  it('renders title text and dialog semantics when open', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Modal, {
          isOpen: true,
          onClose: vi.fn(),
          title: 'Mint details',
          children: React.createElement('p', null, 'Body')
        })
      )

      expect(markup).toContain('role="dialog"')
      expect(markup).toContain('Mint details')
      expect(markup).toContain('data-has-body="true"')
    })

  it('sets an accessible dialog label when title is not provided', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Modal, {
          isOpen: true,
          onClose: vi.fn(),
          children: React.createElement('p', null, 'Body')
        })
      )

      expect(markup).toContain('aria-label="Dialog"')
      expect(markup).toContain('data-title-present="false"')
    })

  it('wires dialog description to the modal body region', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Modal, {
          isOpen: true,
          onClose: () => {},
          title: 'Mint details',
          children: React.createElement('p', null, 'Body content')
        })
      )

      expect(markup).toContain('aria-describedby=')
    })

  it('applies dialog semantics to the modal panel instead of the overlay', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Modal, {
          isOpen: true,
          onClose: () => {},
          title: 'Details'
        }, 'Body')
      )

      expect(markup).toContain('class="modal-overlay"')
      expect(markup).toContain('role="presentation"')
      expect(markup).toContain('class="modal modal--medium"')
      expect(markup).toContain('role="dialog"')
    })

  it('renders an accessible close button label', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Modal, {
          isOpen: true,
          onClose: vi.fn(),
          children: React.createElement('p', null, 'Body')
        })
      )

      expect(markup).toContain('aria-label="Close modal"')
    })

  it('sets aria-modal to true when rendered open', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Modal, {
          isOpen: true,
          onClose: vi.fn(),
          children: React.createElement('p', null, 'Body')
        })
      )

      expect(markup).toContain('aria-modal="true"')
    })
})
