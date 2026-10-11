import { Routes, Route, useParams } from 'react-router-dom'
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
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/quiz/:step" element={<Quiz />} />
      <Route path="/result/:code" element={<ResultRoute />} />
      <Route path="/types" element={<Gallery />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
