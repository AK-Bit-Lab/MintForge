import React from 'react'
import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { CardHeader } from './Card'

describe('CardHeader', () => {
  it('applies custom class names on card headers', () => {
      const markup = renderToStaticMarkup(React.createElement(CardHeader, { className: 'u-tight' }, 'Title'))
      expect(markup).toContain('u-tight')
    })

  it('renders children inside the card header container', () => {
      const markup = renderToStaticMarkup(
        React.createElement(CardHeader, null, React.createElement('h3', null, 'Mint details'))
      )

      expect(markup).toContain('card__header')
      expect(markup).toContain('Mint details')
    })
})
