import { describe, expect, it } from 'vitest'
import useTransactionStatusDefault, { useTransactionStatus } from './useTransaction'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

describe('useTransaction module exports', () => {
  it('keeps default export aligned with named hook export', () => {
      expect(useTransactionStatusDefault).toBe(useTransactionStatus)
    })
})

describe('useTransactionStatus', () => {
  it('starts idle when tx id is empty', () => {
      const markup = renderToStaticMarkup(React.createElement(TransactionProbe))
      expect(markup).toContain('data-status="null"')
      expect(markup).toContain('data-error="null"')
      expect(markup).toContain('data-loading="false"')
      expect(markup).toContain('data-confirmed="false"')
      expect(markup).toContain('data-pending="false"')
      expect(markup).toContain('data-failed="false"')
    })

  it('exposes refetch as a function', () => {
      const markup = renderToStaticMarkup(React.createElement(TransactionRefetchProbe))
      expect(markup).toContain('data-refetch-type="function"')
    })

  it('keeps static initial state during server rendering even with tx id', () => {
      const markup = renderToStaticMarkup(React.createElement(TransactionSsrProbe))
      expect(markup).toContain('data-status="null"')
      expect(markup).toContain('data-loading="false"')
    })
})

