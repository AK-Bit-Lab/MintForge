import React from 'react'
import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { CardFooter } from './Card'

describe('CardFooter', () => {
  it('applies custom class names on card footer sections', () => {
      const markup = renderToStaticMarkup(React.createElement(CardFooter, { className: 'u-tight' }, 'Footer'))
      expect(markup).toContain('u-tight')
    })

  it('renders children inside the card footer container', () => {
      const markup = renderToStaticMarkup(
        React.createElement(CardFooter, null, React.createElement('span', null, 'Footer actions'))
      )

      expect(markup).toContain('card__footer')
      expect(markup).toContain('Footer actions')
    })
})
