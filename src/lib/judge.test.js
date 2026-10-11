import { describe, it, expect } from 'vitest'
import { judge } from './judge.js'
import { PALETTES, TYPE_CODES, findType } from '../data/palettes.js'
import { contrastText } from './color.js'

describe('judge', () => {
  it('A,B,B,A는 ENFJ', () => {
    expect(judge(['A', 'B', 'B', 'A'])).toBe('ENFJ')
  })

  it('답 16가지 조합이 서로 다른 16개 유형이고 모두 팔레트가 있다', () => {
    const codes = new Set()
    for (let i = 0; i < 16; i++) {
      const answers = [3, 2, 1, 0].map((bit) => ((i >> bit) & 1 ? 'B' : 'A'))
      const code = judge(answers)
      expect(PALETTES[code]).toBeDefined()
      codes.add(code)
    }
    expect(codes.size).toBe(16)
  })

  it('잘못된 답은 null', () => {
    expect(judge(['A', 'B'])).toBeNull()
    expect(judge(['A', 'B', 'C', 'A'])).toBeNull()
    expect(judge(null)).toBeNull()
  })
})

describe('palettes', () => {
  it('16유형, 각 5색, #RRGGBB 형식', () => {
    expect(TYPE_CODES).toHaveLength(16)
    for (const code of TYPE_CODES) {
      expect(PALETTES[code].colors).toHaveLength(5)
      for (const c of PALETTES[code].colors) expect(c).toMatch(/^#[0-9A-F]{6}$/)
    }
  })
})

describe('findType', () => {
  it('프로토타입 키 같은 엉뚱한 값은 null', () => {
    expect(findType('constructor')).toBeNull()
    expect(findType('__proto__')).toBeNull()
    expect(findType('intj')).toBe('INTJ')
  })
})

describe('contrastText', () => {
  const lum = (hex) => {
    const n = parseInt(hex.slice(1), 16)
    const lin = (c) => ((c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
    return 0.2126 * lin((n >> 16) & 255) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255)
  }
  it('모든 팔레트 색에서 글자 대비가 4.5:1 이상', () => {
    for (const code of TYPE_CODES) {
      for (const c of PALETTES[code].colors) {
        const l = lum(c)
        const t = lum(contrastText(c))
        const ratio = (Math.max(l, t) + 0.05) / (Math.min(l, t) + 0.05)
        expect(ratio, `${code} ${c}`).toBeGreaterThanOrEqual(4.5)
      }
    }
  })
})
