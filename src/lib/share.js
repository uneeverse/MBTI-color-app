import { copyText } from './clipboard.js'

// 공유창을 지원하면 사용하고, 아니면 링크를 복사한다. 반환: 'shared' | 'cancelled' | 'copied' | 'failed'
export async function shareLink(url, title) {
  if (navigator.share) {
    try {
      await navigator.share({ title, url })
      return 'shared'
    } catch (e) {
      if (e?.name === 'AbortError') return 'cancelled'
    }
  }
  return (await copyText(url)) ? 'copied' : 'failed'
}
