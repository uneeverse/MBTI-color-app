import { Link } from 'react-router-dom'
import ColorStrip from '../components/ColorStrip.jsx'
import { PALETTES, TYPE_CODES } from '../data/palettes.js'

export default function Gallery() {
  return (
    <main className="page">
      <h1>전체 유형</h1>
      <div className="grid">
        {TYPE_CODES.map((code) => (
          <Link key={code} className="card" to={`/result/${code}`}>
            <strong>{code}</strong>
            <ColorStrip colors={PALETTES[code].colors} />
          </Link>
        ))}
      </div>
      <Link className="link" to="/">
        처음으로
      </Link>
    </main>
  )
}
