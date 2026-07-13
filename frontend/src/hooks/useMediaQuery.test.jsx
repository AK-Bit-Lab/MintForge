import React from 'react'
import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import mediaHooks, {
  useHighContrast,
  useIsDesktop,
  useIsLandscape,
  useIsLargeDesktop,
  useIsMobile,
  useIsPortrait,
  useIsTablet,
  useMediaQuery,
  usePrefersDarkMode,
  usePrefersReducedMotion
} from './useMediaQuery'

function MediaQueryProbe({ query }) {
  const matches = useMediaQuery(query)
  return React.createElement('div', { 'data-matches': String(matches) })
}

function DarkModeProbe() {
  const matches = usePrefersDarkMode()
  return React.createElement('div', { 'data-prefers-dark': String(matches) })
}

function DesktopProbe() {
  const matches = useIsDesktop()
  return React.createElement('div', { 'data-desktop': String(matches) })
}

function HighContrastProbe() {
  const matches = useHighContrast()
  return React.createElement('div', { 'data-high-contrast': String(matches) })
}

function LandscapeProbe() {
  const matches = useIsLandscape()
  return React.createElement('div', { 'data-landscape': String(matches) })
}

function LargeDesktopProbe() {
  const matches = useIsLargeDesktop()
  return React.createElement('div', { 'data-large-desktop': String(matches) })
}

function MobileProbe() {
  const matches = useIsMobile()
  return React.createElement('div', { 'data-mobile': String(matches) })
}

function PortraitProbe() {
  const matches = useIsPortrait()
  return React.createElement('div', { 'data-portrait': String(matches) })
}

function ReducedMotionProbe() {
  const matches = usePrefersReducedMotion()
  return React.createElement('div', { 'data-prefers-reduced-motion': String(matches) })
}

function TabletProbe() {
  const matches = useIsTablet()
  return React.createElement('div', { 'data-tablet': String(matches) })
}

describe('useMediaQuery', () => {
  it('returns false when query is blank after trimming', () => {
      const markup = renderToStaticMarkup(React.createElement(MediaQueryProbe, { query: '   ' }))
      expect(markup).toContain('data-matches="false"')
    })

  it('returns false when query is not a string', () => {
      const markup = renderToStaticMarkup(React.createElement(MediaQueryProbe, { query: undefined }))
      expect(markup).toContain('data-matches="false"')
    })
})

describe('usePrefersDarkMode', () => {
  it('defaults to false during server rendering', () => {
      const markup = renderToStaticMarkup(React.createElement(DarkModeProbe))
      expect(markup).toContain('data-prefers-dark="false"')
    })
})

describe('useMediaQuery module exports', () => {
  it('exposes all media hooks on default export object', () => {
      expect(mediaHooks.useMediaQuery).toBe(useMediaQuery)
      expect(mediaHooks.useIsMobile).toBe(useIsMobile)
      expect(mediaHooks.useIsTablet).toBe(useIsTablet)
      expect(mediaHooks.useIsDesktop).toBe(useIsDesktop)
      expect(mediaHooks.useIsLargeDesktop).toBe(useIsLargeDesktop)
      expect(mediaHooks.useHighContrast).toBe(useHighContrast)
      expect(mediaHooks.useIsLandscape).toBe(useIsLandscape)
      expect(mediaHooks.useIsPortrait).toBe(useIsPortrait)
      expect(mediaHooks.usePrefersDarkMode).toBe(usePrefersDarkMode)
      expect(mediaHooks.usePrefersReducedMotion).toBe(usePrefersReducedMotion)
    })
})

describe('useIsDesktop', () => {
  it('defaults to false during server rendering', () => {
      const markup = renderToStaticMarkup(React.createElement(DesktopProbe))
      expect(markup).toContain('data-desktop="false"')
    })
})

describe('useHighContrast', () => {
  it('defaults to false during server rendering', () => {
      const markup = renderToStaticMarkup(React.createElement(HighContrastProbe))
      expect(markup).toContain('data-high-contrast="false"')
    })
})

describe('useIsLandscape', () => {
  it('defaults to false during server rendering', () => {
      const markup = renderToStaticMarkup(React.createElement(LandscapeProbe))
      expect(markup).toContain('data-landscape="false"')
    })
})

describe('useIsLargeDesktop', () => {
  it('defaults to false during server rendering', () => {
      const markup = renderToStaticMarkup(React.createElement(LargeDesktopProbe))
      expect(markup).toContain('data-large-desktop="false"')
    })
})

describe('useIsMobile', () => {
  it('defaults to false during server rendering', () => {
      const markup = renderToStaticMarkup(React.createElement(MobileProbe))
      expect(markup).toContain('data-mobile="false"')
    })
})

describe('useIsPortrait', () => {
  it('defaults to false during server rendering', () => {
      const markup = renderToStaticMarkup(React.createElement(PortraitProbe))
      expect(markup).toContain('data-portrait="false"')
    })
})

describe('usePrefersReducedMotion', () => {
  it('defaults to false during server rendering', () => {
      const markup = renderToStaticMarkup(React.createElement(ReducedMotionProbe))
      expect(markup).toContain('data-prefers-reduced-motion="false"')
    })
})

describe('useIsTablet', () => {
  it('defaults to false during server rendering', () => {
      const markup = renderToStaticMarkup(React.createElement(TabletProbe))
      expect(markup).toContain('data-tablet="false"')
    })
})

