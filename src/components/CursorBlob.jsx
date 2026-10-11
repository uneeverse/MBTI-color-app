import { useEffect, useRef } from 'react'
import { useMatch } from 'react-router-dom'
import { PALETTES, findType } from '../data/palettes.js'

const SIZE = 480
const EASE = 0.12

// 마우스 커서를 부드럽게 따라다니는 원형 그라데이션. 결과 화면에서는 해당 유형의 팔레트 색으로 바뀐다
export default function CursorBlob() {
  const ref = useRef(null)
  const match = useMatch('/result/:code')
  const code = findType(match?.params.code)
  const color = code ? PALETTES[code].colors[2] : null

  useEffect(() => {
    const el = ref.current
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const pos = { ...target }
    let frame = 0

    const place = () => {
      el.style.transform = `translate(${pos.x - SIZE / 2}px, ${pos.y - SIZE / 2}px)`
    }
    place()

    // 움직임 줄이기 설정이면 커서를 따라가지 않고 화면 중앙에 고정한다
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduceMotion.matches) return

    // 목표 지점에 거의 도달하면 루프를 멈추고, 다음 움직임이 있을 때 다시 시작한다
    const draw = () => {
      pos.x += (target.x - pos.x) * EASE
      pos.y += (target.y - pos.y) * EASE
      const settled = Math.abs(target.x - pos.x) < 0.5 && Math.abs(target.y - pos.y) < 0.5
      if (settled) {
        pos.x = target.x
        pos.y = target.y
      }
      place()
      frame = settled || document.hidden ? 0 : requestAnimationFrame(draw)
    }
    const onMove = (e) => {
      target.x = e.clientX
      target.y = e.clientY
      if (!frame) frame = requestAnimationFrame(draw)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  return <div ref={ref} className="blob" aria-hidden="true" style={color ? { '--blob-color': color } : undefined} />
}
