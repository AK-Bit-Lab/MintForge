import React from 'react'
import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import useToastDefault, {
  normalizeToastDuration,
  normalizeToastMessage,
  normalizeToastType,
  trimToastQueue,
  useToast
} from './useToast'

function ToastMethodProbe() {
  const { addToast, showToast, removeToast, clearAll } = useToast()
  return React.createElement('div', {
    'data-add-type': typeof addToast,
    'data-show-type': typeof showToast,
    'data-remove-type': typeof removeToast,
    'data-clear-type': typeof clearAll
  })
}

function ToastStateProbe() {
  const { count, hasToasts, latestToast, toasts } = useToast()
  return React.createElement('div', {
    'data-count': String(count),
    'data-has-toasts': String(hasToasts),
    'data-latest-toast': String(latestToast),
    'data-toasts-length': String(toasts.length)
  })
}

function ToastAliasProbe() {
  const { addToast, showToast } = useToast()
  return React.createElement('div', { 'data-show-is-add': String(showToast === addToast) })
}

function ToastVariantMethodProbe() {
  const { success, error, warning, info, persistent } = useToast()
  return React.createElement('div', {
    'data-success-type': typeof success,
    'data-error-type': typeof error,
    'data-warning-type': typeof warning,
    'data-info-type': typeof info,
    'data-persistent-type': typeof persistent
  })
}

describe('useToast', () => {
  it('exposes core toast queue methods as functions', () => {
      const markup = renderToStaticMarkup(React.createElement(ToastMethodProbe))
      expect(markup).toContain('data-add-type="function"')
      expect(markup).toContain('data-show-type="function"')
      expect(markup).toContain('data-remove-type="function"')
      expect(markup).toContain('data-clear-type="function"')
    })

  it('starts with an empty queue and no latest toast', () => {
      const markup = renderToStaticMarkup(React.createElement(ToastStateProbe))
      expect(markup).toContain('data-count="0"')
      expect(markup).toContain('data-has-toasts="false"')
      expect(markup).toContain('data-latest-toast="null"')
      expect(markup).toContain('data-toasts-length="0"')
    })

  it('keeps showToast aliased to addToast', () => {
      const markup = renderToStaticMarkup(React.createElement(ToastAliasProbe))
      expect(markup).toContain('data-show-is-add="true"')
    })

  it('exposes variant convenience methods as functions', () => {
      const markup = renderToStaticMarkup(React.createElement(ToastVariantMethodProbe))
      expect(markup).toContain('data-success-type="function"')
      expect(markup).toContain('data-error-type="function"')
      expect(markup).toContain('data-warning-type="function"')
      expect(markup).toContain('data-info-type="function"')
      expect(markup).toContain('data-persistent-type="function"')
    })
})

describe('useToast module exports', () => {
  it('keeps default export aligned with named hook export', () => {
      expect(useToastDefault).toBe(useToast)
    })
})

describe('normalizeToastDuration', () => {
  it('keeps positive finite durations unchanged', () => {
      expect(normalizeToastDuration(1800, 3000)).toBe(1800)
    })
})

describe('normalizeToastMessage', () => {
  it('stringifies non-string values for rendering', () => {
      const payload = { text: 'Minted' }
      expect(normalizeToastMessage(payload)).toBe('[object Object]')
    })
})

describe('useToast helpers', () => {
  it('trims leading and trailing whitespace from toast messages', () => {
      expect(normalizeToastMessage('  Mint submitted  ')).toBe('Mint submitted')
    })

  it('normalizes unknown toast types back to info', () => {
      expect(normalizeToastType('success')).toBe('success')
      expect(normalizeToastType('celebration')).toBe('info')
    })

  it('clamps negative durations to zero', () => {
      expect(normalizeToastDuration(-200)).toBe(0)
    })

  it('falls back to the provided default for non-finite durations', () => {
      expect(normalizeToastDuration(Number.NaN, 2500)).toBe(2500)
    })

  it('keeps the newest toasts when queue exceeds the configured max', () => {
      const toasts = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
      const { trimmedToasts, removedToasts } = trimToastQueue(toasts, 2)

      expect(trimmedToasts).toEqual([{ id: 3 }, { id: 4 }])
      expect(removedToasts).toEqual([{ id: 1 }, { id: 2 }])
    })
})

describe('trimToastQueue', () => {
  it('keeps all items when queue size exactly matches max', () => {
      const toasts = [{ id: 1 }, { id: 2 }, { id: 3 }]
      const { trimmedToasts, removedToasts } = trimToastQueue(toasts, 3)

      expect(trimmedToasts).toEqual(toasts)
      expect(removedToasts).toEqual([])
    })

  it('returns original queue when count is within configured max', () => {
      const toasts = [{ id: 1 }, { id: 2 }]
      const { trimmedToasts, removedToasts } = trimToastQueue(toasts, 3)

      expect(trimmedToasts).toEqual(toasts)
      expect(removedToasts).toEqual([])
    })
})

describe('normalizeToastType', () => {
  it('preserves supported warning toast type', () => {
      expect(normalizeToastType('warning')).toBe('warning')
    })
})

