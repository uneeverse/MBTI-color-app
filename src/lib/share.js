import { copyText } from './clipboard.js'

// 링크를 클립보드에 복사한다. 반환: true | false
export function copyLink(url) {
  return copyText(url)
}

// SNS 공유. 기기 공유창을 지원하면 쓰고, 아니면 X(트위터) 공유 창을 연다.
// 반환: 'shared' | 'cancelled' | 'opened' | 'blocked'(팝업 차단)
export async function shareSns(url, title) {
  if (navigator.share) {
    try {
      await navigator.share({ title, url })
      return 'shared'
    } catch (e) {
      if (e?.name === 'AbortError') return 'cancelled'
    }
  }
  const intent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
  // 'noopener'를 features에 주면 항상 null이 와서 차단 여부를 알 수 없으므로, 연 뒤에 opener를 끊는다
  const win = window.open(intent, '_blank')
  if (!win) return 'blocked'
  win.opener = null
  return 'opened'
}
