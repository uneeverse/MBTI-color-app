// 질문 4개. 질문 순서와 보기 A/B 위치는 고정한다. (A = 앞 글자, B = 뒤 글자)
export const SERVICE_NAME = '내 색 찾기'

export const QUESTIONS = [
  {
    axis: 'E/I',
    text: '주말 오후, 약속이 갑자기 취소됐다. 지금 기분은?',
    a: { label: '아쉽다. 누구라도 불러서 만나고 싶다', letter: 'E' },
    b: { label: '오히려 좋다. 혼자 쉴 시간이 생겼다', letter: 'I' },
  },
  {
    axis: 'S/N',
    text: '새로운 걸 배울 때 나는?',
    a: { label: '방법과 순서를 찾아 하나씩 차근차근 해 본다', letter: 'S' },
    b: { label: '큰 그림과 가능성을 먼저 상상해 본다', letter: 'N' },
  },
  {
    axis: 'T/F',
    text: '친구가 고민을 털어놓았다. 먼저 나오는 말은?',
    a: { label: '"이렇게 해결해 보면 어때?" 방법부터 같이 찾는다', letter: 'T' },
    b: { label: '"많이 힘들었겠다." 마음부터 먼저 살핀다', letter: 'F' },
  },
  {
    axis: 'J/P',
    text: '여행 전날 밤, 나는?',
    a: { label: '일정표와 짐 목록을 확인하며 마무리한다', letter: 'J' },
    b: { label: '큰 틀만 정해 두고 나머지는 가서 정한다', letter: 'P' },
  },
]
