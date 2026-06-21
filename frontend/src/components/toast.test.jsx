import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { Toast } from './Toast'

describe('Toast', () => {
  it('marks toast as dismissible when close handler is provided', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Toast, { message: 'Done', type: 'success', onClose: vi.fn() })
      )

      expect(markup).toContain('data-dismissible="true"')
      expect(markup).toContain('Dismiss success notification')
    })

  it('uses alert semantics for error notifications', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Toast, { type: 'error', message: 'Mint failed' })
      )

      expect(markup).toContain('role="alert"')
      expect(markup).toContain('aria-live="assertive"')
    })

  it('uses default notification copy when message is blank', () => {
      const markup = renderToStaticMarkup(React.createElement(Toast, { type: 'info', message: '   ' }))

      expect(markup).toContain('Notification received.')
    })

  it('uses polite status semantics for informational toasts', () => {
      const markup = renderToStaticMarkup(React.createElement(Toast, { type: 'info', message: 'FYI' }))
      expect(markup).toContain('role="status"')
      expect(markup).toContain('aria-live="polite"')
      expect(markup).toContain('data-type="info"')
      expect(markup).toContain('data-dismissible="false"')
    })

  it('falls back to info semantics for unknown toast types', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Toast, { message: 'Heads up', type: 'custom' })
      )

      expect(markup).toContain('toast--info')
      expect(markup).toContain('aria-label="info notification"')
    })

  it('does not render a dismiss button without an onClose callback', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Toast, { type: 'info', message: 'Heads up' })
      )

      expect(markup).not.toContain('toast__close')
    })

  it('renders a dismiss button when onClose is provided', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Toast, {
          type: 'success',
          message: 'Done',
          onClose: vi.fn()
        })
      )

      expect(markup).toContain('toast__close')
      expect(markup).toContain('Dismiss success notification')
      expect(markup).toContain('title="Dismiss success notification"')
      expect(markup).toContain('data-dismissible="true"')
      expect(markup).toContain('aria-keyshortcuts="Escape"')
    })

  it('renders the success checkmark icon', () => {
      const markup = renderToStaticMarkup(React.createElement(Toast, { message: 'Done', type: 'success' }))
      expect(markup).toContain('✓')
    })

  it('renders warning glyph for warning toast type', () => {
      const markup = renderToStaticMarkup(React.createElement(Toast, { type: 'warning', message: 'Careful' }))
      expect(markup).toContain('⚠')
    })
})
