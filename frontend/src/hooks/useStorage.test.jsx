import { describe, expect, it } from 'vitest'
import storageHooks, { useLocalStorage, useSessionStorage } from './useStorage'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

function LocalStorageProbe() {
  const [value] = useLocalStorage('', 'fallback-value')
  return React.createElement('div', { 'data-value': String(value) })
}

function LocalStorageHasValueProbe() {
  const [, , , meta] = useLocalStorage('local-has-value-key', null)
  return React.createElement('div', { 'data-has-value': String(meta.hasValue) })
}

function LocalStorageMetaProbe() {
  const [, , , meta] = useLocalStorage('local-meta-key', 'local-meta-value')
  return React.createElement('div', {
    'data-has-value': String(meta.hasValue),
    'data-ready': String(meta.isReady)
  })
}

function LocalStorageMethodsProbe() {
  const [, setValue, removeValue] = useLocalStorage('local-methods-key', null)
  return React.createElement('div', {
    'data-set-type': typeof setValue,
    'data-remove-type': typeof removeValue
  })
}

function LocalStorageNonStringKeyProbe() {
  const [value] = useLocalStorage(undefined, 'local-nonstring-fallback')
  return React.createElement('div', { 'data-value': String(value) })
}

function SessionStorageProbe() {
  const [value] = useSessionStorage('', 'session-fallback')
  return React.createElement('div', { 'data-value': String(value) })
}

function SessionStorageHasValueProbe() {
  const [, , , meta] = useSessionStorage('session-has-value-key', false)
  return React.createElement('div', { 'data-has-value': String(meta.hasValue) })
}

function SessionStorageMetaProbe() {
  const [, , , meta] = useSessionStorage('session-meta-key', null)
  return React.createElement('div', { 'data-has-value': String(meta.hasValue) })
}

function SessionStorageMethodsProbe() {
  const [, setValue, removeValue] = useSessionStorage('session-methods-key', null)
  return React.createElement('div', {
    'data-set-type': typeof setValue,
    'data-remove-type': typeof removeValue
  })
}

function SessionStorageNonStringKeyProbe() {
  const [value] = useSessionStorage(undefined, 'session-nonstring-fallback')
  return React.createElement('div', { 'data-value': String(value) })
}

describe('useStorage module exports', () => {
  it('exposes both storage hooks on the default export object', () => {
      expect(storageHooks.useLocalStorage).toBe(useLocalStorage)
      expect(storageHooks.useSessionStorage).toBe(useSessionStorage)
    })
})

describe('useLocalStorage', () => {
  it('returns the initial value when storage key is blank', () => {
      const markup = renderToStaticMarkup(React.createElement(LocalStorageProbe))
      expect(markup).toContain('data-value="fallback-value"')
    })

  it('reports hasValue false when current value is null', () => {
      const markup = renderToStaticMarkup(React.createElement(LocalStorageHasValueProbe))
      expect(markup).toContain('data-has-value="false"')
    })

  it('exposes setter and remover methods as functions', () => {
      const markup = renderToStaticMarkup(React.createElement(LocalStorageMethodsProbe))
      expect(markup).toContain('data-set-type="function"')
      expect(markup).toContain('data-remove-type="function"')
    })

  it('returns initial value when key is not a string', () => {
      const markup = renderToStaticMarkup(React.createElement(LocalStorageNonStringKeyProbe))
      expect(markup).toContain('data-value="local-nonstring-fallback"')
    })

  it('marks isReady as false during server rendering', () => {
      const markup = renderToStaticMarkup(React.createElement(LocalStorageMetaProbe))
      expect(markup).toContain('data-ready="false"')
      expect(markup).toContain('data-has-value="true"')
    })
})

describe('useSessionStorage', () => {
  it('returns the initial value when storage key is blank', () => {
      const markup = renderToStaticMarkup(React.createElement(SessionStorageProbe))
      expect(markup).toContain('data-value="session-fallback"')
    })

  it('reports hasValue true for boolean false values', () => {
      const markup = renderToStaticMarkup(React.createElement(SessionStorageHasValueProbe))
      expect(markup).toContain('data-has-value="true"')
    })

  it('reports hasValue false when current value is null', () => {
      const markup = renderToStaticMarkup(React.createElement(SessionStorageMetaProbe))
      expect(markup).toContain('data-has-value="false"')
    })

  it('exposes setter and remover methods as functions', () => {
      const markup = renderToStaticMarkup(React.createElement(SessionStorageMethodsProbe))
      expect(markup).toContain('data-set-type="function"')
      expect(markup).toContain('data-remove-type="function"')
    })

  it('returns initial value when key is not a string', () => {
      const markup = renderToStaticMarkup(React.createElement(SessionStorageNonStringKeyProbe))
      expect(markup).toContain('data-value="session-nonstring-fallback"')
    })
})

