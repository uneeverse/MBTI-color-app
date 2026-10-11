import { QUESTIONS } from '../data/quiz.js'

// 답 배열(['A','B','B','A'])을 유형 코드('ENFJ')로 바꾼다. 답이 올바르지 않으면 null.
export function judge(answers) {
  if (!Array.isArray(answers) || answers.length !== QUESTIONS.length) return null
  let code = ''
  for (let i = 0; i < QUESTIONS.length; i++) {
    const pick = answers[i]
    if (pick !== 'A' && pick !== 'B') return null
    code += (pick === 'A' ? QUESTIONS[i].a : QUESTIONS[i].b).letter
  }
  return code
}
