import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="page center">
      <h1>찾을 수 없는 주소예요</h1>
      <Link className="btn primary" to="/">
        시작하기
      </Link>
    </main>
  )
}
