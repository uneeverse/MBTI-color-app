// 5색을 가로 띠로 보여 주는 장식용 컴포넌트 (색 정보는 HEX 글자로 따로 제공한다)
export default function ColorStrip({ colors }) {
  return (
    <div className="strip" aria-hidden="true">
      {colors.map((c) => (
        <span key={c} style={{ background: c }} />
      ))}
    </div>
  )
}
