import { describe, expect, it } from 'vitest'
import {
  getAddressExplorerLinkLabel,
  getAddressExplorerUrl,
  getContractExplorerUrl,
  getExplorerLinkLabel,
  getExplorerUrl,
  getTokenExplorerLinkLabel,
  getTokenExplorerUrl,
  getTxExplorerLinkLabel,
  normalizeExplorerType
} from './contract'

// Regression note: preserve contract behavior coverage.
// Scope note: validates contract behavior for regressions.
describe('contract explorer helpers', () => {
  it('builds transaction explorer links on the configured network', () => {
    expect(getExplorerUrl('0xabc')).toBe('https://explorer.hiro.so/txid/0xabc?chain=mainnet')
  })

  it('falls back to the chain home URL when tx id is missing', () => {
    expect(getExplorerUrl('')).toBe('https://explorer.hiro.so?chain=mainnet')
  })

  it('encodes transaction ids safely for explorer URLs', () => {
    expect(getExplorerUrl('0xabc/def?x=1')).toBe('https://explorer.hiro.so/txid/0xabc%2Fdef%3Fx%3D1?chain=mainnet')
  })
})

describe('getAddressExplorerLinkLabel', () => {
  it('stringifies multi-value array ids with comma separation', () => {
      expect(getAddressExplorerLinkLabel(['a', 'b'])).toBe('Address: a,b')
    })

  it('renders address label copy for standard wallet addresses', () => {
      expect(getAddressExplorerLinkLabel('SP3ABC')).toBe('Address: SP3ABC')
    })

  it('supports bigint address identifiers', () => {
      expect(getAddressExplorerLinkLabel(7800000000000000000n)).toBe('Address: 7800000000000000000')
    })

  it('keeps false boolean addresses visible in label output', () => {
      expect(getAddressExplorerLinkLabel(false)).toBe('Address: false')
    })

  it('renders true boolean identifiers for address labels', () => {
      expect(getAddressExplorerLinkLabel(true)).toBe('Address: true')
    })

  it('renders emoji addresses without dropping characters', () => {
      expect(getAddressExplorerLinkLabel('SP🔥99')).toBe('Address: SP🔥99')
    })

  it('coerces empty array ids to empty string content without fallback', () => {
      expect(getAddressExplorerLinkLabel([])).toBe('Address: ')
    })

  it('returns generic address copy when identifier is empty', () => {
      expect(getAddressExplorerLinkLabel('')).toBe('Open Address in Explorer')
    })

  it('renders Infinity as explicit address label text', () => {
      expect(getAddressExplorerLinkLabel(Number.POSITIVE_INFINITY)).toBe('Address: Infinity')
    })

  it('renders NaN as explicit address label text', () => {
      expect(getAddressExplorerLinkLabel(Number.NaN)).toBe('Address: NaN')
    })

  it('stringifies negative numeric address identifiers', () => {
      expect(getAddressExplorerLinkLabel(-1)).toBe('Address: -1')
    })

  it('returns generic copy when address identifier is null', () => {
      expect(getAddressExplorerLinkLabel(null)).toBe('Open Address in Explorer')
    })

  it('stringifies numeric address identifiers', () => {
      expect(getAddressExplorerLinkLabel(404)).toBe('Address: 404')
    })

  it('coerces object addresses using default string conversion', () => {
      expect(getAddressExplorerLinkLabel({ address: 'SP1' })).toBe('Address: [object Object]')
    })

  it('preserves internal tab characters in address identifiers', () => {
      expect(getAddressExplorerLinkLabel('SP\t001')).toBe('Address: SP\t001')
    })

  it('stringifies symbol addresses safely in labels', () => {
      expect(getAddressExplorerLinkLabel(Symbol.for('wallet'))).toBe('Address: Symbol(wallet)')
    })

  it('trims address values before composing label copy', () => {
      expect(getAddressExplorerLinkLabel('  SP123  ')).toBe('Address: SP123')
    })

  it('returns generic copy when address identifier is undefined', () => {
      expect(getAddressExplorerLinkLabel(undefined)).toBe('Open Address in Explorer')
    })

  it('renders unicode addresses correctly in labels', () => {
      expect(getAddressExplorerLinkLabel('адрес-١٢')).toBe('Address: адрес-١٢')
    })

  it('returns fallback copy for whitespace-only addresses', () => {
      expect(getAddressExplorerLinkLabel('   ')).toBe('Open Address in Explorer')
    })
})

describe('getAddressExplorerUrl', () => {
  it('encodes accented latin address identifiers safely', () => {
      const address = 'dirección-ñ'
      expect(getAddressExplorerUrl(address)).toBe(`https://explorer.hiro.so/address/${encodeURIComponent(address)}?chain=mainnet`)
    })

  it('encodes ampersand characters in wallet addresses', () => {
      expect(getAddressExplorerUrl("SP5K&TJT")).toBe("https://explorer.hiro.so/address/SP5K%26TJT?chain=mainnet")
    })

  it('encodes apostrophe characters in wallet addresses', () => {
      expect(getAddressExplorerUrl("SP5K'TJT")).toBe("https://explorer.hiro.so/address/SP5K'TJT?chain=mainnet")
    })

  it('encodes arabic address identifiers safely', () => {
      const address = 'عنوان-٣٣'
      expect(getAddressExplorerUrl(address)).toBe(`https://explorer.hiro.so/address/${encodeURIComponent(address)}?chain=mainnet`)
    })

  it('encodes asterisk characters in address identifiers', () => {
      expect(getAddressExplorerUrl("SP5K*TJT")).toBe("https://explorer.hiro.so/address/SP5K*TJT?chain=mainnet")
    })

  it('encodes at symbol characters in wallet addresses', () => {
      expect(getAddressExplorerUrl("SP5K@TJT")).toBe("https://explorer.hiro.so/address/SP5K%40TJT?chain=mainnet")
    })

  it('encodes backslash characters in wallet addresses', () => {
      expect(getAddressExplorerUrl("SP5K\\TJT")).toBe("https://explorer.hiro.so/address/SP5K%5CTJT?chain=mainnet")
    })

  it('encodes backtick characters in wallet addresses', () => {
      expect(getAddressExplorerUrl("SP5K`TJT")).toBe("https://explorer.hiro.so/address/SP5K%60TJT?chain=mainnet")
    })

  it('builds address explorer links on the configured network', () => {
      expect(getAddressExplorerUrl('SP123')).toBe('https://explorer.hiro.so/address/SP123?chain=mainnet')
    })

  it('encodes bigint address ids through string conversion', () => {
      expect(getAddressExplorerUrl(77n)).toBe('https://explorer.hiro.so/address/77?chain=mainnet')
    })

  it('encodes bitcoin sign characters in addresses', () => {
      const address = 'SP-₿-001'
      expect(getAddressExplorerUrl(address)).toBe(`https://explorer.hiro.so/address/${encodeURIComponent(address)}?chain=mainnet`)
    })

  it('stringifies boolean address identifiers', () => {
      expect(getAddressExplorerUrl(false)).toBe('https://explorer.hiro.so/address/false?chain=mainnet')
    })

  it('encodes braille pattern addresses safely', () => {
      const address = 'SP-⠓⠊'
      expect(getAddressExplorerUrl(address)).toBe(`https://explorer.hiro.so/address/${encodeURIComponent(address)}?chain=mainnet`)
    })

  it('encodes caret characters in wallet addresses', () => {
      expect(getAddressExplorerUrl("SP5K^TJT")).toBe("https://explorer.hiro.so/address/SP5K%5ETJT?chain=mainnet")
    })

  it('encodes carriage return characters in wallet addresses', () => {
      expect(getAddressExplorerUrl("SP5K\rTJT")).toBe("https://explorer.hiro.so/address/SP5K%0DTJT?chain=mainnet")
    })

  it('encodes close parenthesis characters in address identifiers', () => {
      expect(getAddressExplorerUrl("SP5K)TJT")).toBe("https://explorer.hiro.so/address/SP5K)TJT?chain=mainnet")
    })

  it('encodes colon characters in wallet addresses', () => {
      expect(getAddressExplorerUrl("SP5K:TJT")).toBe("https://explorer.hiro.so/address/SP5K%3ATJT?chain=mainnet")
    })

  it('encodes addresses containing combining diacritic marks', () => {
      const address = 'a\u0301ddr'
      expect(getAddressExplorerUrl(address)).toBe(`https://explorer.hiro.so/address/${encodeURIComponent(address)}?chain=mainnet`)
    })

  it('encodes comma characters in wallet addresses', () => {
      expect(getAddressExplorerUrl("SP5K,TJT")).toBe("https://explorer.hiro.so/address/SP5K%2CTJT?chain=mainnet")
    })

  it('encodes devanagari address identifiers safely', () => {
      const address = 'पता-१२३'
      expect(getAddressExplorerUrl(address)).toBe(`https://explorer.hiro.so/address/${encodeURIComponent(address)}?chain=mainnet`)
    })

  it('encodes dollar sign characters in wallet addresses', () => {
      expect(getAddressExplorerUrl("SP5K$TJT")).toBe("https://explorer.hiro.so/address/SP5K%24TJT?chain=mainnet")
    })

  it('encodes double quote characters in wallet addresses', () => {
      expect(getAddressExplorerUrl("SP5K\"TJT")).toBe("https://explorer.hiro.so/address/SP5K%22TJT?chain=mainnet")
    })

  it('falls back to chain root when address is empty', () => {
      expect(getAddressExplorerUrl('')).toBe('https://explorer.hiro.so?chain=mainnet')
    })

  it('encodes addresses safely for explorer links', () => {
      expect(getAddressExplorerUrl('SP123/abc?x=1')).toBe('https://explorer.hiro.so/address/SP123%2Fabc%3Fx%3D1?chain=mainnet')
    })

  it('encodes equals sign characters in wallet addresses', () => {
      expect(getAddressExplorerUrl("SP5K=TJT")).toBe("https://explorer.hiro.so/address/SP5K%3DTJT?chain=mainnet")
    })

  it('encodes exclamation mark characters in address identifiers', () => {
      expect(getAddressExplorerUrl("SP5K!TJT")).toBe("https://explorer.hiro.so/address/SP5K!TJT?chain=mainnet")
    })

  it('encodes fire emoji characters in wallet addresses', () => {
      expect(getAddressExplorerUrl("SP5K🔥TJT")).toBe("https://explorer.hiro.so/address/SP5K%F0%9F%94%A5TJT?chain=mainnet")
    })

  it('encodes fullwidth latin addresses safely', () => {
      const address = 'ＳＰ-１２３'
      expect(getAddressExplorerUrl(address)).toBe(`https://explorer.hiro.so/address/${encodeURIComponent(address)}?chain=mainnet`)
    })

  it('encodes globe emoji addresses safely', () => {
      const address = 'SP-🌍-88'
      expect(getAddressExplorerUrl(address)).toBe(`https://explorer.hiro.so/address/${encodeURIComponent(address)}?chain=mainnet`)
    })

  it('encodes greater-than characters in wallet addresses', () => {
      expect(getAddressExplorerUrl("SP5K>TJT")).toBe("https://explorer.hiro.so/address/SP5K%3ETJT?chain=mainnet")
    })

  it('encodes greek address identifiers safely', () => {
      const address = 'διεύθυνση-42'
      expect(getAddressExplorerUrl(address)).toBe(`https://explorer.hiro.so/address/${encodeURIComponent(address)}?chain=mainnet`)
    })

  it('encodes hash sign characters in wallet addresses', () => {
      expect(getAddressExplorerUrl("SP5K#TJT")).toBe("https://explorer.hiro.so/address/SP5K%23TJT?chain=mainnet")
    })

  it('encodes hebrew address identifiers safely', () => {
      const address = 'כתובת-17'
      expect(getAddressExplorerUrl(address)).toBe(`https://explorer.hiro.so/address/${encodeURIComponent(address)}?chain=mainnet`)
    })

  it('encodes kanji address identifiers safely', () => {
      const address = '住所-九'
      expect(getAddressExplorerUrl(address)).toBe(`https://explorer.hiro.so/address/${encodeURIComponent(address)}?chain=mainnet`)
    })

  it('encodes korean address identifiers safely', () => {
      const address = '주소-51'
      expect(getAddressExplorerUrl(address)).toBe(`https://explorer.hiro.so/address/${encodeURIComponent(address)}?chain=mainnet`)
    })

  it('encodes left brace characters in wallet addresses', () => {
      expect(getAddressExplorerUrl("SP5K{TJT")).toBe("https://explorer.hiro.so/address/SP5K%7BTJT?chain=mainnet")
    })

  it('encodes left bracket characters in wallet addresses', () => {
      expect(getAddressExplorerUrl("SP5K[TJT")).toBe("https://explorer.hiro.so/address/SP5K%5BTJT?chain=mainnet")
    })

  it('encodes less-than characters in wallet addresses', () => {
      expect(getAddressExplorerUrl("SP5K<TJT")).toBe("https://explorer.hiro.so/address/SP5K%3CTJT?chain=mainnet")
    })

  it('encodes mathematical symbols in addresses', () => {
      const address = 'SP-∑π√'
      expect(getAddressExplorerUrl(address)).toBe(`https://explorer.hiro.so/address/${encodeURIComponent(address)}?chain=mainnet`)
    })

  it('encodes newline characters in wallet addresses', () => {
      expect(getAddressExplorerUrl("SP5K\nTJT")).toBe("https://explorer.hiro.so/address/SP5K%0ATJT?chain=mainnet")
    })

  it('encodes nonbreaking space characters in wallet addresses', () => {
      expect(getAddressExplorerUrl("SP5K TJT")).toBe("https://explorer.hiro.so/address/SP5K%C2%A0TJT?chain=mainnet")
    })

  it('falls back to chain root when address is null', () => {
      expect(getAddressExplorerUrl(null)).toBe('https://explorer.hiro.so?chain=mainnet')
    })

  it('supports numeric identifiers when building address links', () => {
      expect(getAddressExplorerUrl(42)).toBe('https://explorer.hiro.so/address/42?chain=mainnet')
    })

  it('stringifies object address ids before encoding', () => {
      expect(getAddressExplorerUrl({ id: 5 })).toBe(
        'https://explorer.hiro.so/address/%5Bobject%20Object%5D?chain=mainnet'
      )
    })

  it('encodes open parenthesis characters in address identifiers', () => {
      expect(getAddressExplorerUrl("SP5K(TJT")).toBe("https://explorer.hiro.so/address/SP5K(TJT?chain=mainnet")
    })

  it('encodes percent sign characters in wallet addresses', () => {
      expect(getAddressExplorerUrl("SP5K%TJT")).toBe("https://explorer.hiro.so/address/SP5K%25TJT?chain=mainnet")
    })

  it('encodes pipe characters in wallet addresses', () => {
      expect(getAddressExplorerUrl("SP5K|TJT")).toBe("https://explorer.hiro.so/address/SP5K%7CTJT?chain=mainnet")
    })

  it('encodes plus sign characters in wallet addresses', () => {
      expect(getAddressExplorerUrl("SP5K+TJT")).toBe("https://explorer.hiro.so/address/SP5K%2BTJT?chain=mainnet")
    })

  it('encodes question mark characters in wallet addresses', () => {
      expect(getAddressExplorerUrl("SP5K?TJT")).toBe("https://explorer.hiro.so/address/SP5K%3FTJT?chain=mainnet")
    })

  it('encodes right brace characters in address identifiers', () => {
      expect(getAddressExplorerUrl("SP5K}TJT")).toBe("https://explorer.hiro.so/address/SP5K%7DTJT?chain=mainnet")
    })

  it('encodes right bracket characters in wallet addresses', () => {
      expect(getAddressExplorerUrl("SP5K]TJT")).toBe("https://explorer.hiro.so/address/SP5K%5DTJT?chain=mainnet")
    })

  it('encodes rocket emoji addresses safely', () => {
      const address = 'SP-🚀-01'
      expect(getAddressExplorerUrl(address)).toBe(`https://explorer.hiro.so/address/${encodeURIComponent(address)}?chain=mainnet`)
    })

  it('encodes addresses containing right-to-left marks', () => {
      const address = `SP\u200F123`
      expect(getAddressExplorerUrl(address)).toBe(`https://explorer.hiro.so/address/${encodeURIComponent(address)}?chain=mainnet`)
    })

  it('encodes semicolon characters in wallet addresses', () => {
      expect(getAddressExplorerUrl("SP5K;TJT")).toBe("https://explorer.hiro.so/address/SP5K%3BTJT?chain=mainnet")
    })

  it('encodes slash characters in address identifiers', () => {
      expect(getAddressExplorerUrl('SP12/34')).toBe('https://explorer.hiro.so/address/SP12%2F34?chain=mainnet')
    })

  it('encodes space characters in wallet addresses', () => {
      expect(getAddressExplorerUrl("SP5K TJT")).toBe("https://explorer.hiro.so/address/SP5K%20TJT?chain=mainnet")
    })

  it('encodes symbol address ids without throwing', () => {
      expect(getAddressExplorerUrl(Symbol('address'))).toBe(
        'https://explorer.hiro.so/address/Symbol(address)?chain=mainnet'
      )
    })

  it('encodes tab characters in wallet addresses', () => {
      expect(getAddressExplorerUrl("SP5K\tTJT")).toBe("https://explorer.hiro.so/address/SP5K%09TJT?chain=mainnet")
    })

  it('encodes thai address identifiers safely', () => {
      const address = 'ที่อยู่-88'
      expect(getAddressExplorerUrl(address)).toBe(`https://explorer.hiro.so/address/${encodeURIComponent(address)}?chain=mainnet`)
    })

  it('encodes tilde characters in address identifiers', () => {
      expect(getAddressExplorerUrl("SP5K~TJT")).toBe("https://explorer.hiro.so/address/SP5K~TJT?chain=mainnet")
    })

  it('trims surrounding spaces before encoding addresses', () => {
      expect(getAddressExplorerUrl(' SP123 ')).toBe('https://explorer.hiro.so/address/SP123?chain=mainnet')
    })

  it('falls back when the address identifier is undefined', () => {
      expect(getAddressExplorerUrl(undefined)).toBe('https://explorer.hiro.so?chain=mainnet')
    })

  it('encodes unicode address identifiers safely', () => {
      const address = 'адрес/123'
      expect(getAddressExplorerUrl(address)).toBe(`https://explorer.hiro.so/address/${encodeURIComponent(address)}?chain=mainnet`)
    })

  it('falls back to chain root when address is whitespace only', () => {
      expect(getAddressExplorerUrl('   ')).toBe('https://explorer.hiro.so?chain=mainnet')
    })

  it('supports zero as an address identifier', () => {
      expect(getAddressExplorerUrl(0)).toBe('https://explorer.hiro.so/address/0?chain=mainnet')
    })

  it('encodes zero-width-joiner emoji sequences in addresses', () => {
      const address = 'SP-👨‍👩‍👧‍👦'
      expect(getAddressExplorerUrl(address)).toBe(`https://explorer.hiro.so/address/${encodeURIComponent(address)}?chain=mainnet`)
    })
})

describe('getContractExplorerUrl', () => {
  it('includes a chain query parameter in the explorer link', () => {
      expect(getContractExplorerUrl()).toContain('?chain=')
    })

  it('includes the active network as chain query parameter', () => {
      expect(getContractExplorerUrl()).toContain(`?chain=${NETWORK}`)
    })

  it('includes encoded contract address and name target', () => {
      const expectedTarget = encodeURIComponent(`${CONTRACT_ADDRESS}.${CONTRACT_NAME}`)
      expect(getContractExplorerUrl()).toContain(expectedTarget)
    })

  it('includes the minimint core contract identifier in explorer urls', () => {
      expect(getContractExplorerUrl()).toContain('minimint-core-v-i28')
    })

  it('builds links under the txid explorer path', () => {
      expect(getContractExplorerUrl()).toContain('/txid/')
    })
})

describe('getExplorerLinkLabel', () => {
  it('renders address label copy for wallet identifiers', () => {
      expect(getExplorerLinkLabel('address', 'SP123ABC')).toBe('Address: SP123ABC')
    })

  it('supports bigint identifiers in label output', () => {
      expect(getExplorerLinkLabel('token', 9007199254740993n)).toBe('Token: 9007199254740993')
    })

  it('renders false boolean identifiers without treating them as empty', () => {
      expect(getExplorerLinkLabel('address', false)).toBe('Address: false')
    })

  it('renders true boolean identifiers as string content', () => {
      expect(getExplorerLinkLabel('address', true)).toBe('Address: true')
    })

  it('keeps emoji content when rendering explorer labels', () => {
      expect(getExplorerLinkLabel('address', 'SP🔥123')).toBe('Address: SP🔥123')
    })

  it('returns generic explorer copy when identifier is missing', () => {
      expect(getExplorerLinkLabel('address', '')).toBe('Open Address in Explorer')
    })

  it('returns generic explorer copy when identifier is empty', () => {
      expect(getExplorerLinkLabel('address', '   ')).toBe('Open Address in Explorer')
    })

  it('falls back to transaction label when type is unknown', () => {
      expect(getExplorerLinkLabel('wallet', 'abc123')).toBe('Transaction: abc123')
    })

  it('falls back to transaction labels when type is null', () => {
      expect(getExplorerLinkLabel(null, 'abc')).toBe('Transaction: abc')
    })

  it('stringifies numeric identifiers when building labels', () => {
      expect(getExplorerLinkLabel('txid', 42)).toBe('Transaction: 42')
    })

  it('stringifies object identifiers in a stable way', () => {
      expect(getExplorerLinkLabel('txid', { id: 7 })).toBe('Transaction: [object Object]')
    })

  it('preserves internal whitespace inside identifiers', () => {
      expect(getExplorerLinkLabel('txid', 'id one two')).toBe('Transaction: id one two')
    })

  it('stringifies symbol identifiers for display text', () => {
      expect(getExplorerLinkLabel('txid', Symbol.for('tx'))).toBe('Transaction: Symbol(tx)')
    })

  it('renders token label copy for token identifiers', () => {
      expect(getExplorerLinkLabel('token', 'token-42')).toBe('Token: token-42')
    })

  it('trims non-breaking space padding around identifiers', () => {
      expect(getExplorerLinkLabel('address', '\u00A0SP123\u00A0')).toBe('Address: SP123')
    })

  it('trims leading and trailing newline characters from identifiers', () => {
      expect(getExplorerLinkLabel('txid', '\nabc\n')).toBe('Transaction: abc')
    })

  it('trims surrounding whitespace before rendering label text', () => {
      expect(getExplorerLinkLabel('txid', '   0xfeed   ')).toBe('Transaction: 0xfeed')
    })

  it('renders transaction label copy for tx identifiers', () => {
      expect(getExplorerLinkLabel('txid', '0xabc')).toBe('Transaction: 0xabc')
    })

  it('treats whitespace-padded types as invalid and falls back safely', () => {
      expect(getExplorerLinkLabel(' txid ', 'abc')).toBe('Transaction: abc')
    })

  it('falls back to transaction labels when type is undefined', () => {
      expect(getExplorerLinkLabel(undefined, 'abc')).toBe('Transaction: abc')
    })

  it('renders unicode identifiers without mangling characters', () => {
      expect(getExplorerLinkLabel('token', 'トークン-δ')).toBe('Token: トークン-δ')
    })

  it('uses fallback label when explorer type casing does not match', () => {
      expect(getExplorerLinkLabel('TXID', 'abc')).toBe('Transaction: abc')
    })

  it('keeps numeric zero identifiers instead of using fallback copy', () => {
      expect(getExplorerLinkLabel('token', 0)).toBe('Token: 0')
    })
})

describe('getExplorerUrl', () => {
  it('encodes accented latin transaction identifiers safely', () => {
      const txId = 'transacción-ñ'
      expect(getExplorerUrl(txId)).toBe(`https://explorer.hiro.so/txid/${encodeURIComponent(txId)}?chain=mainnet`)
    })

  it('encodes ampersand characters in transaction identifiers', () => {
      expect(getExplorerUrl("tx&id")).toBe("https://explorer.hiro.so/txid/tx%26id?chain=mainnet")
    })

  it('encodes apostrophe characters in transaction identifiers', () => {
      expect(getExplorerUrl("tx'id")).toBe("https://explorer.hiro.so/txid/tx'id?chain=mainnet")
    })

  it('encodes arabic transaction identifiers safely', () => {
      const txId = 'معاملة-٣٣'
      expect(getExplorerUrl(txId)).toBe(`https://explorer.hiro.so/txid/${encodeURIComponent(txId)}?chain=mainnet`)
    })

  it('encodes asterisk characters in transaction identifiers', () => {
      expect(getExplorerUrl("tx*id")).toBe("https://explorer.hiro.so/txid/tx*id?chain=mainnet")
    })

  it('encodes at symbol characters in transaction identifiers', () => {
      expect(getExplorerUrl("tx@id")).toBe("https://explorer.hiro.so/txid/tx%40id?chain=mainnet")
    })

  it('encodes backslash characters in transaction identifiers', () => {
      expect(getExplorerUrl("tx\\id")).toBe("https://explorer.hiro.so/txid/tx%5Cid?chain=mainnet")
    })

  it('encodes backtick characters in transaction identifiers', () => {
      expect(getExplorerUrl("tx`id")).toBe("https://explorer.hiro.so/txid/tx%60id?chain=mainnet")
    })

  it('builds a transaction explorer URL for a standard transaction id', () => {
      expect(getExplorerUrl('0xabc123')).toBe('https://explorer.hiro.so/txid/0xabc123?chain=mainnet')
    })

  it('encodes bigint tx ids through string conversion', () => {
      expect(getExplorerUrl(123n)).toBe('https://explorer.hiro.so/txid/123?chain=mainnet')
    })

  it('encodes bitcoin sign characters in transaction identifiers', () => {
      const txId = 'tx-₿-001'
      expect(getExplorerUrl(txId)).toBe(`https://explorer.hiro.so/txid/${encodeURIComponent(txId)}?chain=mainnet`)
    })

  it('stringifies boolean identifiers for explorer links', () => {
      expect(getExplorerUrl(false)).toBe('https://explorer.hiro.so/txid/false?chain=mainnet')
    })

  it('encodes braille pattern identifiers safely', () => {
      const txId = 'tx-⠓⠊'
      expect(getExplorerUrl(txId)).toBe(`https://explorer.hiro.so/txid/${encodeURIComponent(txId)}?chain=mainnet`)
    })

  it('encodes caret characters in transaction identifiers', () => {
      expect(getExplorerUrl("tx^id")).toBe("https://explorer.hiro.so/txid/tx%5Eid?chain=mainnet")
    })

  it('encodes carriage return characters in transaction identifiers', () => {
      expect(getExplorerUrl("tx\rid")).toBe("https://explorer.hiro.so/txid/tx%0Did?chain=mainnet")
    })

  it('encodes close parenthesis characters in transaction identifiers', () => {
      expect(getExplorerUrl("tx)id")).toBe("https://explorer.hiro.so/txid/tx)id?chain=mainnet")
    })

  it('encodes colon characters in transaction identifiers', () => {
      expect(getExplorerUrl("tx:id")).toBe("https://explorer.hiro.so/txid/tx%3Aid?chain=mainnet")
    })

  it('encodes identifiers with combining diacritic marks safely', () => {
      const txId = 'e\u0301xid'
      expect(getExplorerUrl(txId)).toBe(`https://explorer.hiro.so/txid/${encodeURIComponent(txId)}?chain=mainnet`)
    })

  it('encodes comma characters in transaction identifiers', () => {
      expect(getExplorerUrl("tx,id")).toBe("https://explorer.hiro.so/txid/tx%2Cid?chain=mainnet")
    })

  it('encodes devanagari transaction identifiers safely', () => {
      const txId = 'लेन-देन-१२३'
      expect(getExplorerUrl(txId)).toBe(`https://explorer.hiro.so/txid/${encodeURIComponent(txId)}?chain=mainnet`)
    })

  it('encodes dollar sign characters in transaction identifiers', () => {
      expect(getExplorerUrl("tx$id")).toBe("https://explorer.hiro.so/txid/tx%24id?chain=mainnet")
    })

  it('encodes double quote characters in transaction identifiers', () => {
      expect(getExplorerUrl("tx\"id")).toBe("https://explorer.hiro.so/txid/tx%22id?chain=mainnet")
    })

  it('returns the network explorer root when transaction id is empty', () => {
      expect(getExplorerUrl('')).toBe('https://explorer.hiro.so?chain=mainnet')
    })

  it('encodes reserved characters in transaction identifiers', () => {
      const txId = 'abc/123?frag'
      expect(getExplorerUrl(txId)).toBe(`https://explorer.hiro.so/txid/${encodeURIComponent(txId)}?chain=mainnet`)
    })

  it('encodes equals sign characters in transaction identifiers', () => {
      expect(getExplorerUrl("tx=id")).toBe("https://explorer.hiro.so/txid/tx%3Did?chain=mainnet")
    })

  it('encodes exclamation mark characters in transaction identifiers', () => {
      expect(getExplorerUrl("tx!id")).toBe("https://explorer.hiro.so/txid/tx!id?chain=mainnet")
    })

  it('encodes fire emoji characters in transaction identifiers', () => {
      expect(getExplorerUrl("tx🔥id")).toBe("https://explorer.hiro.so/txid/tx%F0%9F%94%A5id?chain=mainnet")
    })

  it('encodes fullwidth latin characters in transaction ids', () => {
      const txId = 'ＴＸ-１２３'
      expect(getExplorerUrl(txId)).toBe(`https://explorer.hiro.so/txid/${encodeURIComponent(txId)}?chain=mainnet`)
    })

  it('encodes globe emoji identifiers safely', () => {
      const txId = 'tx-🌍-88'
      expect(getExplorerUrl(txId)).toBe(`https://explorer.hiro.so/txid/${encodeURIComponent(txId)}?chain=mainnet`)
    })

  it('encodes greater-than characters in transaction identifiers', () => {
      expect(getExplorerUrl("tx>id")).toBe("https://explorer.hiro.so/txid/tx%3Eid?chain=mainnet")
    })

  it('encodes greek transaction identifiers safely', () => {
      const txId = 'συναλλαγή-42'
      expect(getExplorerUrl(txId)).toBe(`https://explorer.hiro.so/txid/${encodeURIComponent(txId)}?chain=mainnet`)
    })

  it('encodes hash sign characters in transaction identifiers', () => {
      expect(getExplorerUrl("tx#id")).toBe("https://explorer.hiro.so/txid/tx%23id?chain=mainnet")
    })

  it('encodes hebrew transaction identifiers safely', () => {
      const txId = 'עסקה-17'
      expect(getExplorerUrl(txId)).toBe(`https://explorer.hiro.so/txid/${encodeURIComponent(txId)}?chain=mainnet`)
    })

  it('encodes kanji transaction identifiers safely', () => {
      const txId = '取引-九'
      expect(getExplorerUrl(txId)).toBe(`https://explorer.hiro.so/txid/${encodeURIComponent(txId)}?chain=mainnet`)
    })

  it('encodes korean transaction identifiers safely', () => {
      const txId = '거래-51'
      expect(getExplorerUrl(txId)).toBe(`https://explorer.hiro.so/txid/${encodeURIComponent(txId)}?chain=mainnet`)
    })

  it('encodes left brace characters in transaction identifiers', () => {
      expect(getExplorerUrl("tx{id")).toBe("https://explorer.hiro.so/txid/tx%7Bid?chain=mainnet")
    })

  it('encodes left bracket characters in transaction identifiers', () => {
      expect(getExplorerUrl("tx[id")).toBe("https://explorer.hiro.so/txid/tx%5Bid?chain=mainnet")
    })

  it('encodes less-than characters in transaction identifiers', () => {
      expect(getExplorerUrl("tx<id")).toBe("https://explorer.hiro.so/txid/tx%3Cid?chain=mainnet")
    })

  it('encodes mathematical symbols in transaction identifiers', () => {
      const txId = 'tx-∑π√'
      expect(getExplorerUrl(txId)).toBe(`https://explorer.hiro.so/txid/${encodeURIComponent(txId)}?chain=mainnet`)
    })

  it('encodes newline characters in transaction identifiers', () => {
      expect(getExplorerUrl("tx\nid")).toBe("https://explorer.hiro.so/txid/tx%0Aid?chain=mainnet")
    })

  it('encodes nonbreaking space characters in transaction identifiers', () => {
      expect(getExplorerUrl("tx id")).toBe("https://explorer.hiro.so/txid/tx%C2%A0id?chain=mainnet")
    })

  it('falls back to chain root when tx id is null', () => {
      expect(getExplorerUrl(null)).toBe('https://explorer.hiro.so?chain=mainnet')
    })

  it('supports numeric transaction identifiers', () => {
      expect(getExplorerUrl(42)).toBe('https://explorer.hiro.so/txid/42?chain=mainnet')
    })

  it('stringifies object tx ids before encoding', () => {
      expect(getExplorerUrl({ id: 1 })).toBe(
        'https://explorer.hiro.so/txid/%5Bobject%20Object%5D?chain=mainnet'
      )
    })

  it('encodes open parenthesis characters in transaction identifiers', () => {
      expect(getExplorerUrl("tx(id")).toBe("https://explorer.hiro.so/txid/tx(id?chain=mainnet")
    })

  it('encodes percent sign characters in transaction identifiers', () => {
      expect(getExplorerUrl("tx%id")).toBe("https://explorer.hiro.so/txid/tx%25id?chain=mainnet")
    })

  it('encodes pipe characters in transaction identifiers', () => {
      expect(getExplorerUrl("tx|id")).toBe("https://explorer.hiro.so/txid/tx%7Cid?chain=mainnet")
    })

  it('encodes plus sign characters in transaction identifiers', () => {
      expect(getExplorerUrl("tx+id")).toBe("https://explorer.hiro.so/txid/tx%2Bid?chain=mainnet")
    })

  it('encodes question mark characters in transaction identifiers', () => {
      expect(getExplorerUrl("tx?id")).toBe("https://explorer.hiro.so/txid/tx%3Fid?chain=mainnet")
    })

  it('encodes right brace characters in transaction identifiers', () => {
      expect(getExplorerUrl("tx}id")).toBe("https://explorer.hiro.so/txid/tx%7Did?chain=mainnet")
    })

  it('encodes right bracket characters in transaction identifiers', () => {
      expect(getExplorerUrl("tx]id")).toBe("https://explorer.hiro.so/txid/tx%5Did?chain=mainnet")
    })

  it('encodes rocket emoji transaction identifiers safely', () => {
      const txId = 'tx-🚀-01'
      expect(getExplorerUrl(txId)).toBe(`https://explorer.hiro.so/txid/${encodeURIComponent(txId)}?chain=mainnet`)
    })

  it('encodes identifiers containing right-to-left marks safely', () => {
      const txId = `abc\u200F123`
      expect(getExplorerUrl(txId)).toBe(`https://explorer.hiro.so/txid/${encodeURIComponent(txId)}?chain=mainnet`)
    })

  it('encodes semicolon characters in transaction identifiers', () => {
      expect(getExplorerUrl("tx;id")).toBe("https://explorer.hiro.so/txid/tx%3Bid?chain=mainnet")
    })

  it('encodes reserved slash characters in transaction identifiers', () => {
      expect(getExplorerUrl('abc/123')).toBe('https://explorer.hiro.so/txid/abc%2F123?chain=mainnet')
    })

  it('encodes space characters in transaction identifiers', () => {
      expect(getExplorerUrl("tx id")).toBe("https://explorer.hiro.so/txid/tx%20id?chain=mainnet")
    })

  it('encodes symbol identifiers without throwing', () => {
      expect(getExplorerUrl(Symbol('tx'))).toBe(
        'https://explorer.hiro.so/txid/Symbol(tx)?chain=mainnet'
      )
    })

  it('encodes tab characters in transaction identifiers', () => {
      expect(getExplorerUrl("tx\tid")).toBe("https://explorer.hiro.so/txid/tx%09id?chain=mainnet")
    })

  it('encodes thai transaction identifiers safely', () => {
      const txId = 'ธุรกรรม-88'
      expect(getExplorerUrl(txId)).toBe(`https://explorer.hiro.so/txid/${encodeURIComponent(txId)}?chain=mainnet`)
    })

  it('encodes tilde characters in transaction identifiers', () => {
      expect(getExplorerUrl("tx~id")).toBe("https://explorer.hiro.so/txid/tx~id?chain=mainnet")
    })

  it('trims surrounding spaces before encoding transaction ids', () => {
      expect(getExplorerUrl(' 0xabc123 ')).toBe('https://explorer.hiro.so/txid/0xabc123?chain=mainnet')
    })

  it('falls back to the network explorer page for undefined identifiers', () => {
      expect(getExplorerUrl(undefined)).toBe('https://explorer.hiro.so?chain=mainnet')
    })

  it('encodes unicode transaction identifiers safely', () => {
      const txId = 'транзакция/١٢٣'
      expect(getExplorerUrl(txId)).toBe(`https://explorer.hiro.so/txid/${encodeURIComponent(txId)}?chain=mainnet`)
    })

  it('falls back to the network overview when tx id is whitespace only', () => {
      expect(getExplorerUrl('   ')).toBe('https://explorer.hiro.so?chain=mainnet')
    })

  it('supports zero as a transaction identifier', () => {
      expect(getExplorerUrl(0)).toBe('https://explorer.hiro.so/txid/0?chain=mainnet')
    })

  it('encodes zero-width-joiner emoji sequences safely', () => {
      const txId = 'tx-👨‍👩‍👧‍👦'
      expect(getExplorerUrl(txId)).toBe(`https://explorer.hiro.so/txid/${encodeURIComponent(txId)}?chain=mainnet`)
    })
})

describe('getTokenExplorerLinkLabel', () => {
  it('stringifies multi-value array ids with comma separation', () => {
      expect(getTokenExplorerLinkLabel(['a', 'b'])).toBe('Token: a,b')
    })

  it('builds token-specific explorer label copy', () => {
      expect(getTokenExplorerLinkLabel(12)).toBe('Token: 12')
    })

  it('supports bigint token identifiers', () => {
      expect(getTokenExplorerLinkLabel(9007199254741999n)).toBe('Token: 9007199254741999')
    })

  it('keeps false boolean token identifiers visible', () => {
      expect(getTokenExplorerLinkLabel(false)).toBe('Token: false')
    })

  it('renders true boolean identifiers for token labels', () => {
      expect(getTokenExplorerLinkLabel(true)).toBe('Token: true')
    })

  it('renders emoji token identifiers in label copy', () => {
      expect(getTokenExplorerLinkLabel('token🔥')).toBe('Token: token🔥')
    })

  it('coerces empty array ids to empty string content without fallback', () => {
      expect(getTokenExplorerLinkLabel([])).toBe('Token: ')
    })

  it('returns generic token copy when identifier is empty', () => {
      expect(getTokenExplorerLinkLabel('')).toBe('Open Token in Explorer')
    })

  it('renders Infinity as explicit token label text', () => {
      expect(getTokenExplorerLinkLabel(Number.POSITIVE_INFINITY)).toBe('Token: Infinity')
    })

  it('renders NaN as explicit token label text', () => {
      expect(getTokenExplorerLinkLabel(Number.NaN)).toBe('Token: NaN')
    })

  it('stringifies negative numeric token identifiers', () => {
      expect(getTokenExplorerLinkLabel(-1)).toBe('Token: -1')
    })

  it('returns generic copy when token identifier is null', () => {
      expect(getTokenExplorerLinkLabel(null)).toBe('Open Token in Explorer')
    })

  it('stringifies numeric token identifiers', () => {
      expect(getTokenExplorerLinkLabel(501)).toBe('Token: 501')
    })

  it('coerces object token identifiers with default stringification', () => {
      expect(getTokenExplorerLinkLabel({ token: 1 })).toBe('Token: [object Object]')
    })

  it('preserves internal newline characters in token identifiers', () => {
      expect(getTokenExplorerLinkLabel('token\n42')).toBe('Token: token\n42')
    })

  it('stringifies symbol token identifiers safely', () => {
      expect(getTokenExplorerLinkLabel(Symbol.for('token'))).toBe('Token: Symbol(token)')
    })

  it('trims surrounding whitespace around token ids', () => {
      expect(getTokenExplorerLinkLabel('  token-9  ')).toBe('Token: token-9')
    })

  it('returns generic copy when token identifier is undefined', () => {
      expect(getTokenExplorerLinkLabel(undefined)).toBe('Open Token in Explorer')
    })

  it('renders unicode token identifiers correctly', () => {
      expect(getTokenExplorerLinkLabel('トークン-٧')).toBe('Token: トークン-٧')
    })

  it('treats numeric zero as a valid token identifier', () => {
      expect(getTokenExplorerLinkLabel(0)).toBe('Token: 0')
    })
})

describe('getTokenExplorerUrl', () => {
  it('encodes accented latin token identifiers safely', () => {
      const tokenId = 'fíchâ-ñ'
      expect(getTokenExplorerUrl(tokenId)).toBe(`https://explorer.hiro.so/token/${encodeURIComponent(tokenId)}?chain=mainnet`)
    })

  it('encodes ampersand characters in token identifiers', () => {
      expect(getTokenExplorerUrl("token&id")).toBe("https://explorer.hiro.so/token/token%26id?chain=mainnet")
    })

  it('encodes apostrophe characters in token identifiers', () => {
      expect(getTokenExplorerUrl("token'id")).toBe("https://explorer.hiro.so/token/token'id?chain=mainnet")
    })

  it('encodes arabic token identifiers safely', () => {
      const tokenId = 'رمز-٣٣'
      expect(getTokenExplorerUrl(tokenId)).toBe(`https://explorer.hiro.so/token/${encodeURIComponent(tokenId)}?chain=mainnet`)
    })

  it('encodes asterisk characters in token identifiers', () => {
      expect(getTokenExplorerUrl("token*id")).toBe("https://explorer.hiro.so/token/token*id?chain=mainnet")
    })

  it('encodes at symbol characters in token identifiers', () => {
      expect(getTokenExplorerUrl("token@id")).toBe("https://explorer.hiro.so/token/token%40id?chain=mainnet")
    })

  it('encodes backslash characters in token identifiers', () => {
      expect(getTokenExplorerUrl("token\\id")).toBe("https://explorer.hiro.so/token/token%5Cid?chain=mainnet")
    })

  it('encodes backtick characters in token identifiers', () => {
      expect(getTokenExplorerUrl("token`id")).toBe("https://explorer.hiro.so/token/token%60id?chain=mainnet")
    })

  it('builds token explorer links on the configured network', () => {
      expect(getTokenExplorerUrl('123')).toBe('https://explorer.hiro.so/token/123?chain=mainnet')
    })

  it('encodes bigint token ids through string conversion', () => {
      expect(getTokenExplorerUrl(999n)).toBe('https://explorer.hiro.so/token/999?chain=mainnet')
    })

  it('encodes bitcoin sign characters in token ids', () => {
      const tokenId = 'asset-₿-001'
      expect(getTokenExplorerUrl(tokenId)).toBe(`https://explorer.hiro.so/token/${encodeURIComponent(tokenId)}?chain=mainnet`)
    })

  it('stringifies boolean token identifiers', () => {
      expect(getTokenExplorerUrl(true)).toBe('https://explorer.hiro.so/token/true?chain=mainnet')
    })

  it('encodes braille pattern token identifiers safely', () => {
      const tokenId = 'token-⠓⠊'
      expect(getTokenExplorerUrl(tokenId)).toBe(`https://explorer.hiro.so/token/${encodeURIComponent(tokenId)}?chain=mainnet`)
    })

  it('encodes caret characters in token identifiers', () => {
      expect(getTokenExplorerUrl("token^id")).toBe("https://explorer.hiro.so/token/token%5Eid?chain=mainnet")
    })

  it('encodes carriage return characters in token identifiers', () => {
      expect(getTokenExplorerUrl("token\rid")).toBe("https://explorer.hiro.so/token/token%0Did?chain=mainnet")
    })

  it('encodes close parenthesis characters in token identifiers', () => {
      expect(getTokenExplorerUrl("token)id")).toBe("https://explorer.hiro.so/token/token)id?chain=mainnet")
    })

  it('encodes colon characters in token identifiers', () => {
      expect(getTokenExplorerUrl("token:id")).toBe("https://explorer.hiro.so/token/token%3Aid?chain=mainnet")
    })

  it('encodes token ids containing combining diacritic marks', () => {
      const tokenId = 'o\u0302-token'
      expect(getTokenExplorerUrl(tokenId)).toBe(`https://explorer.hiro.so/token/${encodeURIComponent(tokenId)}?chain=mainnet`)
    })

  it('encodes comma characters in token identifiers', () => {
      expect(getTokenExplorerUrl("token,id")).toBe("https://explorer.hiro.so/token/token%2Cid?chain=mainnet")
    })

  it('encodes devanagari token identifiers safely', () => {
      const tokenId = 'टोकन-१२३'
      expect(getTokenExplorerUrl(tokenId)).toBe(`https://explorer.hiro.so/token/${encodeURIComponent(tokenId)}?chain=mainnet`)
    })

  it('encodes dollar sign characters in token identifiers', () => {
      expect(getTokenExplorerUrl("token$id")).toBe("https://explorer.hiro.so/token/token%24id?chain=mainnet")
    })

  it('encodes double quote characters in token identifiers', () => {
      expect(getTokenExplorerUrl("token\"id")).toBe("https://explorer.hiro.so/token/token%22id?chain=mainnet")
    })

  it('falls back to chain root when token id is empty', () => {
      expect(getTokenExplorerUrl('')).toBe('https://explorer.hiro.so?chain=mainnet')
    })

  it('encodes token identifiers safely', () => {
      expect(getTokenExplorerUrl('abc/def?x=1')).toBe('https://explorer.hiro.so/token/abc%2Fdef%3Fx%3D1?chain=mainnet')
    })

  it('encodes equals sign characters in token identifiers', () => {
      expect(getTokenExplorerUrl("token=id")).toBe("https://explorer.hiro.so/token/token%3Did?chain=mainnet")
    })

  it('encodes exclamation mark characters in token identifiers', () => {
      expect(getTokenExplorerUrl("token!id")).toBe("https://explorer.hiro.so/token/token!id?chain=mainnet")
    })

  it('encodes fire emoji characters in token identifiers', () => {
      expect(getTokenExplorerUrl("token🔥id")).toBe("https://explorer.hiro.so/token/token%F0%9F%94%A5id?chain=mainnet")
    })

  it('encodes fullwidth latin token identifiers safely', () => {
      const tokenId = 'ＴＫ-１２３'
      expect(getTokenExplorerUrl(tokenId)).toBe(`https://explorer.hiro.so/token/${encodeURIComponent(tokenId)}?chain=mainnet`)
    })

  it('encodes globe emoji token identifiers safely', () => {
      const tokenId = 'token-🌍-88'
      expect(getTokenExplorerUrl(tokenId)).toBe(`https://explorer.hiro.so/token/${encodeURIComponent(tokenId)}?chain=mainnet`)
    })

  it('encodes greater-than characters in token identifiers', () => {
      expect(getTokenExplorerUrl("token>id")).toBe("https://explorer.hiro.so/token/token%3Eid?chain=mainnet")
    })

  it('encodes greek token identifiers safely', () => {
      const tokenId = 'διακριτικό-42'
      expect(getTokenExplorerUrl(tokenId)).toBe(`https://explorer.hiro.so/token/${encodeURIComponent(tokenId)}?chain=mainnet`)
    })

  it('encodes hash sign characters in token identifiers', () => {
      expect(getTokenExplorerUrl("token#id")).toBe("https://explorer.hiro.so/token/token%23id?chain=mainnet")
    })

  it('encodes hebrew token identifiers safely', () => {
      const tokenId = 'אסימון-17'
      expect(getTokenExplorerUrl(tokenId)).toBe(`https://explorer.hiro.so/token/${encodeURIComponent(tokenId)}?chain=mainnet`)
    })

  it('encodes kanji token identifiers safely', () => {
      const tokenId = '資産-九'
      expect(getTokenExplorerUrl(tokenId)).toBe(`https://explorer.hiro.so/token/${encodeURIComponent(tokenId)}?chain=mainnet`)
    })

  it('encodes korean token identifiers safely', () => {
      const tokenId = '토큰-51'
      expect(getTokenExplorerUrl(tokenId)).toBe(`https://explorer.hiro.so/token/${encodeURIComponent(tokenId)}?chain=mainnet`)
    })

  it('encodes left brace characters in token identifiers', () => {
      expect(getTokenExplorerUrl("token{id")).toBe("https://explorer.hiro.so/token/token%7Bid?chain=mainnet")
    })

  it('encodes left bracket characters in token identifiers', () => {
      expect(getTokenExplorerUrl("token[id")).toBe("https://explorer.hiro.so/token/token%5Bid?chain=mainnet")
    })

  it('encodes less-than characters in token identifiers', () => {
      expect(getTokenExplorerUrl("token<id")).toBe("https://explorer.hiro.so/token/token%3Cid?chain=mainnet")
    })

  it('encodes mathematical symbols in token ids', () => {
      const tokenId = 'tk-∑π√'
      expect(getTokenExplorerUrl(tokenId)).toBe(`https://explorer.hiro.so/token/${encodeURIComponent(tokenId)}?chain=mainnet`)
    })

  it('encodes newline characters in token identifiers', () => {
      expect(getTokenExplorerUrl("token\nid")).toBe("https://explorer.hiro.so/token/token%0Aid?chain=mainnet")
    })

  it('encodes nonbreaking space characters in token identifiers', () => {
      expect(getTokenExplorerUrl("token id")).toBe("https://explorer.hiro.so/token/token%C2%A0id?chain=mainnet")
    })

  it('falls back to chain root when token id is null', () => {
      expect(getTokenExplorerUrl(null)).toBe('https://explorer.hiro.so?chain=mainnet')
    })

  it('supports numeric token identifiers', () => {
      expect(getTokenExplorerUrl(42)).toBe('https://explorer.hiro.so/token/42?chain=mainnet')
    })

  it('stringifies object token ids before encoding', () => {
      expect(getTokenExplorerUrl({ id: 9 })).toBe(
        'https://explorer.hiro.so/token/%5Bobject%20Object%5D?chain=mainnet'
      )
    })

  it('encodes open parenthesis characters in token identifiers', () => {
      expect(getTokenExplorerUrl("token(id")).toBe("https://explorer.hiro.so/token/token(id?chain=mainnet")
    })

  it('encodes percent sign characters in token identifiers', () => {
      expect(getTokenExplorerUrl("token%id")).toBe("https://explorer.hiro.so/token/token%25id?chain=mainnet")
    })

  it('encodes pipe characters in token identifiers', () => {
      expect(getTokenExplorerUrl("token|id")).toBe("https://explorer.hiro.so/token/token%7Cid?chain=mainnet")
    })

  it('encodes plus sign characters in token identifiers', () => {
      expect(getTokenExplorerUrl("token+id")).toBe("https://explorer.hiro.so/token/token%2Bid?chain=mainnet")
    })

  it('encodes question mark characters in token identifiers', () => {
      expect(getTokenExplorerUrl("token?id")).toBe("https://explorer.hiro.so/token/token%3Fid?chain=mainnet")
    })

  it('encodes right brace characters in token identifiers', () => {
      expect(getTokenExplorerUrl("token}id")).toBe("https://explorer.hiro.so/token/token%7Did?chain=mainnet")
    })

  it('encodes right bracket characters in token identifiers', () => {
      expect(getTokenExplorerUrl("token]id")).toBe("https://explorer.hiro.so/token/token%5Did?chain=mainnet")
    })

  it('encodes rocket emoji token identifiers safely', () => {
      const tokenId = 'token-🚀-01'
      expect(getTokenExplorerUrl(tokenId)).toBe(`https://explorer.hiro.so/token/${encodeURIComponent(tokenId)}?chain=mainnet`)
    })

  it('encodes token ids containing right-to-left marks', () => {
      const tokenId = `tk\u200F123`
      expect(getTokenExplorerUrl(tokenId)).toBe(`https://explorer.hiro.so/token/${encodeURIComponent(tokenId)}?chain=mainnet`)
    })

  it('encodes semicolon characters in token identifiers', () => {
      expect(getTokenExplorerUrl("token;id")).toBe("https://explorer.hiro.so/token/token%3Bid?chain=mainnet")
    })

  it('encodes slashes in token identifiers', () => {
      expect(getTokenExplorerUrl('set/1')).toBe('https://explorer.hiro.so/token/set%2F1?chain=mainnet')
    })

  it('encodes space characters in token identifiers', () => {
      expect(getTokenExplorerUrl("token id")).toBe("https://explorer.hiro.so/token/token%20id?chain=mainnet")
    })

  it('encodes symbol token ids without throwing', () => {
      expect(getTokenExplorerUrl(Symbol('token'))).toBe(
        'https://explorer.hiro.so/token/Symbol(token)?chain=mainnet'
      )
    })

  it('encodes tab characters in token identifiers', () => {
      expect(getTokenExplorerUrl("token\tid")).toBe("https://explorer.hiro.so/token/token%09id?chain=mainnet")
    })

  it('encodes thai token identifiers safely', () => {
      const tokenId = 'โทเค็น-88'
      expect(getTokenExplorerUrl(tokenId)).toBe(`https://explorer.hiro.so/token/${encodeURIComponent(tokenId)}?chain=mainnet`)
    })

  it('encodes tilde characters in token identifiers', () => {
      expect(getTokenExplorerUrl("token~id")).toBe("https://explorer.hiro.so/token/token~id?chain=mainnet")
    })

  it('trims surrounding spaces before encoding token ids', () => {
      expect(getTokenExplorerUrl(' 123 ')).toBe('https://explorer.hiro.so/token/123?chain=mainnet')
    })

  it('falls back to explorer home for undefined token ids', () => {
      expect(getTokenExplorerUrl(undefined)).toBe('https://explorer.hiro.so?chain=mainnet')
    })

  it('encodes unicode token identifiers safely', () => {
      const tokenId = 'こんにちは/123'
      expect(getTokenExplorerUrl(tokenId)).toBe(`https://explorer.hiro.so/token/${encodeURIComponent(tokenId)}?chain=mainnet`)
    })

  it('falls back to chain root when token id is whitespace only', () => {
      expect(getTokenExplorerUrl('   ')).toBe('https://explorer.hiro.so?chain=mainnet')
    })

  it('supports zero token ids', () => {
      expect(getTokenExplorerUrl(0)).toBe('https://explorer.hiro.so/token/0?chain=mainnet')
    })

  it('encodes zero-width-joiner emoji sequences in token ids', () => {
      const tokenId = 'token-👩‍🚀'
      expect(getTokenExplorerUrl(tokenId)).toBe(`https://explorer.hiro.so/token/${encodeURIComponent(tokenId)}?chain=mainnet`)
    })
})

describe('getTxExplorerLinkLabel', () => {
  it('stringifies multi-value array ids with comma separation', () => {
      expect(getTxExplorerLinkLabel(['a', 'b'])).toBe('Transaction: a,b')
    })

  it('renders transaction label copy for a normal tx id', () => {
      expect(getTxExplorerLinkLabel('0xabc')).toBe('Transaction: 0xabc')
    })

  it('supports bigint transaction identifiers', () => {
      expect(getTxExplorerLinkLabel(1234567890123456789n)).toBe('Transaction: 1234567890123456789')
    })

  it('keeps false boolean tx identifiers as visible text', () => {
      expect(getTxExplorerLinkLabel(false)).toBe('Transaction: false')
    })

  it('renders true boolean identifiers as transaction label text', () => {
      expect(getTxExplorerLinkLabel(true)).toBe('Transaction: true')
    })

  it('renders emoji transaction identifiers in label copy', () => {
      expect(getTxExplorerLinkLabel('tx🔥99')).toBe('Transaction: tx🔥99')
    })

  it('coerces empty array ids to empty string content without fallback', () => {
      expect(getTxExplorerLinkLabel([])).toBe('Transaction: ')
    })

  it('falls back to generic transaction explorer copy for empty ids', () => {
      expect(getTxExplorerLinkLabel('')).toBe('Open Transaction in Explorer')
    })

  it('renders Infinity as explicit transaction label text', () => {
      expect(getTxExplorerLinkLabel(Number.POSITIVE_INFINITY)).toBe('Transaction: Infinity')
    })

  it('renders NaN as explicit transaction label text', () => {
      expect(getTxExplorerLinkLabel(Number.NaN)).toBe('Transaction: NaN')
    })

  it('stringifies negative numeric transaction identifiers', () => {
      expect(getTxExplorerLinkLabel(-1)).toBe('Transaction: -1')
    })

  it('returns generic copy when tx identifier is null', () => {
      expect(getTxExplorerLinkLabel(null)).toBe('Open Transaction in Explorer')
    })

  it('stringifies numeric tx identifiers', () => {
      expect(getTxExplorerLinkLabel(77)).toBe('Transaction: 77')
    })

  it('falls back to object stringification for tx identifier objects', () => {
      expect(getTxExplorerLinkLabel({ tx: 'id' })).toBe('Transaction: [object Object]')
    })

  it('preserves internal tab characters in transaction identifiers', () => {
      expect(getTxExplorerLinkLabel('tx\tpart')).toBe('Transaction: tx\tpart')
    })

  it('stringifies symbol transaction identifiers safely', () => {
      expect(getTxExplorerLinkLabel(Symbol.for('tx-ref'))).toBe('Transaction: Symbol(tx-ref)')
    })

  it('trims surrounding whitespace around tx ids', () => {
      expect(getTxExplorerLinkLabel('  0xabc  ')).toBe('Transaction: 0xabc')
    })

  it('returns generic copy when tx identifier is undefined', () => {
      expect(getTxExplorerLinkLabel(undefined)).toBe('Open Transaction in Explorer')
    })

  it('renders unicode transaction identifiers correctly', () => {
      expect(getTxExplorerLinkLabel('тх-β')).toBe('Transaction: тх-β')
    })

  it('treats numeric zero as a valid tx identifier', () => {
      expect(getTxExplorerLinkLabel(0)).toBe('Transaction: 0')
    })
})

describe('normalizeExplorerType', () => {
  it('keeps address type unchanged when type is valid', () => {
      expect(normalizeExplorerType('address')).toBe('address')
    })

  it('falls back to txid when an unsupported type is provided', () => {
      expect(normalizeExplorerType('mint')).toBe('txid')
    })

  it('falls back to txid for unsupported explorer types', () => {
      expect(normalizeExplorerType('collection')).toBe('txid')
    })

  it('keeps token type unchanged when type is valid', () => {
      expect(normalizeExplorerType('token')).toBe('token')
    })

  it('falls back when explorer type includes surrounding whitespace', () => {
      expect(normalizeExplorerType(' txid ')).toBe('txid')
    })
})


import { describe, expect, it } from 'vitest';
import { getIsPaused } from './contract';

describe('get‑is‑paused read‑only function', () => {
  it('returns a boolean', async () => {
    const res = await getIsPaused();
    expect(typeof res.ok).toBe('boolean');
  });
});
