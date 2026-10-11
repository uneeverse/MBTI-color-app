import { useCallback, useEffect, useRef, useState } from 'react'

// 잠깐 떴다 사라지는 안내 문구
export function useToast() {
  const [message, setMessage] = useState('')
  const timer = useRef(null)
  // 화면을 떠날 때 남은 타이머를 정리한다
  useEffect(() => () => clearTimeout(timer.current), [])
  const show = useCallback((text) => {
    setMessage(text)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setMessage(''), 2000)
  }, [])
  const node = (
    <div className="toast" role="status" aria-live="polite">
      {message}
    </div>
  )
  return [show, node]
}
