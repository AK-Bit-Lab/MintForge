import { describe, expect, it } from 'vitest'
import { capitalize } from './strings'

describe('capitalize', () => {
  it('capitalizes values prefixed by carriage return characters', () => {
      expect(capitalize('\rhello')).toBe('Hello')
    })

  it('leaves emoji-prefixed strings unchanged', () => {
      expect(capitalize('🔥mint')).toBe('🔥mint')
    })

  it('keeps leading non-letter symbols unchanged', () => {
      expect(capitalize('#stacks')).toBe('#stacks')
    })

  it('ignores leading newline characters before capitalizing', () => {
      expect(capitalize('\nstacks')).toBe('Stacks')
    })

  it('returns empty string for non-string numeric input', () => {
      expect(capitalize(123)).toBe('')
    })

  it('changes only the first character casing', () => {
      expect(capitalize('mINT')).toBe('MINT')
    })

  it('preserves trailing whitespace while trimming only the start', () => {
      expect(capitalize('  stacks  ')).toBe('Stacks  ')
    })

  it('capitalizes single-character strings', () => {
      expect(capitalize('s')).toBe('S')
    })

  it('ignores tab prefixes before capitalization', () => {
      expect(capitalize('\tstacks')).toBe('Stacks')
    })

  it('preserves trailing spaces while trimming leading whitespace', () => {
      expect(capitalize('  hello  ')).toBe('Hello  ')
    })

  it('returns empty output for whitespace-only strings', () => {
      expect(capitalize('   ')).toBe('')
    })
})
