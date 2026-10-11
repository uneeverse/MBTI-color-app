// 텍스트를 클립보드에 복사한다. 성공하면 true, 실패하면 false.
export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}
