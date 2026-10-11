// 배경색 위에서 읽기 좋은 글자색(흑/백)을 고른다. (WCAG 상대 휘도 기준 대비가 큰 쪽)
export function contrastText(hex) {
  const lin = (c) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  }
  const n = parseInt(hex.slice(1), 16)
  const l = 0.2126 * lin((n >> 16) & 255) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255)
  return (1.05) / (l + 0.05) >= (l + 0.05) / 0.05 ? '#FFFFFF' : '#000000'
}
