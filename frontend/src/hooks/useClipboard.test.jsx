import { describe, expect, it } from 'vitest'
import useClipboardDefault, { useClipboard } from './useClipboard'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

function ClipboardProbe() {
  const { copied, error } = useClipboard()
  return React.createElement('div', { 'data-copied': String(copied), 'data-error': String(error) })
}

function ClipboardMethodProbe() {
  const { copy, reset } = useClipboard()
  return React.createElement('div', { 'data-copy-type': typeof copy, 'data-reset-type': typeof reset })
}

function ClipboardTimeoutProbe() {
  const { copied, copy, reset } = useClipboard(0)
  return React.createElement('div', {
    'data-copied': String(copied),
    'data-copy-type': typeof copy,
    'data-reset-type': typeof reset
  })
}

describe('useClipboard module exports', () => {
  it('keeps default export aligned with named hook export', () => {
      expect(useClipboardDefault).toBe(useClipboard)
    })
})

describe('useClipboard', () => {
  it('starts with copied=false and error=null', () => {
      const markup = renderToStaticMarkup(React.createElement(ClipboardProbe))
      expect(markup).toContain('data-copied="false"')
      expect(markup).toContain('data-error="null"')
    })

  it('exposes copy and reset methods as functions', () => {
      const markup = renderToStaticMarkup(React.createElement(ClipboardMethodProbe))
      expect(markup).toContain('data-copy-type="function"')
      expect(markup).toContain('data-reset-type="function"')
    })

  it('stays usable when timeout is zero or non-positive', () => {
      const markup = renderToStaticMarkup(React.createElement(ClipboardTimeoutProbe))
      expect(markup).toContain('data-copied="false"')
      expect(markup).toContain('data-copy-type="function"')
      expect(markup).toContain('data-reset-type="function"')
    })
})

