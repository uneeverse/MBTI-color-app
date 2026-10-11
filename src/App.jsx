import { useEffect, useRef } from 'react'
import { Routes, Route, useLocation, useParams } from 'react-router-dom'
import CursorBlob from './components/CursorBlob.jsx'
import Start from './pages/Start.jsx'
import Quiz from './pages/Quiz.jsx'
import Result from './pages/Result.jsx'
import Gallery from './pages/Gallery.jsx'
import NotFound from './pages/NotFound.jsx'

// 유형이 바뀌면 복사 실패 안내 같은 화면 상태를 새로 시작한다
function ResultRoute() {
  const { code } = useParams()
  return <Result key={code} />
}

export default function App() {
  const { pathname } = useLocation()
  const pageRef = useRef(null)
  const first = useRef(true)

  // 화면이 새로 마운트되면 포커스가 body로 초기화되므로, 이동 후 본문으로 옮겨 스크린리더가 새 화면을 읽게 한다
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    const main = pageRef.current?.querySelector('main')
    if (!main) return
    main.tabIndex = -1
    main.focus({ preventScroll: true })
  }, [pathname])

  return (
    <>
      <CursorBlob />
      {/* 주소가 바뀔 때마다 새로 마운트되어 fade + slide up 전환이 실행된다 */}
      <div key={pathname} ref={pageRef} className="page-transition">
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/quiz/:step" element={<Quiz />} />
          <Route path="/result/:code" element={<ResultRoute />} />
          <Route path="/types" element={<Gallery />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  )
}
