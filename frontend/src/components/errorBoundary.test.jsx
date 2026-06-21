import { describe, expect, it } from 'vitest'
import ErrorBoundary from './ErrorBoundary'
import { renderToStaticMarkup } from 'react-dom/server'
import React from 'react'

describe('ErrorBoundary', () => {
  it('derives fallback state from runtime errors', () => {
      const nextState = ErrorBoundary.getDerivedStateFromError(new Error('Boom'))
      expect(nextState.hasError).toBe(true)
      expect(nextState.error).toBeInstanceOf(Error)
      expect(typeof nextState.errorMessage).toBe('string')
    })

  it('renders fallback action titles and normalized technical summary copy', () => {
      const boundary = new ErrorBoundary({ children: null })
      boundary.state = { hasError: true, error: new Error('Wallet timeout') }

      const markup = renderToStaticMarkup(boundary.render())
      expect(markup).toContain('title="Try rendering this section again"')
      expect(markup).toContain('title="Reload the application in this browser tab"')
      expect(markup).toContain('data-has-raw-message="true"')
      expect(markup).toContain('Technical details (development only)')
    })

  it('renders child content when no error has been captured', () => {
      const markup = renderToStaticMarkup(
        React.createElement(ErrorBoundary, null, React.createElement('p', null, 'Healthy UI'))
      )

      expect(markup).toContain('Healthy UI')
    })

  it('renders fallback UI when component state marks an error', () => {
      const boundary = new ErrorBoundary({ children: null })
      boundary.state = { hasError: true, error: new Error('Render failure') }

      const markup = renderToStaticMarkup(boundary.render())
      expect(markup).toContain('Something went wrong.')
      expect(markup).toContain('Refresh Page')
      expect(markup).toContain('Render failure')
      expect(markup).toContain('aria-label="Application error boundary"')
      expect(markup).toContain('aria-atomic="true"')
      expect(markup).toContain('data-state="error"')
      expect(markup).toContain('data-actions-count="2"')
    })
})
