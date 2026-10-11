// 16유형 팔레트 (디자인 시안 v0.1). 색 역할: 1 가장 진함, 2~3 메인, 4 포인트, 5 밝은 배경.
export const PALETTES = {
  INTJ: { name: '새벽의 설계도', colors: ['#1F1B3A', '#3B2F6B', '#6A4FB3', '#A58BE0', '#E6DFF7'] },
  INTP: { name: '푸른 사색', colors: ['#2A2F4F', '#4B5FA8', '#7C8CE0', '#5FC7C0', '#E8ECFB'] },
  ENTJ: { name: '황금 지휘봉', colors: ['#2B0F4C', '#5B21B6', '#8B3FE0', '#F2B84B', '#F3E8FF'] },
  ENTP: { name: '번개 아이디어', colors: ['#4527A0', '#8E4DFF', '#E040FB', '#FFB74D', '#F5EBFF'] },
  INFJ: { name: '숲속의 등대', colors: ['#0F3B3A', '#2F6F68', '#5FA39A', '#A9D1C6', '#EAF5F0'] },
  INFP: { name: '이슬 맺힌 정원', colors: ['#3F6F5B', '#7FB59A', '#B7DEC8', '#F4C6C9', '#FBF6EC'] },
  ENFJ: { name: '햇살 가득한 광장', colors: ['#0B6B50', '#1FA37A', '#5ED1A0', '#F7C948', '#E9FBF2'] },
  ENFP: { name: '봄날 폭죽', colors: ['#00A676', '#3DDC97', '#B8F2D2', '#FF8FA3', '#FFE066'] },
  ISTJ: { name: '정돈된 서랍', colors: ['#1B2A41', '#324A6D', '#5C7BA3', '#A9BBD3', '#EEF2F7'] },
  ISFJ: { name: '따뜻한 담요', colors: ['#355C7D', '#6C9BC0', '#A8CCE3', '#F2D7B6', '#F9F5EE'] },
  ESTJ: { name: '정오의 회의실', colors: ['#0A2A5E', '#1D5FBF', '#5AA2F0', '#D64545', '#EEF4FC'] },
  ESFJ: { name: '소풍 바구니', colors: ['#2D6CDF', '#6FA8F7', '#B5D5FB', '#FFB38A', '#FFF4EA'] },
  ISTP: { name: '낡은 작업대', colors: ['#3D2C1E', '#8A5A2B', '#C98B3E', '#E7C27D', '#F6EBD6'] },
  ISFP: { name: '노을 스케치북', colors: ['#A65E3A', '#E39A6B', '#F5C99B', '#9DB48C', '#FFF5E6'] },
  ESTP: { name: '질주하는 오렌지', colors: ['#1A1A1A', '#E8590C', '#FF922B', '#FFD43B', '#FFF9DB'] },
  ESFP: { name: '여름 페스티벌', colors: ['#FF6B6B', '#FF9F43', '#FFD93D', '#4ECDC4', '#FFF8E1'] },
}

export const TYPE_CODES = Object.keys(PALETTES)

// 주소의 유형 코드를 대문자로 정리하고, 없는 유형이면 null
export function findType(code) {
  const upper = String(code ?? '').toUpperCase()
  return Object.hasOwn(PALETTES, upper) ? upper : null
}
