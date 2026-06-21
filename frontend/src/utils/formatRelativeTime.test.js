import { describe, expect, it } from 'vitest'
import { formatRelativeTime } from './collection'

describe('formatRelativeTime', () => {
  it('switches to day labels at twenty-four hours', () => {
      const twentyFourHoursAgo = Date.now() - (24 * 60 * 60 * 1000)
      expect(formatRelativeTime(twentyFourHoursAgo)).toBe('1d ago')
    })

  it('keeps minute-based labels up to fifty-nine minutes', () => {
      const fiftyNineMinutesAgo = Date.now() - (59 * 60 * 1000)
      expect(formatRelativeTime(fiftyNineMinutesAgo)).toBe('59m ago')
    })

  it('switches to hour labels at sixty minutes', () => {
      const sixtyMinutesAgo = Date.now() - (60 * 60 * 1000)
      expect(formatRelativeTime(sixtyMinutesAgo)).toBe('1h ago')
    })

  it('returns day labels for multi-day differences', () => {
      const threeDaysAgo = Date.now() - 3 * 24 * 60 * 60 * 1000
      expect(formatRelativeTime(threeDaysAgo)).toBe('3d ago')
    })

  it('clamps future timestamps to just now', () => {
      const inTwoMinutes = Date.now() + 120000
      expect(formatRelativeTime(inTwoMinutes)).toBe('Just now')
    })

  it('returns hour labels for multi-hour differences', () => {
      const twoHoursAgo = Date.now() - 2 * 60 * 60 * 1000
      expect(formatRelativeTime(twoHoursAgo)).toBe('2h ago')
    })

  it('returns the neutral label for non-numeric string timestamps', () => {
      expect(formatRelativeTime('not-a-number')).toBe('Just now')
    })

  it('returns Just now when timestamp is null', () => {
      expect(formatRelativeTime(null)).toBe('Just now')
    })

  it('accepts second-based timestamps around one hour', () => {
      const timestamp = Math.floor(Date.now() / 1000) - (60 * 60)
      expect(formatRelativeTime(timestamp)).toBe('1h ago')
    })

  it('accepts millisecond timestamps provided as strings', () => {
      const timestamp = String(Date.now() - (2 * 60 * 60 * 1000))
      expect(formatRelativeTime(timestamp)).toBe('2h ago')
    })

  it('accepts second timestamps provided as strings', () => {
      const timestamp = String(Math.floor(Date.now() / 1000) - 3600)
      expect(formatRelativeTime(timestamp)).toBe('1h ago')
    })

  it('uses day labels for multi-day differences', () => {
      const timestamp = Date.now() - (2 * 24 * 60 * 60 * 1000)
      expect(formatRelativeTime(timestamp)).toBe('2d ago')
    })

  it('uses the hour label for two-hour differences', () => {
      const timestamp = Date.now() - (2 * 60 * 60 * 1000)
      expect(formatRelativeTime(timestamp)).toBe('2h ago')
    })

  it('returns Just now when timestamp is undefined', () => {
      expect(formatRelativeTime(undefined)).toBe('Just now')
    })
})
