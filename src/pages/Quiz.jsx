import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { QUESTIONS } from '../data/quiz.js'
import { judge } from '../lib/judge.js'
import { loadAnswers, saveAnswers } from '../lib/storage.js'

export default function Quiz() {
  const { step } = useParams()
  const navigate = useNavigate()
  const n = Number(step)
  const total = QUESTIONS.length

  if (!Number.isInteger(n) || n < 1 || n > total) return <Navigate to="/quiz/1" replace />

  const answers = loadAnswers()
  // 앞 질문 답이 없으면 되돌린다: 답이 하나도 없으면 시작 화면(질문 1은 그대로 허용), 일부만 있으면 이어 갈 질문으로
  if (answers.length < n - 1) {
    const to = answers.length === 0 ? '/' : `/quiz/${answers.length + 1}`
    return <Navigate to={to} replace />
  }

  const q = QUESTIONS[n - 1]
  const chosen = answers[n - 1]

  function pick(value) {
    const next = [...answers.slice(0, n - 1), value]
    saveAnswers(next)
    if (n === total) {
      const code = judge(next)
      // 판정할 수 없으면 처음부터 다시 시작한다
      navigate(code ? `/result/${code}` : '/quiz/1')
    } else {
      navigate(`/quiz/${n + 1}`)
    }
  }

  return (
    <main className="page">
      <div className="progress" aria-live="polite">
        <span>
          {n}/{total}
        </span>
        <div className="bar" aria-hidden="true">
          <i style={{ width: `${(n / total) * 100}%` }} />
        </div>
      </div>
      <h2 className="question">
        {/* 마침표·물음표 기준으로 문장마다 한 줄씩 보여 준다 */}
        {(q.text.match(/[^.?]+[.?]?/g) ?? [q.text]).map((sentence) => (
          <span key={sentence} className="sentence">
            {sentence.trim()}
          </span>
        ))}
      </h2>
      <div className="choices">
        {[
          ['A', q.a],
          ['B', q.b],
        ].map(([key, opt]) => (
          <button
            key={key}
            type="button"
            className={`btn choice${chosen === key ? ' selected' : ''}`}
            aria-pressed={chosen === key}
            onClick={() => pick(key)}
          >
            {opt.label}
          </button>
        ))}
      </div>
      {n > 1 && (
        <button type="button" className="link" onClick={() => navigate(`/quiz/${n - 1}`)}>
          이전
        </button>
      )}
    </main>
  )
}
