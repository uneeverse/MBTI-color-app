// sessionStorage 안전 래퍼. 접근이 막힌 환경에서도 앱이 동작하도록 메모리에 폴백한다.
const KEY = 'mbti-palette-answers'
let memory = []

function clean(value) {
  if (!Array.isArray(value)) return []
  const out = []
  for (const v of value) {
    if (v !== 'A' && v !== 'B') break
    out.push(v)
    if (out.length === 4) break
  }
  return out
}

export function loadAnswers() {
  try {
    const raw = sessionStorage.getItem(KEY)
    return raw ? clean(JSON.parse(raw)) : []
  } catch {
    return clean(memory)
  }
}

export function saveAnswers(answers) {
  const safe = clean(answers)
  memory = safe
  try {
    sessionStorage.setItem(KEY, JSON.stringify(safe))
  } catch {
    // 저장 실패는 무시한다 (메모리 값 사용)
  }
}

export function clearAnswers() {
  memory = []
  try {
    sessionStorage.removeItem(KEY)
  } catch {
    // 무시
  }
}
