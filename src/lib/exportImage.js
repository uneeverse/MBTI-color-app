import { contrastText } from './color.js'

// 결과 팔레트를 PNG로 그려 내려받는다. 실패하지 않으면 true (공유창을 취소한 경우 포함).
export async function saveImage(code, palette) {
  const W = 1080
  const H = 1350
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')
  // Pretendard는 따로 로드하지 않는다. 기기에 없으면 뒤의 한글 시스템 글꼴로 그려진다.
  const font = '"Pretendard", "Malgun Gothic", "Apple SD Gothic Neo", sans-serif'
  try {
    await document.fonts?.ready
  } catch {
    // 폰트 대기 실패는 무시
  }

  // 5번째 색이 스와치와 겹쳐 묻히지 않도록 배경은 중립색을 쓴다
  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(0, 0, W, H)
  ctx.fillStyle = '#111111'
  ctx.textAlign = 'center'
  ctx.font = `700 120px ${font}`
  ctx.fillText(code, W / 2, 190)
  ctx.font = `500 52px ${font}`
  ctx.fillText(palette.name, W / 2, 270)

  const top = 340
  const h = (H - top - 80) / 5
  palette.colors.forEach((c, i) => {
    const y = top + i * h
    ctx.fillStyle = c
    ctx.fillRect(80, y, W - 160, h)
    ctx.fillStyle = contrastText(c)
    ctx.font = `600 48px ${font}`
    ctx.fillText(c, W / 2, y + h / 2 + 17)
  })
  // 밝은 색이 흰 배경에서도 구분되도록 바깥 테두리를 긋는다
  ctx.strokeStyle = '#D9D9E0'
  ctx.lineWidth = 2
  ctx.strokeRect(80, top, W - 160, h * 5)

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))
  if (!blob) return false
  const file = new File([blob], `palette-${code}.png`, { type: 'image/png' })
  // 모바일(iOS 등)은 download 속성이 막히는 경우가 있어 파일 공유창을 먼저 쓴다
  if (navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file] })
      return true
    } catch (e) {
      if (e?.name === 'AbortError') return true
    }
  }
  const a = document.createElement('a')
  const url = URL.createObjectURL(blob)
  a.href = url
  a.download = file.name
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
  return true
}
