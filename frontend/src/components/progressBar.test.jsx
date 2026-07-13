import React from 'react'
import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { ProgressBar } from './ProgressBar'

describe('ProgressBar', () => {
  it('forwards custom aria labels to the progressbar element', () => {
      const markup = renderToStaticMarkup(React.createElement(ProgressBar, { value: 10, ariaLabel: 'Mint completion' }))
      expect(markup).toContain('aria-label="Mint completion"')
    })

  it('caps progress width at one hundred percent for oversized values', () => {
      const markup = renderToStaticMarkup(
        React.createElement(ProgressBar, { value: 120, max: 100 })
      )

      expect(markup).toContain('width:100%')
      expect(markup).toContain('aria-valuenow="100"')
      expect(markup).toContain('data-valuenow="100"')
    })

  it('floors progress values at zero for negative inputs', () => {
      const markup = renderToStaticMarkup(
        React.createElement(ProgressBar, { value: -12, max: 100 })
      )

      expect(markup).toContain('width:0%')
      expect(markup).toContain('aria-valuenow="0"')
    })

  it('uses the default aria label when none is provided', () => {
      const markup = renderToStaticMarkup(React.createElement(ProgressBar, { value: 10 }))
      expect(markup).toContain('aria-label="Progress"')
    })

  it('uses medium sizing class by default', () => {
      const markup = renderToStaticMarkup(React.createElement(ProgressBar, { value: 10 }))
      expect(markup).toContain('progress--medium')
    })

  it('emits selected size and color as data attributes', () => {
      const markup = renderToStaticMarkup(
        React.createElement(ProgressBar, { value: 10, size: 'large', color: 'danger' })
      )

      expect(markup).toContain('data-size="large"')
      expect(markup).toContain('data-color="danger"')
      expect(markup).toContain('data-show-label="true"')
      expect(markup).toContain('data-max="100"')
    })

  it('falls back to max 100 when provided max is zero or negative', () => {
      const markup = renderToStaticMarkup(React.createElement(ProgressBar, { value: 20, max: 0 }))
      expect(markup).toContain('aria-valuemax="100"')
    })

  it('omits percentage label text when showLabel is false', () => {
      const markup = renderToStaticMarkup(
        React.createElement(ProgressBar, { value: 25, max: 100, showLabel: false })
      )

      expect(markup).not.toContain('progress__label')
      expect(markup).toContain('aria-valuenow="25"')
    })

  it('falls back to primary color metadata for unsupported tones', () => {
      const markup = renderToStaticMarkup(
        React.createElement(ProgressBar, { value: 10, color: 'neon' })
      )

      expect(markup).toContain('data-color="primary"')
      expect(markup).toContain('progress__fill--primary')
    })

  it('uses zero progress when value is not a finite number', () => {
      const markup = renderToStaticMarkup(
        React.createElement(ProgressBar, { value: Number.NaN, max: 100 })
      )

      expect(markup).toContain('aria-valuenow="0"')
      expect(markup).toContain('width:0%')
    })

  it('renders percentage labels rounded to one decimal place', () => {
      const markup = renderToStaticMarkup(React.createElement(ProgressBar, { value: 1, max: 3 }))
      expect(markup).toContain('33.3%')
      expect(markup).toContain('data-percentage="33.3"')
    })

  it('sets aria-valuetext to the formatted percentage', () => {
      const markup = renderToStaticMarkup(
        React.createElement(ProgressBar, { value: 25, max: 50, showLabel: false })
      )

      expect(markup).toContain('aria-valuetext="50% (25 of 50)"')
    })
})
