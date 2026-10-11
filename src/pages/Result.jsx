import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PALETTES, findType } from '../data/palettes.js'
import { SERVICE_NAME } from '../data/quiz.js'
import { copyText } from '../lib/clipboard.js'
import { saveImage } from '../lib/exportImage.js'
import { judge } from '../lib/judge.js'
import { shareLink } from '../lib/share.js'
import { clearAnswers, loadAnswers } from '../lib/storage.js'
import ResultCard from '../components/ResultCard.jsx'
import { useToast } from '../components/Toast.jsx'
import NotFound from './NotFound.jsx'

export default function Result() {
  const { code: rawCode } = useParams()
  const code = findType(rawCode)
  const [toast, toastNode] = useToast()
  const [failedText, setFailedText] = useState(null)
  // 화면에 들어올 때 한 번만 판정한다 (다시하기로 답을 지워도 버튼 문구가 바뀌지 않게)
  const [mine] = useState(() => !!code && judge(loadAnswers()) === code)

  // 없는 유형 주소는 안내·오류 화면을 보여 준다
  if (!code) return <NotFound />

  const palette = PALETTES[code]

  async function copyHex(hex) {
    if (await copyText(hex)) {
      setFailedText(null)
      toast(`${hex} 복사됐어요`)
    } else {
      setFailedText(hex)
    }
  }

  async function copyAll() {
    const all = palette.colors.join(' ')
    if (await copyText(all)) {
      setFailedText(null)
      toast('5색 코드가 복사됐어요')
    } else {
      setFailedText(all)
    }
  }

  async function share() {
    const result = await shareLink(`${location.origin}/result/${code}`, `${SERVICE_NAME} ${code}`)
    if (result === 'copied') toast('링크가 복사됐어요')
    else if (result === 'failed') toast('링크를 복사하지 못했어요')
  }

  async function download() {
    if (!(await saveImage(code, palette))) toast('이미지를 만들지 못했어요')
  }

  // 테스트를 마친 사람은 "다시하기", 공유 링크로 온 사람은 "나도 해보기"(맨 위)
  const retry = (
    <Link className="btn primary" to="/" onClick={clearAnswers}>
      {mine ? '다시하기' : '나도 해보기'}
    </Link>
  )

  return (
    <main className="page result">
      {!mine && retry}
      <ResultCard code={code} name={palette.name} color={palette.colors[0]} />
      <ul className="chips">
        {palette.colors.map((hex) => (
          <li key={hex}>
            <button
              type="button"
              className="chip"
              style={{ background: hex }}
              onClick={() => copyHex(hex)}
              aria-label={`${hex} 복사`}
            />
          </li>
        ))}
      </ul>
      {failedText && (
        <p className="fallback" role="alert">
          직접 복사해 주세요: <code>{failedText}</code>
        </p>
      )}
      <p className="hint">재미로 보는 간이 테스트예요. 정식 MBTI 검사를 대체하지 않아요.</p>
      <div className="actions">
        <button type="button" className="btn" onClick={copyAll}>
          5색 한 번에 복사
        </button>
        <button type="button" className="btn" onClick={download}>
          이미지 저장
        </button>
        <button type="button" className="btn" onClick={share}>
          링크 공유
        </button>
        {mine && retry}
      </div>
      {toastNode}
    </main>
  )
}
