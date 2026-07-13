import React from 'react'
import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { LoadingSkeleton } from './LoadingSkeleton'

describe('LoadingSkeleton', () => {
  it('applies numeric width and height values as pixel styles', () => {
      const markup = renderToStaticMarkup(
        React.createElement(LoadingSkeleton, { width: 120, height: 24 })
      )

      expect(markup).toContain('width:120px')
      expect(markup).toContain('height:24px')
    })

  it('applies the requested variant class to skeleton blocks', () => {
      const markup = renderToStaticMarkup(React.createElement(LoadingSkeleton, { variant: 'avatar' }))
      expect(markup).toContain('skeleton--avatar')
    })

  it('marks width and height metadata as false when dimensions are omitted', () => {
      const markup = renderToStaticMarkup(React.createElement(LoadingSkeleton))

      expect(markup).toContain('data-width-set="false"')
      expect(markup).toContain('data-height-set="false"')
    })

  it('emits data metadata and presentational role for each placeholder block', () => {
      const markup = renderToStaticMarkup(
        React.createElement(LoadingSkeleton, { variant: 'title', count: 2 })
      )

      expect(markup).toContain('data-variant="title"')
      expect(markup).toContain('data-index="0"')
      expect(markup).toContain('data-index="1"')
      expect(markup).toContain('data-count="2"')
      expect(markup).toContain('data-animated="true"')
      expect(markup).toContain('role="presentation"')
    })

  it('falls back to text variant for unsupported variant values', () => {
      const markup = renderToStaticMarkup(
        React.createElement(LoadingSkeleton, { variant: 'chip' })
      )

      expect(markup).toContain('skeleton--text')
      expect(markup).not.toContain('skeleton--chip')
    })

  it('preserves string-based width and height values', () => {
      const markup = renderToStaticMarkup(
        React.createElement(LoadingSkeleton, { width: '50%', height: '2rem' })
      )

      expect(markup).toContain('width:50%')
      expect(markup).toContain('height:2rem')
      expect(markup).toContain('data-width-set="true"')
      expect(markup).toContain('data-height-set="true"')
    })

  it('renders as many skeleton blocks as requested', () => {
      const markup = renderToStaticMarkup(
        React.createElement(LoadingSkeleton, { count: 3 })
      )

      expect(markup.match(/class="skeleton skeleton--text/g)?.length).toBe(3)
    })
})
