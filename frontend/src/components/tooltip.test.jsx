import React from 'react'
import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { Tooltip } from './Tooltip'

describe('Tooltip', () => {
  it('marks tooltip wrapper as hidden before interaction', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Tooltip, { content: 'Network details' }, React.createElement('button', null, 'Info'))
      )

      expect(markup).toContain('data-visible="false"')
    })

  it('emits normalized position metadata on the wrapper', () => {
      const explicitMarkup = renderToStaticMarkup(
        React.createElement(
          Tooltip,
          { content: 'Mint fee', position: 'right', delay: 450 },
          React.createElement('button', null, 'Info')
        )
      )
      const fallbackMarkup = renderToStaticMarkup(
        React.createElement(
          Tooltip,
          { content: 'Mint fee', position: 'center', delay: -1 },
          React.createElement('button', null, 'Info')
        )
      )

      expect(explicitMarkup).toContain('data-position="right"')
      expect(explicitMarkup).toContain('data-delay="450"')
      expect(fallbackMarkup).toContain('data-position="top"')
      expect(fallbackMarkup).toContain('data-delay="300"')
    })

  it('trims string content before applying wrapper title metadata', () => {
      const markup = renderToStaticMarkup(
        React.createElement(Tooltip, { content: '  Wallet status  ' }, React.createElement('span', null, 'Status'))
      )

      expect(markup).toContain('title="Wallet status"')
      expect(markup).toContain('data-has-content="true"')
      expect(markup).toContain('data-content-length="13"')
      expect(markup).not.toContain('title="  Wallet status  "')
    })
})
