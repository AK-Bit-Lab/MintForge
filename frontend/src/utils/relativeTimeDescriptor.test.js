import { describe, expect, it } from 'vitest'
import { getRelativeTimeDescriptor, normalizeRelativeTimestamp } from './collection'

describe('getRelativeTimeDescriptor', () => {
  it('returns day descriptor for multi-day timestamps', () => {
      const now = Date.now()
      const descriptor = getRelativeTimeDescriptor(now - 3 * 86_400_000, now)

      expect(descriptor).toEqual({ label: '3d ago', unit: 'day', value: 3, isFuture: false })
    })

  it('returns hour descriptor for hour-scale timestamps', () => {
      const now = Date.now()
      const descriptor = getRelativeTimeDescriptor(now - 2 * 3_600_000, now)

      expect(descriptor).toEqual({ label: '2h ago', unit: 'hour', value: 2, isFuture: false })
    })

  it('returns minute descriptor for recent timestamps', () => {
      const now = Date.now()
      const descriptor = getRelativeTimeDescriptor(now - 5 * 60_000, now)

      expect(descriptor).toEqual({ label: '5m ago', unit: 'minute', value: 5, isFuture: false })
    })

  it('returns month descriptor for long-running timestamps', () => {
      const now = Date.now()
      const descriptor = getRelativeTimeDescriptor(now - 62 * 86_400_000, now)

      expect(descriptor).toEqual({ label: '2mo ago', unit: 'month', value: 2, isFuture: false })
    })

  it('returns now descriptor for null timestamps', () => {
      expect(getRelativeTimeDescriptor(null)).toEqual({ label: 'Just now', unit: 'now', value: 0, isFuture: false })
    })
})

describe('normalizeRelativeTimestamp', () => {
  it('converts second-based timestamps to milliseconds', () => {
      expect(normalizeRelativeTimestamp(1_700_000_000)).toBe(1_700_000_000_000)
    })
})

