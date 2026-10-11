import { useEffect, useRef, useState } from 'react'
import { Lottie } from 'lottie-react'
import animationData from '../assets/loading-animation.json'
import './Loading.css'

const QUERY = '(prefers-reduced-motion: reduce)'

// 움직임 줄이기 설정 여부 (SSR/미지원 환경에서는 false)
function getReduced() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia(QUERY).matches
}

// 결과를 기다리는 동안 보여주는 로딩 화면
export default function Loading() {
  const [reduced, setReduced] = useState(getReduced)
  const mainRef = useRef(null)

  // 마지막 답 버튼이 사라져 포커스가 body로 빠지므로, 로딩 화면으로 옮겨 스크린리더가 안내를 읽게 한다
  useEffect(() => {
    const main = mainRef.current
    if (!main) return
    main.tabIndex = -1
    main.focus({ preventScroll: true })
  }, [])

  // 설정이 바뀌면 따라가고, 화면을 떠날 때 구독을 정리한다
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia(QUERY)
    const onChange = (e) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <main className="page loading" ref={mainRef} aria-label="결과를 만드는 중이에요">
      <div className="loading-visual" aria-hidden="true">
        {reduced ? (
          <div className="loading-static" />
        ) : (
          <Lottie src={animationData} loop autoplay />
        )}
      </div>
      <p className="loading-text" role="status">
        결과를 만드는 중이에요
      </p>
    </main>
  )
}
