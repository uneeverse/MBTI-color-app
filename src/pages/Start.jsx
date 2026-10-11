import { Link } from 'react-router-dom'
import ColorStrip from '../components/ColorStrip.jsx'
import { PALETTES } from '../data/palettes.js'
import { SERVICE_NAME } from '../data/quiz.js'
import { clearAnswers } from '../lib/storage.js'

const SAMPLES = ['INTJ', 'ENFP', 'ISFP', 'ESTJ']

export default function Start() {
  return (
    <main className="page center">
      <h1>{SERVICE_NAME}</h1>
      <p className="lead">질문 4개로 알아보는 나의 컬러 팔레트</p>
      <p className="hint">약 1분이면 끝나요</p>
      <div className="samples">
        {SAMPLES.map((code) => (
          <ColorStrip key={code} colors={PALETTES[code].colors} />
        ))}
      </div>
      <Link className="btn primary" to="/quiz/1" onClick={clearAnswers}>
        시작하기
      </Link>
    </main>
  )
}
