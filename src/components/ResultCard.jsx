import { useLayoutEffect, useRef } from 'react'
import './ResultCard.css'

// 피그마(Interactive Eye Following Card) 기준: 눈 204px, 눈동자 76px, 여유 5px
const EYE = 204
const PUPIL = 76
const GAP = 5
// 눈동자의 기본 위치(눈 중심 기준 오프셋, 눈 크기에 대한 비율)
const DEFAULTS = [
  { x: (74.8272 - 102) / EYE, y: (78.3184 - 102) / EYE },
  { x: (119.032 - 102) / EYE, y: (117.787 - 102) / EYE },
]

export default function ResultCard({ code, name, color }) {
  const eyeRefs = useRef([])
  const pupilRefs = useRef([])

  // 첫 페인트 전에 눈동자 위치를 잡아 어긋난 위치가 보이지 않게 한다
  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    function place(i, dx, dy) {
      const pupil = pupilRefs.current[i]
      if (pupil) pupil.style.transform = `translate(-50%, -50%) translate(${dx}px, ${dy}px)`
    }

    function rest() {
      eyeRefs.current.forEach((eye, i) => {
        if (!eye) return
        const size = eye.getBoundingClientRect().width
        place(i, DEFAULTS[i].x * size, DEFAULTS[i].y * size)
      })
    }

    function onMove(e) {
      eyeRefs.current.forEach((eye, i) => {
        if (!eye) return
        const rect = eye.getBoundingClientRect()
        const scale = rect.width / EYE
        const dx = e.clientX - (rect.left + rect.width / 2)
        const dy = e.clientY - (rect.top + rect.height / 2)
        const distance = Math.hypot(dx, dy)
        const base = { x: DEFAULTS[i].x * rect.width, y: DEFAULTS[i].y * rect.width }
        if (distance < 1) return place(i, base.x, base.y)
        const max = rect.width / 2 - (PUPIL / 2) * scale - GAP * scale
        const move = Math.min(distance, max)
        const x = (dx / distance) * move + base.x
        const y = (dy / distance) * move + base.y
        // 기본 오프셋을 더한 최종 위치도 눈 밖으로 나가지 않도록 제한한다
        const len = Math.hypot(x, y)
        const k = len > max ? max / len : 1
        place(i, x * k, y * k)
      })
    }

    // 눈 크기가 바뀌면(화면 크기 변경) 기본 위치도 다시 계산한다
    rest()
    window.addEventListener('resize', rest)
    if (!reduceMotion.matches) window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('resize', rest)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <section className="result-card" aria-label={`${code} ${name}`}>
      <div className="result-card__monster" style={{ background: color }}>
        <div className="result-card__eyes" aria-hidden="true">
          {[0, 1].map((i) => (
            <div key={i} className="result-card__eye" ref={(el) => {
                eyeRefs.current[i] = el
              }}
            >
              <div
                className="result-card__pupil"
                ref={(el) => {
                  pupilRefs.current[i] = el
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="result-card__legend">
        <p className="result-card__code">{code}</p>
        <h1 className="result-card__name">{name}</h1>
      </div>
    </section>
  )
}
