import { copyText } from './clipboard.js'

// 링크를 클립보드에 복사한다. 반환: true | false
export function copyLink(url) {
  return copyText(url)
}

const KAKAO_SDK_URL = 'https://t1.kakaocdn.net/kakao_js_sdk/2.8.3/kakao.min.js'
let kakaoLoading = null

// 카카오 SDK를 필요할 때 한 번만 불러와 초기화한다. 실패하면 null
function loadKakao() {
  const key = import.meta.env.VITE_KAKAO_JS_KEY
  if (!key) return Promise.resolve(null)
  kakaoLoading ??= new Promise((resolve) => {
    const init = () => {
      if (!window.Kakao) return resolve(null)
      if (!window.Kakao.isInitialized()) window.Kakao.init(key)
      resolve(window.Kakao)
    }
    if (window.Kakao) return init()
    const script = document.createElement('script')
    script.src = KAKAO_SDK_URL
    script.crossOrigin = 'anonymous'
    script.onload = init
    script.onerror = () => resolve(null)
    document.head.appendChild(script)
  }).then((kakao) => {
    if (!kakao) kakaoLoading = null // 실패하면 다음에 다시 시도
    return kakao
  })
  return kakaoLoading
}

// 카카오톡 공유(피드 메시지). 반환: 'sent' | 'unavailable'(키 없음·SDK 로드 실패) | 'failed'
export async function shareKakao({ url, title, description }) {
  const kakao = await loadKakao()
  if (!kakao) return 'unavailable'
  const link = { mobileWebUrl: url, webUrl: url }
  try {
    kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title,
        description,
        imageUrl: `${location.origin}/kakao-share.png`,
        link,
      },
      buttons: [{ title: '나도 해보기', link }],
    })
    return 'sent'
  } catch {
    return 'failed'
  }
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
