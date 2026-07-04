import { describe, expect, it } from 'vitest'
import { formatFileSize } from './strings'

describe('formatFileSize', () => {
  it('returns zero bytes for a value of zero', () => {
    expect(formatFileSize(0)).toBe('0 B')
  })

  it('formats bytes below one kilobyte', () => {
    expect(formatFileSize(512)).toBe('512.0 B')
  })

  it('formats exactly one kilobyte', () => {
    expect(formatFileSize(1024)).toBe('1.0 KB')
  })

  it('formats fractional kilobyte values', () => {
    expect(formatFileSize(1536)).toBe('1.5 KB')
  })

  it('formats megabyte values', () => {
    expect(formatFileSize(1048576)).toBe('1.0 MB')
  })

  it('formats gigabyte values', () => {
    expect(formatFileSize(1073741824)).toBe('1.0 GB')
  })

  it('formats terabyte values', () => {
    expect(formatFileSize(1099511627776)).toBe('1.0 TB')
  })

  it('caps at terabyte unit for very large values', () => {
    expect(formatFileSize(1099511627776 * 1024)).toBe('1024.0 TB')
  })

  it('returns zero bytes for negative input', () => {
    expect(formatFileSize(-100)).toBe('0 B')
  })

  it('returns zero bytes for NaN input', () => {
    expect(formatFileSize(NaN)).toBe('0 B')
  })

  it('returns zero bytes for Infinity input', () => {
    expect(formatFileSize(Infinity)).toBe('0 B')
  })

  it('returns zero bytes for null input', () => {
    expect(formatFileSize(null)).toBe('0 B')
  })

  it('returns zero bytes for undefined input', () => {
    expect(formatFileSize(undefined)).toBe('0 B')
  })

  it('respects custom decimal places', () => {
    expect(formatFileSize(1536, 2)).toBe('1.50 KB')
  })

  it('falls back to one decimal for invalid decimal argument', () => {
    expect(formatFileSize(1536, -1)).toBe('1.5 KB')
  })

  it('falls back to one decimal for non-integer decimal argument', () => {
    expect(formatFileSize(1536, 2.5)).toBe('1.5 KB')
  })

  it('formats a small file size with default decimals', () => {
    expect(formatFileSize(256)).toBe('256.0 B')
  })

  it('formats a large megabyte value', () => {
    expect(formatFileSize(52428800)).toBe('50.0 MB')
  })
})
