import { describe, expect, it } from 'vitest'
import useAsyncDefault, { useAsync } from './useAsync'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

const noopAsync = () => Promise.resolve(null)

function AsyncImmediateProbe() {
  const { isLoading, hasRun } = useAsync(noopAsync, { immediate: true })
  return React.createElement('div', { 'data-loading': String(isLoading), 'data-has-run': String(hasRun) })
}

function AsyncMetadataProbe() {
  const { executionCount, lastExecutedAt } = useAsync(noopAsync)
  return React.createElement('div', {
    'data-execution-count': String(executionCount),
    'data-last-executed-at': String(lastExecutedAt)
  })
}

function AsyncProbe() {
  const { data, error, isLoading, isSuccess, isError, hasRun } = useAsync(noopAsync)
  return React.createElement('div', {
    'data-data': String(data),
    'data-error': String(error),
    'data-loading': String(isLoading),
    'data-success': String(isSuccess),
    'data-is-error': String(isError),
    'data-has-run': String(hasRun)
  })
}

function AsyncMethodProbe() {
  const { execute, reset, clearError, retry, setData } = useAsync(noopAsync)
  return React.createElement('div', {
    'data-execute-type': typeof execute,
    'data-reset-type': typeof reset,
    'data-clear-error-type': typeof clearError,
    'data-retry-type': typeof retry,
    'data-set-data-type': typeof setData
  })
}

describe('useAsync module exports', () => {
  it('keeps default export aligned with named hook export', () => {
      expect(useAsyncDefault).toBe(useAsync)
    })
})

describe('useAsync', () => {
  it('remains static during server rendering even with immediate option', () => {
      const markup = renderToStaticMarkup(React.createElement(AsyncImmediateProbe))
      expect(markup).toContain('data-loading="false"')
      expect(markup).toContain('data-has-run="false"')
    })

  it('starts with zero execution metadata', () => {
      const markup = renderToStaticMarkup(React.createElement(AsyncMetadataProbe))
      expect(markup).toContain('data-execution-count="0"')
      expect(markup).toContain('data-last-executed-at="null"')
    })

  it('starts with idle state before execution', () => {
      const markup = renderToStaticMarkup(React.createElement(AsyncProbe))
      expect(markup).toContain('data-data="null"')
      expect(markup).toContain('data-error="null"')
      expect(markup).toContain('data-loading="false"')
      expect(markup).toContain('data-success="false"')
      expect(markup).toContain('data-is-error="false"')
      expect(markup).toContain('data-has-run="false"')
    })

  it('exposes control methods as functions', () => {
      const markup = renderToStaticMarkup(React.createElement(AsyncMethodProbe))
      expect(markup).toContain('data-execute-type="function"')
      expect(markup).toContain('data-reset-type="function"')
      expect(markup).toContain('data-clear-error-type="function"')
      expect(markup).toContain('data-retry-type="function"')
      expect(markup).toContain('data-set-data-type="function"')
    })
})

